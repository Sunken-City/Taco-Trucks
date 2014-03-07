  var json;
  var currTaco;
  var cart;


  window.addEventListener('load', function (event) {

    var url = "../taco_truck_menu.json"; //"../taco_truck_menu.json"
    var request = new XMLHttpRequest();

    request.open("GET", url, false);
    request.send();

    if (request.status === 200) {
      json = JSON.parse(request.responseText);

      for (var i = 0; i < json.menu.tortillas.length; i++) {
        var tortilla = new Ingredient();
        tortilla.init("tortilla", json.menu.tortillas[i].name, json.menu.tortillas[i].price, json.menu.tortillas[i].fixinId);
        createMenu(tortilla);
      }
      for (var i = 0; i < json.menu.type.length; i++) {
        var filling = new Ingredient();
        filling.init("filling", json.menu.type[i].name, json.menu.type[i].price, json.menu.type[i].fixinId);
        createMenu(filling);
      }
      for (var i = 0; i < json.menu.rice.length; i++) {
        var rice = new Ingredient();
        rice.init("rice", json.menu.rice[i].name, json.menu.rice[i].price, json.menu.rice[i].fixinId);
        createMenu(rice);
      }
      for (var i = 0; i < json.menu.beans.length; i++) {
        var bean = new Ingredient();
        bean.init("bean", json.menu.beans[i].name, json.menu.beans[i].price, json.menu.beans[i].fixinId);
        createMenu(bean);
      }
      for (var i = 0; i < json.menu.cheese.length; i++) {
        var cheese = new Ingredient();
        cheese.init("cheese", json.menu.cheese[i].name, json.menu.cheese[i].price, json.menu.cheese[i].fixinId);
        createMenu(cheese);
      }
      for (var i = 0; i < json.menu.sauces.length; i++) {
        var sauce = new Ingredient();
        sauce.init("sauce", json.menu.sauces[i].name, json.menu.sauces[i].price, json.menu.sauces[i].fixinId);
        createMenu(sauce);
      }
      for (var i = 0; i < json.menu.vegetables.length; i++) {
        var veggie = new Ingredient();
        veggie.init("veggie", json.menu.vegetables[i].name, json.menu.vegetables[i].price, json.menu.vegetables[i].fixinId);
        createMenu(veggie);
      }
      for (var i = json.menu.extras.length - 1; i > -1; i--) {
        var extras = new Ingredient();
        extras.init("extras", json.menu.extras[i].name, json.menu.extras[i].price, json.menu.extras[i].fixinId);
        createMenu(extras);
      }
      //Add the "None" option
      var none = new Ingredient();
      none.init("rice", "None", 0, 0);
      createMenu(none);
      var none = new Ingredient();
      none.init("bean", "None", 0, 0);
      createMenu(none);
      var none = new Ingredient();
      none.init("cheese", "None", 0, 0);
      createMenu(none);
    } else {
      console.log("HTTP request failed! Status Code: " + request.status);
    }

    //Set up the menu
    $("#accordion").accordion({
      active: 0,
      heightStyle: "content"
    });
    
    $(".quantity").spinner({
      min: 1,
      max: 100,
      showOn: 'both'
    });

    currTaco = new Taco();
    cart = new Cart();

    //Create the click listeners
    $(".quantity").on("spinstop", function (event, ui) {
      currTaco.quantity = $(".quantity").spinner("value");
      currTaco.updatePrice(0);
    });

    $("#clearVeggies").click(function () {
      currTaco.clearVeggies();
    });

    $("#clearExtras").click(function () {
      currTaco.clearExtras();
    });

    $("#clearTaco").click(function () {
      currTaco.clear();
    });

    $("#checkout").click(function () {
      $.ajax({
	type: 'POST',
	contentType: 'application/json',
	url: '/api/cart',
	dataType: "json",
	data: JSON.stringify(cart.items),
	success: function(data) {
	  window.location.replace("checkout.php");
	},
	error: function(data) {
	  alert('Start Crying');
	}
      });
      
    });

    $("#addToCart").click(function () {
      if ((currTaco["tortilla"] === "") || (currTaco["tortilla"] === undefined)) {
        moveTo(0);
        $("#accordion").accordion("option", "active", 0);
        $("#ui-accordion-accordion-header-0").addClass("fillMe");
      } else if ((currTaco["filling"] === "") || (currTaco["filling"] === undefined)) {
        moveTo(1);
        $("#accordion").accordion("option", "active", 1);
        $("#ui-accordion-accordion-header-1").addClass("fillMe");
      } else {
        cart.add(currTaco);
      }
    });
  });

  var createMenu = function (ingredient) {
    var type = ingredient.type;
    var name = ingredient.name;
    var price = ingredient.price;
    var elm = document.createElement("div");
    var menuItem = $("<div class=\"" + type + " ingredient\"></div>");
    menuItem.append("<img src=\"resources/img/" + name + ".png\" alt=\"" + name + "\" class=\"ingredient " + type + "\" price=\"" + price + "\">");
    menuItem.append("<span class=\"caption\">" + name + "</span>");
    menuItem.append("<span class=\"caption\">$" + parseFloat(price).toFixed(2) + "</span>");
    menuItem.click(function (event) {
      var $this = $(this);
      //Deselect if selected
      if ($($this.children("img")[0]).hasClass("selected")) {
        $($this.children("img")[0]).removeClass("selected");
        currTaco.remove(ingredient);
      } else {
        if ((type !== "veggie") && (type !== "extras")) {
          //Unselect any other selected values if the section is 1 or 0-1.
          if ($(".selected." + type)[0] !== undefined) {
            var lastIngredient = new Ingredient();
            lastIngredient.init(type, $(".selected." + type).attr('alt'), $(".selected." + type).attr('price'));
            $(".selected." + type).removeClass("selected");
            currTaco.remove(lastIngredient);
          }
          //Move to next section.
          moveTo(($("#accordion").accordion("option", "active")));
          $("#accordion").accordion("option", "active", $("#accordion").accordion("option", "active") + 1);
        }
        $($this.children("img")[0]).addClass("selected");
        $("#ui-accordion-accordion-header-" + ($("#accordion").accordion("option", "active") - 1)).removeClass("fillMe");

        currTaco.addToScreen(ingredient);
      }

    });
    $("#" + type + "Menu").append(menuItem);
  };

  //Logical objects for the page.

  function Taco() {
    this.init = function () {
      this.filling = "";
      this.tortilla = "";
      this.rice = "";
      this.bean = "";
      this.cheese = "";
      this.sauce = "";
      this.veggie = [];
      this.extras = [];
    };

    this.filling = "";
    this.tortilla = "";
    this.rice = "";
    this.bean = "";
    this.cheese = "";
    this.sauce = "";
    this.veggie = [];
    this.extras = [];
    this.price = 0;
    this.quantity = 1;
    this.components = ["filling", "tortilla", "rice", "bean", "cheese", "sauce"];


    this.location = ".fixing"

    this.addToScreen = function (ingredient) {
      this.add(ingredient);
      this.print(ingredient);
    }

    this.add = function (ingredient) {
      if (ingredient !== undefined) {
        if ((ingredient.type !== "veggie") && (ingredient.type !== "extras")) {
          this[ingredient.type] = ingredient;
        } else {
          this[ingredient.type].push(ingredient);
        }
        this.updatePrice(ingredient.price);
      }
    }

    this.print = function (ingredient) {
      if (ingredient !== undefined) {
        var fixing = $("<li>" + ingredient.name + "</li>");
        $(this.location + "." + ingredient.type).append(fixing);
      }
    };

    this.remove = function (ingredient) {
      if (ingredient !== undefined) {
        //Remove from the view.
        $(this.location + " li").filter(":contains('" + ingredient.name + "')").remove();
        if ((ingredient.type !== "veggie") && (ingredient.type !== "extras")) {
          this[ingredient.type] = undefined;
        } else {
          //Find the veggie/extra and remove it
          for (var i = 0; i < this[ingredient.type].length; i++) {
            if (this[ingredient.type][i].name == ingredient.name) {
              this[ingredient.type].splice(i, 1);
              break;
            }
          }
        }
        this.updatePrice(-1 * ingredient.price);
      }
    };

    this.updatePrice = function (change) {
      var num = parseFloat(change);
      if (!isNaN(num)) {
        this.price += num;
        $("#currentTaco .price").html("Price:$" + (this.price * this.quantity).toFixed(2));
      } else {
        $("#currentTaco .price").html("Invalid Quantity!");
      }
    };

    this.clear = function () {
      $(".selected").removeClass("selected");
      this.remove(this["filling"]);
      this.remove(this["tortilla"]);
      this.remove(this["rice"]);
      this.remove(this["bean"]);
      this.remove(this["cheese"]);
      this.remove(this["sauce"]);
      this.clearVeggies();
      this.clearExtras();
      $("#accordion").accordion("option", "active", 0);
      moveTo(0);
      this.price = 0;
      this.updatePrice(0);
    }

    this.clearVeggies = function () {
      $(".selected.veggie").removeClass("selected");
      for (var i = this.veggie.length - 1; i > -1; i--) {
        this.remove(this.veggie[i]);
      }
    };

    this.clearExtras = function () {
      $(".selected.extras").removeClass("selected");
      for (var i = this.extras.length - 1; i > -1; i--) {
        this.remove(this.extras[i]);
      }
    };
  };

  function Ingredient() {
    this.init = function (type, name, price, fixinId) {
      this.type = type;
      this.name = name;
      this.price = parseFloat(price);
      this.fixinId = fixinId;
    };

    this.type = "";
    this.name = "";
    this.price = 0;
  };

  function Cart() {

    this.items = [];
    this.total = 0;
    this.price = 0;

    this.add = function (taco) {
      var cartTaco = ShallowCopy(taco);
      cartTaco.location = ".cartTaco";
      this.items.push(cartTaco);
      this.print(cartTaco, this.items.length - 1);
      currTaco.clear();
    };

    this.print = function (taco, tacoId) {
      var tacoItem = $("<ul class=\"cartTaco\"></ul>");
      for (var i = 0; i < taco.components.length; i++) {
        if (taco[taco.components[i]] !== undefined) {
          var name = taco[taco.components[i]].name;
          if ((name !== undefined) && (name !== "None") && (name !== "No Sauce")) {
            var fixing = $("<li>" + name + "</li>");
            tacoItem.append(fixing);
          }
        }
      }
      for (var i = 0; i < taco["veggie"].length; i++) {
        var name = taco["veggie"][i].name;
        if ((name !== undefined) && (name !== "None")) {
          var fixing = $("<li>" + name + "</li>");
          tacoItem.append(fixing);
        }
      }
      for (var i = 0; i < taco["extras"].length; i++) {
        var name = taco["extras"][i].name;
        if ((name !== undefined) && (name !== "None")) {
          var fixing = $("<li>" + name + "</li>");
          tacoItem.append(fixing);
        }
      }
      
      var quantityField = $("<label for=\"quantity\">Quantity:</label><input name=\"quantity\" class=\"quantity\" tacolink=\"" + tacoId + "\" value=\"" + cart.items[tacoId].quantity + "\"/>");
      quantityField.spinner({
	min: 1,
	max: 100,
	showOn: 'both'
      });
      quantityField.on("spinstop", function (event, ui) {
	cart.items[$(this).attr('tacolink')].quantity = $(this).spinner("value");
	cart.updatePrice();
      });
      tacoItem.append(quantityField);
      
      
      var removeButton = $("<li><span class=\"button clearButton clearTaco\" tacolink=\"" + tacoId + "\">Remove</span></li>");
      removeButton.click(function () {
	cart.items.splice($(this).attr('tacolink'), 1);
	$(this).parent().remove();
	cart.updatePrice();
      });
      tacoItem.append(removeButton);
      $("#cartItems").append(tacoItem);

      this.updatePrice();
    };

    this.updatePrice = function (change) {
      this.price = 0;
      for (var i = 0; i < this.items.length; i++) {
        this.price += (this.items[i].price * this.items[i].quantity);
      }
      $("#total").html("Total:$" + (this.price).toFixed(2));
    };
  };

  //From http://stackoverflow.com/questions/7574054/javascript-how-to-pass-object-by-value
  function ShallowCopy(o) {
    var copy = Object.create(o);
    for (prop in o) {
      if (o.hasOwnProperty(prop)) {
        copy[prop] = o[prop];
      }
    }
    return copy;
  };

  function moveTo(headerNumber) {
    $('html, body').animate({
      scrollTop: $("#ui-accordion-accordion-header-" + headerNumber).offset().top
    }, 400);
  };
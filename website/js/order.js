  
var json;
var currTaco;

window.addEventListener('load', function(event) {

  var url = "../taco_truck_menu.json";
  var request = new XMLHttpRequest();
  
  request.open("GET", url, false);
  request.send();

  if(request.status === 200) {
    //console.log(request.responseText);
    json = JSON.parse(request.responseText);
    
    for(var i = 0; i < json.menu.tortillas.length; i++){
      var tortilla = new Ingredient();
      tortilla.init("tortilla", json.menu.tortillas[i].name, json.menu.tortillas[i].price);
      createMenu(tortilla);
    }
    for(var i = 0; i < json.menu.type.length; i++){
      var filling = new Ingredient();
      filling.init("filling", json.menu.type[i].name, json.menu.type[i].price);
      createMenu(filling);
    }
    for(var i = 0; i < json.menu.rice.length; i++){
      var rice = new Ingredient();
      rice.init("rice", json.menu.rice[i].name, json.menu.rice[i].price);
      createMenu(rice);
    }
    for(var i = 0; i < json.menu.beans.length; i++){
      var bean = new Ingredient();
      bean.init("bean", json.menu.beans[i].name, json.menu.beans[i].price);
      createMenu(bean);
    }
    for(var i = 0; i < json.menu.cheese.length; i++){
      var cheese = new Ingredient();
      cheese.init("cheese", json.menu.cheese[i].name, json.menu.cheese[i].price);
      createMenu(cheese);
    }
    for(var i = 0; i < json.menu.sauces.length; i++){
      var sauce = new Ingredient();
      sauce.init("sauce", json.menu.sauces[i].name, json.menu.sauces[i].price);
      createMenu(sauce);
    }
    for(var i = 0; i < json.menu.vegetables.length; i++){
      var veggie = new Ingredient();
      veggie.init("veggie", json.menu.vegetables[i].name, json.menu.vegetables[i].price);
      createMenu(veggie);
    }
    for(var i = json.menu.extras.length - 1; i > -1; i--){
      var extras = new Ingredient();
      extras.init("extras", json.menu.extras[i].name, json.menu.extras[i].price);
      createMenu(extras);
    }
    //Add the "None" option
    var none = new Ingredient();
    none.init("rice", "None", 0);
    createMenu(none);
    var none = new Ingredient();
    none.init("bean", "None", 0);
    createMenu(none);
    var none = new Ingredient();
    none.init("cheese", "None", 0);
    createMenu(none);
  }
  else {
    console.log("HTTP request failed! Status Code: " + request.status);
  }
  
  //Set up the menu
  $("#accordion").accordion({ 
    active: 0 ,
    heightStyle: "content"
  });
  $(".quantity").spinner({
    min : 1,
    max : 100,
    showOn : 'both'
  });
  
  currTaco = new Taco();
});

var createMenu = function (ingredient){
  var type = ingredient.type;
  var name = ingredient.name;
  var price = ingredient.price;
  var elm = document.createElement("div");
  var menuItem = $("<div class=\"" + type + " ingredient\"></div>");
  menuItem.append("<img src=\"resources/img/" + name + ".png\" alt=\"" + name + "\" class=\"ingredient " + type + "\" price=\"" + price + "\">");
  menuItem.append("<span class=\"caption\">" + name + "</span>");
  menuItem.append("<span class=\"caption\">$" + price.toFixed(2) + "</span>");
  menuItem.click(function(event){
      var $this = $(this);
      //Deselect if selected
      if ($($this.children("img")[0]).hasClass("selected")){
	$($this.children("img")[0]).removeClass("selected");
	currTaco.remove(ingredient);
      }
      else{
	if ((type !== "veggie")&&(type !== "extras")){
	  //Unselect any other selected values if the section is 1 or 0-1.
	  if ($(".selected." + type)[0] !== undefined){
	    var lastIngredient = new Ingredient();
	    lastIngredient.init(type, $(".selected." + type).attr('alt'), $(".selected." + type).attr('price'));
	    $(".selected." + type).removeClass("selected");
	    currTaco.remove(lastIngredient);
	  }
	  //Move to next section.
	  $("#accordion").accordion("option", "active", $("#accordion").accordion("option", "active") + 1);
	}
	$($this.children("img")[0]).addClass("selected");
	/*$('html, body').animate({
	  scrollTop: $("#ui-accordion-accordion-header-" + ($("#accordion").accordion("option", "active") - 1)).offset().top
      }, 400);*/
	currTaco.addToScreen(ingredient);
      }
      
  });
  $("#" + type + "Menu").append(menuItem);
};

function Taco() {
  this.init = function(){
  };
  
  this.filling = "";
  this.tortilla = "";
  this.rice = "";
  this.bean = "";
  this.cheese = "";
  this.sauce = "";
  this.veggie = [];
  this.extras = [];
  this.quantity = 0;
  this.price = 0;
  
  this.location = ".fixing"
  
  this.addToScreen = function(ingredient){
    this.add(ingredient);
    this.print(ingredient);
  }
  
  this.add = function(ingredient){
   if ((ingredient.type !== "veggie")&&(ingredient.type !== "extras")){
    this[ingredient.type] = ingredient.name; 
   }
   else{
     this[ingredient.type].push(ingredient.name);
   }
   this.updatePrice(ingredient.price);
  }
  
  this.print = function(ingredient){
    var fixing = $("<li>" + ingredient.name + "</li>");
    $(this.location + "."+ ingredient.type).append(fixing);
  };
  
  this.remove = function(ingredient){
    //Remove from the view.
    $(this.location + " li").filter(":contains('"+ ingredient.name + "')").remove();
    if ((ingredient.type !== "veggie")&&(ingredient.type !== "extras")){
     this[ingredient.type] = "None";
    }
    else{
      //Find the veggie/extra and remove it
      for(var i = 0; i < this[ingredient.type].length; i++) {
	  if(this[ingredient.type][i] == ingredient.name) {
	      this[ingredient.type].splice(i, 1);
	      break;
	}
      } 
    }
    this.updatePrice(-1 * ingredient.price);
  }
  
  this.updatePrice = function(change){
    this.price += change;
    $("#currentTaco .price").html("Price:$" + this.price.toFixed(2));
  }
};

function Ingredient()
{
  this.init = function(type, name, price){
    this.type = type;
    this.name = name;
    this.price = price;
  };
  
  this.type = "";
  this.name = "";
  this.price = 0;
};









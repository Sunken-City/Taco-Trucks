/**
	Project Name: Taco Trucks
	File Name: checkout.js
*/
var geocoder;
var map;
//var addresses =["2012 Woodall Rodgers Fwy 75201 Dallas, Tx",'6425 Boaz Lane 75205 Dallas, Tx','Addison Circle 75001 Addison, Tx',' 5624 Sears St. 75206 Dallas, Tx','2630 Commerce St. 75226 Dallas, Tx'];
var address = [];
var locationNames = [];
var locationCounter = 0;
window.addEventListener('load',
    function(event) {
        var url = "../api/locations";
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        if (request.status === 200) {
            //console.log(request.responseText);
            json = JSON.parse(request.responseText);
            for (var i = 0; i < json.locations
                .length; i++) {
                //console.log(json.locations[i]); 
                var truckLocation =
                    json.locations[i]['name'] + " " +
                    json.locations[i]['address'] + " " +
                    json.locations[i]['city'] + " " +
                    json.locations[i]['state'] + ", " +
                    json.locations[i]['zipcode'];
                locationNames[i] =
                    json.locations[i]['name'];
                address[i] = truckLocation;
            }
        }
        url = "../api/users";
        request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        if (request.status === 200) {
            json = JSON.parse(request.responseText);
            //console.log(json.info[0].f_name); 
            $("#firstName").val(json.info[0].f_name);
            $("#lastName").val(json.info[0].l_name);
            $("#CardProvider").val(json.info[0].cc_provider);
            $("#creditCardNumber").val(json.info[0].cc_number);
        }
    });
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.
//   var geocoder;
// var map;
// var addresses =["2012 Woodall Rodgers Fwy 75201 Dallas, Tx",'6425 Boaz Lane 75205 Dallas, Tx','Addison Circle 75001 Addison, Tx',' 5624 Sears St. 75206 Dallas, Tx','2630 Commerce St. 75226 Dallas, Tx'];
var numberOfStores = address.length;
//console.log('result');
//console.log(address);
var markers = [];
var infowindow = null;

function initialize() {
    geocoder = new google.maps.Geocoder();
    var infowindow;
    var countOfPlacesBeen = 0;
    //var curA;
    for (var i = 0; i < address.length; i++) {
        if (geocoder) {
            geocoder.geocode({
                'address': address[
                    i]
            }, function(results,
                status) {
                //console.log("test");
                //console.log(i);
                if (status ==
                    google.maps.GeocoderStatus
                    .OK) {
                    if (status !=
                        google.maps
                        .GeocoderStatus
                        .ZERO_RESULTS
                    ) {
                        map.setCenter(results[0].geometry.location);
                        infowindow = new google.maps.InfoWindow({
                            content: "holding...",
                        });
                        markers[locationCounter] = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            //title: "The Taco Truck"
                            title: locationNames[locationCounter]
                        });
                        for (var k = 0; k < markers.length; k++) {
                            var marker = markers[k];
                            google.maps.event.addListener(
                                marker,
                                'click',
                                function() {
                                    infowindow.setContent(this.title);
                                    infowindow.open(map, this);
                                }
                            );
                        }
                        //increment global variable
                        //i is not in scope here
                        locationCounter++;
                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
            //console.log("test");
            //console.log(i);
        }
    }
    var pos;
    var mapOptions = {
        zoom: 10,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle
                .DROPDOWN_MENU
        },
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId
            .ROADMAP,
    };
    map = new google.maps.Map(document.getElementById(
            'map-canvas'),
        mapOptions);
    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(
                position) {
                pos = new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                );
                var infowindow = new google
                    .maps.Marker({
                        map: map,
                        position: pos,
                        content: '',
                        title: 'Current Location',
                        color: 'purple'
                    });
                map.setCenter(pos);
            }, function() {
                handleNoGeolocation(
                    true);
            });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function handleNoGeolocation(errorFlag) {
    var content;
    if (errorFlag) {
        content = 'Error: The Geolocation service failed.';
    } else {
        content = 'Error: Your browser doesn\'t support geolocation.';
    }
    var options = {
        map: map,
        position: new google.maps.LatLng(
            60, 105),
        content: content
    };
    var infowindow = new google.maps.InfoWindow(
        options);
    map.setCenter(options.position);
}
google.maps.event.addDomListener(window,
    'load', initialize);


//Taco Objects from the checkout page:

function Taco() {

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
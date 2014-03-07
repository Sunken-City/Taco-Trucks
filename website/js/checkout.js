/**
	Project Name: Taco Trucks
	File Name: checkout.js
*/
var geocoder;
var map;
var cartson;
var cart;
var cartdone;

var address = [];
var locationNames = [];
var locationCounter = 0;

function populatePaymentForm() {
    url = "/api/users";
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
}

window.addEventListener('load',
    function(event) {
        cart = new Cart();
        var url = "/api/locations";
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

        populatePaymentForm();

        url = "/api/cart";
        request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        if (request.status === 200) {
            cartson = JSON.parse(request.responseText);
            console.log(cartson);
            for (var taco in cartson) {
                cart.add(cartson[taco]);
            }
        }
        // cartson = JSON.parse("[{\"filling\":{\"type\":\"filling\",\"name\":\"Chicken\",\"price\":0.75,\"fixinId\":2},\"tortilla\":{\"type\":\"tortilla\",\"name\":\"Cayenne\",\"price\":0.35,\"fixinId\":6},\"rice\":{\"type\":\"rice\",\"name\":\"Spanish Rice\",\"price\":0.25,\"fixinId\":10},\"bean\":{\"type\":\"bean\",\"name\":\"Whole Pinto Beans\",\"price\":0.25,\"fixinId\":15},\"cheese\":{\"type\":\"cheese\",\"name\":\"Cheddar/Jack Mix\",\"price\":0.35,\"fixinId\":12},\"sauce\":{\"type\":\"sauce\",\"name\":\"Death\",\"price\":0,\"fixinId\":18},\"veggie\":[],\"extras\":[],\"price\":4.95,\"quantity\":5,\"components\":[\"filling\",\"tortilla\",\"rice\",\"bean\",\"cheese\",\"sauce\"],\"location\":\".cartTaco\"},{\"filling\":{\"type\":\"filling\",\"name\":\"Carnitas\",\"price\":1,\"fixinId\":3},\"tortilla\":{\"type\":\"tortilla\",\"name\":\"Flour\",\"price\":0.25,\"fixinId\":5},\"rice\":{\"type\":\"rice\",\"name\":\"Spanish Rice\",\"price\":0.25,\"fixinId\":10},\"bean\":{\"type\":\"bean\",\"name\":\"None\",\"price\":0,\"fixinId\":0},\"cheese\":{\"type\":\"cheese\",\"name\":\"None\",\"price\":0,\"fixinId\":0},\"sauce\":{\"type\":\"sauce\",\"name\":\"No Sauce\",\"price\":0,\"fixinId\":23},\"veggie\":[],\"extras\":[],\"price\":1.5,\"quantity\":5,\"components\":[\"filling\",\"tortilla\",\"rice\",\"bean\",\"cheese\",\"sauce\"],\"location\":\".cartTaco\"}]");
    });
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var numberOfStores = address.length;

var markers = [];
var infowindow = null;

function initialize() {
    geocoder = new google.maps.Geocoder();
    var infowindow;
    var countOfPlacesBeen = 0;

    for (var i = 0; i < address.length; i++) {
        if (geocoder) {
            geocoder.geocode({
                'address': address[
                    i]
            }, function(results,
                status) {
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


    this.location = ".fixing";

    this.addToScreen = function(ingredient) {
        this.add(ingredient);
        this.print(ingredient);
    };

    this.add = function(ingredient) {
        if (ingredient !== undefined) {
            if ((ingredient.type !== "veggie") && (ingredient.type !== "extras")) {
                this[ingredient.type] = ingredient;
            } else {
                this[ingredient.type].push(ingredient);
            }
            this.updatePrice(ingredient.price);
        }
    };

    this.print = function(ingredient) {
        if (ingredient !== undefined) {
            var fixing = $("<li>" + ingredient.name + "</li>");
            $(this.location + "." + ingredient.type).append(fixing);
        }
    };

    this.remove = function(ingredient) {
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

    this.updatePrice = function(change) {
        var num = parseFloat(change);
        if (!isNaN(num)) {
            this.price += num;
            $("#currentTaco .price").html("Price:$" + (this.price * this.quantity).toFixed(2));
        } else {
            $("#currentTaco .price").html("Invalid Quantity!");
        }
    };

    this.clear = function() {
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
    };

    this.clearVeggies = function() {
        $(".selected.veggie").removeClass("selected");
        for (var i = this.veggie.length - 1; i > -1; i--) {
            this.remove(this.veggie[i]);
        }
    };

    this.clearExtras = function() {
        $(".selected.extras").removeClass("selected");
        for (var i = this.extras.length - 1; i > -1; i--) {
            this.remove(this.extras[i]);
        }
    };
}

function Ingredient() {
    this.init = function(type, name, price, fixinId) {
        this.type = type;
        this.name = name;
        this.price = parseFloat(price);
        this.fixinId = fixinId;
    };

    this.type = "";
    this.name = "";
    this.price = 0;
}

function Cart() {

    this.items = [];
    this.total = 0;
    this.price = 0;

    this.add = function(taco) {
        var cartTaco = ShallowCopy(taco);
        cartTaco.location = ".cartTaco";
        cartTaco.fixins = [];
        this.items.push(cartTaco);
        this.print(cartTaco, this.items.length - 1);
    };

    this.print = function(taco, tacoId) {
        var tacoItem = $("<ul class=\"cartTaco\"></ul>");
        for (var i = 0; i < taco.components.length; i++) {
            if (taco[taco.components[i]] !== undefined) {
                var name = taco[taco.components[i]].name;
                if ((name !== undefined) && (name !== "None") && (name !== "No Sauce")) {
                    var fixing = $("<li>" + name + "</li>");
                    taco.fixins.push(taco[taco.components[i]].fixinId);
                    tacoItem.append(fixing);
                }
            }
        }
        for (var i = 0; i < taco["veggie"].length; i++) {
            var name = taco["veggie"][i].name;
            if ((name !== undefined) && (name !== "None")) {
                var fixing = $("<li>" + name + "</li>");
                taco.fixins.push(taco["veggie"][i].fixinId);
                tacoItem.append(fixing);
            }
        }
        for (var i = 0; i < taco["extras"].length; i++) {
            var name = taco["extras"][i].name;
            if ((name !== undefined) && (name !== "None")) {
                var fixing = $("<li>" + name + "</li>");
                taco.fixins.push(taco["extras"][i].fixinId);
                tacoItem.append(fixing);
            }
        }

        var quantityField = $("<label for=\"quantity\">Quantity:</label><input name=\"quantity\" class=\"quantity\" tacolink=\"" + tacoId + "\" value=\"" + cart.items[tacoId].quantity + "\"/>");
        quantityField.spinner({
            min: 1,
            max: 100,
            showOn: 'both'
        });
        quantityField.on("spinstop", function(event, ui) {
            cart.items[$(this).attr('tacolink')].quantity = $(this).spinner("value");
            cart.updatePrice();
        });
        tacoItem.append(quantityField);


        var removeButton = $("<li><span class=\"button clearButton clearTaco\" tacolink=\"" + tacoId + "\">Remove</span></li>");
        removeButton.click(function() {
            cart.items.splice($(this).attr('tacolink'), 1);
            $(this).parent().remove();
            cart.updatePrice();
        });
        tacoItem.append(removeButton);
        $("#cartItems").append(tacoItem);

        this.updatePrice();
    };

    this.updatePrice = function(change) {
        this.price = 0;
        for (var i = 0; i < this.items.length; i++) {
            this.price += (this.items[i].price * this.items[i].quantity);
        }
        $("#total").html("Total:$" + (this.price).toFixed(2));
    };

    this.purchase = function() {
        var jsonable = {};
        var tacos = [];
        for (var i = 0; i < this.items.length; i++) {
            var dbTaco = {};
            dbTaco.fixins = this.items[i].fixins;
            dbTaco.quantity = this.items[i].quantity;
            tacos.push(dbTaco);
        }
        jsonable.tacos = tacos;
        jsonable.total = this.price;
        cartdone = JSON.stringify(jsonable);
        return cartdone;
    };
}
//From http://stackoverflow.com/questions/7574054/javascript-how-to-pass-object-by-value
function ShallowCopy(o) {
    var copy = Object.create(o);
    for (prop in o) {
        if (o.hasOwnProperty(prop)) {
            copy[prop] = o[prop];
        }
    }
    return copy;
}

$(document).ready(function() {
    $("#paymentForm").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/api/orders',
            dataType: "json",
            data: cart.purchase(),
            success: function(data) {
                window.location.replace("reciept.html");
            },
            error: function(data) {
                window.location.replace("reciept.html");
            }
        });
    });
    $("#login").submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/api/login',
            dataType: "json",
            data: loginFormToJSON(),
            success: function(data) {
                if (data.success) {
                    populatePaymentForm();
                    window.location.replace("#close");
                } else {
                    if (data.message !== undefined) {
                        alert("Login failed");
                    } else {
                        alert("Login failed");
                        $('#loginPassword').val('');
                    }
                }
            },
            error: function(data) {
                alert('Errors occured during your request :(');
                $('#loginPassword').val('');
            }
        });
    });

    function loginFormToJSON() {
        console.log($('#loginEmail').val());
        console.log($('#loginPassword').val());
        return JSON.stringify({
            "email": $('#loginEmail').val(),
            "password": $('#loginPassword').val()
        });
    }
});
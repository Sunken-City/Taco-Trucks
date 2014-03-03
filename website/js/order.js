  
var json;

window.addEventListener('load', function(event) {

  var url = "../taco_truck_menu.json";
  var request = new XMLHttpRequest();
  
  request.open("GET", url, false);
  request.send();

  if(request.status === 200) {
    //console.log(request.responseText);
    json = JSON.parse(request.responseText);
    
    for(var i = 0; i < json.menu.tortillas.length; i++){
      createMenu("tortilla", json.menu.tortillas[i].name, json.menu.tortillas[i].price);
    }
    for(var i = 0; i < json.menu.type.length; i++){
      createMenu("filling", json.menu.type[i].name, json.menu.type[i].price);
    }
    for(var i = 0; i < json.menu.rice.length; i++){
      createMenu("rice", json.menu.rice[i].name, json.menu.rice[i].price);
    }
    for(var i = 0; i < json.menu.beans.length; i++){
      createMenu("bean", json.menu.beans[i].name, json.menu.beans[i].price);
    }
    for(var i = 0; i < json.menu.cheese.length; i++){
      createMenu("cheese", json.menu.cheese[i].name, json.menu.cheese[i].price);
    }
    for(var i = 0; i < json.menu.sauces.length; i++){
      createMenu("sauce", json.menu.sauces[i].name, json.menu.sauces[i].price);
    }
    for(var i = 0; i < json.menu.vegetables.length; i++){
      createMenu("veggie", json.menu.vegetables[i].name, json.menu.vegetables[i].price);
    }
    for(var i = json.menu.extras.length - 1; i > -1; i--){
      createMenu("extras", json.menu.extras[i].name, json.menu.extras[i].price);
    }
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
});

var createMenu = function (type, name, price){
  var elm = document.createElement("div");
  var menuItem = $("<div class=\"" + type + " ingredient\"></div>");
  menuItem.append("<img src=\"resources/img/" + name + ".png\" alt=\"" + name + "\" class=\"ingredient " + type + "\">");
  menuItem.append("<span class=\"caption\">" + name + "</span>");
  menuItem.append("<span class=\"caption\">$" + price.toFixed(2) + "</span>");
  menuItem.click(function(event){
      var $this = $(this);
      //Deselect if selected
      if ($($this.children("img")[0]).hasClass("selected")){
	$($this.children("img")[0]).removeClass("selected");
      }
      else{
	if ((type !== "veggie")&&(type !== "extras")){
	  //Unselect any other selected values if the section is 1 or 0-1.
	  if ($(".selected." + type)[0] !== undefined){
	    $(".selected." + type).removeClass("selected");
	  }
	  //Move to next section.
	  $("#accordion").accordion("option", "active", $("#accordion").accordion("option", "active") + 1);
	}
	$($this.children("img")[0]).addClass("selected");
	/*$('html, body').animate({
	  scrollTop: $("#ui-accordion-accordion-header-" + ($("#accordion").accordion("option", "active") - 1)).offset().top
      }, 400);*/
      }
      
  });
  $("#" + type + "Menu").append(menuItem);
};















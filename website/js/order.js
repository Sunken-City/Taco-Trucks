  
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
      createMenu("tortilla", json.menu.tortillas[i].name);
    }
    for(var i = 0; i < json.menu.type.length; i++){
      createMenu("filling", json.menu.type[i].name);
    }
    for(var i = 0; i < json.menu.rice.length; i++){
      createMenu("rice", json.menu.rice[i].name);
    }
    for(var i = 0; i < json.menu.beans.length; i++){
      createMenu("bean", json.menu.beans[i].name);
    }
    for(var i = 0; i < json.menu.cheese.length; i++){
      createMenu("cheese", json.menu.cheese[i].name);
    }
    for(var i = 0; i < json.menu.sauces.length; i++){
      createMenu("sauce", json.menu.sauces[i].name);
    }
    for(var i = 0; i < json.menu.vegetables.length; i++){
      createMenu("veggie", json.menu.vegetables[i].name);
    }
    for(var i = 0; i < json.menu.extras.length; i++){
      createMenu("extras", json.menu.extras[i].name);
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

var createMenu = function (type, name){
  var elm = document.createElement("div");
  var menuItem = $("<div class=\"" + type + " ingredient\"></div>");
  menuItem.append("<img src=\"resources/img/" + name + ".png\" alt=\"" + name + "\" class=\"ingredient " + type + "\">");
  menuItem.append("<span class=\"caption\">" + name + "</span>");
  menuItem.click(function(event){
      var $this = $(this);
      //Deselect if selected
      if ($($this.children("img")[0]).hasClass("selected")){
	$($this.children("img")[0]).removeClass("selected");
      }
      else{
	if ((type !== "veggie")&&(type !== "extras")){
	  if ($(".selected." + type)[0] !== undefined){
	    $(".selected." + type).removeClass("selected");
	  }
	}
	$($this.children("img")[0]).addClass("selected");
      }
  });
  $("#" + type + "Menu").append(menuItem);
};















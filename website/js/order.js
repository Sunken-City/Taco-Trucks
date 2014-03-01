  
var json;
window.addEventListener('load', function(event) {
  
  //Set up the menu
  $("#accordion").accordion({ active: 0 });
  $(".quantity").spinner({
    min : 1,
    max : 100,
    showOn : 'both'
  });
  
  var url = "../taco_truck_menu.json";
  var request = new XMLHttpRequest();
  
  request.open("GET", url, false);
  request.send();

  if(request.status === 200) {
    console.log(request.responseText);
    json = JSON.parse(request.responseText);
  }
  else {
    console.log("HTTP request failed! Status Code: " + request.status);
  }
  
  
});


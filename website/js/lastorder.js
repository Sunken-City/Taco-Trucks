var url = "../api/orders";
var request = new XMLHttpRequest();

request.open("GET", url, false);
request.send();

if(request.status == 200) {
  var json = JSON.parse(request.responseText);
  
}
else {
  console.log("Error " + request.status);
}
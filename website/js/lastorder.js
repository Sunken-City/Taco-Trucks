url = "../api/orders";
request = new XMLHttpRequest();
request.open("GET", url, false);
request.send();

if(request.status == 200) {
  console.log(request.responseText);
}
else {
  console.log("Error " + request.status);
}
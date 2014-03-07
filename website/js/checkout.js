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
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

  var geocoder;
var map;
var addresses =["2012 Woodall Rodgers Fwy 75201 Dallas, Tx",'6425 Boaz Lane 75205 Dallas, Tx','Addison Circle 75001 Addison, Tx',' 5624 Sears St. 75206 Dallas, Tx','2630 Commerce St. 75226 Dallas, Tx'];


function initialize() {
      geocoder = new google.maps.Geocoder();
    var infowindow;
    var countOfPlacesBeen = 0;
    for (i=0; i < addresses.length; i++){
      var address = addresses[i];
  if (geocoder) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
        map.setCenter(results[0].geometry.location);
          infowindow = new google.maps.InfoWindow(
              { content: '',
                size: new google.maps.Size(150,50)
              });
          var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map, 
              title: "The Taco Truck"
          }); 
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
          });
            countOfPlacesBeen ++;
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  }






var pos;

var mapOptions = {
    zoom: 13,
        mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
     pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.Marker({
        map: map,
        position: pos,
        content: '',
        title: 'Current Location',
        color: 'purple'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
"use strict";
var mapLocation=new google.maps.LatLng(parseFloat(jQuery('#map').data('lat')),parseFloat(jQuery('#map').data('lng')));
var marker;
var map;

function initialize() {
  var contentString = '<div class="map-info">'
    + jQuery("#map").html() + '</div>';
  var mapOptions = {
    zoom: 12,
    center: mapLocation,
    scrollwheel: false,
    styles: [{
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#333333"}]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{"color": "#f2f2f2"}]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{"saturation": -100}, {"lightness": 45}]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{"visibility": "simplified"}, {"color": "#f6954d"}]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{"color": "#e3e2e2"}]
    }, {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{"color": "#a4c4c8"}, {"visibility": "on"}]
    }]
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var infowindow = new google.maps.InfoWindow({content: contentString,});
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });
  infowindow.open(map, marker);
}

if(jQuery('#map').length){google.maps.event.addDomListener(window,'load',initialize);}

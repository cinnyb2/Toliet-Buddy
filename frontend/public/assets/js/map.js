// Initialize and add the map

let map; // global map variable 
var gmarkers = []; // store marker variables



function addMarker(lat, lng, title, description) {
  // var myLatlng = new google.maps.LatLng(-25.363882,131.044922)
  var myLatlng = new google.maps.LatLng(lat, lng);
  var markerIcon = 'assets/png/toiletpaper.png';

  let marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Test Bathroom',
    icon: markerIcon
  });

  // Save markers for sidebar later
  gmarkers.push(marker);

  google.maps.event.addListener(marker, 'click', function(){
    return
  });

  }




// INITIALIZE MAP //

var myStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

const SAN_FRANCISCO_BOUNDS = {
  north: 37.84,
  south: 37.71,
  west: -122.52,
  east: -122.35,
};
const SAN_FRANCISCO = { lat: 37.76, lng: -122.45 };

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: SAN_FRANCISCO,
    restriction: {
      latLngBounds: SAN_FRANCISCO_BOUNDS,
      strictBounds: false,
    },
    styles: myStyles,
  });

  addMarker(37.7882589, -122.4104123, 'Market/Powell');
}
// Initialize and add the map

let map;
const SAN_FRANCISCO_BOUNDS = {
  north: 37.84,
  south: 37.71,
  west: -122.52,
  east: -122.35,
};
const SAN_FRANCISCO = { lat: 37.76, lng: -122.45 };

var myStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

function addMarker(lat, lng, title) {
  // var myLatlng = new google.maps.LatLng(-25.363882,131.044922)
  var myLatlng = new google.maps.LatLng(lat, lng);

  const marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Test Bathroom',
  });
}

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

// // The marker, positioned at Uluru
// const marker = new google.maps.Marker({
//   position: uluru,
//   map: map,
// });

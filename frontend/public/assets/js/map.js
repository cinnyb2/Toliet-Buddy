// Initialize and add the map

let map; // global map variable

function addMarker(lat, lng, title, description) {
  // var myLatlng = new google.maps.LatLng(-25.363882,131.044922)
  var myLatlng = new google.maps.LatLng(lat, lng);
  var markerIcon = 'assets/png/new-pin.png';

  let marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: markerIcon,
  });

  const contentString = '<b>' + title + '</b><br>' + description;

  let infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  marker.addListener('click', () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: true,
    });
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
  north: 37.87,
  south: 37.66,
  west: -122.72,
  east: -122.21,
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

  fetch('http://35.203.34.201:8080/locations')
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < Object.keys(data).length; i++) {
        loc = data[i];
        console.log(loc);
        addMarker(loc[0], loc[1], loc[2], loc[3]);
      }
    });
}

// Initialize and add the map

let map; // global map variable
var gmarkers = []; // store marker variables


function addMarker(lat, lng, title, description) {
  // var myLatlng = new google.maps.LatLng(-25.363882,131.044922)
  var myLatlng = new google.maps.LatLng(lat, lng);
  var markerIcon = 'assets/png/new-pin.png';

  let marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: markerIcon,
  });

  // Save markers for sidebar later
  gmarkers.push(marker);

  let infowindow = new google.maps.InfoWindow({
    content: 'Testing a messageaj s;ldfj a;ldskfj a;lskdjf;lsajf ;lsakdj',
    maxWidth: 150,
  });

  marker.addListener("click", () => {
    infowindow.open({
      anchor:marker,
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
        addMarker(loc[0], loc[1], loc[2]);
      }
    });
}

function find_loc_map() {
  const myLatlng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(document.getElementById('loc_map'), {
    zoom: 13,
    center: SAN_FRANCISCO,
    restriction: {
      latLngBounds: SAN_FRANCISCO_BOUNDS,
      strictBounds: false,
    },
    styles: myStyles,
  });

  console.log(map);
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: 'Click the map to get Lat/Lng!',
    position: myLatlng,
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener('click', (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });
}

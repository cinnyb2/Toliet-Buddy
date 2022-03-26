// Initialize and add the map


let map;
const SAN_FRANCISCO_BOUNDS = {
  north: 37.84,
  south: 37.71,
  west: -122.52,
  east: -122.35
};
const SAN_FRANCISCO = { lat: 37.76, lng: -122.45};

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: SAN_FRANCISCO,
      restriction: {
        latLngBounds: SAN_FRANCISCO_BOUNDS,
        strictBounds: false,
      }
    });
  }

  // // The marker, positioned at Uluru
// const marker = new google.maps.Marker({
//   position: uluru,
//   map: map,
// });
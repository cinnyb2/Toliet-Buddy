function initMap() {
  const myStyles = [
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

  const myLatlng = new google.maps.LatLng(-25.363882, 131.044922);

  map = new google.maps.Map(document.getElementById('loc_map'), {
    zoom: 13,
    center: SAN_FRANCISCO,
    restriction: {
      latLngBounds: SAN_FRANCISCO_BOUNDS,
      strictBounds: false,
    },
    styles: myStyles,
  });

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

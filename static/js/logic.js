// Creating map object
var myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 2,
});

// Adding tile layer
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  }
).addTo(myMap);

// Use this link to get the geojson data.
var link = "static/data/countries.geojson";

// Grabbing our GeoJSON data..
d3.json(link).then(function (data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(myMap);
});

// // Create a new marker
// // Pass in some initial options, and then add it to the map using the addTo method
// var marker = L.marker([-28.01, 153.4], {
//   draggable: true,
//   title: "My First Marker",
// }).addTo(myMap);

// // Binding a pop-up to our marker
// marker.bindPopup("Hello There!");

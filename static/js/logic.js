// Creating map object
var myMap = L.map("map", {
  center: [39.598054, 3.008771],
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
var link = "static/data/countries_to_use.geojson";

var geojson;

// Grabbing our GeoJSON data..
d3.json(link).then(function (data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data
  // L.geoJson(data).addTo(myMap);
  // Create a new choropleth layer
  geojson = L.choropleth(data, {
    // Define what  property in the features to use
    valueProperty: "netflix_movie",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8,
    },

    // Binding a pop-up to each layer
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Country: " +
          feature.properties.name +
          "<br># of Netflix shows: " +
          feature.properties.netflix_movie
      );
    },
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo =
      "<h5># of Netflix Shows</h5>" +
      '<div class="labels">' +
      '<div class="min">' +
      limits[0] +
      "</div>" +
      '<div class="max">' +
      limits[limits.length - 1] +
      "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>');
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
});

// // Create a new marker
// // Pass in some initial options, and then add it to the map using the addTo method
// var marker = L.marker([-28.01, 153.4], {
//   draggable: true,
//   title: "My First Marker",
// }).addTo(myMap);

// // Binding a pop-up to our marker
// marker.bindPopup("Hello There!");

// Creating map object
var myMap2 = L.map("map2", {
  center: [39.598054, 3.008771],
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
).addTo(myMap2);

// Use this link to get the geojson data.
var link = "static/data/countries_to_use.geojson";

var geojson;

// Grabbing our GeoJSON data..
d3.json(link).then(function (data) {
  console.log(data);

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Add a new marker to the cluster group and bind a pop-up
  markers.addLayer(L.marker(data.properties.netflix_movie));
});

// Add our marker cluster layer to the map
myMap2.addLayer(markers);

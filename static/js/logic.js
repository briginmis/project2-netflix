// Create function to get colour scheme for geojson shading
function getColor(d) {
  return d > 5000
    ? "#800026"
    : d > 4750
    ? "#BD0026"
    : d > 4500
    ? "#E31A1C"
    : d > 4250
    ? "#FC4E2A"
    : d > 4000
    ? "#FD8D3C"
    : d > 3750
    ? "#FEB24C"
    : d > 3500
    ? "#FED976"
    : "#FFEDA0";
}

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
  // Function to allocate colour shading using Getcolor function and setting other styles
  function customstyle(feature) {
    return {
      fillColor: getColor(feature.properties.netflix_movie),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  }

  // Creating shading layer
  L.geoJson(data, {
    style: customstyle,
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

  // Creating legent
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 3500, 3750, 4000, 4250, 4500, 4750, 5000],
      labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        getColor(grades[i] + 1) +
        '"></i> ' +
        grades[i] +
        (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }

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
//var link = "static/data/countries_to_use.geojson";

//var geojson;

// Grabbing our GeoJSON data..
//d3.json(link).then(function (data) {
//console.log(data);

// Country data
var countries = {
  "United States": {
    location: [37.09024, -95.712891],
    netfilx_movie: 4928,
  },

  Canada: {
    location: [56.130366, -106.346771],
    netflix_movie: 5183,
  },
  Mexico: {
    location: [23.634501, -102.552784],
    netflix_movie: 4531,
  },
  Brazil: {
    location: [-14.235004, -51.92528],
    netflix_movie: 4423,
  },

  Argentina: {
    location: [-38.416097, -63.616672],
    netflix_movie: 4525,
  },

  Colombia: {
    location: [4.570868, -74.297333],
    netflix_movie: 4295,
  },
};
// Add a new marker to the cluster group and bind a pop-up
//markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//.bindPopup(response[i].descriptor));
var dict = Object.entries(countries).map(([key, values]) => {
  return key, values;
});

// Create a new marker cluster group
var markers = L.markerClusterGroup();
var country = dict.forEach((item) => {
  item.location;
  markers.addLayer(L.marker(item.location).bindPopup(`${item.netflix_movie}`));
});
// Add a new marker to the cluster group and bind a pop-up

// Add our marker cluster layer to the map
myMap2.addLayer(markers);
legend.addTo(myMap);

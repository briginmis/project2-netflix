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

  Australia: {
    location: [-25.274398, 133.775136],
    netflix_movie: 5049,
  },

  Russia: {
    location: [61.52401, 105.318756],
    netflix_movie: 4716,
  },

  India: {
    location: [20.593684, 78.96288],
    netflix_movie: 5032,
  },

  Thailand: {
    location: [15.870032, 100.992541],
    netflix_movie: 5071,
  },

  Malaysia: {
    location: [4.210484, 101.975766],
    netflix_movie: 4628,
  },

  Japan: {
    location: [36.204824, 138.252924],
    netflix_movie: 5174,
  },

  Korea: {
    location: [35.907757, 127.766922],
    netflix_movie: 4281,
  },

  Iceland: {
    location: [64.963051, -19.020835],
    netflix_movie: 4612,
  },

  Sweden: {
    location: [60.128161, 18.643501],
    netflix_movie: 4207,
  },

  Lithuania: {
    location: [55.169438, 23.881275],
    netflix_movie: 4765,
  },

  Poland: {
    location: [51.919438, 19.145136],
    netflix_movie: 4451,
  },

  Germany: {
    location: [51.165691, 10.451526],
    netflix_movie: 4451,
  },

  France: {
    location: [46.227638, 2.213749],
    netflix_movie: 4547,
  },

  Italy: {
    location: [41.87194, 12.56738],
    netflix_movie: 4529,
  },

  Turkey: {
    location: [38.963745, 35.243322],
    netflix_movie: 4227,
  },

  Greece: {
    location: [39.074208, 21.824312],
    netflix_movie: 4632,
  },

  Romania: {
    location: [45.943161, 24.96676],
    netflix_movie: 5023,
  },

  Hungary: {
    location: [47.162494, 19.503304],
    netflix_movie: 5195,
  },

  Czech: {
    location: [49.817492, 15.472962],
    netflix_movie: 4765,
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

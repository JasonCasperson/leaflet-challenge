var myMap = L.map("map", {
    center: [40, -120],
    zoom: 5
  });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

  // Store our API endpoint
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


//  GET color radius call to the query URL
d3.json(queryUrl, function(data) {
  function styleInfo(earthquake_datapoint) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(earthquake_datapoint.properties.mag),
      color: "#000000",
      radius: getRadius(earthquake_datapoint.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  // set different color from magnitude
    function getColor(magnitude) {
    switch (true) {
    case magnitude > 5:
      return "#FF2D00";
    case magnitude > 4:
      return "#FF9B00";
    case magnitude > 3:
      return "#FFC700";
    case magnitude > 2:
      return "#FFF800";
    case magnitude > 1:
      return "#AFFF00";
    default:
      return "#AFFF00";
    }
  }
  // set radiuss from magnitude
    function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    
    return magnitude * 4;
  }
    // GeoJSON layer
    L.geoJson(data, {
      // Maken cricles
      pointToLayer: function(earthquake_datapoint, latlng) {
      return L.circleMarker(latlng,{
        radius: getRadius(earthquake_datapoint.properties.mag)
      });
      },
      // cirecle style
      style: styleInfo,
      // popup for each marker
      onEachFeature: function(earthquake_datapoint, layer) {
        layer.bindPopup("Magnitude: " + earthquake_datapoint.properties.mag + "<br>Location: " + earthquake_datapoint.properties.place);
      }
    }).addTo(myMap);
  
    // an object legend
    var legend = L.control({
      position: "bottomright"
    });
  
    // details for the legend
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
  
      var grades = [0, 1, 2, 3, 4, 5];
      var colors = [
        "#FF2D00",
        "#FF9B00",
        "#FFC700",
        "#FFF800",
        "#AFFF00",
      ];
  
      // Looping through
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          "<i style='background: " + colors[i] + "'></i> " +
          grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
      return div;
    };
  
    // Finally, we our legend to the map.
    legend.addTo(myMap);
  });

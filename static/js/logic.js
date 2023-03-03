// initialize the map
var map = L.map('map').setView([37.0902, -95.7129], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// store geoJSON information in variable
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// create object for the magnitude
function circleSize(magnitude) {
    return magnitude * 5

  }
// create object for the color 
function circleColor(depth) {
    if (depth <= 70) return "yellow"
    else if (depth <= 300) return "green"
    else return "blue"
}

// read in the data
d3.json(url).then(function(data) {
    // use the geoJson function to draw map
    L.geoJson(data, {
        // passing in map style for styling
        pointToLayer: function(feature, latlng) {
            return new L.circleMarker(latlng, {
                radius: 5,
                fillOpacity: 0.5,
                weight: 1.2
            });
        },
        style: function(x){
            return{
                //style each feature based on conditionals above
                    radius:circleSize(x.properties.mag),
                    color: circleColor(x.geometry.coordinates[2])
                }
        },
        // add pop up information
        onEachFeature: onEachFeature

    }).addTo(map)

})
//create function to include pop up information
function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h2><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Depth: ${feature.geometry.coordinates[2]}</p>`)
}

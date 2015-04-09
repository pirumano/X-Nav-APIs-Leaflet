$(document).ready(function(){
	var map = L.map('map').locate({setView: true, maxZoom: 17});
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	L.marker([40.2838, -3.8215]).addTo(map)
    .bindPopup('Aulario III, URJC')
    .openPopup();

    map.on('click', function(e) {
    	alert(e.latlng);
	});

    // Define one GeoJSON feature
    var geojsonFeature = {
	"type": "Feature",
	"properties": {
            "name": "Aulario III",
            "amenity": "Classrooms Building",
            "popupContent": "Most of the classes of ETSIT are taught here."
	},
	"geometry": {
            "type": "Point",
            "coordinates": [-3.8215, 40.2838]
	}
    };

    // Define a function to show the name property
    function popUpName(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties && feature.properties.Name) {
            layer.bindPopup(feature.properties.Name);
	}
    }

    // Add to map a layer with the geojsonFeature point
    var myLayer = L.geoJson().addTo(map);
    myLayer.addData(geojsonFeature);

    // Add to map a layer with all points in buildings-urjc.json
    $.getJSON("edificios.json", function(data) {
	buildingsLayer = L.geoJson(data, {
	    onEachFeature: popUpName
	}).addTo(map);
    });


	function onLocationFound(e) {
	    var radius = e.accuracy / 2;

	    L.marker(e.latlng).addTo(map)
	        .bindPopup("Estas en un area de " + radius + " metros desde punto.").openPopup();

	    L.circle(e.latlng, radius).addTo(map);
	}
	map.on('locationfound', onLocationFound);

});
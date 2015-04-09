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

	function onLocationFound(e) {
	    var radius = e.accuracy / 2;

	    L.marker(e.latlng).addTo(map)
	        .bindPopup("Estas en un area de " + radius + " metros desde punto.").openPopup();

	    L.circle(e.latlng, radius).addTo(map);
	}
	map.on('locationfound', onLocationFound);

});
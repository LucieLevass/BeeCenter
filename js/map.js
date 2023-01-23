var map = L.map('map', {zoomControl:false}).setView([48.66, 6.155], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19, minZoom: 16}).addTo(map);

// Set the perimeter limit as the max bounds for the map
map.setMaxBounds([[48.65681042823877, 6.150958916801744],[48.66397070063344, 6.160715224904584]]);

document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

var json = []
fetch('../data/db-fleur.json')
    .then(response => response.json())
    .then(data => {
        json = data
        json.insert_plantes.forEach(function (item) {
            var marker = L.marker([item.latitude, item.longitude]).addTo(map);
            marker.bindPopup("<b>" + item.nom + "</b><br /><img src="+ item.img +" width='200px' />");
        });
    })

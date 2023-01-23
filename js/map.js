var map = L.map('map', {zoomControl:false}).setView([48.66, 6.155], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,}).addTo(map);
document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

var json = []
fetch('../data/db-fleur.json')
    .then(response => response.json())
    .then(data => {
        json = data
        json.insert_plantes.forEach(function (item) {
            var marker = L.marker([item.latitude, item.longitude]).addTo(map);
            marker.bindPopup("<b>" + item.nom + "</b><br />" + item.emplacement_jardin);
        });
    })

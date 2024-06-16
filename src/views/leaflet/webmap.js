const L = require('leaflet');
const vessels = require('./markers');

// Create a map instance
const map = L.map('map').setView([33.112519, -13.988851], 3);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

(function add_markers() {
  Object.values(vessels).forEach(item => {
    let { mmsi, lat, lng } = item;
    // console.log(lat, lng);
    let popup_content = `
      MMSI: ${mmsi}\n\n
      Latitude: ${lat}\n\n
      Longitude: ${lng}
      Link: <a href="/${mmsi}">Get Updated Location</a>
    `;
    L.marker([lat, lng]).addTo(map).bindPopup(popup_content);
  });
})();

// Link: <a href="/api/vessels/${mmsi}">Get Updated Location</a>



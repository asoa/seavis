// public/script.js
document.addEventListener("DOMContentLoaded", function() {
    try {
      // Initialize the map
      const map = L.map('map').setView([vessel.latitude, vessel.longitude], 6);

      // Add a tile layer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
    let popup_content = `
        MMSI: ${vessel.mmsi}
        Latitude: ${vessel.latitude}
        Longitude: ${vessel.longitude}
        Heading: ${vessel.heading}
        SOG: ${vessel.SOG}
        Time of Fix: ${vessel.timeOfFix}
    `;
      // Add a marker to the map
      L.marker([vessel.latitude, vessel.longitude]).addTo(map)
          .bindPopup(popup_content)
          .openPopup();
  } catch (error) {
      console.error('Error loading location data:', error);
  }
});

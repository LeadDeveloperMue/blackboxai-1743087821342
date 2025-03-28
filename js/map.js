// Leaflet Map Implementation with Fixes
function initPropertyMap() {
    const mapContainer = document.getElementById('property-map');
    // Check if map already exists or container missing
    if (!mapContainer || mapContainer._leaflet_map) return;

    // Clear container and prevent duplicate init
    mapContainer.innerHTML = '';
    mapContainer._leaflet_map = true;

    // Initialize map
    const map = L.map('property-map').setView([-17.9243, 25.8290], 12);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add marker with custom icon
    const icon = L.divIcon({
        html: '<i class="fas fa-map-marker-alt text-red-500 text-2xl"></i>',
        iconSize: [30, 30],
        className: 'bg-transparent border-none'
    });

    L.marker([-17.9243, 25.8290], {icon}).addTo(map)
        .bindPopup('<b>Victoria Falls Lodge</b><br>Premium Zimbabwe accommodation')
        .openPopup();
}

// Initialize only once when DOM is fully loaded
if (document.readyState !== 'loading') {
    initPropertyMap();
} else {
    document.addEventListener('DOMContentLoaded', initPropertyMap);
}
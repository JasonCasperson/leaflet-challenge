var earthquake_data = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';


let base_street_map = L.titleLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
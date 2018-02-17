"use strict";


const osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 20,
  tileSize: 256,
});

const map = L.map('mapid')
.addLayer(osm)
//.fitWorld();
.setView([34.725401, 137.718005], 18);

map.on('click', (e)=>{
  L.marker(e.latlng)
  .addTo(map)
  .bindPopup(`<strong>${e.latlng}</strong>`)
  .openPopup();
});

/*
map.locate({setView: true, maxZoom: 18});

map.on('locationfound', (e)=>{
  const radius = e.accuracy / 2;
  L.marker(e.latlng).addTo(map)
  .bindPopup(`You are within <strong>${radius}</strong> meters from this point`)
  .openPopup();

  L.circle(e.latlng, {
      radius: radius,
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  })
  .addTo(map);
});

map.on('locationerror', (e)=>{
  alert(e.message);
  map.setView([34.725401, 137.718005], 18);
});
*/
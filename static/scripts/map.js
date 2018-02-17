"use strict";

const map = L.map('mapid').fitWorld();

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 20,
//  id: 'mapbox.streets',
//  accessToken: "pk.eyJ1IjoiaWt5aGRzdCIsImEiOiJjamM3bXoyN3IxZmR2Mnl0OHZzZWJwNW9tIn0._7_CrTVqam54BfRuz6-17Q"
})
.addTo(map);

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
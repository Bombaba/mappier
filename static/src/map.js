"use strict";

(function(mappier) {
///////////////////////////////////////////////////////////////////////////////

mappier.init = function () {
  const map = L.map('mapid').fitWorld();

  L.tileLayer(
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: "pk.eyJ1IjoiaWt5aGRzdCIsImEiOiJjamM3bXoyN3IxZmR2Mnl0OHZzZWJwNW9tIn0._7_CrTVqam54BfRuz6-17Q"
  }).addTo(map);

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
    }).addTo(map);
  });
  map.on('locationerror', (e)=>alert(e.massage) );
};

///////////////////////////////////////////////////////////////////////////////
}(window.mappier = window.mappier || {}));

"use strict";

const userid = "ikyhdst1234"

function getCenter(map) {
  const {lat, lng} = map.getCenter();
  return [lat, lng];
}

function getRadius(map) {
  const bounds = map.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  // The unit of radius is km.
  const radius = map.distance(sw, ne) / 2000;
  return radius;
}

function limitValue(val, min=Number.MIN_VALUE, max=Number.MAX_VALUE) {
  return Math.min(Math.max(min, val), max);
}

const osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 20,
  tileSize: 256,
});

let center = [34.725401, 137.718005];
let radius = 18;
const map = L.map('mapid')
  .addLayer(osm)
  //.fitWorld();
  .setView([34.725401, 137.718005], 18);
L.control.scale().addTo(map);

const database = firebase.database();
const firebaseRef = database.ref("geoentry");
const geoFire = new GeoFire(firebaseRef);

const geoQuery = geoFire.query({
  center: getCenter(map),
  radius: limitValue(getRadius(map), 0.5, 10),
});

map.on("moveend", (e) => {
  geoQuery.updateCriteria({
    center: getCenter(map),
    radius: limitValue(getRadius(map), 0.5, 10),
  });
});

map.on("zoomend", (e) => {
  geoQuery.updateCriteria({
    center: getCenter(map),
    radius: limitValue(getRadius(map), 0.5, 10),
  });
});

const markers = {};

geoQuery.on("key_entered", function(key, location, distance){
  const marker = L.marker(location)
    .addTo(map)
    .bindPopup(`<strong>${key}</strong>`)
  marker.on('dblclick', e => {
    //marker.remove();
    geoFire.remove(key)
      .catch(error => {
        console.log(`Couldn't remove ${key} : ${error}`);
        //marker.addTo(map);
    });
  });
  markers[key] = marker;
});
geoQuery.on("key_exited", function(key, location, distance){
  if (markers.hasOwnProperty(key)) {
    markers[key].remove();
    delete markers[key];
  }
});


map.on('click', e => {
  const key = `${userid}@${Date.now()}`;
  geoFire.set(key, [e.latlng.lat, e.latlng.lng])
    .then(result => {
      console.log(`set succeeded : ${key}`);
    })
    .catch(error => {
      console.log(`Couldn't set ${key} : ${error}`);
    });
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
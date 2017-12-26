"use strict";

function init() {
    let marker;
    const mapOptions = {
        center: {lat: 35.686043, lng: 139.750684},
        zoom: 10
    }

    const map = new google.maps.Map(
        document.getElementById("map-canvas"), mapOptions
    );

    google.maps.event.addListener(
        map, 'click',
        (event) => {
            if (!marker) {
                marker = new google.maps.Marker({
                    position: event.latLng,
                    map: map
                });
            }
            else {
                marker.setPosition(event.latLng);
            }
        }
    )
}
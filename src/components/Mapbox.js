import mapboxgl from "mapbox-gl"
import { useEffect } from "react";
import axios from "axios";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidG9ia3JhdXNzIiwiYSI6ImNsZXdrdW5jYzBmdG8zdmtjNzE3MmlmemMifQ.DS6DX6bmuHXqFRqJOW-f7A"

function Mapbox({treasure}) {

    function initializeMap() {
        const map = createMap();
        addMarkers(map);
      }

    function createMap() {
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
        let map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/outdoors-v12",
          center: [13.466976165771484, 52.519065856933594],
          zoom: 11,
          projection: "globe"
        });
      
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, "top-left");
      
        new mapboxgl.Marker({
          color: "red",
          draggable: true
        })
          .setLngLat([13.466976165771484, 52.519065856933594])
          .addTo(map);
      
        return map;
      }

    function addMarkers(map) {
        treasure.forEach(treasureItem => {
            const address = `${treasureItem.street}, ${treasureItem.zipcode} ${treasureItem.city}`;
            const mapboxApiEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
            axios.get(mapboxApiEndpoint)
                .then(response => {
                    const features = response.data.features;
                    if (features.length > 0) {
                        const coordinates = features[0].center;
                        treasureItem.coordinates = coordinates;
                        console.log(coordinates)

                        new mapboxgl.Marker({
                            color: "red",
                            draggable: true
                        })
                        .setLngLat([treasureItem.coordinates[0], treasureItem.coordinates[1]])
                        .addTo(map);
                    }
                });
        });
    }

useEffect(() => {
    initializeMap();
}, [])


return (

    <div id="map" style={{ width: "70vw", height: "80vh" }}>
    </div>

);

}

export default Mapbox;
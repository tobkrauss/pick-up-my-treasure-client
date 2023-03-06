import mapboxgl from "mapbox-gl"
import { useEffect } from "react";


function Mapbox2({ longitude, latitude }) {

    function initializeMap() {
        const map = createMap();
    }

    function createMap() {
        mapboxgl.accessToken = "pk.eyJ1IjoidG9ia3JhdXNzIiwiYSI6ImNsZXdrdW5jYzBmdG8zdmtjNzE3MmlmemMifQ.DS6DX6bmuHXqFRqJOW-f7A"
        let map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/outdoors-v12",
            center: [longitude, latitude],
            zoom: 14,
            projection: "globe"
        })

        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav, "top-left")

        new mapboxgl.Marker({
            color: "red",
            draggable: true
        })
        .setLngLat([longitude, latitude])
        .addTo(map)

        return Map;
    }




useEffect(() => {
    initializeMap()
}, [])


return (

    <div id="map" style={{ width: "450px", height: "450px" }}>
    </div>

);

}

export default Mapbox2;
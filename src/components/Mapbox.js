import mapboxgl from "mapbox-gl"
import { useEffect } from "react";



function Mapbox() {

    function initializeMap() {
        const map = createMap();
    }

    function createMap() {
        mapboxgl.accessToken = "pk.eyJ1IjoidG9ia3JhdXNzIiwiYSI6ImNsZXdrdW5jYzBmdG8zdmtjNzE3MmlmemMifQ.DS6DX6bmuHXqFRqJOW-f7A"
        let map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/outdoors-v12",
            center: [13.466976165771484, 52.519065856933594],
            zoom: 11,
            projection: "globe"
        })

        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav, "top-left")

        new mapboxgl.Marker({
            color: "red",
            draggable: false
        })
        .setLngLat([13.466976165771484, 52.519065856933594])
        .addTo(map)
    

        return map;
    }



useEffect(() => {
    initializeMap()
}, [])


return (

    <div id="map" style={{ width: "70vw", height: "80vh" }}>
    </div>

);

}

export default Mapbox;
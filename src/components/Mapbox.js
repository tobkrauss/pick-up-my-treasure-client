import mapboxgl from "mapbox-gl"
import { useEffect } from "react";



function Mapbox() {

    function createMap() {
        mapboxgl.accessToken = "pk.eyJ1IjoidG9ia3JhdXNzIiwiYSI6ImNsZXdrdW5jYzBmdG8zdmtjNzE3MmlmemMifQ.DS6DX6bmuHXqFRqJOW-f7A"
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v12",
            center: [13.466976165771484, 52.519065856933594],
            zoom: 11,
            projection: "globe"
        })

        const nav = new mapboxgl.NavigationControl()
map.addControl(nav, "top-left")

    

new mapboxgl.Marker({
    color: "red",
    draggable: true
})
.setLngLat([13.75,52.9])
.addTo(map)
.on("dragend", event => console.log(event.target._lngLat))

function addMarker(event){
    new mapboxgl.Marker({
        color: "blue"
    })
    .setLngLat(event._lngLat)
    .addTo(map)


map.on("click", addMarker)

}
    }


    

    useEffect(() => {
        createMap()
    }, [])


    return (

        <div id="map" style={{width: "70vw", height: "80vh"}}>
        </div>

    );

}

export default Mapbox;
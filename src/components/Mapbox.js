import mapboxgl from "mapbox-gl"
import { useEffect } from "react";
import axios from "axios";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidG9ia3JhdXNzIiwiYSI6ImNsZXdrdW5jYzBmdG8zdmtjNzE3MmlmemMifQ.DS6DX6bmuHXqFRqJOW-f7A"

function Mapbox({ treasure }) {


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

    addMarkers(map, treasure);

    return map;
  }

  function addMarkers(map, treasure) {
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

            const popup = new mapboxgl.Popup().setHTML(`
      <h3>${treasureItem.title}</h3>
      <img class="popup-image" src=${treasureItem.imageUrl} alt="image" />
      <div> 
      <a href="/treasure/${treasureItem._id}">View treasure</a>
      </div>
    `);

            new mapboxgl.Marker({
              color: "red",
              draggable: false
            })
              .setLngLat([treasureItem.coordinates[0], treasureItem.coordinates[1]])
              .setPopup(popup)
              .addTo(map);
          }
        });
    });
  }

  useEffect(() => {
    createMap();
  }, [])


  return (

    <div id="map" style={{ width: "70vw", height: "80vh" }}>
    </div>

  );

}

export default Mapbox;
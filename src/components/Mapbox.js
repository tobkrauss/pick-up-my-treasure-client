import React from "react";
import mapboxgl from "mapbox-gl"
import { useEffect, useState } from "react";
import axios from "axios";


const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidG9ia3JhdXNzIiwiYSI6ImNsZXdrdW5jYzBmdG8zdmtjNzE3MmlmemMifQ.DS6DX6bmuHXqFRqJOW-f7A"
const API_URL = process.env.REACT_APP_API_URL

function Mapbox(props) {
  const [treasure, setTreasure] = useState([]);
  const [filteredTreasure, setFilteredTreasure] = useState([])
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    const map = createMap();
    addMarkers(filteredTreasure, map);
    setMapLoaded(true);
    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/treasure`)
      .then((response) => {
        const data = response.data;
        setTreasure(data);
        setFilteredTreasure(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (mapLoaded && treasure.length > 0) {
      let filteredMarker;
      if (props.query === "") {
        filteredMarker = filteredTreasure;
      } else {
        filteredMarker = filteredTreasure.filter((treasure) => {
          return treasure.title.toLowerCase().includes(props.query.toLowerCase());
        });
      }
      const map = createMap();
      addMarkers(filteredMarker, map);
    }
  }, [mapLoaded, treasure, props.query]);

  function createMap() {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    let map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [13.408510208129883, 52.52079391479492],
      zoom: 12,
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-left");

    return map;
  }

  function addMarkers(treasure, map) {
    treasure.forEach(treasureItem => {
      const address = `${treasureItem.street}, ${treasureItem.zipcode} ${treasureItem.city}`;
      const mapboxApiEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
      axios.get(mapboxApiEndpoint)
        .then(response => {
          const features = response.data.features;
          if (features.length > 0) {
            const coordinates = features[0].center;
            treasureItem.coordinates = coordinates;

            const popup = new mapboxgl.Popup()
              .setHTML(`
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


  return (

    <div id="map" style={{ width: "80vw", height: "80vh" }}>
    </div>

  );

}

export default Mapbox;
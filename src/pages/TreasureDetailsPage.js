import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import AddItem from "../components/AddItem";
import editIcon from "../images/edit.png"
import Mapbox2 from "../components/Mapbox2";

const API_URL = "http://localhost:5005"
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidG9ia3JhdXNzIiwiYSI6ImNsZXdrdW5jYzBmdG8zdmtjNzE3MmlmemMifQ.DS6DX6bmuHXqFRqJOW-f7A"

function TreasureDetailsPage() {
    const [treasure, setTreasure] = useState(null)
    const { treasureId } = useParams()
    const [showForm, setShowForm] = useState(true)



    const toggleShowForm = () => {
        setShowForm(!showForm)
    }


    const getTreasure = () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/treasure/${treasureId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => {
                const oneTreasure = response.data
                const address = `${oneTreasure.street}, ${oneTreasure.zipcode} ${oneTreasure.city}`;
                const mapboxApiEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
                axios.get(mapboxApiEndpoint)
                    .then(response => {
                        /* console.log(response.data.features[0].center) */
                        const features = response.data.features;
                        if (features.length > 0) {
                            const coordinates = features[0].center;
                            oneTreasure.coordinates = coordinates;
                            console.log(coordinates[0])
                            console.log(coordinates[1])
                            setTreasure(oneTreasure);
            
                        }
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getTreasure()
    },)


    return (
        <div>
            <div>
                <div className="treasure-details-container">
                    <div className="mapbox">
                        {treasure !== null &&
                        < Mapbox2 longitude={treasure?.coordinates[0]} latitude={treasure?.coordinates[1]} />}
                    </div>
                    <div className="treasure-details">
                        {treasure && (
                            <>
                                <div className="details-icon">
                                    <div className="img-edit">
                                        <Link to={`/treasure/edit/${treasureId}`}>
                                            <img src={editIcon} alt="trash" style={{ height: 25, marginRight: 5, hover: "red" }} />
                                        </Link>
                                    </div>

                                </div>
                                <div className="card">
                                    <img src={treasure.imageUrl} alt="treasure" style={{ width: 400, borderRadius: 5 }} />
                                    <div className="card-title">{treasure.title}</div>
                                    <div className="card-description">{treasure.description}</div>
                                    {/* <p>{treasure.owner}</p> */}
                                    <div className="card-address">📌 {treasure.street}, {treasure.zipcode} {treasure.city}</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="item-row">
                    {treasure && treasure.items.map(item => {
                        return (
                            <ItemCard key={item._id} {...item} getTreasure={getTreasure} />
                        )
                    })}

                    {showForm && <AddItem refreshTreasure={getTreasure} treasureId={treasureId} />}
                    <button className="add-item-button" onClick={toggleShowForm} >{showForm ? '-' : '+'}</button>
                </div>
            </div>
        </div>
    );
}

export default TreasureDetailsPage;
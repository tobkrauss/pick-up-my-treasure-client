import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import AddItem from "../components/AddItem";
import editIcon from "../images/edit.png"
import Mapbox2 from "../components/Mapbox2";

const API_URL = process.env.REACT_APP_API_URL
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidG9ia3JhdXNzIiwiYSI6ImNsZXdrdW5jYzBmdG8zdmtjNzE3MmlmemMifQ.DS6DX6bmuHXqFRqJOW-f7A"

function TreasureDetailsPage() {
    const [treasure, setTreasure] = useState(null)
    const { treasureId } = useParams()
    const [showForm, setShowForm] = useState(true)
    const [currentUser, setCurrentUser] = useState(null)

    const storedToken = localStorage.getItem('authToken');

    const toggleShowForm = () => {
        setShowForm(!showForm)
    }
    useEffect(() => {
    axios.get(`${API_URL}/auth/verify`,
        { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
            setCurrentUser(response.data);
        })
        .catch(err => console.log(err));
    },[]);

    const getTreasure = () => {
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
    },[])


    return (
        <div>
            <div>
                <div className="treasure-details-header">
                    <h1>Pick up my treasure here:</h1>
                <div className="treasure-details-container">
                    <div className="mapbox">
                        {treasure !== null &&
                            < Mapbox2 longitude={treasure?.coordinates[0]} latitude={treasure?.coordinates[1]} />}
                    </div>
                    <div className="treasure-details">
                        <>
                            <div className="details-icon">
                                {currentUser && treasure && currentUser._id === treasure.user &&
                                    <>
                                        <div className="img-edit">
                                            <Link to={`/treasure/edit/${treasureId}`}>
                                                <img src={editIcon} alt="edit" style={{ height: 25, marginRight: 5 }} />
                                            </Link>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="card">
                                <img src={treasure?.imageUrl} alt="treasure" style={{ width: "26vw", borderRadius: 5 }} />
                                <div className="card-title">{treasure?.title}</div>
                                <div className="card-description">{treasure?.description}</div>
                                {/* <p>{treasure.owner}</p> */}
                                <div className="card-address">📌 {treasure?.street}, {treasure?.zipcode} {treasure?.city}</div>
                            </div>
                        </>
                    </div>
                </div>
                <div className="item-row">
                    {treasure && treasure.items.map(item => {
                        return (
                            <ItemCard key={item._id} {...item} getTreasure={getTreasure} />
                        )
                    })}

                    {currentUser && treasure && currentUser._id === treasure.user && showForm && <AddItem refreshTreasure={getTreasure} treasureId={treasureId} />}
                    {currentUser && treasure && currentUser._id === treasure.user && <button className="add-item-button" onClick={toggleShowForm} >{showForm ? '-' : '+'}</button>}
                </div>
            </div>
            <footer className="footer">
                <div className="footer-copyright">
                    Copyright © 2023 Tobias Krauß. All rights reserved
                </div>
                <div className="footer-impressum">
                    <div>
                    Data Privacy
                    </div>
                    <div>
                        Imprint
                    </div>
                </div>
            </footer>
        </div>
        </div>
    );
}

export default TreasureDetailsPage;
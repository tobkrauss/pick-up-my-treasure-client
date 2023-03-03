import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import AddItem from "../components/AddItem";
import trashIcon from "../images/trash.png"
import editIcon from "../images/edit.png"

const API_URL = "http://localhost:5005"


function TreasureDetailsPage() {
    const [treasure, setTreasure] = useState(null)
    const { treasureId } = useParams()
    const [showForm, setShowForm] = useState(true)


    const toggleShowForm = () => {
        setShowForm(!showForm)
    }

    const getTreasure = () => {
        const storedToken = localStorage.getItem('authToken');
        console.log(storedToken)
        axios
            .get(`${API_URL}/api/treasure/${treasureId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => {
                const oneTreasure = response.data
                setTreasure(oneTreasure)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTreasure()
    }, [])


    return (
        <div>
            <div>
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
                            <div className="treasure-card">
                                <img src={treasure.imageUrl} alt="treasure" style={{ width: 400, borderRadius: 5 }} />
                                <div className="card-headline">{treasure.title}</div>
                                <div className="card-description">{treasure.description}</div>
                                {/* <p>{treasure.owner}</p> */}
                                <div className="card-address">{treasure.street}, {treasure.zipcode} {treasure.city}</div>
                            </div>
                        </>
                    )}
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
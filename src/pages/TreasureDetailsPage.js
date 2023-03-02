import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import AddItem from "../components/AddItem";

const API_URL = "http://localhost:5005"


function TreasureDetailsPage() {
    const [treasure, setTreasure] = useState(null)
    const { treasureId } = useParams()
    const [showForm, setShowForm] = useState(false)


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
        <div className="ProjectDetails">
            {treasure && (
                <>
                    <img src={treasure.imageUrl} alt="treasure" style={{ width: 400 }} />
                    <h1>{treasure.title}</h1>
                    <p>{treasure.description}</p>
                    <p>{treasure.owner}</p>
                    <p>{treasure.street}</p>
                    <p>{treasure.zipcode}</p>
                    <p>{treasure.city}</p>
                </>
            )}

            {treasure && treasure.items.map(item => {
                return (
                    <ItemCard key={item._id} {...item} getTreasure={getTreasure} />
                )
            })}

            {showForm && <AddItem refreshTreasure={getTreasure} treasureId={treasureId} />}
            <button onClick={toggleShowForm} >{showForm ? 'Hide Form' : 'Add New Item'}</button>

            <Link to="/treasure">
                <button>Back to all Treasure</button>
            </Link>
            <Link to={`/treasure/edit/${treasureId}`}>
                <button>Edit Treasure</button>
            </Link>
        </div>
    );
}

export default TreasureDetailsPage;
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
        <div className="treasure-details">
            <div class="overlay"></div>
            {treasure && (
                <>
                <div className="details-icon">
                    <div className="img-edit">
                <Link to={`/treasure/edit/${treasureId}`}>
                  <img src={editIcon} alt="trash" style={{ height: 25, marginRight: 5, hover: "red" }}  />
                  </Link>
                  </div>
                  <div className="img-delete">
                  <Link to="/treasure">
                  <img src={trashIcon} alt="trash" style={{ height: 22, marginLeft: 3 }} />
                  </Link>
                  </div>
                  </div>
                  <div className="details-details">
                    <img src={treasure.imageUrl} alt="treasure" style={{ width: 400, borderRadius: 5 }} />
                    <h1>{treasure.title}</h1>
                    <p>{treasure.description}</p>
                    <p>{treasure.owner}</p>
                    <p>{treasure.street}, {treasure.zipcode} {treasure.city}</p>
                    </div>
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
        </div>
    );
}

export default TreasureDetailsPage;
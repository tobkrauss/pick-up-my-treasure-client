import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import trashIcon from "../images/trash.png"
import editIcon from "../images/edit.png"
import { useEffect, useState } from "react";


const API_URL = process.env.REACT_APP_API_URL

function ItemCard({ getTreasure, title, description, category, imageUrl, condition, treasure, user, _id }) {
    const [currentUser, setCurrentUser] = useState(null)

    const navigate = useNavigate()

    const storedToken = localStorage.getItem('authToken');


    useEffect(() => {
        axios.get(`${API_URL}/auth/verify`,
            { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setCurrentUser(response.data);
            })
            .catch(err => console.log(err));
        },[]);


    const handleDeleteProject = (e) => {
        axios
            .delete(`${API_URL}/api/items/${_id}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => {
                getTreasure()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="item-card">
            <div className="item-icon">
            {currentUser && treasure && currentUser._id === user &&
            <>
                            <div className="item-edit">
                                <Link to={`/items/edit/${_id}`}>
                                    <img src={editIcon} alt="trash" style={{ height: 20, marginRight: 5 }} />
                                </Link>
                            </div>
                            <div className="img-delete">
                                <Link>
                                    <img src={trashIcon} alt="trash" style={{ height: 17, marginLeft: 3}} onClick={handleDeleteProject} />
                                </Link>
                            </div>
                            </>
}
                        </div>
            <img src={imageUrl} alt="item" style={{ height: 150 }} />
            <h2>{title}</h2>
            <h4>Description</h4>
            <p>{description}</p>
            <p>{category}</p>
            <p>{condition}</p>
        </div>
    );
}

export default ItemCard;
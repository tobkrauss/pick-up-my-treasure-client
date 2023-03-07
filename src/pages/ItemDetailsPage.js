import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL

function ItemDetailsPage() {
    const [item, setItem] = useState(null)
    const { itemId } = useParams()

    const getItem = () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/items/${itemId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => {
                const oneItem = response.data
                setItem(oneItem)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getItem()
    }, [])


    if (item) {
        return (
            <div className="treasure-details">
                {item && (
                    <>
                        <img src={item.imageUrl} alt="item" style={{ width: 200 }} />
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <p>{item.category}</p>
                        <p>{item.condition}</p>
                    </>
                )}

                <div className="two-buttons">
                <Link to={`/items/edit/${itemId}`}>
                        <button className="again-button">Edit Item again</button>
                    </Link>
                    <Link to={`/treasure/${item.treasure}`}>
                        <button className="form-button">Back to Treasure</button>
                    </Link>
                    
                </div>
            </div>
        )
    };
}

export default ItemDetailsPage;
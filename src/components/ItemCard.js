import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";


const API_URL = "http://localhost:5005"

function ItemCard({getTreasure, title, description, category, imageUrl, condition, treasure, _id}) {
  
    const navigate = useNavigate()
    
    const storedToken = localStorage.getItem('authToken');

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
        <div>
        <li className="TaskCard card">
            <img src={imageUrl} alt="item" style={{width: 200}} />
            <h3>{title}</h3>
        <h4>Description</h4>
        <p>{description}</p>
        <p>{category}</p>
        <p>{condition}</p>
  
    <Link to={`/items/edit/${_id}`}>
    <button>Edit Item</button>
</Link>

<button onClick={handleDeleteProject}>Delete Item</button>
</li>
</div>
     );
}

export default ItemCard;
import { Link, useParams } from "react-router-dom";

function ItemCard({title, description, category, imageUrl, condition, _id}) {
    const { itemId } = useParams()
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
</li>
</div>
     );
}

export default ItemCard;
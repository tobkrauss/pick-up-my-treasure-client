import { Link, useParams } from "react-router-dom";

function ItemCard({title, description, category, condition}) {
    const { itemId } = useParams()
    return ( 
        <div>
        <li className="TaskCard card">
        <h3>{title}</h3>
        <h4>Description</h4>
        <p>{description}</p>
        <p>{category}</p>
        <p>{condition}</p>
  
    <Link to={`/item/edit/${itemId}`}>
    <button>Edit Item</button>
</Link>
</li>
</div>
     );
}

export default ItemCard;
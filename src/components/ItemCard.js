function ItemCard({title, description, category, condition}) {
    return ( 
        <li className="TaskCard card">
        <h3>{title}</h3>
        <h4>Description</h4>
        <p>{description}</p>
        <p>{category}</p>
        <p>{condition}</p>

    </li>
     );
}

export default ItemCard;
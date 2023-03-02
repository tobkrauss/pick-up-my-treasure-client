import { Link } from "react-router-dom";


function TreasureCard({ title, description, imageUrl, street, zipcode, city, _id }) {
    return (
        <div className="card" key={_id}>
          <img src={imageUrl} alt="item" style={{height: 200}} />
            <h2>{title}</h2>
          <p style={{maxWidth: "400px"}}>{description}</p>
          <p> 📌 {street}, {zipcode} {city}</p>
          <Link to={`/treasure/${_id}`}><p>Show more...</p></Link>
        </div>
      )
}

export default TreasureCard;
import { Link } from "react-router-dom";


function TreasureCard({ title, description, imageUrl, street, zipcode, city, _id }) {
    return (
        <div className="card" key={_id}>
          <div className="card-title">{title}</div>
          <div className="card-description">{description}</div>
          <img src={imageUrl} alt="item" style={{height: 200}} />
          <div className="card-address"> 📌 {street}, {zipcode} {city} </div>
          <Link to={`/treasure/${_id}`}><button className="form-button" type="submit">Show more...</button></Link>
        </div>
      )
}

export default TreasureCard;
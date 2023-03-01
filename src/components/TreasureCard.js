import { Link } from "react-router-dom";


function TreasureCard({ title, description, _id }) {
    return (
        <div className="ProjectCard card" key={_id}>
          <Link to={`/treasure/${_id}`}>
            <h3>{title}</h3>
          </Link>
          <p style={{maxWidth: "400px"}}>{description}</p>
        </div>
      )
}

export default TreasureCard;
import axios from "axios"
import { useState, useEffect } from "react";
import TreasureCard from "../components/TreasureCard";
import SearchTreasure from "../components/SearchTreasure";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL

function TreasureListPage({ treasure, setTreasure }) {
  const [treasureData, setTreasureData] = useState([])

  const getAllTreasure = () => {
    const storedToken = localStorage.getItem('authToken');

    axios
      .get(`${API_URL}/api/treasure`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const data = response.data;
        setTreasure(data);
        setTreasureData(data);
      })
      .catch(err => console.log(err))
  }

  const filterTreasure = (str) => {
    let filteredTreasure;

    if (str === "") {
      filteredTreasure = treasureData;
    } else {
      filteredTreasure = treasureData.filter((treasure) => {
        return treasure.title.toLowerCase().includes(str.toLowerCase());
      });
      console.log(filteredTreasure.length);
    }

    setTreasure(filteredTreasure);
  };


  useEffect(() => {
    getAllTreasure()
  }, [])


  return (
    <div className="overview">
      <div className="search-bar">
        <SearchTreasure filterTreasure={filterTreasure} />
      
      <div className="add-treasure-btn">
      <Link to="/new-treasure">
            Add Treasure
          </Link>
      </div>
      </div>

      {treasure.map(treasure => {
        return (
          <TreasureCard key={treasure._id} {...treasure} />
        )
      })}
      <footer className="footer">
                <div className="footer-copyright">
                    Copyright © 2023 All rights reserved
                </div>
                <div className="footer-impressum">
                    <div>
                    Data Privacy
                    </div>
                    <div>
                        Imprint
                    </div>
                </div>
            </footer>
    </div>
  );
}

export default TreasureListPage;
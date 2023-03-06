import axios from "axios"
import { useState, useEffect } from "react";
import TreasureCard from "../components/TreasureCard";
import SearchTreasure from "../components/SearchTreasure";
import Mapbox from "../components/Mapbox";

const API_URL = process.env.REACT_APP_API_URL

function TreasureListPage({treasure, setTreasure}) {
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
            </div>

            {treasure.map(treasure => {
                return (
                    <TreasureCard key={treasure._id} {...treasure} />
                )
            })}
        </div>
    );
}

export default TreasureListPage;
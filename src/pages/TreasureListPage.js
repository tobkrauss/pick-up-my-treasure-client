import axios from "axios"
import { useState, useEffect } from "react";
import TreasureCard from "../components/TreasureCard";

const API_URL = "http://localhost:5005"

function TreasureListPage() {
    const [treasure, setTreasure] = useState([])

    const getAllTreasure = () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/treasure`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => setTreasure(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllTreasure()
    }, [])

    
    return ( 
        <div className="overview">

        {treasure.map(treasure => {
            return (
                <TreasureCard key={treasure._id} {...treasure} />
            )
        })}
    </div>
);
}

export default TreasureListPage;
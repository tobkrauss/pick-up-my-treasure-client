import Mapbox from "../components/Mapbox";
import SearchMarkers from "../components/SearchMarkers";
import axios from "axios";
import { useState } from "react";


function HomePage() {
    const [query, setQuery] = useState("")

    
    return (
        <div className="home-page">
        <div className="search-bar">
            <SearchMarkers query={query} setQuery={setQuery} />
            </div>
        <div>
            <Mapbox query={query} />
        </div>
        </div>
    );
}

export default HomePage;
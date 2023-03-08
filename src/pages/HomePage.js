import Mapbox from "../components/Mapbox";
import SearchMarkers from "../components/SearchMarkers";
import { useState } from "react";
import ArrowImage from "../images/arrow-down.png"
import Furnitures from "../images/furniture-collection.png"
import { Link } from "react-scroll";


function HomePage() {
    const [query, setQuery] = useState("")


    return (
        <div className="home-page">
            <div className="pick-my-treasure-logo">Pick up My Treasure</div>
            <div className="info-screen">
                <div className="home-text">
                    The easiest solution to find and collect abandoned items on Berlin's sidewalks.
                </div>
                <div className="furniture-img">
                <img src={Furnitures} style={{ width: "50vw" }} alt="" />
                </div>
                <div className="arrow-img">
                    <Link
                        to="map-screen"
                        smooth={true}
                        duration={700}
                        offset={-30}
                        spy={true}
                        exact="true"
                        className="scroll-link"
                    >
                        <img src={ArrowImage} style={{ width: "400px" }} alt="" />
                    </Link>
                </div>
            </div>
            <div id="map-screen">
                <div className="search-bar">
                    <SearchMarkers query={query} setQuery={setQuery} />
                </div>
                <div className="home-mapbox">
                    <Mapbox query={query} />
                </div>
            </div>
            <footer className="footer">
                <div className="footer-copyright">
                    Copyright © 2023 Tobias Krauß. All rights reserved
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

export default HomePage;
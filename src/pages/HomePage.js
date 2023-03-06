import Mapbox from "../components/Mapbox";


function HomePage({treasure}) {
    return (
        <div>
            <h1>Home</h1>
            <Mapbox treasure={treasure} />
        </div>
    );
}

export default HomePage;
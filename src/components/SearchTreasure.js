import { useState } from "react";

function SearchTreasure(props) {
    
    const [query, setQuery] = useState("")

    const handleSelect = (e) => {
        e.preventDefault();
        setQuery(e.target.value)
        props.filterTreasure(e.target.value)
      }
    
    return ( 
        <div>
        <div className="seach-container">
        <form className="search-form">
        <div className="search-label">
            <label htmlFor="name"></label>
            <input type="text" name="name" value={query} placeholder="Type here to search for treasure..." onChange={(e) => handleSelect(e)}/>
            </div>
            <button className="form-button">Search</button>
        </form>
        
        </div>
    </div> 
     );
}

export default SearchTreasure;
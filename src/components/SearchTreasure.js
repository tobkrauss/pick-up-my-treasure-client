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
            <input type="text" name="name" value={query} placeholder="Start typing to search..." onChange={(e) => handleSelect(e)}/>
            </div>
        </form>
        
        </div>
    </div> 
     );
}

export default SearchTreasure;
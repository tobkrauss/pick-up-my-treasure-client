function SearchMarkers(props) {

    const handleSelect = (e) => {
        e.preventDefault();
        props.setQuery(e.target.value);
      };
      
  
    return (
        <div>
        <div className="seach-container">
        <form className="search-form">
        <div className="search-label">
            <label htmlFor="name"></label>
            <input type="text" name="name" value={props.query} placeholder="Type here to search for treasure..." onChange={(e) => handleSelect(e)}/>
            </div>
        </form>
    
        </div>
    </div>
    );
  }

export default SearchMarkers;
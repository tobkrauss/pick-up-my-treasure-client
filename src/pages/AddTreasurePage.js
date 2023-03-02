import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005"

function AddTreasurePage() {
    const [owner, setOwner] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [street, setStreet] = useState("")
    const [zipcode, setZipcode] = useState(10115)
    const [city, setCity] = useState("")

    const navigate = useNavigate()

    const handleOwnerChange = (e) => setOwner(e.target.value)
    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleDescriptionChange = (e) => setDescription(e.target.value)
    const handleStreetChange = (e) => setStreet(e.target.value)
    const handleZipcodeChange = (e) => setZipcode(e.target.value)
    const handleCityChange = (e) => setCity(e.target.value)

    const storedToken = localStorage.getItem('authToken');

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
     
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new Treasure in '/api/treasure' POST route
        uploadData.append("imageUrl", e.target.files[0]);
     
        axios.post("http://localhost:5005/api/upload", uploadData,
        { headers: { Authorization: `Bearer ${storedToken}` } }
            )
          .then(response => {
            // response carries "fileUrl" which we can use to update the state
            setImageUrl(response.data.imageUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

    const handleSubmmit = (e) => {
        e.preventDefault()


        const requestBody = { owner, title, description, imageUrl, street, zipcode, city }

        

        axios
            .post(`${API_URL}/api/new-treasure`, requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => {
                setOwner("")
                setTitle("")
                setDescription("")
                setImageUrl("")
                setStreet("")
                setZipcode(10115)
                setCity("")
                
                navigate("/treasure")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="AddProject">
            <h3>Add Treasure</h3>

            <form onSubmit={handleSubmmit}>
                <label htmlFor="owner">Owner</label>
                <input type="text" name="owner" value={owner} onChange={handleOwnerChange} />

                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} onChange={handleTitleChange} />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={description} onChange={handleDescriptionChange} />

                <label htmlFor="image">Image</label>
                <input type="file" onChange={(e) => handleFileUpload(e)} />

                <label htmlFor="street">Street</label>
                <input type="text" name="street" value={street} onChange={handleStreetChange} />

                <label htmlFor="zipcode">Zipcode</label>
                <input type="number" name="zipcode" value={zipcode} onChange={handleZipcodeChange} />

                <label htmlFor="city">City</label>
                <input type="text" name="city" value={city} onChange={handleCityChange} />

                <button type="submit">Submit</button>
            </form>

        </div>
    );
}

export default AddTreasurePage;
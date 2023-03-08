import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL

function EditTreasurePage() {
  const [allowSubmit, setAllowSubmit] = useState(false)
  
  const [owner, setOwner] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [street, setStreet] = useState("")
  const [zipcode, setZipcode] = useState(10115)
  const [city, setCity] = useState("")


  const { treasureId } = useParams()
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

    uploadData.append("imageUrl", e.target.files[0]);

    axios.post("http://localhost:5005/api/upload", uploadData,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then(response => {
        setImageUrl(response.data.imageUrl)
        setAllowSubmit(true);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/treasure/${treasureId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(response => {
        const oneTreasure = response.data
        setOwner(oneTreasure.owner)
        setTitle(oneTreasure.title)
        setDescription(oneTreasure.description)
        setImageUrl(oneTreasure.imageUrl)
        setStreet(oneTreasure.street)
        setZipcode(oneTreasure.zipcode)
        setCity(oneTreasure.city)
      })
      .catch(err => console.log(err))
  }, [treasureId])

  const handleSubmit = (e) => {
    e.preventDefault()
    const requestBody = { owner, title, description, imageUrl, street, zipcode, city }

    axios
      .put(`${API_URL}/api/treasure/${treasureId}`, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(response => {
        navigate(`/treasure/${treasureId}`)
      })
  }

  const handleDeleteProject = (e) => {
    axios
      .delete(`${API_URL}/api/treasure/${treasureId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(response => {
        navigate('/treasure');
      })
      .catch(err => console.log(err))
  }



  return (
    <div>
      <h3>Edit Treasure</h3>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="owner">Owner</label>
          <input type="text" name="owner" value={owner} onChange={handleOwnerChange} />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={title} onChange={handleTitleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" name="description" value={description} onChange={handleDescriptionChange} />
        </div>

        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input type="text" name="street" value={street} onChange={handleStreetChange} />
        </div>

        <div className="form-group">
          <label htmlFor="zipcode">Zipcode</label>
          <input type="number" name="zipcode" value={zipcode} onChange={handleZipcodeChange} />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" name="city" value={city} onChange={handleCityChange} />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </div>

        {allowSubmit ? <button className="form-button" type="submit">Save changes</button> : <button className="form-button-edited-disabled">Save changes</button>}
        
      </form>
      <button className="delete-button" onClick={handleDeleteProject}>Delete Treasure</button>
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

export default EditTreasurePage;
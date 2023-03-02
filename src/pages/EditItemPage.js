import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const API_URL = "http://localhost:5005"


function EditItemPage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [condition, setCondition] = useState("")

    const { itemId } = useParams()
    const navigate = useNavigate()

    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleDescriptionChange = (e) => setDescription(e.target.value)
    const handleCategoryChange = (e) => setCategory(e.target.value)
    const handleConditionChange = (e) => setCondition(e.target.value)

    const storedToken = localStorage.getItem('authToken');

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
    
        uploadData.append("imageUrl", e.target.files[0]);
     
        axios.post("http://localhost:5005/api/upload", uploadData,
        { headers: { Authorization: `Bearer ${storedToken}` } }
            )
          .then(response => {
            setImageUrl(response.data.imageUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };


    useEffect(() => {
        axios
          .get(`${API_URL}/api/items/${itemId}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
      )
          .then(response => {
            const oneItem = response.data
            setTitle(oneItem.title)
                setDescription(oneItem.description)
                setCategory(oneItem.category)
                setImageUrl(oneItem.imageUrl)
                setCondition(oneItem.condition)
          })
          .catch(err => console.log(err))
      }, [itemId])
    
      const handleSubmit = (e) => {
        e.preventDefault()
        const requestBody = { title, description, category, imageUrl, condition }
    
        axios
          .put(`${API_URL}/api/items/${itemId}`, requestBody,
          { headers: { Authorization: `Bearer ${storedToken}` } }
      )
          .then(response => {
            navigate(`/items/${itemId}`)
          })
      }
    
      const handleDeleteProject = (e) => {
        axios
        .delete(`${API_URL}/api/items/${itemId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
        .then(response => {
            navigate("/treasure")
        })
        .catch(err => console.log(err))
      }
      

    return ( 
        <div className="EditProjectPage">
        <h3>Edit Item</h3>
  
        <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} onChange={handleTitleChange} />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={description} onChange={handleDescriptionChange} />

                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} onChange={handleCategoryChange} />

                <label htmlFor="imageUrl">Image</label>
                <input type="file" onChange={(e) => handleFileUpload(e)} />

                <label htmlFor="condition">Condition</label>
                <input type="text" name="condition" value={condition} onChange={handleConditionChange} />

                <button type="submit">Submit</button>
            </form>

            <button onClick={handleDeleteProject}>Delete Item</button>
        </div>
     );
}

export default EditItemPage;
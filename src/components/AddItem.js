import axios from "axios"
import { useState } from "react"

const API_URL = "http://localhost:5005"

function AddItem(props) {
    const [allowSubmit, setAllowSubmit] = useState(false)
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [condition, setCondition] = useState("")

    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleDescriptionChange = (e) => setDescription(e.target.value)
    const handleCategoryChange = (e) => setCategory(e.target.value)
    const handleConditionChange = (e) => setCondition(e.target.value)

    const storedToken = localStorage.getItem('authToken');

    const handleFileUpload = (e) => {
        const uploadData = new FormData();

        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new Item in '/api/items' POST route
        uploadData.append("imageUrl", e.target.files[0]);

        axios.post("http://localhost:5005/api/upload", uploadData,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {
                // response carries "fileUrl" which we can use to update the state
                setImageUrl(response.data.imageUrl)
                setAllowSubmit(true);
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const { treasureId } = props

        const requestBody = { title, description, category, imageUrl, condition, treasureId }

        axios
            .post(`${API_URL}/api/items`, requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => {
                setTitle("")
                setDescription("")
                setCategory("")
                setImageUrl("")
                setCondition("")
                setAllowSubmit(false)

                props.refreshTreasure()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="AddTask">
            <form className="item-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={handleTitleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" value={description} onChange={handleDescriptionChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" value={category} onChange={handleCategoryChange} />
                </div>
                
                <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <input type="text" name="condition" value={condition} onChange={handleConditionChange} />
                </div>
                <div className="form-group">
                <label htmlFor="imageUrl">Image</label>
                <input type="file" onChange={(e) => handleFileUpload(e)} />
                </div>
                {allowSubmit ? <button className="form-button" type="submit">Add Item</button> : <button className="form-button-disabled">Add Item</button>}
            </form>
        </div>
    );
}

export default AddItem;
import axios from "axios"
import { useState } from "react"

const API_URL = "http://localhost:5005"

function AddItem(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [condition, setCondition] = useState("")

    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleDescriptionChange = (e) => setDescription(e.target.value)
    const handleCategoryChange = (e) => setCategory(e.target.value)
    const handleImageUrlChange = (e) => setImageUrl(e.target.value)
    const handleConditionChange = (e) => setCondition(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()

        const { treasureId } = props

        const storedToken = localStorage.getItem('authToken');

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

                props.refreshTreasure()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="AddTask">
            <h3>Add new Item</h3>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={title} onChange={handleTitleChange} />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={description} onChange={handleDescriptionChange} />

                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} onChange={handleCategoryChange} />

                <label htmlFor="imageUrl">Image</label>
                <input type="text" name="image" value={imageUrl} onChange={handleImageUrlChange} />

                <label htmlFor="condition">Condition</label>
                <input type="text" name="condition" value={condition} onChange={handleConditionChange} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddItem;
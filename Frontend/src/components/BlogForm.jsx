import {useState} from 'react'
import PropTypes from 'prop-types';

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        createBlog({
            title, 
            author, 
            url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
     
}
    return (
        <div > 
            <h2> Create a new blog</h2>
            <form onSubmit = {addBlog}>
              <div> 
                <label> Title: </label>
                 <input type = 'text' value = {title} id = "title"
                     onChange = {(event) => setTitle(event.target.value)} placeholder = "title" />
               </div>
               <div> 
                <label> Author: </label>
                 <input type = 'text' value = {author} id = "author"
                     onChange = {(event) => setAuthor(event.target.value)} placeholder = "author" />
               </div>
               <div> 
                <label> Url: </label>
                 <input type = 'text' value = {url}  id = "url"
                     onChange = {(event) => setUrl(event.target.value)} placeholder = "url" />
               </div>
               <button id = "submit-button" type="submit">Done</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
  };


BlogForm.displayName = "BlogForm"
export default BlogForm
import {useState} from 'react'
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
    const [visible, setVisible] = useState(false)

    return (
    <div className = "blog" style = {blogStyle}>
      {blog.title} {blog.author} <button onClick = {() => setVisible(!visible)}> {visible ? 'hide': 'view'} </button> 
    {visible && 
     <div> 
      <p className = "title"> title: {blog.title}</p> 
      <p className = "author"> author: {blog.author}</p> 
      <p className="url"> url: {blog.url}</p>
      <p className = "likes"> likes: {blog.likes}</p> <button onClick = {() => updateBlog(blog.id, blog)}>Increase Likes </button> 
      {blog.user[0].username === user.username &&
        <button onClick = {() => deleteBlog(blog.id, blog)}> delete </button> 
    }    
    <p> added by user: {blog.user[0].name}</p> 
      </div> }
    
    </div>  
)}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

Blog.displayName = "Blog"
  
export default Blog
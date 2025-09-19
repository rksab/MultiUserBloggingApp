import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blog'
import LoginForm from './components/LoginForm.jsx'
import loginService from './services/login'
import BlogForm from './components/BlogForm.jsx'
import Notification from './components/Notifications';
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
      blogService
        .getAll()
        .then((blogs) => {
          setBlogs(blogs.sort((a, b) => b.likes - a.likes))
          console.log(blogs)
        });
    }
  }, [])

  const handleErrorMessage = async (message, type) => {
    setErrorMessage({ message, type });
    setTimeout(() => {
      setErrorMessage();
    }, 4000);
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      blogService
        .getAll()
        .then((blogs) => {
          setBlogs(blogs.sort((a, b) => b.likes - a.likes))
          console.log(blogs)
        });
    } catch {
      handleErrorMessage('wrong credentials')

    }
  }
  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const newBlog = await blogService.create(blogObject)
      const updatedBlogs = blogs.concat(newBlog).sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
      handleErrorMessage('New Blog post created')
    } catch {
      handleErrorMessage('Couldnot create a new blog')
    }
  }

  const updateBlog = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      console.log(blog)
      console.log(blog.user)
      const newblog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      };

      const newBlog = await blogService.update(id, newblog)
      setBlogs(blogs.map(blog => blog.id === id ? newBlog : blog).sort((a, b) => b.likes - a.likes))
      console.log(newBlog.user)
      handleErrorMessage('Likes increased!')
    } catch {
      handleErrorMessage('operation failed')
    }
  }

  const deleteBlog = async (id) => {
    console.log(id)
    try {
      const msg = window.confirm(`Do you want to delete the blog?`)
      if (msg) {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(blog => blog.id != id))
        handleErrorMessage('Blog deleted.')
      }
    } catch {
      handleErrorMessage('Failed to delete the blog')
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.clear()
      setUser(null)
      handleErrorMessage(`log out successful!`)
    }
    catch {
      handleErrorMessage('Logout failed')
    }
  }
  return (
    <div>
      <h1> Blogs </h1>
      <Notification message={errorMessage} />
      <div >
        {!user && <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />}
      </div>
      {user && <div>
        <h2>blogs</h2>
        <p> {user.name} logged in!</p>
        <button onClick={handleLogout}> logout </button>
        <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <div className="blogs">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog}
              deleteBlog={deleteBlog} user={user} />
          )}
        </div>
      </div>
      }

    </div>
  )
}

export default App
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import ErrorMessage from './components/ErrorMessage'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const createBlogRef = useRef()
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const fetchBlogs = async () => {
    const response = await blogService.getAll()
    setBlogs( response )
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      showErrorMessage('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
      setUsername('')
      setPassword('')
      console.log(blogs)
    }
    catch (exception) {
      console.log(exception)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.addNewBlog(blogObject)
      createBlogRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      showNotification(`New blog ${newBlog.title} added`)
    }
    catch (exception) {
      showErrorMessage('Something went wrong when creating the blog')
      console.log(exception)
    }
  }

  const likeBlog  = async (id, blogObject) => {
    try {
      const likedBlog = await blogService.likeBlog(id, blogObject)

      setBlogs(blogs.map(blog => {
        if (blog.id == likedBlog.id)
        {
          return likedBlog
        }

        return blog
      }))

    }
    catch (exception) {
      showErrorMessage('Something went wrong when liking the blog')
      console.log(exception)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type='submit'>login</button>
    </form>      
  )

  const blogsDiv = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
      )}
    </div>
  )

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }


  return (
    <div>
      <Notification message={notification}/>
      <ErrorMessage message={errorMessage}/>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="Create new blog" ref={createBlogRef}>
            <NewBlogForm createBlog={createBlog}/>
          </Togglable>
          {blogsDiv()}
        </div>
      }
    </div>
  )
}

export default App

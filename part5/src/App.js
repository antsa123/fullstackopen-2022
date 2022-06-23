import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorMessage from './components/ErrorMessage'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.addNewBlog({
        'title': title,
        'author': author,
        'url': url
      })

      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))
      showNotification(`New blog ${newBlog.title} added`)
    }
    catch (exception) {
      showErrorMessage('Something went wrong when creating the blog')
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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createNewForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:<input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:<input
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit'>create</button>
      </form>  
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

          {createNewForm()}
          {blogsDiv()}
        </div>
      }
    </div>
  )
}

export default App

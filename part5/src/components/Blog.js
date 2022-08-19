import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, username }) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '100%',
    maxWidth: '500px',
  }

  const infoStyle = {
    display: 'inline-block',
    marginLeft: 5,
  }

  const buttonStyle = {
    border: 'none',
    backgroundColor: 'inherit',
    cursor: 'pointer',
    display: 'inline-block',
  }

  const [show, setShow] = useState(false)

  const toggleVisibility = () => {
    setShow(!show)
  }

  const sendLikes = (event) => {
    event.preventDefault()
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes ? blog.likes + 1 : 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    likeBlog(blog.id, blogObject)
  }

  const confirmDeletion = (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to delete blog ${blog.title} by ${blog.author}`))
    {
      console.log(blog.id)
      deleteBlog(blog.id)
    }
  }

  return (
    <div>
      <div style={blogStyle}>
        <button style={buttonStyle} onClick={toggleVisibility}>{blog.title} {blog.author}</button>
        <div>
          {show ?
            <div style={infoStyle}>
              url: {blog.url}
              <div>
                likes: {blog.likes ? blog.likes : 0}
                <button onClick={sendLikes}>Like</button>
              </div>
              added by: {blog.user.name}
            </div>
            :
            <div>
            </div>
          }
          {show && username === blog.user.username ?
            <button onClick={confirmDeletion}>Remove blog</button>
            :
            <div></div>
          }
        </div>
      </div>
    </div>)
}

export default Blog
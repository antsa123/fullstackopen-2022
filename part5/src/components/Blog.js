import { useState } from 'react'
const Blog = ({blog, likeBlog}) => {

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
    setShow(!show);
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
      </div>
    </div>
  </div>)
}

export default Blog
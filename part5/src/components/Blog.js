import { useState } from 'react'
const Blog = ({blog}) => {

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

  return (
  <div>
    <div style={blogStyle}>
      <button style={buttonStyle} onClick={toggleVisibility}>{blog.title} {blog.author}</button>
      <div>
      {show ?
        <div style={infoStyle}>
          url: {blog.url}
          <div>
          likes: {blog.likes}
          <button>Like</button>
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
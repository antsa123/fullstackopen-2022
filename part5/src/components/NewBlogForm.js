import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      'title': title,
      'author': author,
      'url': url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
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
}

export default NewBlogForm
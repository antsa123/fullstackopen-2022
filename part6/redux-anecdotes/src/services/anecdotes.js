import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id, voteAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, voteAnecdote)
  return response.data
}

export default { getAllAnecdotes, createNewAnecdote, voteAnecdote }
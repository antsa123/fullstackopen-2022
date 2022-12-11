import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortByVotes = (anecdotesToSort) => {
  return anecdotesToSort.sort((a,b) => {
    if (a.votes && b.votes) return b.votes - a.votes
    else if (a.votes && !b.votes) return -1
    else if (!a.votes && b.votes) return 1
    else return 0
  })
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVoteTo(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      anecdoteToVote.votes = anecdoteToVote.votes + 1
      sortByVotes(state)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
      sortByVotes(state)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVoteTo, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
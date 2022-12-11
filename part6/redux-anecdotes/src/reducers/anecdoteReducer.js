import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
    appendAnecdote(state, action) {
      state.push(action.payload)
      sortByVotes(state)
    },
    setAnecdotes(state, action) {
      return sortByVotes(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAllAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const id = anecdote.id
    const votedAnecdote = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes ? anecdote.votes + 1 : 1
    }

    const response = await anecdoteService.voteAnecdote(id, votedAnecdote)
    dispatch(addVoteTo(id))
  }
}

export const { addVoteTo, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
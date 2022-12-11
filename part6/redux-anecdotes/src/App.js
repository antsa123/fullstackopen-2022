import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import ConnectedNotification from './components/Notification'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <ConnectedNotification/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App
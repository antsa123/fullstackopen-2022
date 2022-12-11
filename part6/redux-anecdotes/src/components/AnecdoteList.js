import { useDispatch, useSelector} from "react-redux";
import { addVoteTo } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (id) => {
    dispatch(addVoteTo(id))
    dispatch(setNotification(`You voted ${anecdotes.find(x => x.id === id).content}`))
    setTimeout(() => {
      dispatch(removeNotification(null))
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </>
  )

}

export default AnecdoteList
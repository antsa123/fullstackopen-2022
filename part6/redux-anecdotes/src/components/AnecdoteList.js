import { useDispatch, useSelector} from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted ${anecdotes.find(x => x.id === anecdote.id).content}`))
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
          has {anecdote.votes ? anecdote.votes : 0}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </>
  )

}

export default AnecdoteList
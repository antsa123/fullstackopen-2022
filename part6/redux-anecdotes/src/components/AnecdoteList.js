import { useDispatch, useSelector} from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const state = useSelector(state => {
    return {
      anecdotes: state.anecdotes,
      timeoutID: state.notification.timeoutID
    }
  })

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted ${state.anecdotes.find(x => x.id === anecdote.id).content}`, 5, state.timeoutID))
  }

  return (
    <>
      {state.anecdotes.map(anecdote =>
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
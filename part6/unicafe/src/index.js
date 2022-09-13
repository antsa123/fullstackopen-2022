import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const increment = (type) => {
    store.dispatch({
      type: type
    })
  }

  const state = store.getState()

  return (
    <div>
      <button onClick={() => increment('GOOD')}>good</button>
      <button onClick={() => increment('OK')}>ok</button>
      <button onClick={() => increment('BAD')}>bad</button>
      <button onClick={() => increment('ZERO')}>reset stats</button>
      <div>good {state.good}</div>
      <div>ok {state.ok}</div>
      <div>bad {state.bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

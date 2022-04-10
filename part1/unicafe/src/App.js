import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, bad, neutral}) => {
  const all =  good + bad + neutral
  if (all != 0) {
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine statistic={"Good"} value={good}/>
          <StatisticsLine statistic={"Neutral"} value={neutral}/>
          <StatisticsLine statistic={"Bad"} value={bad}/>
          <StatisticsLine statistic={"All"} value={all}/>
          <StatisticsLine statistic={"Average"} value={(good - bad) / (all)}/>
          <StatisticsLine statistic={"Positive"} value={(good / all) * 100} unit={"%"}/>
        </tbody>
      </table>
    </>)
  }
  return (
    <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </>
  )
}

const StatisticsLine = ({statistic, value, unit}) => {
    return (
      <>
      <tr>
        <td>
          {statistic}
        </td>
        <td>
          {value} {unit}
        </td>
      </tr>
    </>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseBad = () => setBad(bad + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={increaseGood} text={"Good"}/>
      <Button handleClick={increaseNeutral} text={"Neutral"}/>
      <Button handleClick={increaseBad} text={"Bad"}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const titulo = "give feedback"
  const average = (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)

  const buttongood = () => {
    setGood(good + 1)
  }
  const buttonneutral = () => {
    setNeutral(neutral + 1)
  }
  const buttonbad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <Header titulo={titulo} />
      <Counter
        onGoodClick={buttongood}
        onNeutralClick={buttonneutral}
        onBadClick={buttonbad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} average={average} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <div>
        <h1>{props.titulo}</h1>
      </div>
    </>
  )
}

const Counter = ({ onGoodClick, onNeutralClick, onBadClick }) => {
  return (
    <>
      <div>
        <Button text="good" onClick={onGoodClick} />
        <Button text="neutral" onClick={onNeutralClick} />
        <Button text="bad" onClick={onBadClick} />
      </div>
    </>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}> {text} </button>
    </>
  )
}

const StatisticLine = ({ value, text }) => {
  return (
    <>

      <div>
        {text}: {value}
      </div>
    </>
  )
}

const Statistics = ({ good, neutral, bad, average }) => {
  if (good == 0 && neutral == 0 && bad == 0)
    return (
      <>
        <div>
          <h1> statistics</h1>
          No feedback given
        </div>
      </>
    )
  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="good" value={good / (good + neutral + bad) * 100} />
    </>
  )
}





export default App
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
        <MyButton text="good" onClick={onGoodClick} />
        <MyButton text="neutral" onClick={onNeutralClick} />
        <MyButton text="bad" onClick={onBadClick} />
      </div>
    </>
  )
}

const MyButton = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}> {text} </button>
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
      <div>
        <h1>statistics</h1>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {good + neutral + bad}</div>
        <div>average {average}</div>
        <div>positive {good / (good + neutral + bad) * 100} %</div>
      </div>
    </>
  )
}

export default App
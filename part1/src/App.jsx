import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

const now = new Date()

  return (
    <>
    <p>
      Samanta
    </p>
    <p>
    {now.toString()}
    </p>
    <Hello name="Hello Victor">

    </Hello>
    <Hello>
      
    </Hello>

    </>
  )
}

const Hello = (props) => {
  console.log(props)
  return (
<p>
  {props.name}
</p>
  )
}
export default App

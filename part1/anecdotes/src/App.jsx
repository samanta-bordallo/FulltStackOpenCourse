import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const buttonvote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes)
  }
  const maxvotes = () => {
    const maxVotes = Math.max(...votes);
    return votes.indexOf(maxVotes);
  }
  const maxvotes2 = maxvotes(votes);

  return (
    <div>
      <h2>Anecdotes of the day</h2>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <NextAnecdote
        onVoteClick={buttonvote}
        anecdotes={anecdotes} setSelected={setSelected} />
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[maxvotes2]}</div>
      <div>has {votes[maxvotes2]}</div>
    </div>


  )
}

const NextAnecdote = ({ anecdotes, setSelected, onVoteClick }) => {
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }
  return (
    <>
      <div>
        <Button text="vote" onClick={onVoteClick} />
        <Button text="next anecdote" onClick={handleClick} />
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

export default App
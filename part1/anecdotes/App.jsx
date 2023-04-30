import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]
  const VOTES = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  }

  const INITIAL_STATE = Math.floor(Math.random() * 8)
  const [selected, setSelected] = useState(INITIAL_STATE)
  const [votes, setVotes] = useState(VOTES)

  const mostVoted = Object.keys(votes).reduce((a, b) =>
    votes[a] > votes[b] ? a : b
  ) // returns the key of most voted anecdote (or one of them if there's a tie)

  const handleClick = () => {
    const random = Math.floor(Math.random() * 8) // a new random number is needed
    random === selected ? handleClick() : setSelected(random) // if the new number is
  }

  const handleVote = () => {
    const updatedVotes = { ...votes }
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes </div>
      <button onClick={handleClick}>get new anecdote</button>
      <button onClick={handleVote}>vote</button>
      <div> most voted: {anecdotes[mostVoted]} </div>
      <div>has {votes[mostVoted]} votes</div>
    </>
  )
}

export default App

import { useState } from "react"

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const generateRandomNumber =() => {
    var randomNUmber = selected;

    while (randomNUmber === selected) {
      randomNUmber = Math.floor(Math.random() * anecdotes.length);
    }

    setSelected(randomNUmber)
  }

  const points = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(points)

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = () => {
    var max = 0;
    var maxIndex = 0;

    for (var i = 0; i < votes.length; i++) {
      if (votes[i] > max) {
        maxIndex = i;
        max = votes[i];
      }
    }

    return maxIndex;
  }

  const maxVotes = () => Math.max(...votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={generateRandomNumber}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes()]}</p>
      <p>has {maxVotes()}</p>
    </div>
  )
}

export default App

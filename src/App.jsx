import React, { useState } from 'react';

const Title = ({ text }) => <h2>{text}</h2>;


const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>God: {votes.good} | But: {votes.bad} | Neutral: {votes.neutral}</p>
  </div>
);


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

function App() {
  const anecdotes = [
    "es mejor solo q mal acompañado",
    "La vida es como una caja de chocolates, nunca sabes lo que te va a tocar",
    "una vida estresada es una vida desperdiciada",
    "El tiempo es oro, pero el oro no compra tiempo",
    "La risa es el mejor remedio, pero no cura la soledad",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    anecdotes.map(() => ({ good: 0, bad: 0, neutral: 0 }))
  );

  // Función para cambiar a una anécdota aleatoria distinta
  const nextAnecdote = () => {
    let next;
    do {
      next = Math.floor(Math.random() * anecdotes.length);
    } while (next === selected);
    setSelected(next);
  };


  const vote = (type) => {
    const updatedVotes = [...votes];
    updatedVotes[selected][type]++;
    setVotes(updatedVotes);
  };


  const getMostVoted = () => {
    let maxVotes = 0;
    let maxIndex = 0;

    votes.forEach((v, i) => {
      const total = v.good + v.bad + v.neutral;
      if (total > maxVotes) {
        maxVotes = total;
        maxIndex = i;
      }
    });

    return maxIndex;
  };

  return (
    <div>
      <Title text="Anécdota del día" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />

      <Button handleClick={() => vote("good")} text="Good" />
      <Button handleClick={() => vote("bad")} text="Bad" />
      <Button handleClick={() => vote("neutral")} text="Neutral" />
      <Button handleClick={nextAnecdote} text="Siguiente Anécdota" />

      <Title text="Anécdota más votada" />
      <Anecdote
        text={anecdotes[getMostVoted()]}
        votes={votes[getMostVoted()]}
      />
    </div>
  );
}

export default App;

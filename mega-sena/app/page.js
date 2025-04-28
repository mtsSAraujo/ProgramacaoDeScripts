"use client"
import React from 'react';
import useMegaSena from './hooks/useMegaSena';
import './App.css';

function App() {
  const { numeros, sortear } = useMegaSena();

  return (
    <div className="App">
      <h1>Mega Sena</h1>
      <div className="bolas">
        {numeros.map((numero, idx) => (
          <div key={idx} className="bola">{numero}</div>
        ))}
      </div>
      <button onClick={sortear}>Sortear</button>
    </div>
  );
}

export default App;

"use client"
import { useState } from 'react';

function gerarNumerosAleatorios(qtd = 6, max = 60) {
  const numeros = new Set();
  while (numeros.size < qtd) {
    const numero = Math.floor(Math.random() * max) + 1;
    numeros.add(numero);
  }
  return Array.from(numeros).sort((a, b) => a - b);
}

export default function useMegaSena() {
  const [numeros, setNumeros] = useState([]);

  function sortear() {
    const novosNumeros = gerarNumerosAleatorios();
    setNumeros(novosNumeros);
  }

  return { numeros, sortear };
}

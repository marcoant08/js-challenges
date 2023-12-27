"use strict";

const NUMERO_DE_JOGOS = 4; // número de jogos que serão gerados

const jogos = Array(NUMERO_DE_JOGOS)
  .fill(null)
  .map((_, index) => {
    const numeros = [];

    do {
      const numero = Math.ceil(Math.random() * 60)
        .toString()
        .padStart(2, "0");

      if (!numeros.includes(numero)) numeros.push(numero);
    } while (numeros.length < 6);

    const sequencia = numeros
      .sort((a, b) => a - b)
      .reduce((acc, cur, i) => acc + cur + (i >= numeros.length - 1 ? "" : ", "), "");

    return `[JOGO ${index + 1}] ` + sequencia;
  })
  .join("\n");

console.log(jogos);

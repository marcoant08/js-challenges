"use strict";

// functions
const separar = (str) => {
  while (str.length % 4 !== 0) str = `0${str}`;

  return Array(str.length / 4)
    .fill("")
    .map((_, i) => str.slice(i * 4, i * 4 + 4));
};

// code
const separado = separar("0111110001");
console.log("[separado]", separado);

const dec = separado.map((item) => {
  return item.split("").reduce((acc, cur, i) => acc + Number(cur) * 2 ** (item.length - i - 1), 0);
});
console.log("[dec]", dec);

const associations = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
const hex = dec.map((item) => associations[item]);
console.log("[hex]", hex.join(""));

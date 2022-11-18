"use strict";

const romano = "MCMXCIV";
// const romano = "XL";
// const romano = "XC";

const corta = { IV: 4, IX: 9, XL: 40, XC: 90, CD: 400, CM: 900 }; // números q cortam
const top = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }; // números tops

const step1 = Object.keys(corta).reduce((acc, key) => acc.replaceAll(key, " " + corta[key]), romano); // primeiro altera os números q cortam
const step2 = Object.keys(top).reduce((acc, key) => acc.replaceAll(key, " " + top[key]), step1); // altera os números tops

const result = step2
  .split(" ")
  .map((item) => Number(item))
  .reduce((acc, cur) => acc + cur, 0); // soma os números

console.log(result);

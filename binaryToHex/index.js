"use strict";

// FUNCTIONS
// separa número binário completo em um array de binários de 4 bits
const getBinaryArray = (binaryNumber) => {
  while (binaryNumber.length % 4 !== 0) binaryNumber = `0${binaryNumber}`;

  return Array(binaryNumber.length / 4)
    .fill("")
    .map((_, i) => binaryNumber.slice(i * 4, i * 4 + 4));
};

// converte de binário pra decimal
const binaryToDecimal = (binaryNumber) => {
  return binaryNumber.split("").reduce((acc, cur, i) => acc + Number(cur) * Math.pow(2, binaryNumber.length - i - 1), 0);
};

// CODE
const binaryNumber = "100010101010111110101"; // binário a ser convertido
const binaryArray = getBinaryArray(binaryNumber); // lista de binários de 4 bits
const decimalList = binaryArray.map((item) => binaryToDecimal(item)); // lista de decimais
const associations = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]; // 0 a 15 em hexadecimal
const hexList = decimalList.map((item) => associations[item]); // lista de hexadecimais
const hexNumber = hexList.join(""); // resultado final (número completo em hexadecimal)

// imprimindo resultados
console.log("[binaryArray]", binaryArray);
console.log("[decimalList]", decimalList);
console.log("[hexList]", hexList);
console.log("[hexNumber]", hexNumber);
console.log(`O número ${binaryNumber} em hexadecimal é ${hexNumber}`);

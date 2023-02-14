"use strict";

const obj_snake_case = {
  full_name: "Marco Antônio",
  active: true,
  other_data: { favorite_animals: ["cachorro", "gato", "pássaro"] },
};

const objCamelCase = {
  fullName: "John Doe",
  active: true,
  otherData: { favoriteAnimals: ["dog", "cat", "bird"] },
};

const changeCase = {
  toSnakeCase(obj) {
    // converte de camelCase pra snake_case
    if (!obj) return obj; // valida existencia de objeto recebido
    if (obj.constructor !== Object) return obj; // valida objeto recebido

    return Object.keys(obj).reduce((acc, key) => {
      const isObj = obj[key] && obj[key].constructor === Object; // verifica valor da chave é se chave é um objeto
      const newKey = key.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`); // converte chave pra snake_case
      return { ...acc, [newKey]: isObj ? this.toSnakeCase(obj[key]) : obj[key] }; // caso valor seja objeto, usa recursividade pra converter chaves dele também
    }, {});
  },

  toCamelCase(obj) {
    // converte de snake_case pra camelCase
    if (!obj) return obj; // valida existencia de objeto recebido
    if (obj.constructor !== Object) return obj; // valida objeto recebido

    return Object.keys(obj).reduce((acc, key) => {
      const isObj = obj[key] && obj[key].constructor === Object; // verifica valor da chave é se chave é um objeto
      const newKey = key.replace(/(_.)/g, (match) => match.replace(/_/g, "").toUpperCase()); // converte chave pra camelCase
      return { ...acc, [newKey]: isObj ? this.toCamelCase(obj[key]) : obj[key] }; // caso valor seja objeto, usa recursividade pra converter chaves dele também
    }, {});
  },
};

console.log("[camelCase]", changeCase.toCamelCase(obj_snake_case));
console.log("[snake_case]", changeCase.toSnakeCase(objCamelCase));

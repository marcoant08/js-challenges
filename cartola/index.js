// inputs
const jogadores = ["Pedro", "Gabriel", "Lucao", "Italo", "Thalisson", "JP", "Louzeiro", "MA"];

const historico = `
Histórico de vencedores das rodadas 🎩;

01: Pedro;
02: JP;
03: MA;
04: MA;

🏆💰
`;

// calculando estatísticas
const vencedoresPorRodada = historico
  .split(";")
  .map((item) => item.trim())
  .filter((item) => item[0].match(/\d/));

const numeroDeVitorias = jogadores.reduce((acc, cur) => {
  return { ...acc, [cur]: vencedoresPorRodada.filter((item) => item.includes(cur)).length };
}, {});

const recebimentos = jogadores.reduce((acc, cur) => {
  return { ...acc, [cur]: (numeroDeVitorias[cur] || 0) * (jogadores.length - 1) * 5 };
}, {});

const perdas = jogadores.reduce((acc, cur) => {
  return { ...acc, [cur]: ((numeroDeVitorias[cur] || 0) - vencedoresPorRodada.length) * 5 };
}, {});

// imprimindo resultados
console.log("[******]");
console.log("[vencedoresPorRodada]", vencedoresPorRodada);
console.log("[numeroDeVitorias]", numeroDeVitorias);
console.log("[recebimentos]", recebimentos);
console.log("[perdas]", perdas);
console.log("[******]");

/* eslint-disable */
// ALGORITMO CARTOLA

// preencher histórico com o número das rodadas que o jogador ganhou
const historico = {
  "M. Antônio": [],
  "Luiz Gabriel": [],
  "Davi Cauã": [],
  "Lucas Lima Leite": [],
  Thalisson: [],
  "Pedro Almeida": [],
  "YURE LEONARDO": [],
  "João Pedro": [],
  "Italo Alcântara": [],
  "André leão": [],
  Alex: [],
  Fergson: [],
};

const jogadores = Object.keys(historico);

// valida se jogador venceu uma rodada válida
jogadores.forEach((jogador) => {
  const rodadaInvalidaVencida = historico[jogador].find(
    (rodadaVencida) => rodadaVencida < 1 || rodadaVencida > 38
  );
  if (rodadaInvalidaVencida !== undefined)
    throw new Error(
      `Jogador '${jogador}' venceu uma rodada inválida (rodada ${rodadaInvalidaVencida}).`
    );
});

// valida se jogadores venceram a mesma rodada
jogadores.forEach((jogador) => {
  const outrosJogadores = Object.keys(historico).filter((j) => j !== jogador);
  historico[jogador].forEach((rodadaVencidaPeloJogador) => {
    outrosJogadores.some((outroJogador) => {
      const rodadaSeRepete = historico[outroJogador].includes(
        rodadaVencidaPeloJogador
      );
      if (rodadaSeRepete) {
        throw new Error(
          `Jogadores '${jogador}' e '${outroJogador}' venceram a mesma rodada (rodada: ${rodadaVencidaPeloJogador}).`
        );
      }
    });
  });
});

const rodadas = Array(38)
  .fill()
  .map((_, i) => i + 1);

const vencedoresPorRodada = rodadas
  .map((round) => {
    const linha = Object.keys(historico).find((key) =>
      historico[key].includes(round)
    );
    return linha && `${round.toString().padStart(2, "0")}: ${linha};`;
  })
  .filter((linha) => linha)
  ;

const normalized = `\n⚽️\nCartola 🎩;\nHistórico de vencedores das rodadas;\n\n${vencedoresPorRodada.join("\n")}\n\n🏆💰\n`;

jogadores.sort(
  (a, b) => normalized.split(b).length - normalized.split(a).length
); // ordena jogadores por número de vitórias

const numeroDeVitorias = jogadores.reduce((acc, jogador) => {
  return {
    ...acc,
    [jogador]: vencedoresPorRodada.filter((item) => item.includes(jogador))
      .length,
  };
}, {});

const porcentagemDeVitorias = jogadores.reduce((acc, jogador) => {
  const numeroDeVitoriasDoJogador = vencedoresPorRodada.filter((vencedor) =>
    vencedor.includes(jogador)
  ).length;
  const porcentagem = (
    (numeroDeVitoriasDoJogador / vencedoresPorRodada.length) *
    100
  ).toFixed(1);
  return { ...acc, [jogador]: `${porcentagem}%` };
}, {});

const recebimentos = jogadores.reduce((acc, cur) => {
  return {
    ...acc,
    [cur]: (numeroDeVitorias[cur] || 0) * (jogadores.length - 1) * 5,
  };
}, {});

const perdas = jogadores.reduce((acc, cur) => {
  return {
    ...acc,
    [cur]: ((numeroDeVitorias[cur] || 0) - vencedoresPorRodada.length) * 5,
  };
}, {});

const lucros = jogadores.reduce((acc, cur) => {
  return { ...acc, [cur]: recebimentos[cur] + perdas[cur] };
}, {});

const campeao = ""; // colocar quem ganhou no total de pontos
if (campeao && !jogadores.includes(campeao)) {
  throw new Error("Insira o nome de um jogador válido na variável 'campeao'");
}

const lucrosFinal = Object.keys(lucros).reduce((acc, jogador) => {
  // quem perdeu paga 25 reais pro campeão
  return {
    ...acc,
    [jogador]:
      jogador === campeao
        ? lucros[jogador] + 25 * (jogadores.length - 1)
        : lucros[jogador] - 25,
  };
}, {});

const campeonatoFinalizado = vencedoresPorRodada.length === 38 && campeao;

// imprimindo resultados
console.log("[*STATS*]");
console.log("[jogadores]", jogadores);
console.log("[rodadas vencidas]", historico);
console.log("[número de rodadas]", vencedoresPorRodada.length);
console.log("[vencedores por rodada]", `[\n  ${vencedoresPorRodada.join("\n  ")}\n]`);
console.log("[numero de vitórias]", numeroDeVitorias);
console.log("[porcentagem de vitorias]", porcentagemDeVitorias);
console.log("[recebimentos]", recebimentos);
console.log("[perdas]", perdas);
console.log("[lucros]", lucros);
if (campeonatoFinalizado) {
  console.log(`\n[RESULTADO FINAL] campeão: ${campeao} 🎉`);
  console.log("\n[lucros após premiação final]", lucrosFinal);
}
console.log("[** **]\n");
// console.log("[vencedores]", normalized);

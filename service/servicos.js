import { historicoInflacao } from "../data/data.js";

export const getHistoricoInflacao = () => {
  return historicoInflacao;
};

export const getHistoricoInflacaoPorAno = (ano) => {
  return historicoInflacao.filter((inflacao) => inflacao.ano === ano);
};

export const getHistoricoInflacaoId = (id) => {
  return historicoInflacao.find((inflacao) => inflacao.id === id);
};

export const getValorCorrigido = (
  valor,
  mesInicial,
  mesFinal,
  anoInicial,
  anoFinal
) => {
  const idIncial = historicoInflacao.find(
    (inflacao) => inflacao.ano === anoInicial && inflacao.mes === mesInicial
  ).id;
  const idFinal = historicoInflacao.find(
    (inflacao) => inflacao.ano === anoFinal && inflacao.mes === mesFinal
  ).id;
  let inflacaoAcumulada = 1;

  for (let i = idIncial - 1; i <= idFinal; i++) {
    inflacaoAcumulada *= 1 + historicoInflacao[i].ipca / 100;
  }
  return valor * inflacaoAcumulada;
};

export const calcularReajusteIPCA = (
  valor,
  mesInicial,
  mesFinal,
  anoInicial,
  anoFinal
) => {
  const historicoFiltrado = historicoInflacao.filter((historico) => {
    if (anoInicial === anoFinal) {
      return (
        historico.ano === anoInicial &&
        historico.mes >= mesInicial &&
        historico.mes <= mesFinal
      );
    } else {
      return (
        (historico.ano === anoInicial && historico.mes >= mesInicial) ||
        (historico.ano > anoInicial && historico.ano < anoFinal) ||
        (historico.ano === anoFinal && historico.mes <= mesFinal)
      );
    }
  });

  let inflacaoAcumulada = 1;
  for (const elemento of historicoFiltrado) {
    inflacaoAcumulada *= elemento.ipca / 100 + 1;
  }

  const resultado = valor * inflacaoAcumulada;

  return resultado;
};

export const ValidacaoErro = (
  valor,
  mesInicial,
  mesFinal,
  anoInicial,
  anoFinal
) => {
  // precisa corrigir isso aqui...... colocar igual no exercicio
  const anoLimiteFinal = historicoInflacao.reduce((max, item) => {
    return item.ano > max ? item.ano : max;
  });
  console.log(anoLimiteFinal.ano);
  const anoLimiteInicial = historicoInflacao.reduce((min, item) => {
    return item.ano < min ? item.ano : min;
  }, 2015);
  console.log(anoLimiteInicial.ano);

  if (
    isNaN(valor) ||
    isNaN(anoInicial) ||
    isNaN(anoFinal) ||
    isNaN(mesInicial) ||
    isNaN(mesFinal) ||
    mesInicial < 1 ||
    mesInicial > 12 ||
    mesFinal < 1 ||
    mesFinal > 12 ||
    (anoInicial < anoLimiteInicial && anoInicial > anoLimiteFinal) ||
    (anoFinal < anoLimiteInicial && anoFinal > anoLimiteFinal) ||
    anoFinal < anoInicial
  ) {
    return true;
  } else {
    return false;
  }
};

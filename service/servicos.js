import { historicoInflacao } from "../data/data.js";
import { ValidacaoErro } from "./validacaoErro.js";

export const AnoMax = historicoInflacao.reduce(
  (max, item) => (item.ano > max ? item.ano : max),
  historicoInflacao[0].ano
);
export const AnoMin = historicoInflacao.reduce(
  (min, item) => (item.ano < min ? item.ano : min),
  historicoInflacao[0].ano
);

const anoFinalFiltrado = historicoInflacao.filter(
  (periodo) => periodo.ano === AnoMax
);

export const LimiteMes = anoFinalFiltrado.reduce(
  (max, periodo) => (periodo.mes > max ? periodo.mes : max),
  anoFinalFiltrado[0].mes
);

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

import { historicoInflacao } from "../data/data.js";

// Calcula o ano máximo presente no histórico de inflação
export const AnoMax = historicoInflacao.reduce(
  (max, item) => (item.ano > max ? item.ano : max),
  historicoInflacao[0].ano
);

// Calcula o ano mínimo presente no histórico de inflação
export const AnoMin = historicoInflacao.reduce(
  (min, item) => (item.ano < min ? item.ano : min),
  historicoInflacao[0].ano
);

// Filtra os dados do histórico de inflação para obter o ano mais recente
const anoFinalFiltrado = historicoInflacao.filter(
  (periodo) => periodo.ano === AnoMax
);

// Calcula o mês limite do ano mais recente no histórico de inflação
export const LimiteMes = anoFinalFiltrado.reduce(
  (max, periodo) => (periodo.mes > max ? periodo.mes : max),
  anoFinalFiltrado[0].mes
);

// Retorna todo o histórico de inflação
export const getHistoricoInflacao = () => {
  return historicoInflacao;
};

// Retorna o histórico de inflação filtrado por ano
export const getHistoricoInflacaoPorAno = (ano) => {
  return historicoInflacao.filter((inflacao) => inflacao.ano === ano);
};

// Retorna um item do histórico de inflação pelo ID
export const getHistoricoInflacaoId = (id) => {
  return historicoInflacao.find((inflacao) => inflacao.id === id);
};

// Calcula o valor corrigido pela inflação entre dois períodos
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

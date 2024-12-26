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

  for (let i = idIncial; i <= idFinal; i++) {
    inflacaoAcumulada *= 1 + historicoInflacao[i - 1].ipca / 100;
  }
  console.log(inflacaoAcumulada * valor);
  return valor * inflacaoAcumulada;
};

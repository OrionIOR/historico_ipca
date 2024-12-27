import express from "express";
import {
  getHistoricoInflacao,
  getHistoricoInflacaoPorAno,
  getHistoricoInflacaoId,
  getValorCorrigido,
  calcularReajusteIPCA,
  AnoMax,
  AnoMin,
  LimiteMes,
} from "./service/servicos.js";

import { ValidacaoErro } from "./service/validacaoErro.js";

const app = express();

app.get("/historicoIPCA/calcularIPCA", (req, res) => {
  const valor = parseFloat(req.query.valor);
  const mesInicial = parseInt(req.query.mesInicial);
  const mesFinal = parseInt(req.query.mesFinal);
  const anoInicial = parseInt(req.query.anoInicial);
  const anoFinal = parseInt(req.query.anoFinal);

  const validar = ValidacaoErro(
    valor,
    mesInicial,
    mesFinal,
    anoInicial,
    anoFinal,
    AnoMin,
    AnoMax,
    LimiteMes
  );
  console.log(validar.Msg);
  console.log(AnoMax);
  console.log(AnoMin);
  console.log(LimiteMes);
  if (validar.status) {
    res.status(400).json({ erro: "Paramentros Invalidos " + validar.Msg });
    validar.Msg = [];
    return;
  }

  const resultado = calcularReajusteIPCA(
    valor,
    mesInicial,
    mesFinal,
    anoInicial,
    anoFinal
  );
  res.json(parseFloat(resultado.toFixed(2)));
});

app.get("/historicoIPCA/calcular", (req, res) => {
  const valor = parseFloat(req.query.valor);
  const mesInicial = parseInt(req.query.mesInicial);
  const mesFinal = parseInt(req.query.mesFinal);
  const anoInicial = parseInt(req.query.anoInicial);
  const anoFinal = parseInt(req.query.anoFinal);
  const valorCorrigido = getValorCorrigido(
    valor,
    mesInicial,
    mesFinal,
    anoInicial,
    anoFinal
  );
  res.json(valorCorrigido);
});

app.get("/historicoIPCA", (req, res) => {
  const anoIPCA = parseInt(req.query.ano);
  const historicoIPCA = anoIPCA
    ? getHistoricoInflacaoPorAno(anoIPCA)
    : getHistoricoInflacao();

  res.json(historicoIPCA);
});

app.get("/historicoIPCA/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) && id === "calculo") {
  } else {
    const historicoIPCA = getHistoricoInflacaoId(id);
    res.json(historicoIPCA);
  }
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});

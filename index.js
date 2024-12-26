import express from "express";
import {
  getHistoricoInflacao,
  getHistoricoInflacaoPorAno,
  getHistoricoInflacaoId,
  getValorCorrigido,
} from "./service/servicos.js";

const app = express();

app.get("/historicoIPCA", (req, res) => {
  const anoIPCA = parseInt(req.query.ano);
  console.log(anoIPCA);
  const historicoIPCA = anoIPCA
    ? getHistoricoInflacaoPorAno(anoIPCA)
    : getHistoricoInflacao();

  res.json(historicoIPCA);
});

app.get("/historicoIPCA/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) && id === "calculo") {
    const valor = parseFloat(req.query.valor);
    console.log("Valor: " + valor);
    const mesInicial = parseInt(req.query.mesInicial);
    console.log("Mes Inicial: " + mesInicial);
    const mesFinal = parseInt(req.query.mesFinal);
    console.log("Mes Final: " + mesFinal);
    const anoInicial = parseInt(req.query.anoInicial);
    const anoFinal = parseInt(req.query.anoFinal);
    const valorCorrigido = getValorCorrigido(
      valor,
      mesInicial,
      mesFinal,
      anoInicial,
      anoFinal
    );
    console.log("Valor: " + valorCorrigido);
    res.json(valorCorrigido);
  } else {
    const historicoIPCA = getHistoricoInflacaoId(id);
    const valor = parseFloat(req.query.valor);
  console.log("Valor: " + valor);
  const mesInicial = parseInt(req.query.mesInicial);
  console.log("Mes Inicial: " + mesInicial);
  const mesFinal = parseInt(req.query.mesFinal);
  console.log("Mes Final: " + mesFinal);
  const anoInicial = parseInt(req.query.anoInicial);
  const anoFinal = parseInt(req.query.anoFinal);
  const valorCorrigido = getValorCorrigido(
    valor,
    mesInicial,
    mesFinal,
    anoInicial,
    anoFinal
  );
  console.log("Valor: " + valorCorrigido);
  res.json(valorCorrigido);

    res.json(historicoIPCA);
  }
});

app.get("/historicoIPCA/calculo", (req, res) => {
  const valor = parseFloat(req.query.valor);
  console.log("Valor: " + valor);
  const mesInicial = parseInt(req.query.mesInicial);
  console.log("Mes Inicial: " + mesInicial);
  const mesFinal = parseInt(req.query.mesFinal);
  console.log("Mes Final: " + mesFinal);
  const anoInicial = parseInt(req.query.anoInicial);
  const anoFinal = parseInt(req.query.anoFinal);
  const valorCorrigido = getValorCorrigido(
    valor,
    mesInicial,
    mesFinal,
    anoInicial,
    anoFinal
  );
  console.log("Valor: " + valorCorrigido);
  res.json(valorCorrigido);
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});

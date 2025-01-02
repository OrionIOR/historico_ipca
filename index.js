import express from "express";
import {
  getHistoricoInflacao,
  getHistoricoInflacaoPorAno,
  getHistoricoInflacaoId,
  calcularReajusteIPCA,
  AnoMax,
  AnoMin,
  LimiteMes,
} from "./service/servicos.js";

import {
  ValidacaoErro,
  ValidacaoErroId,
  validarBuscaAno,
} from "./service/validacaoErro.js";

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

  if (validar.status) {
    res.status(400).json({ erro: "Paramentros Invalidos: " + validar.Msg });
    validar.Msg = [];
    return;
  } else {
    const resultado = calcularReajusteIPCA(
      valor,
      mesInicial,
      mesFinal,
      anoInicial,
      anoFinal
    );
    res.json(parseFloat(resultado.toFixed(2)));
  }
});

app.get("/historicoIPCA", (req, res) => {
  const anoIPCA = parseInt(req.query.ano);

  if (isNaN(anoIPCA)) {
    res.json(getHistoricoInflacao());
  } else {
    const validar = validarBuscaAno(anoIPCA, AnoMax, AnoMin);
    if (validar.status) {
      res.status(400).json({ erro: "Paramentros Invalidos: " + validar.Msg });
      validar.Msg = [];
      return;
    } else {
      const resultado = getHistoricoInflacaoPorAno(anoIPCA);

      if (resultado.length === 0) {
        res.status(400).json({ erro: "Ano não encontrado" });
        return;
      } else {
        res.json(resultado);
      }
    }
  }
});

app.get("/historicoIPCA/:id", (req, res) => {
  let id = req.params.id;

  const validar = ValidacaoErroId(id);

  if (validar.status) {
    res.status(400).json({ erro: "Paramentros Invalidos: " + validar.Msg });
    validar.Msg = [];
    return;
  } else {
    id = parseInt(id);
    const historicoIPCA = getHistoricoInflacaoId(id);
    if (!historicoIPCA) {
      res.status(400).json({ erro: "Id não encontrado" });
      return;
    }
    res.json(historicoIPCA);
  }
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});

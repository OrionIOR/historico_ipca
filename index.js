// Este projeto é uma API para consultar e calcular o histórico de inflação IPCA (Índice de Preços ao Consumidor Amplo) no Brasil.
// Utiliza o framework Express para criar endpoints que permitem buscar dados históricos de inflação e calcular reajustes com base no IPCA.

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

// Endpoint para calcular o reajuste do IPCA
app.get("/historicoIPCA/calcularIPCA", (req, res) => {
  const valor = parseFloat(req.query.valor); // Valor a ser reajustado
  const mesInicial = parseInt(req.query.mesInicial); // Mês inicial do período
  const mesFinal = parseInt(req.query.mesFinal); // Mês final do período
  const anoInicial = parseInt(req.query.anoInicial); // Ano inicial do período
  const anoFinal = parseInt(req.query.anoFinal); // Ano final do período

  // Validação dos parâmetros recebidos
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
    res.status(400).json({ erro: "Parâmetros Inválidos: " + validar.Msg });
    validar.Msg = [];
    return;
  } else {
    // Cálculo do reajuste do IPCA
    const resultado = calcularReajusteIPCA(
      valor,
      mesInicial,
      mesFinal,
      anoInicial,
      anoFinal
    );
    res.json(parseFloat(resultado.toFixed(2))); // Retorna o resultado com duas casas decimais
  }
});

// Endpoint para buscar o histórico de inflação IPCA
app.get("/historicoIPCA", (req, res) => {
  const anoIPCA = parseInt(req.query.ano); // Ano para busca do histórico

  if (isNaN(anoIPCA)) {
    res.json(getHistoricoInflacao()); // Retorna todo o histórico se o ano não for especificado
  } else {
    // Validação do ano recebido
    const validar = validarBuscaAno(anoIPCA, AnoMax, AnoMin);
    if (validar.status) {
      res.status(400).json({ erro: "Parâmetros Inválidos: " + validar.Msg });
      validar.Msg = [];
      return;
    } else {
      const resultado = getHistoricoInflacaoPorAno(anoIPCA);

      if (resultado.length === 0) {
        res.status(400).json({ erro: "Ano não encontrado" });
        return;
      } else {
        res.json(resultado); // Retorna o histórico do ano especificado
      }
    }
  }
});

// Endpoint para buscar o histórico de inflação IPCA por ID
app.get("/historicoIPCA/:id", (req, res) => {
  let id = req.params.id; // ID do histórico

  // Validação do ID recebido
  const validar = ValidacaoErroId(id);

  if (validar.status) {
    res.status(400).json({ erro: "Parâmetros Inválidos: " + validar.Msg });
    validar.Msg = [];
    return;
  } else {
    id = parseInt(id);
    const historicoIPCA = getHistoricoInflacaoId(id);
    if (!historicoIPCA) {
      res.status(400).json({ erro: "ID não encontrado" });
      return;
    }
    res.json(historicoIPCA); // Retorna o histórico do ID especificado
  }
});

// Inicializa o servidor na porta 8080
app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});

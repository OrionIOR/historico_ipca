let MsgErro = [];
let statusErro = false;
let validacao = { Msg: MsgErro, status: statusErro };

const validarValor = (valor) => {
  if (isNaN(valor) || valor <= 0) {
    validacao.Msg.push("Não é um Valor Valido");
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

const validaAnos = (anoIncial, anoFinal) => {
  if (anoIncial > anoFinal) {
    validacao.Msg.push("O ano inicial não pode ser maior que o ano final");
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

const validaMeses = (mesInicial, mesFinal) => {
  if (mesInicial > mesFinal) {
    validacao.Msg.push("O mês inicial não pode ser maior que o Mês final");
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

const validarAnoMes = (num) => {
  if (!Number.isInteger(num)) {
    validacao.Msg.push("Não é um ANO ou MÊS valido");
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

const validarMes = (mes) => {
  if (mes < 1 || mes > 12) {
    validacao.Msg.push("O MÊS tem que está entre 1 e 12");
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

const validarAno = (minAno, maxAno, ano) => {
  if (ano < minAno && ano > maxAno) {
    validacao.Msg.push(`O ANO tem que está entre ${minAno} e ${maxAno}`);
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

const validarMesLimite = (mes, mesLimite) => {
  if (mes >= mesLimite) {
    validacao.Msg.push(
      `O mes ${mes} não pode ser maior que o mes ${mesLimite}`
    );
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

const validarUltimoMes = (ano, anoLimiteFinal, mes, mesLimite) => {
  if (ano === anoLimiteFinal && mes > mesLimite) {
    validacao.Msg.push(
      `O mes ${mes} não pode ser superior a ao mes ${mesLimite}`
    );
  } else {
    return false;
  }
};

export const ValidacaoErro = (
  valor,
  mesInicial,
  mesFinal,
  anoInicial,
  anoFinal,
  anoLimiteInicial,
  anoLimiteFinal,
  mesLimite
) => {
  if (
    validarValor(valor) ||
    validarAnoMes(mesInicial) ||
    validarAnoMes(mesFinal) ||
    validarAnoMes(anoInicial) ||
    validarAnoMes(anoFinal)
  ) {
    return validacao;
  } else if (
    validarMes(mesInicial) ||
    validarMes(mesFinal) ||
    validaAnos(anoInicial, anoFinal) ||
    validaMeses(mesInicial, mesFinal) ||
    validarAno(anoLimiteInicial, anoLimiteFinal, anoInicial) ||
    validarAno(anoLimiteInicial, anoLimiteFinal, anoFinal) ||
    validarUltimoMes(anoInicial, anoLimiteFinal, mesInicial, mesLimite) ||
    validarUltimoMes(anoFinal, anoLimiteFinal, mesFinal, mesLimite)
  ) {
    return validacao;
  } else {
    return false;
  }
};

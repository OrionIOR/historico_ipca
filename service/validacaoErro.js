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

const ValidarMesesNoAno = (anoIncial, anoFinal, mesInicial, mesFinal) => {
  if (anoIncial == anoFinal && mesInicial > mesFinal) {
    validacao.Msg.push([
      `No periodo dentro do mesmo ano o mes incial não pode ser superior o mes final`,
    ]);
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

const validarUltimoMes = (ano, anoLimiteFinal, mes, mesLimite) => {
  if (ano === anoLimiteFinal && mes > mesLimite) {
    validacao.Msg.push(
      `No ultimo ano do periodo o ano não pode ser superior ao mês ${mes}`
    );
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

//Validação para a rota calcularIPCA
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
    //Verefica se todos os campos foram preenchidos
    validarValor(valor) ||
    validarAnoMes(mesInicial) ||
    validarAnoMes(mesFinal) ||
    validarAnoMes(anoInicial) ||
    validarAnoMes(anoFinal) ||
    //Verifica se o mes esta entre 1 e 12
    validarMes(mesInicial) ||
    validarMes(mesFinal) ||
    //Verefica se o ano inicial não é maior que o ano final
    validaAnos(anoInicial, anoFinal) ||
    //Verefica se o ano esta dentro dos anos limites da base de dado
    validarAno(anoLimiteInicial, anoLimiteFinal, anoInicial) ||
    validarAno(anoLimiteInicial, anoLimiteFinal, anoFinal) ||
    //Verefica se no Ano maximo permitido o mês é superior ao mes Limite daquele ano
    validarUltimoMes(anoInicial, anoLimiteFinal, mesInicial, mesLimite) ||
    validarUltimoMes(anoFinal, anoLimiteFinal, mesFinal, mesLimite) ||
    //Verificar se o mes inicial é superior ao mes final dentro do mesmo ano
    ValidarMesesNoAno(anoInicial, anoFinal, mesInicial, mesFinal)
  ) {
    return validacao;
  } else {
    return false;
  }
};

export const ValidacaoErroId = (id) => {
  if (isNaN(id)) {
    validacao.Msg.push(`O id ${id} não é id valido`);
    validacao.status = true;
    return validacao;
  } else {
    return false;
  }
};

export const validarBuscaAno = (ano, maxAno, minAno) => {
  if (isNaN(ano)) {
    validacao.Msg.push(`Não é um ano valido`);
    validacao.status = true;
    return validacao;
  } else if (ano < minAno || ano > maxAno) {
    validacao.Msg.push(`O ano tem que ser entre ${minAno} e ${maxAno}`);
    validacao.status = true;
    return validacao;
  }
};

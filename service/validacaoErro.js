// Inicializa um array vazio para armazenar mensagens de erro
let MsgErro = [];
// Inicializa uma variável booleana para indicar o status de erro
let statusErro = false;
// Cria um objeto de validação com as mensagens de erro e o status de erro
let validacao = { Msg: MsgErro, status: statusErro };

// Função para validar se um valor é numérico e maior que zero
const validarValor = (valor) => {
  if (isNaN(valor) || valor <= 0) {
    validacao.Msg.push("Não é um Valor Valido");
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

// Função para validar se o ano inicial não é maior que o ano final
const validaAnos = (anoIncial, anoFinal) => {
  if (anoIncial > anoFinal) {
    validacao.Msg.push("O ano inicial não pode ser maior que o ano final");
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

// Função para validar se um número é um ano ou mês válido (inteiro)
const validarAnoMes = (num) => {
  if (!Number.isInteger(num)) {
    validacao.Msg.push("Não é um ANO ou MÊS valido");
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

// Função para validar se o mês está entre 1 e 12
const validarMes = (mes) => {
  if (mes < 1 || mes > 12) {
    validacao.Msg.push("O MÊS tem que está entre 1 e 12");
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

// Função para validar se o ano está dentro de um intervalo permitido
const validarAno = (minAno, maxAno, ano) => {
  if (ano < minAno && ano > maxAno) {
    validacao.Msg.push(`O ANO tem que está entre ${minAno} e ${maxAno}`);
    validacao.status = true;
    return true;
  } else {
    return false;
  }
};

// Função para validar se o mês inicial não é maior que o mês final dentro do mesmo ano
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

// Função para validar se o mês no último ano do período não é superior ao mês limite
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

// Função de validação para a rota calcularIPCA
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
    // Verifica se todos os campos foram preenchidos
    validarValor(valor) ||
    validarAnoMes(mesInicial) ||
    validarAnoMes(mesFinal) ||
    validarAnoMes(anoInicial) ||
    validarAnoMes(anoFinal) ||
    // Verifica se o mês está entre 1 e 12
    validarMes(mesInicial) ||
    validarMes(mesFinal) ||
    // Verifica se o ano inicial não é maior que o ano final
    validaAnos(anoInicial, anoFinal) ||
    // Verifica se o ano está dentro dos anos limites da base de dados
    validarAno(anoLimiteInicial, anoLimiteFinal, anoInicial) ||
    validarAno(anoLimiteInicial, anoLimiteFinal, anoFinal) ||
    // Verifica se no ano máximo permitido o mês é superior ao mês limite daquele ano
    validarUltimoMes(anoInicial, anoLimiteFinal, mesInicial, mesLimite) ||
    validarUltimoMes(anoFinal, anoLimiteFinal, mesFinal, mesLimite) ||
    // Verifica se o mês inicial é superior ao mês final dentro do mesmo ano
    ValidarMesesNoAno(anoInicial, anoFinal, mesInicial, mesFinal)
  ) {
    return validacao;
  } else {
    return false;
  }
};

// Função para validar se um ID é numérico
export const ValidacaoErroId = (id) => {
  if (isNaN(id)) {
    validacao.Msg.push(`O id ${id} não é id valido`);
    validacao.status = true;
    return validacao;
  } else {
    return false;
  }
};

// Função para validar se um ano está dentro de um intervalo permitido
export const validarBuscaAno = (ano, maxAno, minAno) => {
  if (isNaN(ano)) {
    validacao.Msg.push(`Não é um ano valido`);
    validacao.status = true;
    return validacao;
  } else if (ano < minAno || ano > maxAno) {
    validacao.Msg.push(`O ano tem que ser entre ${minAno} e ${maxAno}`);
    validacao.status = true;
    return validacao;
  } else {
    return validacao;
  }
};

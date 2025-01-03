# Histórico IPCA

Este projeto tem como objetivo fornecer uma ferramenta para consultar o histórico do Índice Nacional de Preços ao Consumidor Amplo (IPCA) no Brasil.

## Funcionalidades

- Consulta de dados históricos do IPCA.
- Visualização gráfica dos dados.
- Exportação dos dados para formatos CSV e JSON.

## Estrutura do Projeto

- `index.js`: Arquivo principal que configura e inicia o servidor Express.
- `service/servicos.js`: Contém funções para manipulação e cálculo dos dados do IPCA.
- `service/validacaoErro.js`: Contém funções para validação de entradas e tratamento de erros.
- `data/data.js`: Contém os dados históricos do IPCA.

## Endpoints

#### Obter Histórico do IPCA

- GET /historicoIPCA

#### Retorna o histórico completo do IPCA.

- Parâmetros de Consulta:
  ano (opcional): Filtra o histórico pelo ano especificado.

#### Obter Histórico do IPCA por ID

- GET /historicoIPCA/:id
  Retorna o histórico do IPCA para o ID especificado.

#### Calcular Reajuste do IPCA

- GET /historicoIPCA/calcularIPCA
  Calcula o reajuste do IPCA com base nos parâmetros fornecidos.
  Parâmetros de Consulta:
  valor: Valor inicial a ser reajustado.
  mesInicial: Mês inicial do período.
  mesFinal: Mês final do período.
  anoInicial: Ano inicial do período.
  anoFinal: Ano final do período.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/historico_ipca.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd historico_ipca
   ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

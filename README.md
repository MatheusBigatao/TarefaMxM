## Sumário
1. [Descrição do desafio técnico MxM](#descrição-do-desafio-técnico-mxmdesafio)

2. [Descrição da Aplicação](#descrição-da-aplicação)
3. [Vídeos Apresentação](#vídeos-de-apresentação)
4. [Como instalar](#como-instalar)
5. [Lista de Tarefas](#lista-de-tarefas)

## <a name="desafio"></a> Descrição do desafio técnico MxM
Criar uma tela de cadastro de pessoa onde deverá constar as informações abaixo que deverão ser persistidos em qualquer bando de dados.

- Nome
- CPF ou CNPJ(com máscara)
- E-mail
- Telefone
- Endereço

O Campo CEP deverá carregar as informações de endereços através da API de CEP dos correios, ou qualquer outra API.

### Regras

Qualquer tecnologia que tenha conhecimento tanto para front-end, quanto para back-end
Preferencias
Angular
.net
Requisitos obrigatórios:

Publicar o código fonte projeto no GitHub
Projeto precisa estar funcionando, ou caso não funcione disponibilizar todo o código fonte criado e os motivos pelo Insucesso
Preferencialmente o sistema deverá ser publicado em alguma nuvem, ou no dia da apresentação na máquina do desenvolvedor para testes.


## Descrição da Aplicação

#### Tecnologias e frameworks:
- C#
- .Net (6.0)
- Angular
- Typescript
- MySQL


Foi utilizado a API do ViaCep (https://viacep.com.br/) para obter os dados de endereço. Por não ser uma API oficial dos correios, utilizou-se de um classe intermediária (MiddleAPICep) que tem uma classe armazenada em um variável, com a função de fazer a chamada para essa API. Fez-se dessa forma para que, caso essa API pare de funcionar, seja fácil a manutenção, pois será necessário apenas trocar nessa variável por outra classe que chamaria outra API com a mesma finalidade de retornar o endereço pelo CEP.
## Vídeos de Apresentação

#### Parte 1 (Link para youtube)
[![Everything Is AWESOME](https://img.youtube.com/vi/wb7tlcakLtk/0.jpg)](https://www.youtube.com/watch?v=wb7tlcakLtk "Everything Is AWESOME")

#### Parte 2 Back-End (Link para youtube)
[![Everything Is AWESOME](https://img.youtube.com/vi/qp02UBNo78g/0.jpg)](https://www.youtube.com/watch?v=qp02UBNo78g "Everything Is AWESOME")

## Como instalar

É necessário ter o MySQL e .NET 6.0 instalados em sua máquina previamente.

### Iniciando Front-end
Em seu terminal, faça um clone do repositório
```bash
git clone https://github.com/MatheusBigatao/TarefaMxM.git
```
Entre na pasta "FrontEnd" pelo terminal
```bash
cd TarefaMxM/FrontEnd/FrontTarefaMxM
```
Execute a instalação dos módulos
```bash
npm install
```
Inicialize o server do Angular com o comando abaixo
```bash
ng serve
```
Acesse o site pelo caminho http://localhost:4200/

### Iniciando Back-end

Insira os dados de seu banco MySQL no arquivo "BackEnd\appsettings.json".

Em seu terminal, entre na pasta "BackEnd"
```bash
cd TarefaMxM/BackEnd
```
Atualize o banco de dados com as tabelas necessárias para aplicação rodando a migration pelo terminal
```bash
dotnet ef database update
```
Inicialize o servidor .NET com o comando abaixo
```bash
dotnet run
```

### Integrando Back-end com Front-end
Entre no arquivo no caminho "FrontEnd\FrontTarefaMxM\src\app\services\urlGlobal.ts".
Edite esse arquivo com a URL que o .NET forneceu (sem barra "/" no final)
```ts
// Exemplo
export const urlGlobal = 'https://localhost:7096'; 
```

## Lista de tarefas
### BackEnd
- [x] Conexão com banco MySQL
  - [x] Criar Migrations
  - [x] Testar INSERT em qualquer tabela
- [x] Fazer chamada API dos Correios e chamá-la pelo Controller
  - [x] Criar Proxy para API
- [ ] Chamada API para mostrar todos as pessoas cadastradas
- [ ] Chamada API para mostrar o endereço de uma pessoa
 

### FrontEnd
- [x] Criar serviço para cadastro do usuário
- [x] Criar serviço para acessar API dos correios
- [x] Criar página de cadastro de usuário
  - [x] Chamar API dos correios quando consultar CEP
  - [x] Atualizar inputs com as informações da API
- [x] Colocar validadores dos inputs
  - [X] Máscara para CPF ou CNPJ (auto preencher com pontos e traços)
  - [x] Email
  - [x] Telefone
- [ ] Página para acessar todos os dados das pessoas cadastradas


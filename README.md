# Escambo Literário 📚

Este projeto foi desenvolvido como um protótipo durante o 4º semestre do curso de Análise e Desenvolvimento de Sistemas na UNISA (Universidade de Santo Amaro).

O Escambo Literário é uma plataforma para troca de livros, onde os usuários podem cadastrar seus livros, buscar por títulos disponíveis e gerenciar suas trocas. O projeto também inclui funcionalidades como sugestão de livros por IA e integração com o Google Maps para localizar pontos de troca.

## Desenvolvedores:

- Jean Carlos
- Kaique Sena
- Lucas Batista
- Marlon Lucas
- Pedro Paulo
- Rafael Alves

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Dependências](#dependências)
- [Chaves de API](#chaves-de-api)

## Visão Geral

O projeto foi desenvolvido utilizando `Node.js`, com o banco de dados `MySQL`. Ele permite que os usuários cadastrem livros, busquem por livros, visualizem um perfil para gerenciar suas trocas, e conta com uma sugestão de livros por meio de uma inteligência artificial.

## Funcionalidades

- **Cadastro de livros**: Cadastre livros com informações como título, autor, sinopse, editora, e muito mais.
- **Busca de livros**: Pesquise por títulos disponíveis.
- **Gerenciamento de perfil**: Visualize e edite os livros que você cadastrou.
- **Sugestão de livros via IA**: Receba sugestões de leitura através do Bibliotecário AI.
- **Integração com Google Maps**: Veja pontos de troca (bibliotecas ou sebos) próximos ao local escolhido.

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/escambo-literario.git
   cd escambo-literario
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Certifique-se de que o MySQL está rodando e configurado corretamente.
4. Crie o banco de dados utilizando o script SQL disponível no repositório.

- O script está localizado na pasta `database` no arquivo `create_database.sql`.

## Configuração

1. Crie um arquivo de configuração para o banco de dados e API Keys:

- Renomeie os arquivos `config/dbConfig.example.js` e `config/apiKeys.example.js` para `dbConfig.js` e `apiKeys.js` respectivamente.
- Insira suas credencias de banco de dados e chave da API do Google Books nesses arquivos.

```bash
// config/dbConfig.js
module.exports = {
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'nome_do_banco_de_dados'
};

// config/apiKeys.js
module.exports = {
    googleBooksApiKey: 'sua_chave_api',
    copilotKey: 'sua_chave_copilot',
};
```

2. Rode o servidor localmente:

```bash
node server/server.js
```

3. Acesse a aplicação em seu navegador:

```bash
http://localhost:3000
```

## Uso

- Página inicial: Busque por livros disponíveis.
- Cadastro de livros: Acesse a página de cadastro de livros para adicionar novos livros à plataforma.
- Perfil de usuário: Visualize, edite ou exclua livros cadastrados.
- Bibliotecário AI: Receba sugestões de leitura baseadas nos seus interesses.

## Dependências

O projeto utiliza as seguintes dependências:

    - Express: Framework web para Node.js.
    - MySQL2: Biblioteca para interagir com o banco de dados MySQL.

Para ver todas as dependências, consulte o arquivo `package.json`.

## Chaves de API

O projeto também depende das seguintes chaves de API:

- **Chave da API do Copilot**: Necessária para a integração com o Copilot AI.
- **Chave da API do Google Books**: Necessária para exibir imagem de capa dos livros.

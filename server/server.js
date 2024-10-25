// Importa os módulos necessários
const express = require('express'); // Framework para criação de servidores web
const mysql = require('mysql2'); // Biblioteca para interagir com o MySQL
const dbConfig = require('../config/dbConfig'); // Arquivo com as configurações do banco de dados
const { googleBooksApiKey, copilotKey } = require('../config/apiKeys'); // Chave da API do Google Books
const path = require('path'); // Módulo para manipular caminhos de arquivos
const app = express(); // Cria uma instância do aplicativo Express

// Middleware para lidar com dados da requisição 
app.use(express.urlencoded({ extended: true })); // permite lidar com dados enviados por formulários
app.use(express.json()); // permite lidar com dados em formato JSON

// Conexão com o banco de dados
const pool = mysql.createPool(dbConfig); // O pool de conexões permite múltiplas conexões reutilizáveis ao banco
const promisePool = pool.promise(); // Converte o pool em Promises para facilitar o uso assíncrono

// Endpoint para enviar a chave da API do Copilot para o frontend
app.get('/api/copilot-key', (req, res) => {
    res.json({ key: copilotKey });
});

// Endpoint para enviar a chave da API do Google Books para o frontend
app.get('/api/google-books-key', (req, res) => {
    res.json({ key: googleBooksApiKey });
});

// Middleware para servir arquivos estáticos da pasta 'public'
// Isso permite que arquivos como CSS, JavaScript e imagens sejam servidos diretamente
app.use(express.static(path.join(__dirname, '../public')));

// Endpoints para servir páginas HTML específicas
// Esses endpoints enviam arquivos HTML quando o usuário acessa certas rotas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/index.html')));
app.get('/cadastro-livros', (req, res) => res.sendFile(path.join(__dirname, '../views/cadastro-livros.html')));
app.get('/bibliotecario', (req, res) => res.sendFile(path.join(__dirname, '../views/bibliotecario.html')));
app.get('/perfil', (req, res) => res.sendFile(path.join(__dirname, '../views/perfil.html')));

// Endpoint para adicionar um novo livro ao banco de dados
// O método POST é utilizado porque estamos enviando dados para serem inseridos
app.post('/adicionar-livro', async (req, res) => {
    const { titulo, sinopse, autor, ano_publicacao, editora, avaliacao, genero, paginas, idioma, condicao, localizacao } = req.body;
    const query = `
        INSERT INTO Livros (titulo, sinopse, autor, ano_publicacao, editora, avaliacao, genero, paginas, idioma, condicao, localizacao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await promisePool.query(query, [titulo, sinopse, autor, ano_publicacao, editora, avaliacao, genero, paginas, idioma, condicao, localizacao]);
        res.status(200).json({ message: "Livro cadastrado com sucesso!" });
    } catch (err) {
        console.error("Erro ao cadastrar livro:", err);
        res.status(500).json({ message: "Erro ao adicionar livro." });
    }
});

// Endpoint para buscar livros pelo título
// O método GET é utilizado para retornar dados com base em um parâmetro (neste caso, o título)
app.get('/buscar-livro', async (req, res) => {
    const { titulo } = req.query;
    const query = `
        SELECT titulo, autor, avaliacao, ano_publicacao, editora, sinopse, localizacao
        FROM Livros
        WHERE titulo LIKE ?;
    `;
    
    try {
        const [livros] = await promisePool.query(query, [`%${titulo}%`]);
        res.json(livros);
    } catch (err) {
        console.error("Erro ao buscar livros:", err);
        res.status(500).send("Erro ao buscar livros.");
    }
});

// Endpoint para listar todos os livros na página de perfil
// Retorna todos os livros disponíveis no banco de dados
app.get('/livros', async (req, res) => {
    try {
        const [rows] = await promisePool.query("SELECT * FROM Livros");
        res.json(rows);
    } catch (err) {
        console.error("Erro ao buscar livros:", err);
        res.status(500).send("Erro ao buscar livros.");
    }
});

// Endpoint para buscar um livro específico pelo ID
app.get('/livros/:id', async (req, res) => {
    const { id } = req.params; // Obtém o ID do livro da URL

    try {
        const [rows] = await promisePool.query("SELECT * FROM Livros WHERE id = ?", [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send("Livro não encontrado.");
        }
    } catch (err) {
        console.error("Erro ao buscar livro:", err);
        res.status(500).send("Erro ao buscar livro.");
    }
});

// Endpoint para atualizar informações de um livro específico
app.put('/livros/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, autor } = req.body;

    if (!titulo || !autor) {
        return res.status(400).send('Título e Autor são obrigatórios para a atualização.');
    }

    const query = `
        UPDATE Livros 
        SET titulo = ?, autor = ?
        WHERE id = ?
    `;

    try {
        const [result] = await promisePool.query(query, [titulo, autor, id]);
        if (result.affectedRows > 0) {
            res.send('Livro atualizado com sucesso!');
        } else {
            res.status(404).send('Livro não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao atualizar livro:', err);
        res.status(500).send('Erro ao atualizar livro.');
    }
});

// Endpoint para excluir um livro específico
app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await promisePool.query("DELETE FROM Livros WHERE id = ?", [id]);
        if (result.affectedRows > 0) {
            res.send("Livro excluído com sucesso!");
        } else {
            res.status(404).send("Livro não encontrado.");
        }
    } catch (err) {
        console.error("Erro ao excluir livro:", err);
        res.status(500).send("Erro ao excluir livro.");
    }
});

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
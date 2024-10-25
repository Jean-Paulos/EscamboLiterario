-- Cria o banco de dados 'cadastro-livros'
CREATE DATABASE `cadastro-livros`;

-- Seleciona o banco de dados para usar
USE `cadastro-livros`;

-- Cria a tabela 'Livros' com os campos fornecidos
CREATE TABLE `Livros` (
    id INT AUTO_INCREMENT PRIMARY KEY,                                 -- Chave primária com auto incremento
    titulo VARCHAR(255) NOT NULL,                                      -- Campo para o título do livro
    sinopse TEXT,                                                      -- Campo para a sinopse
    autor VARCHAR(255) NOT NULL,                                       -- Campo para o autor
    ano_publicacao YEAR,                                               -- Campo para o ano de publicação
    editora VARCHAR(255),                                              -- Campo para a editora
    avaliacao DECIMAL(2,1) CHECK (avaliacao >= 0 AND avaliacao <= 5),  -- Avaliação de 0 a 5
    genero VARCHAR(100),                                               -- Gênero do livro
    paginas SMALLINT UNSIGNED,                                         -- Número de páginas
    idioma VARCHAR(100),                                               -- Idioma do livro
    condicao VARCHAR(50),                                              -- Condição do livro (usado, novo, etc.)
    localizacao VARCHAR(255)                                           -- Local onde o livro está disponível para troca
    data_insercao DATETIME DEFAULT CURRENT_TIMESTAMP                   -- Data de inserção, padrão é o timestamp atual
);

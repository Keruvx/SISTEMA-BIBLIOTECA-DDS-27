-- CRIAR DATABASE
CREATE DATABASE db_biblioteca;
DROP DATABASE db_biblioteca;
-- USAR O BANCO
USE db_biblioteca;

-- CRIAR TABELA
-- TABELA USUARIOS
CREATE TABLE tb_usuarios(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (100) NOT NULL,
    email VARCHAR (100),
    senha VARCHAR (50),
    perfil VARCHAR (10)
);

-- TABELA LEITOR
CREATE TABLE tb_leitores(
	id_leitor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (100) NOT NULL,
    cpf VARCHAR (15),
    telefone VARCHAR(15),
    email VARCHAR(100)
);

-- TABELA LIVRO
CREATE TABLE tb_livros(
	id_livro INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100),
    ano_publicacao DATE,
    genero VARCHAR(100),
    esta_disponivel TINYINT
);

-- TABELA EMPRESTIMO
CREATE TABLE tb_emprestimo(
	id_emprestimo INT PRIMARY KEY AUTO_INCREMENT,
    dt_emprestimo DATE,
    dt_previsao_devolucao DATE,
    dt_devolucao DATE,
    leitor int,
    livro int,
	-- CHAVE ESTRANGEIRA
    FOREIGN KEY (leitor) REFERENCES tb_leitores(id_leitor),
    FOREIGN KEY (livro) REFERENCES tb_livros(id_livro)
);

-- INSERIR INFORMAÇOES
INSERT INTO tb_leitores(nome, cpf, telefone, email)
VALUES 
("Marcos", "99", "999", "marcos99@gmail.com"),
("Narcos", "88", "888", "narcos@gmail.com"),
("Osvaldo", "67", "677", "Osv@gmail.com");

-- INSERIR LIVROS
INSERT INTO tb_livros(titulo, autor, ano_publicacao, genero, esta_disponivel)
VALUES
("Narmia", "Aslan", "1900-08-25", "Foda", 1),
("Valorant", "Alan", "1900-12-25", "Cara", 1),
("League of Legends", "Ryze", "2009-07-21", "Lixo", 1);

-- INSERIR EMPRESTIMO
INSERT INTO tb_emprestimo(dt_emprestimo,dt_previsao_devolucao,dt_devolucao,leitor,livro)
VALUES
	(current_date(),"2026-12-26", "3000-12-25", 1,2),
    (current_date(),"2026-12-26", "3000-12-25", 2,2),
    (current_date(),"2026-12-26", "3000-12-25", 3,2);

-- VER TABELAS
SELECT * FROM tb_leitores;

-- JUNTAR TABELAS
SELECT * FROM tb_emprestimo AS emp JOIN tb_leitores AS le ON emp.leitor = le.id_leitor JOIN tb_livros AS li ON emp.livro = li.id_livro;


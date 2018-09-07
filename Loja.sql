CREATE DATABASE Loja;
USE Loja;

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome_produto` varchar(150) NOT NULL,
  `preco` float NOT NULL
);
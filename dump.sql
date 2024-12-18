CREATE TABLE usuarios (
    id serial primary key,
    nome text not null,
    email text not null unique,
    senha text not null
);
CREATE TABLE categorias (
    id serial primary key,
    descricao text
);
INSERT INTO categorias (descricao)
values ('Informática');
INSERT INTO categorias (descricao)
values ('Celulares');
INSERT INTO categorias (descricao)
values ('Beleza e Perfumaria');
INSERT INTO categorias (descricao)
values ('Mercado');
INSERT INTO categorias (descricao)
values ('Livros e Papelaria');
INSERT INTO categorias (descricao)
values ('Brinquedos');
INSERT INTO categorias (descricao)
values ('Moda');
INSERT INTO categorias (descricao)
values ('Bebê');
INSERT INTO categorias (descricao)
values ('Games');
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    valor INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id)
);
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cpf TEXT NOT NULL UNIQUE,
    cep TEXT,
    rua TEXT,
    numero INTEGER,
    bairro TEXT,
    cidade TEXT,
    estado TEXT
);
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    observacao TEXT,
    valor_total INTEGER NOT NULL
);
CREATE TABLE pedido_produtos(
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id),
    produto_id INTEGER NOT NULL REFERENCES produtos(id),
    quantidade_produto INTEGER NOT NULL,
    valor_produto INTEGER NOT NULL
);
ALTER TABLE produtos ADD COLUMN produto_imagem TEXT;
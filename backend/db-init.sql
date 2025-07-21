-- Criação da tabela de salas
CREATE TABLE IF NOT EXISTS Sala (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
);

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS Usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL
);

-- Criação da tabela de visitantes
CREATE TABLE IF NOT EXISTS Visitante (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    data_nascimento TEXT,
    email TEXT,
    sala_destino_id INTEGER NOT NULL,
    data_entrada TEXT NOT NULL DEFAULT (datetime('now')),
    data_saida TEXT,
    FOREIGN KEY (sala_destino_id) REFERENCES Sala(id)
);

-- Criação da tabela de logs
CREATE TABLE IF NOT EXISTS Log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    acao TEXT NOT NULL,
    data TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
); 
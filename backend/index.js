const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

const app = express();
app.use(cors());
app.use(express.json());

// Caminho do banco e do script SQL
const DB_PATH = path.join(__dirname, 'db.sqlite');
const INIT_SQL_PATH = path.join(__dirname, 'db-init.sql');

// Inicializa o banco e executa o script de criação de tabelas
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) throw err;
    const initSql = fs.readFileSync(INIT_SQL_PATH, 'utf-8');
    db.exec(initSql, (err) => {
        if (err) throw err;
        console.log('Banco de dados inicializado!');
    });
});

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

// Middleware de autenticação
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token inválido' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
}

// Função utilitária para registrar logs
function registrarLog(usuarioId, acao) {
    db.run('INSERT INTO Log (usuario_id, acao) VALUES (?, ?)', [usuarioId, acao]);
}

// Cadastro de usuário
app.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }
    db.get('SELECT id FROM Usuario WHERE email = ?', [email], async (err, row) => {
        if (row) return res.status(400).json({ error: 'Email já cadastrado' });
        const senhaHash = await bcrypt.hash(senha, 10);
        db.run('INSERT INTO Usuario (nome, email, senha_hash) VALUES (?, ?, ?)', [nome, email, senhaHash], function (err) {
            if (err) return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            registrarLog(null, `Usuário cadastrado: ${email}`);
            res.status(201).json({ id: this.lastID, nome, email });
        });
    });
});

// Login
app.post('/auth/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    db.get('SELECT * FROM Usuario WHERE email = ?', [email], async (err, user) => {
        if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });
        const senhaOk = await bcrypt.compare(senha, user.senha_hash);
        if (!senhaOk) return res.status(400).json({ error: 'Senha incorreta' });
        const token = jwt.sign({ id: user.id, nome: user.nome, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
        registrarLog(user.id, `Login realizado`);
        res.json({ token });
    });
});

// Cadastro de sala (protegido)
app.post('/salas', authMiddleware, (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: 'Nome da sala é obrigatório' });
    db.run('INSERT INTO Sala (nome) VALUES (?)', [nome], function (err) {
        if (err) return res.status(500).json({ error: 'Erro ao cadastrar sala' });
        registrarLog(req.user.id, `Cadastrou sala: ${nome}`);
        res.status(201).json({ id: this.lastID, nome });
    });
});

// Listar salas (protegido)
app.get('/salas', authMiddleware, (req, res) => {
    db.all('SELECT * FROM Sala', [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erro ao listar salas' });
        res.json(rows);
    });
});

// Cadastro de visitante (protegido)
app.post('/visitantes', authMiddleware, (req, res) => {
    const { nome, cpf, sala_destino_id, data_nascimento, email } = req.body;
    if (!nome || !cpf || !sala_destino_id) {
        return res.status(400).json({ error: 'Nome, CPF e sala_destino_id são obrigatórios' });
    }
    const tz = req.headers['x-timezone'] || 'America/Sao_Paulo';
    const dataEntrada = dayjs().tz(tz).format('YYYY-MM-DD HH:mm:ss');
    db.get(
        'SELECT COUNT(*) as total FROM Visitante WHERE sala_destino_id = ? AND data_saida IS NULL',
        [sala_destino_id],
        (err, row) => {
            if (err) return res.status(500).json({ error: 'Erro ao verificar visitantes ativos' });
            if (row.total >= 3) {
                return res.status(400).json({ error: 'Sala já possui 3 visitantes ativos' });
            }
            db.get(
                'SELECT id FROM Visitante WHERE cpf = ? AND data_saida IS NULL',
                [cpf],
                (err, visitanteAtivo) => {
                    if (visitanteAtivo) {
                        return res.status(400).json({ error: 'Já existe um visitante ativo com esse CPF' });
                    }
                    db.run(
                        'INSERT INTO Visitante (nome, cpf, sala_destino_id, data_nascimento, email, data_entrada) VALUES (?, ?, ?, ?, ?, ?)',
                        [nome, cpf, sala_destino_id, data_nascimento || null, email || null, dataEntrada],
                        function (err) {
                            if (err) return res.status(500).json({ error: 'Erro ao cadastrar visitante' });
                            registrarLog(req.user.id, `Cadastrou visitante: ${nome} (CPF: ${cpf}) na sala ${sala_destino_id}`);
                            res.status(201).json({ id: this.lastID, nome, cpf, sala_destino_id, data_nascimento, email });
                        }
                    );
                }
            );
        }
    );
});

// Listar visitantes ativos (protegido)
app.get('/visitantes/ativos', authMiddleware, (req, res) => {
    const sql = `
    SELECT v.*, s.nome as sala_nome
    FROM Visitante v
    JOIN Sala s ON v.sala_destino_id = s.id
    WHERE v.data_saida IS NULL
    ORDER BY v.data_entrada DESC
  `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erro ao listar visitantes ativos' });
        res.json(rows);
    });
});

// Listar histórico de visitantes (protegido)
app.get('/visitantes/historico', authMiddleware, (req, res) => {
    const sql = `
    SELECT v.*, s.nome as sala_nome
    FROM Visitante v
    JOIN Sala s ON v.sala_destino_id = s.id
    ORDER BY v.data_entrada DESC
  `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erro ao listar histórico de visitantes' });
        res.json(rows);
    });
});

// Registrar saída de visitante (protegido)
app.patch('/visitantes/:id/saida', authMiddleware, (req, res) => {
    const { id } = req.params;
    const dataSaida = new Date().toISOString();
    db.run(
        'UPDATE Visitante SET data_saida = ? WHERE id = ? AND data_saida IS NULL',
        [dataSaida, id],
        function (err) {
            if (err) return res.status(500).json({ error: 'Erro ao registrar saída' });
            if (this.changes === 0) return res.status(404).json({ error: 'Visitante não encontrado ou já saiu' });
            registrarLog(req.user.id, `Registrou saída do visitante id: ${id}`);
            res.json({ id, data_saida: dataSaida });
        }
    );
});

// Listar logs (protegido)
app.get('/logs', authMiddleware, (req, res) => {
    const sql = `
    SELECT l.*, u.nome as usuario_nome, u.email as usuario_email
    FROM Log l
    LEFT JOIN Usuario u ON l.usuario_id = u.id
    ORDER BY l.data DESC
  `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erro ao listar logs' });
        res.json(rows);
    });
});

// Exemplo de rota
app.get('/', (req, res) => {
    res.send('API Controle de Visitantes rodando!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
}); 
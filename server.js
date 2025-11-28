const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg'); // Cliente do PostgreSQL

const app = express();
const PORT = 3000;

// --- CONFIGURAÇÕES GERAIS ---
app.use(cors()); // Permite que o navegador acesse
app.use(express.json()); // Permite ler JSON enviado pelo front
app.use(express.static(path.join(__dirname))); // Serve os arquivos HTML/CSS

// --- CONEXÃO COM O BANCO DE DADOS (VPS) ---
// Substitua os dados abaixo pelos da sua VPS
const pool = new Pool({
    user: 'postgres',           // Seu usuário (geralmente é postgres)
    host: '95.216.164.158',      // Ex: 192.168.0.1 (IP da máquina)
    database: 'VendaBots',  // Ex: botmaster_db
    password: '123@Azenha', // A senha do banco
    port: 5432,                 // Porta padrão
});

// Teste de conexão ao iniciar o servidor
pool.connect((err, client, release) => {
    if (err) {
        return console.error('ERRO CRÍTICO: Não foi possível conectar ao banco.', err.stack);
    }
    console.log('✅ Conectado com sucesso ao PostgreSQL!');
    release();
});

// --- ROTAS ---

// 1. Rota Principal (Carrega o site)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. Rota de API (Recebe o formulário)
app.post('/api/enviar', async (req, res) => {
    // Recebe os 4 campos do Frontend
    const { nome, email, numero, mensagem } = req.body;

    // Validação simples
    if (!nome || !email || !numero) {
        return res.status(400).json({ error: "Nome, Email e Número são obrigatórios." });
    }

    try {
        // Query SQL atualizada para 4 campos
        const query = `
            INSERT INTO contatos (nome, email, numero, mensagem) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        
        const values = [nome, email, numero, mensagem];

        // Executa a query no banco
        const resultado = await pool.query(query, values);

        console.log("📝 Novo contato salvo:", resultado.rows[0]);

        // Responde para o Frontend que deu tudo certo
        res.status(201).json({ 
            message: "Dados salvos com sucesso!",
            dados: resultado.rows[0]
        });

    } catch (err) {
        console.error("Erro ao salvar no banco:", err);
        res.status(500).json({ error: "Erro interno no servidor ao salvar dados." });
    }
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
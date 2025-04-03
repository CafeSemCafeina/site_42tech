const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('.'));

// Rota para salvar as respostas do formulário
app.post('/formularios.json', (req, res) => {
    const respostas = req.body;
    fs.writeFile('formularios.json', JSON.stringify(respostas, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar arquivo:', err);
            res.status(500).json({ error: 'Erro ao salvar respostas' });
            return;
        }
        res.json({ success: true });
    });
});

// Rota para obter as respostas do formulário
app.get('/formularios.json', (req, res) => {
    fs.readFile('formularios.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler arquivo:', err);
            res.status(500).json({ error: 'Erro ao ler respostas' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
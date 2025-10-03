const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Servidor rodando 🚀');
});

app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar clientes');
  }
});

app.post('/clientes', async (req, res) => {
  const { nome, email, idade } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO clientes (nome, email, idade) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, idade]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao cadastrar cliente');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

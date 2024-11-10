const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 25000;

// Middleware para permitir CORS
app.use(cors());
app.use(express.json()); // Middleware para analisar o corpo das requisições como JSON

// Configurar a conexão com o banco de dados
const pool = new Pool({
  connectionString: 'postgresql://postgres.hxlymogxrvezaakipfoj:Y8XN*hv745M6$ib@aws-0-sa-east-1.pooler.supabase.com:6543/postgres',
});

app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' https://fonts.gstatic.com;");
  next();
});

// Rota para obter todos os dados da tabela Carro
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Carro');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para obter um carro específico pela id
app.get('/data/:carId', async (req, res) => {
  const { carId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Carro WHERE id = $1', [carId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para inserir um carro (POST)
app.post('/data', async (req, res) => {
  const { modelo, marca, ano, categoria, disponibilidade = false, arquivo = null } = req.body;

  if (!modelo || !marca || !ano || !categoria) {
    return res.status(400).json({ error: 'Modelo, marca, ano e categoria são obrigatórios.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO Carro (modelo, marca, ano, categoria, disponibilidade, arquivo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [modelo, marca, ano, categoria, disponibilidade, arquivo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar um carro (PUT)
app.put('/data/:carId', async (req, res) => {
  const { carId } = req.params;
  const { modelo, marca, ano, categoria, arquivo } = req.body;

  // Inicializa arrays para os valores de atualização
  const updates = [];
  const values = [];

  // Verificar se os campos foram passados e adicioná-los à query
  if (modelo) {
    updates.push('modelo = $' + (updates.length + 1));
    values.push(modelo);
  }
  if (marca) {
    updates.push('marca = $' + (updates.length + 1));
    values.push(marca);
  }
  if (ano) {
    updates.push('ano = $' + (updates.length + 1));
    values.push(ano);
  }
  if (categoria) {
    updates.push('categoria = $' + (updates.length + 1));
    values.push(categoria);
  }
  if (arquivo !== undefined) {
    updates.push('arquivo = $' + (updates.length + 1));
    values.push(arquivo);
  }

  // Verificar se pelo menos um campo foi fornecido para a atualização
  if (updates.length === 0) {
    return res.status(400).json({ error: 'Nenhum campo válido fornecido para atualização.' });
  }

  // Adiciona o ID do carro na última posição dos valores
  values.push(carId);

  // Gerar a query dinamicamente
  const query = `
    UPDATE Carro
    SET ${updates.join(', ')}
    WHERE id = $${values.length}
    RETURNING *`;

  try {
    const result = await pool.query(query, values);

    // Caso o carro não seja encontrado, retorna erro
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }

    // Retorna os dados atualizados do carro
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar carro: ' + err.message });
  }
});

// Rota para excluir um carro (DELETE)
app.delete('/data/:carId', async (req, res) => {
  const { carId } = req.params;

  try {
    const result = await pool.query('DELETE FROM Carro WHERE id = $1 RETURNING *', [carId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }

    res.status(200).json({ message: 'Carro excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

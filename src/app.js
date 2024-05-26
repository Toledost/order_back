import express from 'express';
import { pool } from './db.js';
import { PORT } from './config.js'

const app = express();

app.get('/', async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM users`)
  res.json(rows)
});

app.get('/ping', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT "hola mundillo" AS RESULT');
    console.log(result[0]);
    res.json(result[0]);
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});

app.get('/create', async (req, res) => {
    try {
      const result = await pool.query('INSERT INTO users(name) VALUES("Juan")');
      console.log(result);
      res.json(result);
    } catch (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
    }
});



app.listen(PORT, () => {
  console.log('Server on port', PORT);
});

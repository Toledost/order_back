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
    const [result] = await pool.query('SELECT * FROM users');
    console.log(result[0]);
    res.json(result[0]);
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});

app.get('/crear2', async (req, res) => {
    try {
      const [result] = await pool.query("INSERT INTO users (id, name) VALUES ('1','JUANcito');");
      console.log(result[0]);
      res.json(result[0]);
    } catch (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
    }
  });

app.get('/crear', async (req, res) => {
    try {
      const [result] = await pool.query('INSERT INTO users (name) VALUES ("JUANcito")');
      console.log(result); // Use result instead of result[0]
      res.json(result); // Use result instead of result[0]
    } catch (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).json({ error: 'Error ejecutando1 la consulta' });
    }
  });
  

app.listen(PORT, () => {
  console.log('Server on port', PORT);
});

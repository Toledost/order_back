import express from 'express';
import { pool } from './db.js';
import { PORT } from './config.js'
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());

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

app.get('/productos', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT id idProducto, nombre nombreProducto, descripcion FROM productos;');
    console.log(result[0]);
    res.json(result[0]);
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error ejecutando la consulta' });
  }
});

app.post('/crear2', async (req, res) => {
    try {
      const [result] = await pool.query("INSERT INTO users (name) VALUES ('nombre prueba2');");
      console.log(result[0]);
      res.json(result);
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
  


  app.post('/users/account/name', async (req, res) => {
    try {
      const { name } = req.body;
      const [result] = await pool.query('SELECT name FROM users WHERE name = ?', [name]);
      console.log(result);
      if (result.length > 0) {
        res.json({ usuarioLogueado: true });
      } else {
        res.json({ usuarioLogueado: false });
      }
    } catch (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
    }
  });
  

app.listen(PORT, () => {
  console.log('Server on port', PORT);
});

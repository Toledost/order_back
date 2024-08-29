import express from "express";
import { pool } from "./db.js";
import { PORT } from "./config.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM users`);
  res.json(rows);
});

app.get("/usuarios", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM users");
    res.json(result[0]);
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    res.status(500).json({ error: "Error ejecutando la consulta" });
  }
});

/************************** ABMC Productos **********************************/

// getProductos
app.get("/productos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id idProducto, nombre, precio, descripcion FROM productos;"
    );
    res.json(result[0]);
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    res.status(500).json({ error: "Error ejecutando la consulta" });
  }
});

// addProductos
app.post("/productos", async (req, res) => {
  const { nombre, precio, descripcion } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?);",
      [nombre, precio, descripcion]
    );
    res.json(result);
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    res.status(500).json({ error: "Error ejecutando la consulta" });
  }
});

// deleteProductos
app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Producto no encontrado" });
    } else {
      res.json({ mensaje: "Producto eliminado con éxito" });
    }
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    res.status(500).json({ error: "Error ejecutando la consulta" });
  }
});

// updateProducto
app.put("/productos/:idProducto", async (req, res) => {
  const { idProducto } = req.params;
  const { nombre, precio, descripcion } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?",
      [nombre, precio, descripcion, idProducto]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Producto no encontrado" });
    } else {
      res.json({ mensaje: "Producto actualizado con éxito" });
    }
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    res.status(500).json({ error: "Error ejecutando la consulta" });
  }
});

/************************** ABMC Productos **********************************/

// getLocales
app.get("/locales", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id idLocal, nombre, direccion, capacidad, telefono, horario_apertura horaApertura, horario_cierre horaCierre FROM local;"
    );
    res.json(result[0]);
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    res.status(500).json({ error: "Error ejecutando la consulta" });
  }
});
// addLocales
// deleteLocales
// updateLocales

app.get("/crear", async (req, res) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name) VALUES ("JUANcito")'
    );
    res.json(result); // Use result instead of result[0]
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    res.status(500).json({ error: "Error ejecutando1 la consulta" });
  }
});

app.post("/users/account/name", async (req, res) => {
  try {
    const { name } = req.body;
    const [result] = await pool.query("SELECT name FROM users WHERE name = ?", [
      name,
    ]);
    if (result.length > 0) {
      res.json({ usuarioLogueado: true });
    } else {
      res.json({ usuarioLogueado: false });
    }
  } catch (error) {
    console.error("Error ejecutando la consulta:", error);
    res.status(500).json({ error: "Error ejecutando la consulta" });
  }
});

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});

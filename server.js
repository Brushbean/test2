import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor Node.js funcionando!");
});

// Ruta para probar la DB
app.get("/dbtest", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send({
      message: "Conectado a PostgreSQL",
      server_time: result.rows[0]
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Render usa este puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor escuchando en puerto", PORT);
});

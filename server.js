import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;

// ==== CONFIGURACIÓN DE BASE DE DATOS ====
const pool = new Pool({
  host: "dpg-d4pkjdadbo4c73bck9og-a.oregon-postgres.render.com",
  port: 5432,
  database: "test1_pol5",
  user: "gael",
  password: "pm7uB2Cyadoht2Rpc57dE96rFL4t0ght",
  ssl: { rejectUnauthorized: false }
});

// ==== PROBAR CONEXIÓN ====
async function testConnection() {
  try {
    console.log("Conectando a PostgreSQL…");
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión exitosa. Hora del servidor:", res.rows[0]);
  } catch (err) {
    console.error("Error al conectar:", err.message);
  }
}

// ==== SERVIDOR EXPRESS ====
const app = express();
app.use(cors());
app.use(express.json());

// Ruta simple
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

// Ejemplo: obtener datos de una tabla
app.get("/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ now: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Puerto asignado por Render
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
testConnection().then(() => {
  app.listen(PORT, () =>
    console.log(`Servidor iniciado en puerto ${PORT}`)
  );
});

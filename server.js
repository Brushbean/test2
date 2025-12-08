import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;

// ==== CONFIG PG ====
const pool = new Pool({
  host: "dpg-d4pkjdadbo4c73bck9og-a.oregon-postgres.render.com",
  port: 5432,
  database: "test1_pol5",
  user: "gael",
  password: "pm7uB2Cyadoht2Rpc57dE96rFL4t0ght",
  ssl: { rejectUnauthorized: false }
});

async function testConnection() {
  try {
    console.log("Conectando a PostgreSQL…");
    const res = await pool.query("SELECT NOW()");
    console.log("DB OK:", res.rows[0]);
  } catch (err) {
    console.error("ERROR DB:", err.message);
  }
}

// ==== EXPRESS ====
const app = express();
app.use(cors());
app.use(express.json());

// Servir frontend
app.use(express.static("public"));

// Ruta base
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// Test DB
app.get("/test", async (req, res) => {
  try {
    const r = await pool.query("SELECT NOW()");
    res.json(r.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;

testConnection().then(() => {
  app.listen(PORT, () =>
    console.log(`Servidor iniciado en el puerto ${PORT}`)
  );
});

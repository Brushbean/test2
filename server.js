import pg from "pg";
const { Pool } = pg;

// Datos iguales a los de tu PHP
const pool = new Pool({
  host: "dpg-d4pkjdadbo4c73bck9og-a.oregon-postgres.render.com",
  port: 5432,
  database: "test1_pol5",
  user: "gael",
  password: "pm7uB2Cyadoht2Rpc57dE96rFL4t0ght",
  ssl: {
    rejectUnauthorized: false
  }
});

// Probar conexión
async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to Render PostgreSQL successfully!");
    console.log("Server time:", res.rows[0]);
    alert("CONECCION EXITOSA");
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
}

testConnection();

export default pool;

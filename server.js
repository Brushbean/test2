import pg from "pg";
const { Pool } = pg;

// Database config (change as needed)
const dbConfig = {
  host: "dpg-d4pkjdadbo4c73bck9og-a.oregon-postgres.render.com",
  port: 5432,
  database: "test1_pol5",
  user: "gael",
  password: "pm7uB2Cyadoht2Rpc57dE96rFL4t0ght",
  ssl: {
    rejectUnauthorized: false
  }
};

const pool = new Pool(dbConfig);

// Enhanced connection tester
export async function testConnection() {
  try {
    console.log("Attempting DB connection with config:", {
      ...dbConfig,
      password: "[hidden]" // Do not log actual password!
    });
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL successfully!");
    console.log("Server time:", res.rows[0]);
    return true;
  } catch (err) {
    console.error("Connection failed:", err.message);
    // Display full error for debugging (optional, remove in production)
    console.error("Full error:", err);
    return false;
  }
}

// Run on startup
testConnection();

export default pool;

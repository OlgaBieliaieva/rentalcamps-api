import pool from "../db.js";

export const getCampers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM campers");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching campers:", err);
    res.status(500).json({ error: "Server error" });
  }
};

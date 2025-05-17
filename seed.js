import pg from "pg";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // <-- дозволяє незахищене SSL
  },
});

const insertData = async () => {
  try {
    const file = await fs.readFile("./campers.json", "utf-8");
    const { items } = JSON.parse(file);

    for (const camper of items) {
      const {
        name,
        price,
        rating,
        location,
        description,
        form,
        length,
        width,
        height,
        tank,
        consumption,
        transmission,
        engine,
        AC,
        bathroom,
        kitchen,
        TV,
        radio,
        refrigerator,
        microwave,
        gas,
        water,
        gallery,
        reviews,
      } = camper;

      // Вставка camper
      const camperRes = await pool.query(
        `INSERT INTO campers 
        (name, price, rating, location, description, form, length, width, height, tank, consumption, transmission, engine, ac, bathroom, kitchen, tv, radio, refrigerator, microwave, gas, water)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
        RETURNING id`,
        [
          name,
          price,
          rating,
          location,
          description,
          form,
          length,
          width,
          height,
          tank,
          consumption,
          transmission,
          engine,
          AC,
          bathroom,
          kitchen,
          TV,
          radio,
          refrigerator,
          microwave,
          gas,
          water,
        ]
      );

      const camperId = camperRes.rows[0].id;

      // Вставка зображень
      for (const img of gallery) {
        await pool.query(
          "INSERT INTO gallery (camper_id, thumb, original) VALUES ($1, $2, $3)",
          [camperId, img.thumb, img.original]
        );
      }

      // Вставка відгуків
      for (const rev of reviews) {
        await pool.query(
          "INSERT INTO reviews (camper_id, reviewer_name, reviewer_rating, comment) VALUES ($1, $2, $3, $4)",
          [camperId, rev.reviewer_name, rev.reviewer_rating, rev.comment]
        );
      }
    }

    console.log("✅ Дані імпортовано успішно!");
    await pool.end();
  } catch (err) {
    console.error("❌ Помилка під час імпорту:", err.message);
  }
};

insertData();

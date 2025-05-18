import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import campersRoutes from "./routes/campers.js";

dotenv.config();

const app = express();
// В продакшн на Elastic Beanstalk краще слухати 80 порт
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

// Роут для перевірки здоров'я сервера (health check)
app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/campers", campersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

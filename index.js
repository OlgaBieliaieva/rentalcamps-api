import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import campersRoutes from "./routes/campers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/campers", campersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

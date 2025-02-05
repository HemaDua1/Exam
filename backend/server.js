import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

const PORT = process.env.PORT || 5000;

const startServer = (port) => {
  app.listen(port, () => console.log(`Server running on port ${port}`))
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use, trying another port...`);
        startServer(port + 1);
      } else {
        console.error(err);
      }
    });
};

startServer(PORT);

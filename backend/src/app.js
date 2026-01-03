import express from "express";
import cors from "cors";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("BytexAI Backend Running...");
});

// routes
import testRoutes from "./routes/test.routes.js";
app.use("/api/test", testRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

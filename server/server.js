import express from "express";
import dbConnection from "./config/db.js";
import cors from "cors";
import "dotenv/config";

//import routes
import authRoute from "./routes/auth.route.js";

const app = express();
app.use(express.json());

dbConnection();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("<h1>Hello There this is backend of chirag project</h1>");
});

app.use("/api/auth", authRoute);
// app.use("/api/products", userRoute);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

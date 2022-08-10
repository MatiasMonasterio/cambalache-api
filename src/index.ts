import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";

import { connectDatabases } from "./utilities";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Cambalache REST");
});

connectDatabases()
  .then(() => app.listen(3000, () => console.log("Server init")))
  .catch((err) => console.error("Error: " + err));

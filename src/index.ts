import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import apiRoutes from "./api";
import documentation from "./docs";
import { connectDatabases } from "./utilities";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Cambalache REST");
});

app.use("/api", apiRoutes);
app.use("/documentation", swaggerUI.serve, swaggerUI.setup(documentation));

connectDatabases()
  .then(() => app.listen(3000, () => console.log("Server init")))
  .catch((err) => console.error("Error: " + err));

// process.on("uncaughtException", (error: Error) => {
// errorHandler.handleError(error);
// });

// process.on("unhandledRejection", (reason) => {
// errorHandler.handleError(reason);
// });

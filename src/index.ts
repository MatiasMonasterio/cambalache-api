import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send("Cambalache REST");
});

app.listen(3000, () => console.log("Server init"));

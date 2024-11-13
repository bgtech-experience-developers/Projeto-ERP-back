import express from "express";
import dotnev from "dotenv";
import { clientRouter } from "./router/Client.js";
dotnev.config();
const app = express();
const port = process.env.PORT;
app.use(express.json()); // parte para a deserializaç~~ao das informações
app.use("/cliente", clientRouter);
app.listen(port, () => {
  console.log("meu servidor está rodando na porta " + process.env.PORT);
});

import express from "express";
import dotnev from "dotenv";
import { clientRouter } from "./router/Client.js";
import cors from "cors";

dotnev.config();
const app = express();
const port = 3000;
app.use("/files", express.static("uploads")); // diretório acessível para requisições vindo do cliente, tendo acesso à arquivos hospedado internamente dentro dessa pasta!
app.use(cors());
app.use(express.json()); // parte para a deserializaç~~ao das informações
app.use("/cliente", clientRouter);
app.listen(port, () => {
  console.log("meu servidor está rodando na porta " + 3000);
});
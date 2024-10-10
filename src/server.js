dotenv.config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rotaCliente from "./app/routes/clientesRotas.js";
import rotaFornecedor from "./app/routes/fornecedoresRotas.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/clientes", rotaCliente);
app.use('/fornecedores', rotaFornecedor);

const PORTA = process.env.PORTA;

app.listen(PORTA, () => {
  console.log("O servidor está rodando! Acesse http://localhost:3000");
});

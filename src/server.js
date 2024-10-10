dotenv.config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rotaCliente from "./app/routes/clientesRotas.js";
import swaggerjson from "../swagger.json" assert { type: "json" };
import swaggerui from "swagger-ui-express";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerjson));

app.use("/clientes", rotaCliente);

const PORTA = process.env.PORTA;

app.listen(PORTA, () => {
  console.log("O servidor está rodando! Acesse http://localhost:3000");
});

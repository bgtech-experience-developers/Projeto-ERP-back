import express from "express";
import dotnev from "dotenv";
import { clientRouter } from "./router/Client.js";
import { route as routeAdm }  from "./router/adm.js";
dotnev.config();

const app = express();
app.use(express.json()); // parte para a deserialização das informações
const port = process.env.PORT;

app.use("/cliente", clientRouter);
app.use("/admin", routeAdm);

app.listen(port, () => {
  console.log("meu servidor está rodando na porta " + process.env.PORT);
});

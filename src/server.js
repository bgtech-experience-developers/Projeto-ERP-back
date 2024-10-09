import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rotaCliente from './app/routes/clientesRotas.js'
import rotaFuncionarios from './app/routes/funcionarioRotas.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/clientes', rotaCliente)
app.use('/funcionarios', rotaFuncionarios)

const PORTA = process.env.PORTA

app.listen(PORTA, () => {
    console.log('O servidor está rodando! Acesse http://localhost:3000');
})

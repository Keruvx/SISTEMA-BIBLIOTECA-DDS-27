// Importação do módulo express
const express = require("express")
const app = express()

// Difine a porta do servidor
const PORT = 3000


//Criação de rota
//Rotas publicas
app.get("/", (req, res) => {
    res.send("Bem-vindo à Biblioteca!")
})

//Funcao para subir o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log(`Link: http://localhost:${PORT}`)
})  
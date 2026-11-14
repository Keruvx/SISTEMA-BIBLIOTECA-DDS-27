 // Importação do módulo express
const express = require("express");
const app = express();

//modulo path para trabalhar com caminhos de arquivos
const path = require("path");

// Importação do módulo dotenv para carregar variáveis de ambiente
require("dotenv").config()

// Difine a porta do servidor
const PORT = process.env.PORT || 5000

//Configuração do EJS como motor de visualização
app.set("view engine", "ejs")

//Apontar para a pasta public para servir arquivos estáticos
app.set("views", path.join(__dirname, "../client/views"));

//Criação de rota
//Rotas publicas
app.get("/", (req, res) => {
    res.render('index')
})

app.get("/login", (req, res) => {
    res.render('login')
})

//Traz as configurações do banco de dados
const pool = require("./config/db.js");

//Força a conexao com o banco de dados
(
async () => {
    try {
        await pool.getConnection()
        console.log("Conexão com o banco de dados realizada com sucesso👌");
        //Funcao para subir o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
            console.log(`Link: http://localhost:${PORT}`)
        })  

    } catch (error) {
        console.error("Não foi possível conectar ao banco de dados:", error);
        process.exit(1) // Encerra o processo com código de erro
    }
}
)();

// IMPORTAÇÃO DO MÓDULO DO EXPRESS
const express = require("express")
const app = express()

// MÓDULO DO NODE PARA LIDAR COM CAMINHO DE ARQUIVOS
const path = require("path")

// IMPORTAR O MÓDULO DO DOTENV, LÊ O ARQUIVO .ENV, E JÁ CONFIGURA O BANCO
require('dotenv').config()

// DEFINE A PORTA DO SERVIDOR 
const port = process.env.PORT || 5000

// CONFIGURAR O EJS COMO TEMPLATE ENGINE
// define o ejs como engine do front - interpreta as páginas
app.set("view engine", "ejs")
// APONTAR PARA O EJS ONDE ESTÃO AS PÁGINAS
app.set("views", path.join(__dirname, "../client/views") )

// MIDDLEWARE PARA ENTENDER O JSON
// Lê os dados
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// CONFIGURAÇÃO DO EXPRESS-SESSION
const session = require("express-session")
app.use(session({ 
    secret: 'cr7',
    resave: false,
    saveUninitialized: false
}))

// DISPONIBILIZA O USUÁRIO DA SESSÃO PARA O EJS USAR
app.use((req, res, next) => {
    res.locals.usuario = req.session?.usuario || null;
    req.usuario = req.session?.usuario || null;
    next();
})

app.get("/login", (req, res) => {
    // DESTRUIR A SESSÃO ATIVA
    if( req.session?.usuario){
        req.session.destroy()
    }
    res.render('login')
})

// CRIAÇÃO DAS ROTAS
// IMPORTAR AS ROTAS DE USUÁRIO
const usuarioRoutes = require("./routes/usuarioRoutes.js")
app.use("/usuarios", usuarioRoutes)

// ROTAS PÚBLICAS
app.get("/", (req, res) => {
    res.render('index')
})



// TRAZ AS CONFIGURAÇÕES DO BANCO
const pool = require("./config/db.js");

// FORÇA A CONEXÃO COM O BANCO
(async () =>{
        try{
            // SE O BANCO ESTIVER ATIVO, INICIA O SERVIDOR DO BANCO
            await pool.getConnection()
            console.log("Banco foi conectado");
            // SE O BANCO SUBIU, SOBE O BACKEND
            // FUNÇÃO PARA SUBIR O SERVIDOR
            app.listen(port, () =>{
                console.log(`Servidor na porta: ${port}`);
                console.log(`Link: http://localhost:${port}`);
            })
        }
        catch(erro){
            // SE DEU ERRO, AVISA E ENCERRA A TENTATIVA
            console.log("Erro ao conectar com o banco");
            process.exit(1)
        }
    }
)()


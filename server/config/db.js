//Importando o modulo do mysql para conexão com o banco de dados
const mysql = require('mysql2/promise');

//Criar uma pool de conexões, para evitar erros no banco por superlotacão
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    //Se todos estiverem ocupados, deixa um esperando, sem dar erro
    waitForConnections: true,
    //Quantidade máxima de conexões simultaneas
    connectionLimit: 10,
    //Maximo de lista de espera
    queueLimit: 0 // 0 = ILIMITADO
});
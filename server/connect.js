// Importação do módulo mysql para interagir com o banco de dados MySQL.
import mysql from "mysql";

// Importação do módulo dotenv para carregar variáveis de ambiente de um arquivo .env.
import dotenv from "dotenv";

// Carrega as variáveis de ambiente definidas no arquivo .env para process.env.
dotenv.config({ path: "./.env" });

// Criação de uma conexão com o banco de dados MySQL usando as variáveis de ambiente.
export const db = mysql.createConnection({
    host: process.env.DB_HOST,       // Endereço do servidor do banco de dados
    user: process.env.DB_USER,       // Nome de usuário do banco de dados
    password: process.env.DB_PASS,   // Senha do banco de dados
    database: process.env.DB         // Nome do banco de dados
});
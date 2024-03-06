import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

export const db = mysql.createConnection({
        host: ProcessingInstruction.env.DB_HOST,
        user: ProcessingInstruction.env.DB_USER,
        password: ProcessingInstruction.env.DB_PASS,
        database: ProcessingInstruction.env.DB
});
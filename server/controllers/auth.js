// Importa a instância do banco de dados e a biblioteca bcrypt para hash de senhas
import { db } from "../connect.js";
import bcrypt from "bcrypt";

// Função para registrar um novo usuário
export const register = async (req, res) => {
    // Extrai informações do corpo da requisição
    const { username, email, password, confirmPassword } = req.body;

    // Verifica se o nome de usuário está presente na requisição
    if (!username) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }

    // Verifica se o email está presente na requisição
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    // Verifica se a senha está presente na requisição
    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    // Verifica se as senhas coincidem
    if (password != confirmPassword) {
        return res.status(422).json({ msg: "As senhas não são iguais." });
    }

    // Consulta o banco de dados para verificar se o email já está em uso
    db.query("SELECT email FROM user WHERE email = ?", [email], async (error, data) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!" });
        }

        // Se o email já estiver em uso, retorna uma mensagem de erro
        if (data.length > 0) {
            return res.status(500).json({ msg: "Este email já está sendo utilizado." });
        } else {
            // Se o email não estiver em uso, gera um hash da senha
            const passwordHash = await bcrypt.hash(password, 8);

            // Insere os dados do novo usuário no banco de dados
            db.query(
                "INSERT INTO user SET ?",
                { username, email, password: passwordHash },
                (error) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!" });
                    } else {
                        // Retorna uma mensagem de sucesso se o cadastro for bem-sucedido
                        return res.status(200).json({ msg: "Cadastro efetuado com sucesso!" });
                    }
                }
            );
        }
    });
};

// Função para realizar o login (ainda não implementada)
export const login = (req, res) => { };
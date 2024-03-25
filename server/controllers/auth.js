// Importa a instância do banco de dados e a biblioteca bcrypt para hash de senhas
import { db } from "../connect.js";  // Importa a instância do banco de dados
import bcrypt from "bcryptjs";  // Importa a biblioteca bcrypt para hash de senhas
import jwt from "jsonwebtoken";  // Importa a biblioteca jwt para geração de tokens

// Função para registrar um novo usuário
export const register = async (req, res) => {  // Define a função 'register' como uma função assíncrona que recebe req (requisição) e res (resposta)
    const { fullName, userName, emailUser, phoneNumberUser, passwordUser, confirmPassword } = req.body;  // Extrai informações do corpo da requisição

    if (!fullName) {  // Verifica se o nome completo está presente na requisição
        return res.status(422).json({ msg: "O nome completo é obrigatório!" });  // Retorna erro 422 se o nome completo estiver ausente
    }

    if (!userName) {  // Verifica se o nome de usuário está presente na requisição
        return res.status(422).json({ msg: "O nome de usuário é obrigatório!" });  // Retorna erro 422 se o nome de usuário estiver ausente
    }

    if (!emailUser) {  // Verifica se o email está presente na requisição
        return res.status(422).json({ msg: "O email é obrigatório!" });  // Retorna erro 422 se o email estiver ausente
    }

    if (!phoneNumberUser) {  // Verifica se o número de celular está presente na requisição
        return res.status(422).json({ msg: "O número de celular é obrigatório!" });  // Retorna erro 422 se o número de celular estiver ausente
    }

    if (!passwordUser) {  // Verifica se a senha está presente na requisição
        return res.status(422).json({ msg: "A senha é obrigatória!" });  // Retorna erro 422 se a senha estiver ausente
    }

    if (passwordUser != confirmPassword) {  // Verifica se as senhas coincidem
        return res.status(422).json({ msg: "As senhas não são iguais." });  // Retorna erro 422 se as senhas não coincidirem
    }

    // Consulta o banco de dados para verificar se o email já está em uso
    db.query(
        "SELECT emailUser FROM user WHERE emailUser = ?",
        [emailUser],
        async (error, data) => {
            if (error) {  // Verifica se ocorreu algum erro na consulta
                console.log(error);  // Loga o erro no console
                return res.status(500).json({
                    msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!",
                });  // Retorna erro 500 se ocorrer um erro no servidor
            }
            if (data.length > 0) {  // Verifica se o email já está em uso
                return res
                .status(500)
                .json({msg: "Este emailUser já está sendo utilizado." });  // Retorna erro 500 se o email já estiver em uso
            } else {
                // Gera um hash da senha
                const passwordHash = await bcrypt.hash(passwordUser, 8);  // Hash da senha usando bcrypt

                // Insere os dados do novo usuário no banco de dados
                db.query(
                    "INSERT INTO user SET ?",
                    { fullName, userName, emailUser, phoneNumberUser, passwordUser: passwordHash },  // Dados do novo usuário com senha hashada
                    (error) => {
                        if (error) {  // Verifica se ocorreu algum erro na inserção
                            console.log(error);  // Loga o erro no console
                            return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!" });  // Retorna erro 500 se ocorrer um erro no servidor
                        } else {
                            return res.status(200).json({ msg: "Cadastro efetuado com sucesso!" });  // Retorna mensagem de sucesso se o cadastro for bem-sucedido
                        };
                    }
                );
            };
        });
};

// Função para realizar o login
export const login = (req, res) => {  // Define a função 'login' que recebe req (requisição) e res (resposta)
    // const { emailUser, passwordUser } = req.body;  // Extrai informações do corpo da requisição

    // db.query("SELECT * FROM user WHERE emailUser = ?", [emailUser], async (error, data) => {  // Consulta o banco de dados para obter informações do usuário
    //     if (error) {  // Verifica se ocorreu algum erro na consulta
    //         console.log(error);  // Loga o erro no console
    //         return res.status(500).json({ msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!" });  // Retorna erro 500 se ocorrer um erro no servidor
    //     }
        
    //     if (data.length == 0) {  // Verifica se o usuário não foi encontrado
    //         return res.status(404).json({ msg: "Usuário não encontrado!" });  // Retorna erro 404 se o usuário não for encontrado
    //     } else {
    //         const user = data[0];  // Obtém os dados do usuário

    //         const checkPassword = await bcrypt.compare(passwordUser, user.passwordUser);  // Compara a senha enviada com a senha hashada no banco de dados

    //         if (!checkPassword) {  // Verifica se a senha está incorreta
    //             return res.status(422).json({ msg: "Senha incorreta!" });  // Retorna erro 422 se a senha estiver incorreta
    //         }

    //         try {
    //             const refreshToken = jwt.sign({  // Gera um token JWT
    //                 exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,  // Define a expiração do token para 24 horas
    //                 id: user.passwordUser  // Define o ID do usuário no token
    //             }, 
    //             process.env.REFRESH,
    //             {algorithm: "HS256"}
    //             );  // Chave secreta para assinar o refreshtoken
    //             const token = jwt.sign({  // Gera um token JWT
    //                 exp: Math.floor(Date.now() / 1000) + 3600,  // Define a expiração do token para 24 horas
    //                 id: user.passwordUser  // Define o ID do usuário no token
    //             }, 
    //             process.env.TOKEN,
    //             {algorithm: "HS256"}
    //             );  // Chave secreta para assinar o token
    //             res.status(200).json({msg: "Usuário logado com sucesso!", token, refreshToken})
    //         } catch(err){
    //             console.log(err);
    //             return res.status(500).json({msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!"})
    //         };
    //     };
    // });
};
// Importação do objeto de conexão com o banco de dados
import { db } from "../connect.js";

// Função para criar uma nova postagem
export const creatPost = (req, res) => {
    // Extrair os dados da requisição
    const { post_desc, img, userId } = req.body;

    // Verificar se a postagem contém texto ou imagem
    if (!post_desc && !img) {
        return res
            .status(422)
            .json({ msg: "O post precisa ter um texto ou uma imagem!" });
    }

    // Executar uma query SQL para inserir a postagem no banco de dados
    db.query("INSERT INTO posts SET ?", { post_desc, img, userId }, (error) => {
        if (error) {
            // Se houver um erro, enviar uma resposta de erro ao cliente
            console.log(error);
            return res.status(500).json({
                msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
            });
        } else {
            // Se a postagem for inserida com sucesso, enviar uma resposta de sucesso ao cliente
            return res.status(200).json({ msg: "Post enviado com sucesso!" });
        }
    });
};

export const getPost = (req, res) => {

    if (req.query.id) {
        db.query(
            "SELECT p. * , u.userName, userImg FROM posts as p JOIN user as u ON (u.emailUser = p.userId) WHERE u.id = ? ORDER BY created_at DESC",
            [req.query.id],
            (error) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
                    });
                } else if (data) {
                    return res.status(200).json({ data });
                }
            }
        );
    } else {
        db.query(
            "SELECT p. * , u.userName, userImg FROM posts as p JOIN user as u ON (u.emailUser = p.userId) ORDER BY created_at DESC",
            (error) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
                    });
                } else if (data) {
                    return res.status(200).json({ data });
                }
            }
        );
    };
};
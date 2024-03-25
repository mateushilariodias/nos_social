// Importação do objeto de conexão com o banco de dados
import { db } from "../connect.js";

// Função para criar uma nova postagem
export const creatPost = (req, res) => {
    // Extrair os dados da requisição
    const { post_desc, img, user_id } = req.body;

    // Verificar se a postagem contém texto ou imagem
    if (!post_desc && !img) {
        return res.status(422).json({ msg: "O post precisa ter texto ou imagem" });
    }

    // Executar uma query SQL para inserir a postagem no banco de dados
    db.query("INSERT INTO posts SET ?", { desc: post_desc, img, user_id }, (error) => {
        if (error) {
            // Se houver um erro, enviar uma resposta de erro ao cliente
            console.log(error);
            return res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
        } else {
            // Se a postagem for inserida com sucesso, enviar uma resposta de sucesso ao cliente
            return res.status(200).json({ msg: "Post enviado com sucesso!" });
        }
    });
};

// Função para obter postagens (ainda não implementada)
export const getPost = (req, res) => {
    db.query("select p. * , u.userName, userImg from posts as p join user as u on (u.id = p.user_id);")
    // Esta função será implementada para obter postagens do banco de dados
};

// faltando fazer a parte do banco de dados e ver a parte do ID

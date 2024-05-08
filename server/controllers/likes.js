import { db } from "../connect.js";

export const addLikes = (req, res) => {
    const { likes_user_id, likes_post_id } = req.body;

    db.query("INSERT INTO likes SET ?",
        { likes_user_id, likes_post_id },
        (error) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
                });
            } else {
                return res.status(200).json({ msg: "Like enviado com sucesso!" });
            }
        }
    );
};

export const deletelikes = (req, res) => {
    const { likes_user_id, likes_post_id } = req.query;
    db.query(
        "DELETE FROM likes WHERE `likes_user_id` = ? AND `likes_post_id` = ?",
        [likes_user_id, likes_post_id],
        (error) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
                });
            } else {
                return res.status(200).json({ msg: "Like enviado com sucesso!" });
            }
        }
    );
};

export const getLikes = (req, res) => {
    db.query(
        "SELECT l.*, u.userName FROM likes as l JOIN user as u ON (u.emailUser = l.likes_user_id) WHERE likes_post_id = ?",
        [req.query.likes_post_id],
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
import { db } from "../connect.js";

export const addLikes = (req, res) => {
    const { likeUserId, postId } = req.body;

    db.query("INSERT INTO likes SET ?",
        { likeUserId, postId },
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
    const { likeUserId, postId } = req.query;
    db.query(
        "DELETE FROM likes WHERE `likeUserId` = ? AND `postId` = ?",
        [likeUserId, postId],
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
        "SELECT l.*, u.userName FROM likes as l JOIN user as u ON (u.emailUser = l.likeUserId) WHERE postId = ?",
        [req.query.postId],
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
import { db } from "../connect.js";

export const creatComment = (req, res) => {
    const { comment, postId, commentUserId } = req.body;
    if (!comment) {
        return res
        .status(422)
        .json({ msg: "O comentário precisa ter um texto!" });
    }
    db.query("INSERT INTO comments SET ?", { comment, postId, commentUserId }, (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
            });
        } else {
            return res.status(200).json({ msg: "Comentário enviado com sucesso!" });
        }
    });
};

export const getComment = (req, res) => {
    db.query(
        "SELECT c. * , u.userName, userImg FROM comments AS c JOIN user AS u ON (u.emailUser = c.commentUserId) WHERE postId = ? ORDER BY created_at DESC",
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
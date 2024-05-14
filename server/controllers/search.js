import { db } from '../connect.js'

export const searchNgo = (req, res) => {
    const params = "%" + req.query.params + "%";

    if (!params) {
        return res.status(422).json({ msg: "Precisamos do parâmentro" })
    };

    db.query("SELECT userName, userImg, id FROM user WHERE userName LIKE ?",
        [params],
        (error, data) => {
            if (error) {
                console.log(error)
                return res
                    .status(500)
                    .json({
                        msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!",
                    });
            } else {
                return res.status(200).json(data)
            };
        });
};

export const searchPost = (req, res) => {
    const params = "%" + req.query.params + "%";

    if (!params) {
        return res.status(422).json({ msg: "Precisamos do parâmentro" })
    };

    db.query(
        "SELECT p. * , u.userName, userImg FROM posts as p JOIN user as u ON (u.id = p.userId) WHERE p.post_desc LIKE ? OR u.userName LIKE ORDER BY created_at DESC",
        [params],
        (error, data) => {
            if (error) {
                console.log(error)
                return res
                    .status(500)
                    .json({
                        msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!",
                    });
            } else {
                return res.status(200).json(data)
            };
        });
};
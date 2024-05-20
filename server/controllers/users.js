import { db } from '../connect.js'

export const getUser = (req, res) => {
    const id = req.query.id

    if (!id) {
        return res.status(422).json({ msg: 'Precisamos do id do usuário' })
    };

    db.query('SELECT userName, userImg, bgImg FROM user WHERE id = ?',
        [id],
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
        }
    );
};

export const updateUser = (req, res) => {
    const { userName, userImg, bgImg, id } = req.body

    if (!userName || !userImg || !bgImg) {
        return res.status(422).json({ msg: 'Sem alterações para serem feitas!' })
    };

    db.query('UPDATE user SET userName = ? userImg = ? bgImg = ? WHERE id = ?',
        [userName, userImg, bgImg, id],
        (error, data) => {
            if (error) {
                console.log(error)
                return res
                    .status(500)
                    .json({
                        msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!",
                    });
            } if(data.affectedRows > 0) {
                return res.status(200).json('Atualizado com sucesso!')
            };
        }
    );
};
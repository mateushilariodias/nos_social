import { db } from "../connect.js";
import bycrypt from "bcrypt";
export const register = (req, res)=>{
    const { username, email, password, confirmPassword} = req.body;

    if(!username){
        return res.status(422).json({msg:"O nome é obriatório!"});
    }
    if(!email){
        return res.status(422).json({msg:"O email é obriatório!"});
    }
    if(!password){
        return res.status(422).json({msg:"O senha é obriatório!"});
    }
    if(password != confirmPassword){
        return res.status(422).json({msg:"As senhas não são iguais."});
    }

    db.query("SELECT email FROM user WHERE email = ?", [email], async(error, data)=>{
        if(error){
            console.log(error);
            return res.status(500).json({msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!"});
        }
        if(data.length > 0){
            return res.status(500).json({msg: "Este email já esta sendo utilizado."});
        }else{
            const passwordHash = await bycrypt.hash(password, 8);
            db.query(
                "INSERT INTO user SET ?",{username, email, password:passwordHash},
                (error)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!"});
                    }else{
                        return res.status(200).json({msg: "Cadastro efetuado com sucesso!"})
                    }
                }
            )
        }
    });
};  
export const login = (req, res)=>{};
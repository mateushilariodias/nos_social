// Esta linha define uma função chamada getUser que aceita dois parâmetros: req (requisição) e res (resposta).
export const getUser = (req, res)=>{
    // Aqui, estamos definindo a resposta HTTP com o status 200 (OK) e enviando um objeto JSON como resposta com a mensagem "funcionando!!!".
    res.status(200).json({msg: "funcionando!!!"});
};
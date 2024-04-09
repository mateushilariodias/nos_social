import { UserContext } from "@/context/userContext";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { use, useContext, useState } from "react";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { TbPhoto } from "react-icons/tb";
import { makeRequest } from "../../axios";

function postCreation() {

    const { user } = useContext(UserContext)
    const [description, setDescription] = useState("")
    const [image, setImage] = useState<File | null>(null)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (newPost: {}) => {
            await makeRequest.post("post/", newPost).then((res) => {
                return res.data;
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })

    return (
        <div className="w-1/3 bg-white rounded-lg p-4 shadow-md flex flex-col gap-3">
            { image && <img src={URL.createObjectURL(image)} alt="Imagem da postagem" /> }
            <div className="flex gap-4 pt-6">
                <img className="w-10 h-10 rounded-full" src={user?.userImg ? user.userImg : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Imagem do perfil" />
                <span className="font-bold">{user?.userName}</span>
                <div className="w-full bg-zinc-100 flex items-center text-gray-600 px-3 py-1 rounded-full">
                    <input type="text" name="comment" id="comment" placeholder={`Qual trabalho você deseja compartilhar?`} value={description} onChange={(e) => setDescription(e.target.value)} className="bg-zinc-100 w-full focus-visible:outline-none " />
                    <button onClick={() => mutation.mutate({ description, userId: user?.id })}>
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
            <div className="flex justify-around py-4 text-gray-600 border-y">
                <input className="hidden" type="file" id="image" onChange={(e) => e.target.files && setImage(e.target.files[0])}/>
                <label htmlFor="image" className="flex">
                    <TbPhoto className="text-2xl" /> Adicionar imagem
                </label>
                {/* <button className="flex items-center gap-1">
                    <FaUserFriends className="text-2xl"/> Marcar usuários
                </button> */}
            </div>
        </div>
    )
}
export default postCreation;
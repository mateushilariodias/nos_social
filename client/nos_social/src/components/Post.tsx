import { useState, useEffect } from "react";
import { FaPaperPlane, FaRegComment, FaThumbsUp } from "react-icons/fa";

interface IPost {
    id: number;
    profilePicture: string;
    author: string;
    description: string;
    image: string;
    createdPost:string;
}

interface IUser{
    userName:string;
    userImg:string;
}

function Post(props: { post: IPost }) {

    const { profilePicture, author, description, image, createdPost } = props.post;
    const [user, setUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        let value = localStorage.getItem("nos-social:user")
        if (value) {
            setUser(JSON.parse(value));
        }
    }, [])

    let date = new Date(createdPost)
    let formatedDate = date.getDate() + "+" + (date.getMonth() + 1) + "/" + date.getFullYear();

    return (
        <div className="w-1/3 bg-white rounded-lg p-4 shadow-md">
            <header className="flex gap-2 pb-4 border-b items-center">
                <img className="h-8 w-8 rounded-full" src={profilePicture?profilePicture:"https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Foto de perfil do criador da postagem" />
                <div className="flex flex-col">
                    <span className="font-semibold">{author}</span>
                    <span className="text-xs">{formatedDate}</span>
                </div>
            </header>
            <main>
                {description && (<div className="py-4 w-full">
                    <span>{description}</span>
                </div>)}
                {image && <img src={image} alt="Imagem da postagem" />}
            </main>
            <footer>
                <div className="flex justify-between py-4 border-b">
                    <div className="flex gap-1 items-center">
                        <span className="bg-blue-600 w-6 h-6 text-white flex items-center justify-center rounded-full text-xs"><FaThumbsUp /></span>4.561
                    </div>
                    <span>875 comentários</span>
                </div>
                <div className="flex justify-around py-4 text-gray-600 border-b">
                    <button className="flex items-center gap-1">
                        <FaThumbsUp /> Curtir
                    </button>
                    <button className="flex items-center gap-1">
                        <FaRegComment /> Comentar
                    </button>
                </div>
                <div className="flex gap-4 pt-6">
                    <img className="w-10 h-10 rounded-full" src={user?.userImg ? user.userImg : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Imagem do perfil" />
                    <span className="font-bold">{user?.userName}</span>
                    <div className="w-full bg-zinc-100 flex items-center text-gray-600 px-3 py-1 rounded-full">
                        <input type="text" name="comment" id="comment" className="bg-zinc-100 w-full focus-visible:outline-none " />
                        <FaPaperPlane />
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Post;
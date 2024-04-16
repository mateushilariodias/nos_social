import { useState, useEffect, useContext } from "react";
import { FaPaperPlane, FaRegComment, FaThumbsUp } from "react-icons/fa";
import moment from "moment";
import 'moment/locale/pt-br'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { UserContext } from "@/context/userContext";
import Comment from "./Comment";

interface IPost {
    id: number;
    profilePicture: string;
    author: string;
    description: string;
    image: string;
    createdPost: string;
}

interface IUser {
    userName: string;
    userImg: string;
}

interface IComment {
    id: number;
    comment: number;
    userName: string;
    userImg: string;
    commentUserId: number;
    postId: number
    createdComment: string;
}

function Post(props: { post: IPost }) {

    const { id, profilePicture, author, description, image, createdPost } = props.post;
    const { user } = useContext(UserContext)
    const [comment, setComment] = useState('')
    const [showComments, setShowComments] = useState(false)
    const queryClient = useQueryClient()

    const { data, error, isLoading } = useQuery<IComment[] | undefined>({
        queryKey: ['comments', id],
        queryFn: () => makeRequest.get('comment/?post_id' + id).then((res) => {
            return res.data.data
        }),
        enabled: !!id
    })

    if (error) {
        console.log(error);
    }

    const mutation = useMutation({
        mutationFn: async (newComment: {}) => {
            await makeRequest.post("comment/", newComment).then((res) => {
                return res.data
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", id] })
        },
    });

    const shareComment = async () => {
        mutation.mutate({ comment, commentUserId: user?.id, postId: id });
        setComment('')
    }

    return (
        <div className="w-1/3 bg-white rounded-lg p-4 shadow-md">
            <header className="flex gap-2 pb-4 border-b items-center">
                <img className="h-8 w-8 rounded-full" src={profilePicture ? profilePicture : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Foto de perfil do criador da postagem" />
                <div className="flex flex-col">
                    <span className="font-semibold">{author}</span>
                    <span className="text-xs">{moment(createdPost).fromNow()}</span>
                </div>
            </header>
            <main>
                {description && (<div className="py-4 w-full">
                    <span>{description}</span>
                </div>)}
                {image && <img src={`./upload/${image}`} alt="Imagem da postagem" />}
            </main>
            <footer>
                <div className="flex justify-between py-4 border-b">
                    <div className="flex gap-1 items-center">
                        <span className="bg-blue-600 w-6 h-6 text-white flex items-center justify-center rounded-full text-xs"><FaThumbsUp /></span>4.561
                    </div>
                    <button onClick={() => setShowComments(!showComments)}>
                        {data && data.length > 0 ? `${data?.length} comentários` : ""}
                    </button>
                </div>
                <div className="flex justify-around py-4 text-gray-600 border-b">
                    <button className="flex items-center gap-1">
                        <FaThumbsUp /> Curtir
                    </button>
                    <button className="flex items-center gap-1" onClick={() => document.getElementById("comment" + id)?.focus()}>
                        <FaRegComment /> Comentar
                    </button>
                </div>
                {showComments && data?.map((comment, id) => {
                    return <Comment comment={comment} key={id} />
                })}
                <div className="flex gap-4 pt-6">
                    <img className="w-10 h-10 rounded-full" src={user?.userImg ? user.userImg : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Imagem do perfil" />
                    <span className="font-bold">{user?.userName}</span>
                    <div className="w-full bg-zinc-100 flex items-center text-gray-600 px-3 py-1 rounded-full">
                        <input type="text" name="comment" id={"comment" + id} placeholder="Comente sobre o trabalho" value={comment} onChange={(e) => setComment(e.target.value)} className="bg-zinc-100 w-full focus-visible:outline-none " />
                        <button onClick={() => shareComment()}><FaPaperPlane /></button>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Post;
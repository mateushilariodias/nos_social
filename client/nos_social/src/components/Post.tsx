'use client'
import { useState, useContext } from "react";
import { FaPaperPlane, FaRegComment, FaThumbsUp } from "react-icons/fa";
import moment from "moment";
import 'moment/locale/pt-br'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { UserContext } from "@/context/userContext";
import Comment from "./Comment";
import Link from "next/link";

interface IPost {
    id: number;
    profilePicture: string;
    author: string;
    description: string;
    image: string;
    createdPost: string;
    userId: number;
}

interface ILike {
    id: number;
    userName: string;
    likeUserId: number;
    postId: number
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

    const { id, profilePicture, author, description, image, createdPost, userId } = props.post;
    const { user } = useContext(UserContext)
    const [comment, setComment] = useState('')
    const [liked, setLiked] = useState(false)
    const [showLiked, setShowLiked] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const queryClient = useQueryClient()

    //LIKES QUERY

    const likeQuery = useQuery<ILike[] | undefined>({
        queryKey: ['likes', id],
        queryFn: () => makeRequest.get('like/?post_id' + id).then((res) => {
            res.data.data.map((like: ILike) => {
                if (like.likeUserId === user?.id) {
                    return setLiked(true);
                }
                else {
                    setLiked(false);
                }
            })
            return res.data.data
        }),
        enabled: !!id
    })

    if (likeQuery.error) {
        console.log(likeQuery.error);
    }

    const likeMutation = useMutation({
        mutationFn: async (newLike: {}) => {
            if (liked) {
                await makeRequest.delete(`like/?postId=${id}&likeUserId=${user?.id}`).then((res) => {
                    setLiked(false)
                    return res.data;
                });
            } else {
                await makeRequest.post("like/", newLike).then((res) => {
                    return res.data;
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["likes", id] })
        },
    });

    const shareLike = async () => {
        likeMutation.mutate({ likeUserId: user?.id, postId: id });
    };

    //COMMENTS QUERY

    const commentQuery = useQuery<IComment[] | undefined>({
        queryKey: ['comments', id],
        queryFn: () => makeRequest.get('comment/?post_id' + id).then((res) => {
            return res.data.data
        }),
        enabled: !!id
    })

    if (commentQuery.error) {
        console.log(commentQuery.error);
    }

    const commentMutation = useMutation({
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
        commentMutation.mutate({ comment, commentUserId: user?.id, postId: id });
        setComment('')
    }

    return (
        <div className="w-full bg-white rounded-lg p-4 shadow-md">
            <header className="flex gap-2 pb-4 border-b items-center">
                <Link href={'/profile?id=' + userId}>
                    <img className="h-8 w-8 rounded-full" src={profilePicture ? profilePicture : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Foto de perfil do criador da postagem" />
                    <div className="flex flex-col">
                        <span className="font-semibold">{author}</span>
                        <span className="text-xs">{moment(createdPost).fromNow()}</span>
                    </div>
                </Link>
            </header>
            <main>
                {description && (<div className="py-4 w-full">
                    <span>{description}</span>
                </div>)}
                {image && <img src={`./upload/${image}`} alt="Imagem da postagem" />}
            </main>
            <footer>
                <div className="flex justify-between py-4 border-b">
                    <div className="relative" onMouseEnter={() => setShowLiked(true)} onMouseLeave={() => setShowLiked(false)}>
                        {likeQuery.data && likeQuery.data.length > 0 && (
                            <>
                                <div className="flex gap-1 items-center">
                                    <span className="bg-blue-600 w-6 h-6 text-white flex items-center justify-center rounded-full text-xs">
                                        <FaThumbsUp />
                                    </span>
                                    <span>{likeQuery.data.length}</span>
                                </div>
                                {showLiked && (
                                    <div className="absolute bg-white border flex flex-col p-2 rounded-md top-6">
                                        {likeQuery.data.map((like) => {
                                            return <span key={like.id}>{like.userName}</span>
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <button onClick={() => setShowComments(!showComments)}>
                        {commentQuery.data && commentQuery.data.length > 0 && `${commentQuery.data?.length} comentários`}
                    </button>
                </div>
                <div className="flex justify-around py-4 text-gray-600 border-b">
                    <button onClick={() => shareLike()} className={`flex items-center ${liked ? 'text-blue-600' : ''}`}>
                        <FaThumbsUp /> Curtir
                    </button>
                    <button className="flex items-center gap-1" onClick={() => document.getElementById("comment" + id)?.focus()}>
                        <FaRegComment /> Comentar
                    </button>
                </div>
                {showComments && commentQuery.data?.map((comment, id) => {
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
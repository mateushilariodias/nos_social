import moment from "moment";
import 'moment/locale/pt-br'
import { IComment } from "@/interfaces";

function Comment(props: { comment: IComment }) {

    const { comment, userName, userImg, createdComment } = props.comment;

    return (
        <div className="mt-6 flex gap-2">
            <img className="h-8 w-8 rounded-full" src={userImg ? userImg : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Foto de perfil do criador do comentário" />u
            <div className="text-zinc-600 w-full">
                <div className="flex flex-col bg-zinc-100 px-4 py-1 rounded-md">
                    <span className="font-semibold">{userName}</span>
                    <span>{comment}</span>
                </div>
            </div>
            <span className="text-xs">{moment(createdComment).fromNow()}</span>
        </div>
    );
}
export default Comment;
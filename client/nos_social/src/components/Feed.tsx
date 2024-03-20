import { useEffect, useState } from "react";
import Post from "./Post";
import { makeRequest } from "../../axios";

interface IPost {
    id: number;
    profilePicture: string;
    author: string;
    description: string;
    image: string;
    createdPost:string;
}

function FeedMain() {

    const [posts, setPosts] = useState<IPost[] | undefined>(undefined)

    useEffect(() => {
        makeRequest.get("post/").then((res) => {
            setPosts(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <section className="w-full flex flex-col items-center gap-5">
            {posts?.map((post, id) => {
                return (
                    <Post post={post} key={id} />
                )
            })}
        </section>
    )
}
export default FeedMain;
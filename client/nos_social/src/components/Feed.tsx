import { useEffect, useState } from "react";
import Post from "./Post";
import { makeRequest } from "../../axios";
import PostCreation from "./postCreation";
import { useQuery } from "@tanstack/react-query";

interface IPost {
    id: number;
    profilePicture: string;
    author: string;
    description: string;
    image: string;
    createdPost: string;
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

    const { data, isLoading, error } = useQuery<IPost[] | undefined>({
        queryKey: ['posts'],
        queryFn: () =>
            makeRequest.get("post/").then((res) => {
                return res.data.data
            })
    })

    if (error) {
        [
            console.log(error)
        ]
    }

    return (
        <section className="w-full flex flex-col items-center gap-5">
            <PostCreation />
            {isLoading ? (<span>Carregando postagens...</span>) : (
                <div className="w-full flex flex-col gap-5 items-center">
                    {data?.map((post, id) => {
                        return <Post post={post} key={id} />
                    })}
                </div>
            )}
        </section>
    )
}
export default FeedMain;
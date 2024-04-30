'use client'

import Post from "./Post";
import { makeRequest } from "../../axios";
import PostCreation from "./PostCreation";
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
        <section className="w-full flex min-h-screen flex-col items-center gap-5">
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
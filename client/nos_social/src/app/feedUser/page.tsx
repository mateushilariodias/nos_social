"use client";

import Feed from "@/components/Feed";
import Header from "@/components/HeaderFeed";
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import PostCreation from "@/components/postCreation";
import { IPost } from "@/interfaces";

function FeedUser() {

    const router = useRouter();

    const { data, error, isSuccess, isError } = useQuery({
        queryKey: ["refresh"],
        queryFn: () =>
            makeRequest.get("auth/refresh").then((res) => {
                return res.data;
            }),
        retry: false,
        refetchInterval: 60 * 60 * 1000,
    });

    if (isSuccess) {
        console.log(data.msg);
    }

    if (isError) {
        console.log(error);
        // router.push('/loginUser')
    }

    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ['posts'],
        queryFn: () =>
            makeRequest.get("post/").then((res) => {
                return res.data.data
            })
    })

    if (postQuery.error) {
        [
            console.log(postQuery.error)
        ]
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-100">
            <Header />
            <div className="w-2/6 flex flex-col gap-5">
                <PostCreation />
                <Feed post={postQuery.data}/>
            </div>
        </main>
    )
}
export default FeedUser;
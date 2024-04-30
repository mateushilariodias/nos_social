"use client";

import Feed from "@/components/Feed";
import Header from "@/components/HeaderFeed";
import { useRouter } from "next/navigation";
import { makeRequest } from "../../../axios";
import { useQuery } from "@tanstack/react-query";
import PostCreation from "@/components/PostCreation";

function FeedNGO() {

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

    if(isSuccess){
        console.log(data.msg);
    }

    if(isError){
        console.log(error);
        router.push('/loginUser')
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-100">
            <Header />
            <Feed />
        </main>
    )
}
export default FeedNGO;
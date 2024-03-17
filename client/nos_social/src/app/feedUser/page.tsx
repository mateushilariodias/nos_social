"use client";

import Feed from "@/components/Feed";
import Header from "@/components/HeaderFeed";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function FeedUser() {

    const router = useRouter()

    useEffect(() => {
        let value = localStorage.getItem("nos-social: token")
        if (value) {
            router.push("/loginUser")
        }
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-100">
            <Header />
            <Feed />
        </main>
    )
}
export default FeedUser;
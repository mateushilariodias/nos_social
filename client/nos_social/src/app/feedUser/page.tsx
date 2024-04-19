'use client';

import { useRouter } from "next/navigation";

export default function FeedUser() {

    const router = useRouter();
    router.push('/main')

    return (
        <div></div>
    );
}
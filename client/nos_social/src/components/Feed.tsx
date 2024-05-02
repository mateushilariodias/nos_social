'use client'

import Post from "./Post";

interface IPost {
    id: number;
    profilePicture: string;
    author: string;
    description: string;
    image: string;
    createdPost: string;
    userId: number;
}

function FeedMain(props: { post: IPost[] | undefined }) {

    return (
        <section className="w-full flex min-h-screen flex-col items-center gap-5">
            <div className="w-full flex flex-col gap-5 items-center">
                {props.post?.map((post, id) => {
                    return <Post post={post} key={id} />
                })}
            </div>
        </section>
    )
}
export default FeedMain;
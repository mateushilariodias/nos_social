import Post from "./Post";

const posts = [{
    id:1,
    album: 'Album',
    title: 'Title',
    postDescription: 'Description',
    image: ''
}, {
    id:2,
    album: 'Album',
    title: 'Title',
    postDescription: 'Description',
    image: 'https://media.licdn.com/dms/image/D4D03AQHB3q7Dgd0o7w/profile-displayphoto-shrink_800_800/0/1699232180763?e=2147483647&v=beta&t=vYL0StOA58XWQGfmy0W_ijHan4wAkjSTiZQXLHBeUHg'
}]

function FeedMain() {
    return (
        <section className="w-full flex flex-col items-center gap-5">
            {posts.map((post, id) => {
                return (
                    <Post post={post} key={id}/>
                )
            })}
        </section>
    )
}
export default FeedMain;
import Post from "./Post";

const posts = [{
    id:1,
    profilePicture: 'https://media.licdn.com/dms/image/D4D03AQHB3q7Dgd0o7w/profile-displayphoto-shrink_200_200/0/1699232180763?e=1716422400&v=beta&t=OQoAAoZzqcm-DJeOHPc3w36hHTo93jlTldFOQWqC-6s',
    author: 'User01',
    description: 'Description',
    image: ''
}, {
    id:2,
    profilePicture: '',
    author: 'User02',
    description: 'Description',
    image: 'https://th.bing.com/th/id/OIG3..Mntnk7M7LDYWo.V7ZFq?pid=ImgGn'
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
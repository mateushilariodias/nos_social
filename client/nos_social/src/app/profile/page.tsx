'use client';

import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import Feed from "@/components/Feed";
import { IPost } from "@/interfaces";

function Profile({ searchParams }: { searchParams: { id: string } }) {

    const profileQuery = useQuery({
        queryKey: ['profile', searchParams.id],
        queryFn: () => makeRequest.get(`users/get-user?id=` + searchParams.id).then((res) => {
            return res.data[0]
        })
    })

    if (profileQuery.error) {
        console.log(profileQuery.error)
    }

    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ['posts/?id='],
        queryFn: () =>
            makeRequest.get("post/"+searchParams.id).then((res) => {
                return res.data.data
            })
    })

    if (postQuery.error) {
        [
            console.log(postQuery.error)
        ]
    }

    return (
        <div className="w-3/5 flex flex-col items-center">
            <div className="relative">
                <img className="rounded-xl" src={profileQuery.data?.bgImg ? profileQuery.data.bgImg : "https://www.biotecdermo.com.br/wp-content/uploads/2016/10/sem-imagem-10.jpg"} alt="Imagem de Fundo do perfil" />
                <div className="flex absolute bottom-[-110px] left-10 items-center">
                    <img className="h-40 w-40 rounded-full border-zinc-100 border-4" src={profileQuery.data?.profilePicture ? profileQuery.data.profilePicture : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Foto de perfil do criador da postagem" />
                    <span className="text-2xl font-bold pl-2">{profileQuery.data?.author}</span>
                </div>
            </div>
            <div className="pt-36 w-3/5">
                <Feed post={postQuery.data}/>
            </div>
        </div>
    );
}
export default Profile;
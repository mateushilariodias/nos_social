'use client';

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import Feed from "@/components/Feed";
import { IPost } from "@/interfaces";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";

function Profile({ searchParams }: { searchParams: { id: string } }) {

    const queryClient = useQueryClient();
    const { user } = useContext(UserContext);
    const [userName, setUserName] = useState('');
    const [userImg, setUserImg] = useState('');
    const [bgImg, setBgImg] = useState('');
    const [editProfile, setEditProfile] = useState(false);


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
            makeRequest.get("post/" + searchParams.id).then((res) => {
                return res.data.data
            })
    })

    if (postQuery.error) {
        [
            console.log(postQuery.error)
        ]
    }

    const editProfileMutation = useMutation({
        mutationFn: async (data: { userName: string, userImg: string, bgImg: string, id: number }) => {
            return makeRequest
                .put(`users/update-user`, data)
                .then((res) => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", searchParams.id] })
        },
    });

    return (
        <div className="w-3/5 flex flex-col items-center">
            <div className="relative">
                <img className="rounded-xl" src={profileQuery.data?.bgImg ? profileQuery.data.bgImg : "https://www.biotecdermo.com.br/wp-content/uploads/2016/10/sem-imagem-10.jpg"} alt="Imagem de Fundo do perfil" />
                <div className="flex absolute bottom-[-110px] left-10 items-center">
                    <img className="h-40 w-40 rounded-full border-zinc-100 border-4" src={profileQuery.data?.profilePicture ? profileQuery.data.profilePicture : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Foto de perfil do criador da postagem" />
                    <span className="text-2xl font-bold pl-2">{profileQuery.data?.author}</span>
                </div>
            </div>
            <div className="pt-36 w-3/5 flex flex-col items-center gap-4">
                {user?.id === +searchParams.id ? (
                    <span>Conheça mais do perfil.</span>
                ) : 
                <button className={`w-1/2 rounded-md py-2 font-semibold bg-zinc-300 hover:text-black`}>
                    Editar perfil
                </button>
                }
                {editProfile &&
                    <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#00000094] z-10 flex items-center justify-center">Editar perfil</div>
                }
                <Feed post={postQuery.data} />
            </div>
        </div>
    );
}
export default Profile;
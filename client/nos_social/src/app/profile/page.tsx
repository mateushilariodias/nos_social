'use client';

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import Feed from "@/components/Feed";
import { IPost } from "@/interfaces";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import { FaTimesCircle } from "react-icons/fa";
import AuthInput from "@/components/AuthInput";

function Profile({ searchParams }: { searchParams: { id: string } }) {

    const queryClient = useQueryClient();
    const { user, setUser } = useContext(UserContext);
    const [userName, setUserName] = useState('');
    const [userImg, setUserImg] = useState('');
    const [bgImg, setBgImg] = useState('');
    const [editProfile, setEditProfile] = useState(false);


    const profileQuery = useQuery({
        queryKey: ['profile', searchParams.id],
        queryFn: () => makeRequest.get(`users/get-user?id=` + searchParams.id).then((res) => {
            setUserName(res.data[0].userName)
            setUserImg(res.data[0].userImg)
            setBgImg(res.data[0].bgImg)
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
                .then((res) => {
                    if (user) {
                        const newUser = { userName: data.userName, userImg: data.userImg, bgImg: data.bgImg, id: data.id, emailUser: user?.emailUser }
                        setUser(newUser)
                        return res.data
                    }
                });
        },
        onSuccess: () => {
            setEditProfile(false)
            queryClient.invalidateQueries({ queryKey: ["profile", searchParams.id] })
        },
    });

    return (
        <div className="flex flex-col items-center">
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
                    <div className="flex flex-row gap-8">
                        <button className={`rounded-md py-2 px-8 font-semibold bg-zinc-300 hover:text-black`} onClick={() => setEditProfile(true)}>
                            Editar perfil
                        </button>
                        <button className={`rounded-md py-2 px-8 font-semibold bg-zinc-300 hover:text-black`}>
                            Deletar perfil
                        </button>
                    </div>
                }
                {editProfile &&
                    <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#00000094] z-10 flex items-center justify-center">
                        <div className="bg-white w-2/3 rounded-xl flex flex-col items-center">
                            <header className="w-full border-b font-semibold text-lg text-zinc-600 flex justify-between items-center p-2">Editar perfil
                                <button onClick={() => setEditProfile(false)}><FaTimesCircle className="text-red-600" /></button></header>
                            <form className="w-2/3 py-8 flex flex-col gap-8">
                                <AuthInput newState={setUserName} htmlForAndNameAndId="userName" label="Nome de usuário:" type="text"></AuthInput>
                                <AuthInput newState={setUserImg} htmlForAndNameAndId="userImg" label="Imagem de perfil do usuário:" type="text"></AuthInput>
                                <AuthInput newState={setBgImg} htmlForAndNameAndId="bgImg" label="Imagem de fundo do perfil do usuário:" type="text"></AuthInput>
                                <button className={`w-1/2 rounded-md py-2 font-semibold bg-zinc-300 hover:text-black self-center`} onClick={(e) => { e.preventDefault(); editProfileMutation.mutate({ userName, userImg, bgImg, id: +searchParams.id }) }}>
                                    Editar perfil
                                </button>
                            </form>
                        </div>
                    </div>
                }
                <Feed post={postQuery.data} />
            </div>
        </div>
    );
}
export default Profile;
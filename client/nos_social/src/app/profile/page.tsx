'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import Feed from "@/components/Feed";
import { IPost } from "@/interfaces";
import { useContext, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import AuthInput from "@/components/AuthInput";
import { NgoContext } from "@/context/ngoContext";

function Profile({ searchParams }: { searchParams: { id: string } }) {

    const queryClient = useQueryClient();
    const { ngo, setNgo } = useContext(NgoContext);
    const [cnpj, setCnpj] = useState('');
    const [stateRegistration, setStateRegistration] = useState('');
    const [corporateReason, setCorporateReason] = useState('');
    const [emailNgo, setEmailNgo] = useState('');
    const [phoneNumberNgo, setPhoneNumberNgo] = useState('');
    const [physicalAddress, setPhysicalAddress] = useState('');
    const [objectiveOfTheNgo, setObjectiveOfTheNgo] = useState('');
    const [pageName, setPageName] = useState('');
    const [imageNgo, setImageNgo] = useState('');
    const [bgImageNgo, setBgImageNgo] = useState('');
    const [editProfile, setEditProfile] = useState(false);


    const profileQuery = useQuery({
        queryKey: ['profile', searchParams.id],
        queryFn: () => makeRequest.get(`users/get-user?id=` + searchParams.id).then((res) => {
            setCnpj(res.data[0].cnpj);
            setStateRegistration(res.data[0].stateRegistration);
            setCorporateReason(res.data[0].corporateReason);
            setEmailNgo(res.data[0].emailNgo);
            setPhoneNumberNgo(res.data[0].phoneNumberNgo);
            setPhysicalAddress(res.data[0].physicalAddress);
            setObjectiveOfTheNgo(res.data[0].objectiveOfTheNgo);
            setPageName(res.data[0].pageName);
            setImageNgo(res.data[0].imageNgo);
            setBgImageNgo(res.data[0].bgImageNgo);
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
        mutationFn: async (data: { cnpj: string, stateRegistration: string, corporateReason: string, emailNgo: string, phoneNumberNgo: string, physicalAddress: string, objectiveOfTheNgo: string, pageName: string, imageNgo: string, bgImageNgo: string, id: number }) => {
            return makeRequest
                .put(`users/update-user`, data)
                .then((res) => {
                    if (ngo) {
                        const newNgo = { cnpj: data.cnpj, stateRegistration: data.stateRegistration, corporateReason: data.corporateReason, emailNgo: data.emailNgo, phoneNumberNgo: data.phoneNumberNgo, physicalAddress: data.physicalAddress, objectiveOfTheNgo: data.objectiveOfTheNgo, pageName: data.pageName, imageNgo: data.imageNgo, bgImageNgo: data.bgImageNgo, id: data.id, emailUser: ngo?.emailNgo }
                        setNgo(newNgo)
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
                <img className="rounded-xl" src={profileQuery.data?.bgImageNgo ? profileQuery.data.bgImageNgo : "https://www.biotecdermo.com.br/wp-content/uploads/2016/10/sem-imagem-10.jpg"} alt="Imagem de Fundo do perfil da ONG" />
                <div className="flex absolute bottom-[-110px] left-10 items-center">
                    <img className="h-40 w-40 rounded-full border-zinc-100 border-4" src={profileQuery.data?.imageNgo ? profileQuery.data.imageNgo : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Imagem de perfil da ONG" />
                    <span className="text-2xl font-bold pl-2">{profileQuery.data?.pageName}</span>
                </div>
            </div>
            <div className="pt-36 w-3/5 flex flex-col items-center gap-4">
                {ngo?.id === +searchParams.id ? (
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
                    <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#00000094] z-10 flex items-center justify-center overflow-y-auto">
                        <div className="bg-white w-2/3 rounded-xl flex flex-col items-center">
                            <header className="w-full border-b font-semibold text-lg text-zinc-600 flex justify-between items-center p-2">Editar perfil
                                <button onClick={() => setEditProfile(false)}><FaTimesCircle className="text-red-600" /></button></header>
                            <form className="w-2/3 py-8 flex flex-col gap-5">
                                <div className="flex flex-row justify-between">
                                    <AuthInput newState={setCnpj} htmlForAndNameAndId="cnpj" label="CNPJ da ONG:" type="text"></AuthInput>
                                    <AuthInput newState={setStateRegistration} htmlForAndNameAndId="stateRegistration" label="Inscrição estadual de SP da ONG" type="text"></AuthInput>
                                    <AuthInput newState={setCorporateReason} htmlForAndNameAndId="corporateReason" label="Razão social da ONG:" type="text"></AuthInput>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <AuthInput newState={setEmailNgo} htmlForAndNameAndId="emailNgo" label="E-mail da ONG:" type="email"></AuthInput>
                                    <AuthInput newState={setPhoneNumberNgo} htmlForAndNameAndId="phoneNumberNgo" label="Número de telefone celular da ONG:" type="tel"></AuthInput>
                                </div>
                                <AuthInput newState={setPhysicalAddress} htmlForAndNameAndId="physicalAddress" label="Endereço físico da ONG:" type="text"></AuthInput>
                                <AuthInput newState={setObjectiveOfTheNgo} htmlForAndNameAndId="objectiveOfTheNgo" label="Objetivo da ONG:" type="text"></AuthInput>
                                <div className="flex flex-row justify-between gap-2">
                                    <AuthInput newState={setPageName} htmlForAndNameAndId="pageName" label="Nome da página:" type="text"></AuthInput>
                                    <AuthInput newState={setImageNgo} htmlForAndNameAndId="imageNgo" label="Imagem de perfil da ONG:" type="file"></AuthInput>
                                    <AuthInput newState={setBgImageNgo} htmlForAndNameAndId="bgImageNgo" label="Imagem de fundo do perfil da ONG:" type="file"></AuthInput>
                                </div>
                                <button className={`w-1/2 rounded-md py-2 font-semibold bg-zinc-300 hover:text-black self-center`} onClick={(e) => { e.preventDefault(); editProfileMutation.mutate({ cnpj, stateRegistration, corporateReason, emailNgo, phoneNumberNgo, physicalAddress, objectiveOfTheNgo, pageName, imageNgo, bgImageNgo, id: +searchParams.id }) }}>
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
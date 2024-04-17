"use client";

import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";

// import AuthInput from "@/components/AuthInput";
// import { useState } from "react";
// import { makeRequest } from "../../../../axios";

function UserConfiguration({ searchParameters }: { searchParameters: { id: string } }) {

    const {data, error} = useQuery({
        queryKey:['profile',searchParameters.id],
        queryFn:() => makeRequest.get(`users/get-user?id=`+searchParameters.id).then((res) => {
            return res.data[0]
        })
    })

    if (error) {
        console.log(error)
    }
    console.log(data)

    return (
        <div>{searchParameters.id}</div>
    );

    // const [fullName, setFullName] = useState("");
    // const [userName, setUserName] = useState("");
    // const [emailUser, setEmailUser] = useState("");
    // const [phoneNumberUser, setPhoneNumberUser] = useState("");
    // const [passwordUser, setPasswordUser] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [error, setError] = useState("")
    // const [success, setSuccess] = useState("")
    // const [profilePicture, setProfilePicture] = useState<string>('');

    // const handleUserConfiguration = (e: any) => {
    //     e.preventDefault();
    //     makeRequest
    //         .post('/userConfiguration', { fullName, userName, emailUser, phoneNumberUser, passwordUser, confirmPassword })
    //         .then((res) => {
    //             console.log(res.data);
    //             setSuccess(res.data.msg)
    //             setError('')
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             setError(err.response?.data?.msg || 'Ocorreu um erro ao processar sua solicitação.');
    //             setSuccess('');
    //         });
    // };

    // const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //       if (typeof reader.result === 'string') {
    //         setProfilePicture(reader.result);
    //       }
    //     };

    //     if (file) {
    //       reader.readAsDataURL(file);
    //     }
    //   };

    // return (
    //     <>
    //         <h1 className="font-bold text-2xl">Configuração de usuário</h1>
    //         <div>
    //             <img className="w-24 h-24 rounded-full mx-auto" src={profilePicture || "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Imagem do perfil" />
    //             <input type="file" accept="image/*" className="pt-4" onChange={handleProfilePicChange} />
    //          </div>
    //         <AuthInput newState={setFullName} htmlForAndNameAndId="fullName" label="Nome:" type="text"></AuthInput>
    //         <AuthInput newState={setUserName} htmlForAndNameAndId="userName" label="Nome de usuário:" type="text"></AuthInput>
    //         <AuthInput newState={setEmailUser} htmlForAndNameAndId="emailUser" label="E-mail:" type="email"></AuthInput>
    //         <AuthInput newState={setPhoneNumberUser} htmlForAndNameAndId="phoneNumberUser" label="Celular:" type="tel"></AuthInput>
    //         <AuthInput newState={setPasswordUser} htmlForAndNameAndId="passwordUser" label="Senha:" type="password"></AuthInput>
    //         <AuthInput newState={setConfirmPassword} htmlForAndNameAndId="confirmPassword" label="Confirme a senha:" type="password"></AuthInput>
    //         {error.length > 0 && <span className="text-red-600">* {error}</span>}
    //         {success.length > 0 && <span className="text-green-600">* {success}</span>}
    //         <button className="bg-blue-600 hover:bg-blue-800 py-3 font-bold text-white rounded-lg" onClick={(e) => handleUserConfiguration(e)}>
    //             <strong>Salvar alteraçães</strong>
    //         </button>
    //         <button className="bg-blue-600 hover:bg-blue-800 py-3 font-bold text-white rounded-lg" onClick={(e) => handleUserConfiguration(e)}>
    //             <strong>Excluir cadastro</strong>
    //         </button>
    //     </>
    // );
}
export default UserConfiguration;
"use client";

import AuthInput from "@/components/AuthInput";
import Link from "next/link";
import { useContext, useState } from "react";
import { makeRequest } from "../../../../axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

function LoginUser() {
    const [emailUser, setEmailUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [error, setError] = useState("")
    const router = useRouter()
    const {setUser} = useContext(UserContext)


    const handleLoginUser = (e: any) => {
        e.preventDefault();
        makeRequest
            .post('auth/loginUser', { emailUser, passwordUser })
            .then((res) => {
                localStorage.setItem("nos-social:user", JSON.stringify(res.data.user));
                setUser(res.data.user)
                setError('');
                router.push("/main")
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.msg)
            });
    };

    return (
        <>
            <h1 className="font-bold text-2xl">Login de usuário</h1>
            <AuthInput newState={setEmailUser} htmlForAndNameAndId="emailUser" label="E-mail:" type="email"></AuthInput>
            <AuthInput newState={setPasswordUser} htmlForAndNameAndId="passwordUser" label="Senha:" type="password"></AuthInput>
            {error.length > 0 && <span className="text-red-600">* {error}</span>}
            <button className="bg-blue-600 hover:bg-blue-800 py-3 font-bold text-white rounded-lg" onClick={(e) => handleLoginUser(e)}>
                <strong>Entrar</strong>
            </button>
            <div className="flex justify-between">
                <Link href="/registerUser"><span className="text-left underline">Cadastar-se</span></Link>
                <Link href="/resetUserPassword"><span className="text-right underline">Redefinir senha</span></Link>
            </div>
        </>
    )
}
export default LoginUser;
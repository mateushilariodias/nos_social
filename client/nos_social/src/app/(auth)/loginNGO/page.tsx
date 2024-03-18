"use client";

import AuthInput from "@/components/AuthInput";
import Link from "next/link";
import { useState } from "react";
import { makeRequest } from "../../../../axios";
import { useRouter } from "next/navigation";

function loginNgo() {
    const [emailNgo, setEmailNgo] = useState("");
    const [passwordNgo, setPasswordNgo] = useState("");
    const [error, setError] = useState("")
    const router = useRouter()

    const handleloginNgo = (e: any) => {
        e.preventDefault();
        makeRequest
            .post('auth/loginNgo', { emailNgo, passwordNgo })
            .then((res) => {
                localStorage.setItem("nos-social: ngo", JSON.stringify(res.data.data.user))
                localStorage.setItem("nos-social: token", JSON.stringify(res.data.data.token))
                setError('');
                router.push("/")
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.msg)
            });
    };

    return (
        <>
            <h1 className="font-bold text-2xl">Login de ONG</h1>
            <AuthInput newState={setEmailNgo} htmlForAndNameAndId="emailUser" label="E-mail:" type="email"></AuthInput>
            <AuthInput newState={setPasswordNgo} htmlForAndNameAndId="passwordUser" label="Senha:" type="password"></AuthInput>
            {error.length > 0 && <span className="text-red-600">* {error}</span>}
            <button className="bg-blue-600 hover:bg-blue-800 py-3 font-bold text-white rounded-lg" onClick={(e) => handleloginNgo(e)}>
                <strong>Entrar</strong>
            </button>
            <div className="flex justify-between">
                <Link href="/registerNGO"><span className="text-left underline">Cadastar ONG</span></Link>
                <Link href="/resetUserPassword"><span className="text-right underline">Redefinir senha da ONG</span></Link>
            </div>
        </>
    )
}
export default loginNgo;
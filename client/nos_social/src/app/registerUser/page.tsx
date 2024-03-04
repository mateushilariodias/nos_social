"use client";

import AuthInput from "@/components/AuthInput";
import AuthPage from "@/components/AuthPage";
import Link from "next/link";
import { useState } from "react";
import { makeRequest } from "../../../axios";

function RegisterUser() {

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [emailUser, setEmailUser] = useState("");
    const [phoneNumberUser, setPhoneNumberUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleRegisterUser = (e: any) => {
        e.preventDefault();
        makeRequest
            .post('auth/registerUser', { fullName, userName, emailUser, phoneNumberUser, passwordUser, confirmPassword })
            .then((res) => {
                console.log(res.data);
                setSuccess(res.data.msg)
                setError('')
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.msg)
                setSuccess('')
            });
    };

    return (
        <AuthPage>
            <h1 className="font-bold text-2xl">Cadastro de usuário</h1>
            <AuthInput newState={setFullName} htmlForAndNameAndId="fullName" label="Nome:" type="text"></AuthInput>
            <AuthInput newState={setUserName} htmlForAndNameAndId="userName" label="Nome de usuário:" type="text"></AuthInput>
            <AuthInput newState={setEmailUser} htmlForAndNameAndId="emailUser" label="E-mail:" type="email"></AuthInput>
            <AuthInput newState={setPhoneNumberUser} htmlForAndNameAndId="phoneNumberUser" label="Celular:" type="tel"></AuthInput>
            <AuthInput newState={setPasswordUser} htmlForAndNameAndId="passwordUser" label="Senha:" type="password"></AuthInput>
            <AuthInput newState={setConfirmPassword} htmlForAndNameAndId="confirmPassword" label="Confirme a senha:" type="password"></AuthInput>
            {error.length > 0 && <span className="text-red-600">* {error}</span>}
            {success.length > 0 && <span className="text-green-600">* {success}</span>}
            <button className="bg-blue-600 hover:bg-blue-800 py-3 font-bold text-white rounded-lg" onClick={(e) => handleRegisterUser(e)}>
                <strong>Cadastrar-se</strong>
            </button>
            <div className="flex justify-between">
                <Link href="/loginUser"><span className="text-left underline">Logar</span></Link>
                <Link href="/resetUserPassword"><span className="text-right underline">Redefinir senha</span></Link>
            </div>
        </AuthPage>
    );
}
export default RegisterUser;
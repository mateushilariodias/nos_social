"use client";

import AuthInput from "@/components/AuthInput";
import AuthPage from "@/components/AuthPage";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

function RegisterUser() {

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [emailUser, setEmailUser] = useState("");
    const [phoneNumberUser, setPhoneNumberUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegisterUser = (e: any) => {
        e.preventDefault();
        axios
            .post('http://localhost:8001/api/auth/register', { fullName, userName, emailUser, phoneNumberUser, passwordUser, confirmPassword })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
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
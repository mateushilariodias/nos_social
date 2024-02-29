"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

function LoginUser() {
    const [emailUser, setEmailUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");

    const handleLoginUser = (e: any) => {
        e.preventDefault();
        axios
            .post('http://localhost:8001/api/auth/login', { emailUser, passwordUser})
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        };

    return (
        <main className="flex flex-col min-h-screen items-center justify-center">
            <form action="" className="flex flex-col bg-slate-200 py-10 px-10 rounded-2xl gap-5 text-gray-800 w-full lg:w-1/4">
                <h1 className="font-bold text-2xl">Login de usuário</h1>
                <div className="flex flex-col items-start justify-between">
                    <label htmlFor="emailUser">E-mail:</label>
                    <input
                        type="email"
                        name="emailUser"
                        id="emailUser"
                        onChange={(e) => setEmailUser(e.currentTarget.value)}
                        className="py-2 px-3 border-gray-400 border-b w-full focus-visible:border-gray-600 focus-visible:border-b focus-visible:outline-none" />
                </div>
                <div className="flex flex-col items-start justify-between">
                    <label htmlFor="passwordUser">Senha:</label>
                    <input
                        type="password"
                        name="passwordUser"
                        id="passwordUser"
                        onChange={(e) => setPasswordUser(e.currentTarget.value)}
                        className="py-2 px-3 border-gray-400 border-b w-full focus-visible:border-gray-600 focus-visible:border-b focus-visible:outline-none" />
                </div>
                <button className="bg-blue-600 hover:bg-blue-800 py-3 font-bold text-white rounded-lg" onClick={(e)=>handleLoginUser(e)}>
                    <strong>Entrar</strong>
                </button>
                <div className="flex justify-between">
                    <Link href="/registerUser"><span className="text-left underline">Cadastar-se</span></Link>
                    <Link href="/resetUserPassword"><span className="text-right underline">Redefinir senha</span></Link>
                </div>
            </form>
        </main>
    )
}
export default LoginUser;
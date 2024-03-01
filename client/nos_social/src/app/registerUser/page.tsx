import AuthInput from "@/components/AuthInput";
import AuthPage from "@/components/AuthPage";
import { useState } from "react";

function RegisterUser() {

    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [emailUser, setEmailUser] = useState("");
    const [phoneNumberUser, setPhoneNumberUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <AuthPage>
            <h1 className="font-bold text-2xl">Cadastro de usuário</h1>
            <AuthInput newState={setFullName} htmlForAndNameAndId="fullName" label="Nome:" type="text"></AuthInput>
            <AuthInput newState={setUserName} htmlForAndNameAndId="userName" label="Nome de usuário:" type="text"></AuthInput>
            <AuthInput newState={setEmailUser} htmlForAndNameAndId="emailUser" label="E-mail:" type="email"></AuthInput>
            <AuthInput newState={setPhoneNumberUser} htmlForAndNameAndId="phoneNumberUser" label="Celular:" type="tel"></AuthInput>
            <AuthInput newState={setPasswordUser} htmlForAndNameAndId="passwordUser" label="Senha:" type="password"></AuthInput>
            <AuthInput newState={setConfirmPassword} htmlForAndNameAndId="confirmPassword" label="Confirme a senha:" type="password"></AuthInput>
        </AuthPage>
    );
}
export default RegisterUser;
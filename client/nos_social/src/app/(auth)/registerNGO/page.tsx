"use client";

import AuthInput from "@/components/AuthInput";
import Link from "next/link";
import { useState } from "react";
import { makeRequest } from "../../../../axios";

function RegisterNgo() {

    const [cnpj, setCnpj] = useState("");
    const [stateRegistration, setStateRegistration] = useState("");
    const [corporateReason, setCorporateReason] = useState("");
    const [emailNgo, setEmailNgo] = useState("");
    const [phoneNumberNgo, setPhoneNumberNgo] = useState("");
    const [physicalAddress, setPhysicalAddress] = useState("");
    const [objectiveOfTheNgo, setObjectiveOfTheNgo] = useState("");
    const [pageName, setPageName] = useState("");
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleRegisterNgo = (e: any) => {
        e.preventDefault();
        makeRequest
            .post('auth/registerNgo', { cnpj, stateRegistration, corporateReason, emailNgo, phoneNumberNgo, physicalAddress, objectiveOfTheNgo, pageName })
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
        <>
            <h1 className="font-bold text-2xl">Cadastro de ONG</h1>
            <AuthInput newState={setCnpj} htmlForAndNameAndId="cnpj" label="CNPJ da ONG:" type="text"></AuthInput>
            <AuthInput newState={setStateRegistration} htmlForAndNameAndId="stateRegistration" label="Inscrição estadual de SP da ONG" type="text"></AuthInput>
            <AuthInput newState={setCorporateReason} htmlForAndNameAndId="corporateReason" label="Razão social da ONG:" type="text"></AuthInput>
            <AuthInput newState={setEmailNgo} htmlForAndNameAndId="emailNgo" label="E-mail da ONG:" type="email"></AuthInput>
            <AuthInput newState={setPhoneNumberNgo} htmlForAndNameAndId="phoneNumberNgo" label="Número de telefone celular da ONG:" type="tel"></AuthInput>
            <AuthInput newState={setPhysicalAddress} htmlForAndNameAndId="physicalAddress" label="Endereço físico da ONG:" type="text"></AuthInput>
            <AuthInput newState={setObjectiveOfTheNgo} htmlForAndNameAndId="objectiveOfTheNgo" label="Objetivo da ONG:" type="text"></AuthInput>
            <AuthInput newState={setPageName} htmlForAndNameAndId="pageName" label="Nome da página:" type="text"></AuthInput>
            {error.length > 0 && <span className="text-red-600">* {error}</span>}
            {success.length > 0 && <span className="text-green-600">* {success}</span>}
            <button className="bg-blue-600 hover:bg-blue-800 py-3 font-bold text-white rounded-lg" onClick={(e) => handleRegisterNgo(e)}>
                <strong>Cadastrar-se</strong>
            </button>
        </>
    );
}
export default RegisterNgo;
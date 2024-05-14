'use client';

import { createContext, useEffect, useState } from "react";

interface ContextProps {
    children: React.ReactNode;
}

interface Ngo {
    ngo:
    | {
        id: number;
        cnpj: string,
        stateRegistration: string,
        corporateReason: string,
        emailNgo: string,
        phoneNumberNgo: string,
        objectiveOfTheNgo: string,
        pageName: string,
        imageNgo: string,
        bgImageNgo: string,
        registeringUser: string
    } | undefined
    setNgo: (newState: any) => void;
}

const intialValue = {
    ngo: undefined,
    setNgo: () => { },
}

export const NgoContext = createContext<Ngo>(intialValue)

export const NgoContextProvider = ({ children }: ContextProps) => {
    const [ngo, setNgo] = useState(intialValue.ngo);
    useEffect(() => {
        let NgoJSON = localStorage.getItem("nos-social:ngo");
        setNgo(NgoJSON && JSON.parse(NgoJSON));
    },[]);

    return (
        <NgoContext.Provider value={{
            ngo,
            setNgo
        }}>
            {children}
        </NgoContext.Provider >
    )
}
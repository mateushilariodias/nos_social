'use client';

import { createContext, useEffect, useState } from "react";

interface ContextProps {
    children: React.ReactNode;
}

interface User {
    user:
    | {
        id: number;
        fullName: string,
        userName: string,
        emailUser: string,
        phoneNumberUser: string,
        passwordUser: string,
        userImg: string,
    } | undefined
    setUser: (newState: any) => void;
}

const intialValue = {
    user: undefined,
    setUser: () => { },
}

export const UserContext = createContext<User>(intialValue)

export const UserContextProvider = ({ children }: ContextProps) => {
    const [user, setUser] = useState(intialValue.user);
    useEffect(() => {
        let UserJSON = localStorage.getItem("nos-social:user");
        setUser(UserJSON && JSON.parse(UserJSON));
    });

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider >
    )
}
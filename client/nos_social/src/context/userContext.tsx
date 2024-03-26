'use client';

import { createContext, useState } from "react";

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
    let UserJSON = localStorage.getItem("nos-social:user")
    const [user, setUser] = useState(
        UserJSON ? JSON.parse(UserJSON) : intialValue.user
    )
    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider >
    )
}
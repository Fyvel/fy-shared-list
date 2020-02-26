import React, { useState, useMemo, createContext } from "react"

export type User = {
    firstname: string,
    lastname: string,
    claims: { id: string, name: string }[]
}

export const initialAuthCtx = {
    user: null as User | null,
    handleLogin: (user: User) => { },
    handleLogout: () => { }
}

export const AuthContext = createContext(initialAuthCtx)

export function AuthContextProvider(props: any) {
    const [user, setUser] = useState(initialAuthCtx.user)

    const handleLogout = () => setUser(initialAuthCtx.user)

    const handleLogin = (data: User) => setUser(data)

    // useMemo to memorize the metadata every time 'auth' is changing
    const auth = useMemo(() => ({
        user,
        handleLogin,
        handleLogout
    }), [user])

    return <AuthContext.Provider value={auth} {...props} />
}
import React, { useState, useMemo, createContext } from "react"
import { User } from "firebase/app"


export const initialAuthCtx = {
    user: null as User | null,
    handleLogin: (user: User | null) => { },
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
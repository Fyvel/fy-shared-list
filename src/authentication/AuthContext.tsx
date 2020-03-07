import React, { useState, useMemo, createContext, useEffect } from "react"
import { User } from "firebase/app"

export const initialAuthCtx = {
    user: null as User | null,
    handleLogin: (user: User | null) => { },
    handleLogout: () => { }
}

export const AuthContext = createContext(initialAuthCtx)

export function AuthContextProvider(props: any) {
    const storedUser = window.localStorage.getItem('FIREBASE_USER')

    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : initialAuthCtx.user)

    const handleLogout = () => {
        setUser(initialAuthCtx.user)
        window.localStorage.removeItem('FIREBASE_USER')
    }

    const handleLogin = (data: User) => {
        setUser(data)
        window.localStorage.setItem('FIREBASE_USER', JSON.stringify(data))
    }

    // useEffect(() => {
    //     if (user) return
    //     const storedUser = window.localStorage.getItem('FIREBASE_USER')
    //     setUser(storedUser ? JSON.parse(storedUser) : initialAuthCtx.user)
    // }, [user])

    // useMemo to memorize the metadata every time 'auth' is changing
    const auth = useMemo(() => ({
        user,
        handleLogin,
        handleLogout
    }), [user])

    return <AuthContext.Provider value={auth} {...props} />
}
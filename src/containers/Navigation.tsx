import React, { useEffect } from "react";
import Menu from "../components/Menu";
import useSharedList from "../hooks/useSharedList";
import { useAuthContext } from "../authentication";

export default function Navigation() {
    const { getLists, listNames, loading } = useSharedList()
    const { user, signOut } = useAuthContext()

    useEffect(() => {
        getLists()
    }, [getLists])

    return (
        <Menu links={listNames}
            loading={loading}
            user={user}
            handleLogout={signOut} />
    )
}
import React, { useMemo } from "react";
import Menu from "../components/Menu";
import EventEmitter from '../event/event';
import useSharedList from "../hooks/useSharedList";
import { useAuthContext } from "../authentication";

export default function Navigation() {
    const { links, loading } = useSharedList()
    const { user, signOut } = useAuthContext()

    const handleListChange = useMemo(() => (id: string) => EventEmitter.dispatch('onListChange', id), [])

    return (
        <Menu links={links}
            callback={handleListChange}
            loading={loading}
            user={user}
            handleLogout={signOut} />
    )
}
import React from "react";
import Menu from "../components/Menu";
import EventEmitter from '../event/event';
import useSharedList from "../hooks/useSharedList";
import { useAuthContext } from "../authentication";
import { RoutePath } from "../router/routes";
import { useHistory } from "react-router-dom";

export default function Navigation() {
    const { links, loading } = useSharedList()
    const { user, signOut } = useAuthContext()
    const history = useHistory()

    const handleListChange = (id: string) => {
        history.push(RoutePath.SHAREDLIST)
        EventEmitter.dispatch('onListChange', id)
    }

    return (
        <Menu links={links}
            callback={handleListChange}
            loading={loading}
            user={user}
            handleLogout={signOut} />
    )
}
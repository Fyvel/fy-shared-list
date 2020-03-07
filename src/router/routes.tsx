import React, { ReactNode } from "react"
import { Switch, Route, useHistory, useLocation, Redirect, RouteProps } from "react-router-dom"
import SharedList from "../containers/SharedList"
import { useAuthContext } from "../authentication"
import Unauthorized from "../components/Unauthorized"
import SignIn from "../containers/SignIn"

// wrapper to redirect not authenticated user
function PrivateRoute({ children, ...rest }: { children: ReactNode } & RouteProps) {
    const { user } = useAuthContext()

    return (
        <Route
            {...rest}
            render={({ location }) => user
                ? (children)
                : (<Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: location }
                    }}
                />)}
        />)
}

export default function Routes() {
    const history = useHistory()
    const location = useLocation<{ from: string }>()
    const { from } = location.state || { from: { pathname: "/" } }

    return (
        <Switch>
            <Route path="/signin">
                <SignIn callback={() => history.replace(from)} />
            </Route>
            {/* <Route path="/unauthorized">
                <Unauthorized />
            </Route> */}
            <PrivateRoute path="/sharedList">
                <SharedList />
            </PrivateRoute>
            <Redirect to="/sharedList" />
            <Redirect exact path="/" to="/sharedList" />
        </Switch>
    )
}
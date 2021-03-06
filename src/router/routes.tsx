import React, { ReactNode } from "react"
import { Switch, Route, useHistory, useLocation, Redirect, RouteProps } from "react-router-dom"
import SharedList from "../containers/SharedList"
import { useAuthContext } from "../authentication"
// import Unauthorized from "../components/Unauthorized"
import SignIn from "../containers/SignIn"
import { useQuery } from "../hooks/useQuery"

export const RoutePath = {
    SIGNIN: "/signin",
    SHAREDLIST: "/sharedList",
}
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
                        pathname: RoutePath.SIGNIN,
                        state: { from: location }
                    }}
                />)}
        />)
}

export default function Routes() {
    const history = useHistory()
    const location = useLocation<{ from: string }>()
    const { from } = location.state || { from: { pathname: "/" } }
    const query = useQuery()
    const routeParam = query.get('list') || 'todos'
    return (
        <Switch>
            <Route path={RoutePath.SIGNIN}>
                <SignIn callback={() => history.replace(from)} />
            </Route>
            {/* <Route path="/unauthorized">
                <Unauthorized />
            </Route> */}
            <PrivateRoute path={RoutePath.SHAREDLIST}>
                <SharedList id={routeParam} />
            </PrivateRoute>
            <Redirect to={RoutePath.SHAREDLIST} />
            <Redirect exact path="/" to={RoutePath.SHAREDLIST} />
        </Switch>
    )
}
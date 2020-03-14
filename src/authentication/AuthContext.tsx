import React, {
    useState,
    useMemo,
    useEffect,
    createContext,
    useContext
} from "react"
import useFirebase from "../hooks/useFirebase"
import useLocalStorage from "../hooks/useLocalStorage"

const SETTINGS = {
    // redirect URL
    url: 'https://fy-shared-list.web.app/signin',
    handleCodeInApp: true,
}

const EMAIL_KEY = 'EMAIL_FOR_SIGN_IN'
const USER_KEY = 'FIREBASE_USER'
const initialAuthCtx = {
    user: undefined as firebase.User | undefined
}

type AuthCtx = {
    user: firebase.User | undefined,
    sendEmailLink: (email: string) => Promise<void | Error>,
    signIn: (url: string) => Promise<void | Error>,
    signOut: () => void,
    error?: Error
}

export const AuthContext = createContext<AuthCtx>(initialAuthCtx as AuthCtx)

export const useAuthContext = () => useContext(AuthContext)

export function AuthContextProvider(props: any) {
    const { fireauth, persistence } = useFirebase()
    const [user, setUser] = useLocalStorage<firebase.User>(USER_KEY)
    // const [emailStored, setEmailStored] = useLocalStorage(EMAIL_KEY, '')

    const [error, setError] = useState<Error>()

    useEffect(() => {
        if (!error) return
        setTimeout(() => setError(undefined), 3000)
    }, [error])

    // remember the auth dataset result every time 'auth' is changing
    const auth = useMemo(() => {
        const signOut = () => {
            fireauth.signOut()
            setUser(undefined)
        }

        const sendEmailLink = async (email: string) => {
            const actionCodeSettings = { ...SETTINGS }
            try {
                window.localStorage.setItem(EMAIL_KEY, email)
                return await fireauth.sendSignInLinkToEmail(
                    email,
                    actionCodeSettings
                )
            } catch (err) {
                const error = new Error(err)
                console.log('Oops', error)
                return error
            }
        }

        const confirmSignIn = (callback: (user?: firebase.User) => void) =>
            async (url: string) => {
                try {
                    if (fireauth.isSignInWithEmailLink(url)) {
                        // If missing email, prompt user for it
                        const emailValue = window.localStorage.getItem(EMAIL_KEY)
                        if (!emailValue) {
                            const email = window.prompt('Hey there! Please provide your email addresse to get on board 😄') || ''
                            window.localStorage.setItem(EMAIL_KEY, email)
                            return callback(undefined)
                        }
                        // Signin user and remove the email localStorage
                        await fireauth.setPersistence(persistence.LOCAL)
                        const creds = await fireauth.signInWithEmailLink(emailValue, url)
                        window.localStorage.removeItem(EMAIL_KEY)
                        return callback(creds.user || undefined)
                    }
                } catch (err) {
                    const error = new Error(err)
                    console.log('Oops', error)
                    return error
                }
            }

        const callback = (user?: firebase.User) => {
            setUser(user)
            setError(undefined)
        }

        const signIn = confirmSignIn(callback)

        const ctx = {
            user,
            sendEmailLink,
            signIn,
            signOut,
            error,
        }
        return ctx
    }, [user, error, fireauth, setUser, persistence.LOCAL])

    return <AuthContext.Provider value={auth} {...props} />
}

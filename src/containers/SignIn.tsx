import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../authentication';
import Login, { Logout } from '../components/Login';

export default function SignIn({ callback }: { callback: () => void }) {
    const initial = {
        emailValue: '',
        emailSent: false,
        error: ''
    }
    const {
        user,
        signIn,
        sendEmailLink,
        signOut, } = useAuthContext()
    // const [emailKey, setEmailKey] = useStorage(initial.emailKey, initial.emailValue)
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState<Error>()

    const handleLogin = async (email: string) => {
        try {
            await sendEmailLink(email)
            setEmailSent(true)
        } catch (e) {
            setEmailSent(false)
            setError(e)
        }
    }

    useEffect(() => {
        signIn(window.location.href)
    }, [signIn])

    return (
        <>
            {!user
                ? <>
                    <h1>
                        <span role="img" aria-label="emoji">👋</span>
                        Welcome!
                    </h1>
                    <h3>Use your email address to sign in</h3>
                    <Login handleLogin={handleLogin} handleSigninLink={signIn} />
                </>
                : <>
                    <h1>
                        <span role="img" aria-label="emoji">👏</span>
                        Your are logged in
                    </h1>
                    <Logout handleLogout={signOut} />
                </>}
            {emailSent &&
                (<>
                    <span role="img" aria-label="emoji">🎉</span>
                    Great! We sent you an email with your login link
                </>)}
            {error &&
                (<>
                    <span role="img" aria-label="emoji">😱</span>
                    <p>Oops... Something went wrong...</p>
                    <p>{error}</p>
                </>)}
        </>)
}
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../authentication';
import Login, { Logout } from '../components/Login';
import useFirebase from '../hooks/useFirebase';

const SETTINGS = {
    // redirect URL
    url: 'https://fy-shared-list.web.app/signin',
    handleCodeInApp: true,
}

export default function SignIn({ callback }: { callback: () => void }) {
    const initial = {
        emailKey: 'EMAIL_FOR_SIGN_IN',
        emailValue: '',
        emailSent: false,
        error: ''
    }
    const { user, handleLogin, handleLogout } = useAuthContext()
    const { fireauth } = useFirebase()
    // const [emailKey, setEmailKey] = useStorage(initial.emailKey, initial.emailValue)
    const [emailSent, setEmailSent] = useState(initial.emailSent)
    const [error, setError] = useState(initial.error)

    const sendEmailLink = async (email: string) => {
        const actionCodeSettings = { ...SETTINGS }
        try {
            await fireauth().sendSignInLinkToEmail(
                email,
                actionCodeSettings
            )
            // setEmailKey(email)
            window.localStorage.setItem(initial.emailKey, email)
            setEmailSent(true)
            setError(initial.error)
        } catch (err) {
            console.log(err)
            setError(err.message)
            setEmailSent(false)
        }
    }
    const confirmSignIn = async (url: string) => {
        try {
            if (fireauth().isSignInWithEmailLink(url)) {
                // If missing email, prompt user for it
                const emailValue = window.localStorage.getItem(initial.emailKey)
                if (!emailValue) {
                    const email = window.prompt('Hey there! Please provide your email for confirmation 😄') || ''
                    window.localStorage.setItem(initial.emailKey, email)
                }
                // Signin user and remove the email localStorage
                const creds = await fireauth().signInWithEmailLink(window.localStorage.getItem(initial.emailKey)!, url)
                handleLogin(creds.user)
                return callback()
            }
        } catch (err) {
            setError(err.message)
            setEmailSent(false)
        }
    }

    useEffect(() => {
        confirmSignIn(window.location.href)
    }, [])

    return (
        <>
            {!user
                ? <>
                    <h1>
                        <span role="img" aria-label="emoji">👋</span>
                        Welcome!
                    </h1>
                    <h3>Use your email address to sign in</h3>
                    <Login handleLogin={sendEmailLink} handleSigninLink={confirmSignIn}/>
                </>
                : <>
                    <h1>
                        <span role="img" aria-label="emoji">👏</span>
                        Your are logged in
                    </h1>
                    <Logout handleLogout={handleLogout} />
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
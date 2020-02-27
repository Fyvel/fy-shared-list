import React, { useState } from 'react';
import { useAuthContext } from '../authentication';
import Login from '../components/Login';
import useFirebase from '../hooks/useFirebase';

const SETTINGS = {
    // Your redirect URL
    url: 'http://localhost:3000/signin',
    handleCodeInApp: true,
}

export default function SignIn({ callback }: { callback: () => void }) {
    const { user, handleLogin } = useAuthContext()
    const { firebase } = useFirebase()
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState('')

    const sendEmailLink = async (email: string) => {
        debugger
        const actionCodeSettings = { ...SETTINGS }
        try {
            await firebase.auth().sendSignInLinkToEmail(
                email,
                actionCodeSettings
            )
            window.localStorage.setItem('emailForSignIn', email)
            setEmailSent(true)
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }
    const confirmSignIn = async (url: string) => {
        try {
            if (firebase.auth().isSignInWithEmailLink(url)) {
                const email = window.localStorage.getItem('emailForSignIn')
                // If missing email, prompt user for it
                if (!email) {
                    window.alert('Please provide your email for confirmation !')
                    throw new Error('An email address is required')
                }
                // Signin user and remove the email localStorage
                const creds = await firebase.auth().signInWithEmailLink(email, url)

                window.localStorage.removeItem('emailForSignIn')
                handleLogin(creds.user)
                return callback()
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            <h1>
                <span role="img" aria-label="emoji">🤷‍♀️</span>
                Who are you?
            </h1>
           {user
                ? <>logged in</>
                : <Login handleLogin={sendEmailLink} />}
            {emailSent &&
                (<>An email has been to your address</>)}
            {error &&
                (<>
                    <p>Something went wrong...</p>
                    <p>{error}</p>
                </>)}
        </>)
}
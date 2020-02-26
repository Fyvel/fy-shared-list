import React from 'react';
import { useAuthContext, User } from '../authentication';
import Login from '../components/Login';

export default function SignIn({ callback }: { callback: () => void }) {
    const { handleLogin } = useAuthContext()

    const signInHandler = () => {
        handleLogin({
            firstname: "Kakarot",
            lastname: "Sangoku",
            claims: [
                {
                    id: "HERO_ACCESS",
                    name: "HERO"
                }
            ]
        })
        return callback()
    }
    return (
        <>
            <h1>
                <span role="img" aria-label="emoji">🤷‍♀️</span>
                Who are you?
            </h1>
            <Login handleLogin={signInHandler} />
        </>)
}
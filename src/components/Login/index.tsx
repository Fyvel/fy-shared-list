import React, { useState } from 'react';
import styles from './Login.module.scss'
import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

type LoginProps = {
    handleLogin: (args: any) => void
    handleSigninLink: (args: any) => void
}
export default function Login(props: LoginProps) {
    const { register, handleSubmit } = useForm()
    const [displayEmailInput, setDisplayEmailInput] = useState(true)

    const onSubmitLink = (data: Record<string, any>) => {
        props.handleSigninLink(data.link)
    }

    const onSubmit = (data: Record<string, any>) => {
        props.handleLogin(data.email)
    }

    return (
        <>
            {displayEmailInput ?
                <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
                    <TextField
                        inputRef={register}
                        label="Email address"
                        name="email"
                        required
                        variant="filled"
                        type="email"
                    />
                    <Button className={styles.btn}
                        type="submit"
                        variant="contained"
                        color="primary">
                        SIGN IN
                    </Button>
                </form> :
                <form onSubmit={handleSubmit(onSubmitLink)} className={styles.Form}>
                    <TextField
                        inputRef={register}
                        label="Magic sign-in link"
                        name="link"
                        required
                        variant="filled"
                        type="text"
                    />
                    <Button className={styles.btn}
                        type="submit"
                        variant="contained"
                        color="primary">
                        USE THE MAGIC LINK !
                    </Button>
                </form>}
            <Button className={styles.btn}
                variant="outlined"
                color="secondary"
                onClick={() => setDisplayEmailInput(!displayEmailInput)}>
                {displayEmailInput ? 'USE THE MAGIC LINK !' : 'GO TO SIGN IN VIEW'}
            </Button>
        </>
    )
}

type LogoutProps = {
    handleLogout: (args: any) => void
}
export function Logout(props: LogoutProps) {
    return (
        <>
            <Button className={styles.btn}
                onClick={props.handleLogout}
                variant="contained"
                color="secondary">
                SIGN OUT
            </Button>
        </>)
}

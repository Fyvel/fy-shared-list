import React from 'react';
import styles from './Login.module.scss'
import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

type LoginProps = {
    handleLogin: (args: any) => void
}
export default function Login(props: LoginProps) {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: Record<string, any>) => {
        console.log(data)
        props.handleLogin(data.email)
    }

    return (
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
        </form>
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

import React from 'react';
import styles from './Login.module.scss'
import { Button, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';

type Props = {
    handleLogin: (args: any) => void
}
export default function Login(props: Props) {
    const { register, handleSubmit, watch, errors } = useForm()

    console.log(watch('email')) // watch input value by passing the name of it

    const onSubmit = (data: any) => {
        console.log(data)
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
            <Button type="submit"
                variant="contained"
                color="primary">
                SIGN IN
            </Button>
        </form>
    )
    // return (
    //     <>
    //         <Button
    //             variant="contained"
    //             color="primary"
    //             onClick={props.handleLogin}>
    //             SIGN IN
    //         </Button>
    //     </>
    // )
}

import React from 'react';
import styles from './Login.module.scss'
import { Button } from '@material-ui/core';

type Props = {
    handleLogin: (args: any) => void
}
export default function Login(props: Props) {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={props.handleLogin}>
                SIGN IN
            </Button>
        </>
    )
}

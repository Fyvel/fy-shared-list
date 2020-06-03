import React from 'react';
import styles from './Login.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';

type LoginProps = {
	handleLogin: (args: any) => void
	handleSigninLink: (args: any) => void
}
export default function Login(props: LoginProps) {
	const { register, handleSubmit } = useForm()

	const onSubmitEmail = (data: Record<string, any>) => {
		props.handleLogin(data.email)
	}
	const onSubmitLink = (data: Record<string, any>) => {
		props.handleSigninLink(data.link)
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmitEmail)} className={styles.Form}>
				<TextField
					id="email"
					inputRef={register}
					inputProps={{ label: 'email' }}
					label="Email address"
					name="email"
					required
					variant="filled"
					type="email" />
				<Button className={styles.btn}
					type="submit"
					variant="contained"
					color="primary">
					BEGIN SIGN IN
                </Button>
			</form>
			<br />
			<br />
			<form onSubmit={handleSubmit(onSubmitLink)} className={styles.Form}>
				<TextField
					id="link"
					inputRef={register}
					inputProps={{ label: 'link' }}
					label="Magic sign-in link"
					name="link"
					required
					variant="filled"
					type="text" />
				<Button className={styles.btn}
					type="submit"
					variant="contained"
					color="primary">
					COMPLETE SIGN IN
                </Button>
			</form>
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

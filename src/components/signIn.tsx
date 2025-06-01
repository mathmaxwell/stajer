import { useForm } from 'react-hook-form'
import { Box, TextField, Button, Typography, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import pb from '../lib/pocketbase'

const SignIn = () => {
	type formData = {
		login: string
		password: string
	}
	const navigate = useNavigate()
	const { register, handleSubmit, watch } = useForm<formData>()

	async function onSubmit(data: formData) {
		try {
			const user = await pb
				.collection('users')
				.authWithPassword(data.login, data.password)
			navigate('/')
			console.log(user)
		} catch (error) {
			console.log(error)
		}
	}

	const login = watch('login')
	const password = watch('password')

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				width: '100%',
				gap: 5,
				borderRadius: '16px',
			}}
		>
			<TextField
				label='Login'
				variant='outlined'
				autoComplete='current-name'
				fullWidth
				{...register('login')}
			/>
			<TextField
				autoComplete='current-password'
				label='Password'
				variant='outlined'
				type='password'
				fullWidth
				{...register('password')}
			/>
			<Button
				type='submit'
				variant='contained'
				sx={{
					width: '100%',
					py: 1.5,
					borderRadius: '16px',
					bgcolor:
						login && password
							? 'rgba(6, 186, 209, 1)'
							: 'rgba(180, 234, 241, 1)',
					color: 'white',
					'&:hover': {
						bgcolor:
							login && password
								? 'rgba(5, 167, 188, 1)'
								: 'rgba(160, 214, 221, 1)',
					},
				}}
			>
				Войти
			</Button>
			<Box
				sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 4 }}
			>
				<Divider
					sx={{
						flex: 1,
						bgcolor: 'grey.400',
						height: '1px',
						borderRadius: '16px',
					}}
				/>
				<Typography sx={{ color: 'grey.600' }}>или</Typography>
				<Divider
					sx={{
						flex: 1,
						bgcolor: 'grey.400',
						height: '1px',
						borderRadius: '16px',
					}}
				/>
			</Box>
			<Button
				variant='outlined'
				onClick={() => navigate('/register')}
				sx={{
					width: '100%',
					py: 1.5,
					borderRadius: '16px',
					color: 'rgba(100, 109, 126, 1)',
					borderColor: 'rgba(100, 109, 126, 1)',
					'&:hover': {
						borderColor: 'rgba(80, 89, 106, 1)',
						bgcolor: 'rgba(100, 109, 126, 0.04)',
					},
				}}
			>
				регистрироваться
			</Button>
		</Box>
	)
}
export default SignIn
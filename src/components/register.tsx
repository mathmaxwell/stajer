import { useForm } from 'react-hook-form'
import { Box, InputAdornment, TextField, Button } from '@mui/material'
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone'
import DisabledVisibleTwoToneIcon from '@mui/icons-material/DisabledVisibleTwoTone'
import { useState } from 'react'
import pb from '../lib/pocketbase'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const navigate = useNavigate()
	type formData = {
		username: string
		password: string
		email: string
	}
	const [showPassword, setShowPassword] = useState(false)
	const { register, handleSubmit, watch } = useForm<formData>()

	async function onSubmit(data: formData) {
		try {
			const newUser = await pb.collection('users').create({
				email: data.email,
				username: data.username,
				password: data.password,
				passwordConfirm: data.password,
			})
			console.log(newUser)
			alert('profil yaratildi')
			navigate('/sign-in')
		} catch (error) {
			console.log(error)
		}
	}

	const email = watch('email')
	const login = watch('username')
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
				autoComplete='current-login'
				label='Login'
				variant='outlined'
				type='text'
				fullWidth
				{...register('username')}
			/>
			<TextField
				label='Email'
				variant='outlined'
				autoComplete='current-email'
				fullWidth
				{...register('email')}
			/>
			<TextField
				autoComplete='current-password'
				label='Password'
				variant='outlined'
				type={showPassword ? 'text' : 'password'}
				fullWidth
				{...register('password')}
				InputProps={{
					endAdornment: (
						<InputAdornment
							position='end'
							onClick={() => setShowPassword(prev => !prev)}
							sx={{ cursor: 'pointer' }}
						>
							{showPassword ? (
								<RemoveRedEyeTwoToneIcon />
							) : (
								<DisabledVisibleTwoToneIcon />
							)}
						</InputAdornment>
					),
				}}
			/>
			<Button
				type='submit'
				variant='contained'
				sx={{
					width: '100%',
					py: 1.5,
					borderRadius: '16px',
					bgcolor:
						login && password && email
							? 'rgba(6, 186, 209, 1)'
							: 'rgba(180, 234, 241, 1)',
					color: 'white',
					'&:hover': {
						bgcolor:
							login && password && email
								? 'rgba(5, 167, 188, 1)'
								: 'rgba(160, 214, 221, 1)',
					},
				}}
			>
				Зарегистрироваться
			</Button>
		</Box>
	)
}
export default Register

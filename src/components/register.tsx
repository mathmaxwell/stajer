import { useForm } from 'react-hook-form'
import { InputAdornment, TextField } from '@mui/material'
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone'
import DisabledVisibleTwoToneIcon from '@mui/icons-material/DisabledVisibleTwoTone'
import { useState } from 'react'
const Register = () => {
	type formData = {
		login: string
		password: string
		email: string
	}
	const [showPassword, setShowPassword] = useState(false)
	const { register, handleSubmit, watch } = useForm<formData>()
	function onSubmit(data: formData) {
		console.log(data)
	}
	const email = watch('email')
	const login = watch('login')
	const password = watch('password')
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col items-start w-full rounded-2xl gap-5'
		>
			<TextField
				autoComplete='current-login'
				label='login'
				variant='outlined'
				type='text'
				className='w-full '
				{...register('login')}
			/>
			<TextField
				label='email'
				variant='outlined'
				autoComplete='current-email'
				{...register('email')}
				className='w-full'
			/>
			<TextField
				autoComplete='current-password'
				label='password'
				variant='outlined'
				type={showPassword ? 'text' : 'password'}
				className='w-full '
				{...register('password')}
				InputProps={{
					endAdornment: (
						<InputAdornment
							position='end'
							onClick={() => setShowPassword(prev => !prev)}
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

			<button
				type='submit'
				className='w-full py-3 rounded-2xl text-white'
				style={{
					backgroundColor:
						login && password && email
							? 'rgba(6, 186, 209, 1)'
							: 'rgba(180, 234, 241, 1)',
				}}
			>
				Зарегистрироваться
			</button>
		</form>
	)
}

export default Register

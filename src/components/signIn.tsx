import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import pb from '../lib/pocketbase'
const SignIn = () => {
	type formData = {
		login: string
		password: string
	}
	const navigate = useNavigate()
	const { register, handleSubmit, watch } = useForm<formData>()
	const userId = pb.authStore.model?.id
	async function onSubmit(data: formData) {
		try {
			const user = await pb
				.collection('users')
				.authWithPassword(data.login, data.password)
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	const login = watch('login')
	const password = watch('password')
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col items-start w-full rounded-2xl gap-5 relative'
		>
			<TextField
				label='login'
				variant='outlined'
				autoComplete='current-name'
				{...register('login')}
				className='w-full'
			/>
			<TextField
				autoComplete='current-password'
				label='password'
				variant='outlined'
				type='password'
				className='w-full '
				{...register('password')}
			/>
			<button
				type='submit'
				className='w-full py-3 rounded-2xl text-white'
				style={{
					backgroundColor:
						login && password
							? 'rgba(6, 186, 209, 1)'
							: 'rgba(180, 234, 241, 1)',
				}}
			>
				Войти
			</button>
			<div className='flex items-center justify-center w-full gap-4'>
				<div className='w-full h-0.25 bg-gray-400 rounded-2xl'></div>
				<p>или</p>
				<div className='w-full h-0.25 bg-gray-400 rounded-2xl'></div>
			</div>
			<button
				onClick={() => navigate('/register')}
				className='border p-3 w-full rounded-2xl text-[rgba(100, 109, 126, 1)]'
				style={{
					color: 'rgba(100, 109, 126, 1)',
				}}
			>
				регистрироваться
			</button>
		</form>
	)
}

export default SignIn

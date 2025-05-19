import type { ReactNode } from 'react'
import face from '../images/face.svg'
import Typography from '@mui/material/Typography'

type Props = {
	children: ReactNode
}

const RegisterLayOut = ({ children }: Props) => {
	return (
		<div className='relative flex items-end justify-start'>
			<img src={face} alt='face' className='h-screen' />
			<Typography
				variant='h1'
				color='primary'
				sx={{
					fontSize: 80,
					color: 'rgba(6, 186, 209, 1)',
				}}
			>
				TAD <br /> INDUSTRIES
			</Typography>
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-5 border-[rgba(147,192,198,1)] rounded-2xl w-lg h-auto px-12 py-8 flex flex-col gap-7'>
				<Typography
					variant='h6'
					sx={{ fontSize: 23 }}
					color='rgba(6, 186, 209, 1)'
				>
					FaceIDS
				</Typography>
				{children}
			</div>
		</div>
	)
}

export default RegisterLayOut

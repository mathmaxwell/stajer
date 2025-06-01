import type { FC, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import face from '../images/face.svg'

type Props = {
	children: ReactNode
}

const RegisterLayOut = ({ children }: Props) => {
	return (
		<Box
			sx={{
				position: 'relative',
				display: 'flex',
				alignItems: 'flex-end',
				justifyContent: 'flex-start',
				height: '100vh',
				width: '100%',
			}}
		>
			<Box
				component='img'
				src={face}
				alt='face'
				sx={{ height: '100vh', width: 'auto' }}
			/>
			<Typography
				variant='h1'
				sx={{
					fontSize: 80,
					color: 'rgba(6, 186, 209, 1)',
					lineHeight: 1.2,
				}}
			>
				TAD
				<br />
				INDUSTRIES
			</Typography>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					border: '5px solid rgba(147, 192, 198, 1)',
					borderRadius: '16px',
					width: { xs: '90%', sm: 500, md: 640 }, // w-lg ~640px, responsive
					p: { xs: 6, md: 8 }, // px-12 py-8
					display: 'flex',
					flexDirection: 'column',
					gap: 3, // gap-7 ~24px
					bgcolor: 'background.paper',
					boxShadow: 3,
				}}
			>
				<Typography
					variant='h6'
					sx={{
						fontSize: 24,
						color: 'rgba(6, 186, 209, 1)',
					}}
				>
					FaceIDS
				</Typography>
				{children}
			</Box>
		</Box>
	)
}

export default RegisterLayOut

import { Box, Typography, IconButton } from '@mui/material'
import { ExitToAppTwoTone } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import UserPage from './userPage'

const AddEmployees = () => {
	const { lang } = useLang()
	const navigate = useNavigate()

	return (
		<Box
			sx={{
				borderRadius: '16px',
				width: '100%',
				height: '100%',
				p: { xs: 2, md: 3 }, // py-3 px-5
				bgcolor: 'background.paper',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					mb: 2,
				}}
			>
				<Typography
					variant='h4'
					sx={{
						fontSize: 18,
						fontWeight: 500,
						color: 'text.primary',
					}}
				>
					{lang === 'uz' ? langUz.addEmployees : langRu.addEmployees}
				</Typography>
				<IconButton aria-label='exit' onClick={() => navigate('/base')}>
					<ExitToAppTwoTone />
				</IconButton>
			</Box>
			<UserPage />
		</Box>
	)
}
export default AddEmployees
//adaptiva sm,md
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography, IconButton } from '@mui/material'
import pb from '../lib/pocketbase'
import fullFase from '../images/fullFase.svg'
import uz from '../images/UZ.png'
import ru from '../images/RU.png'
import apps from '../images/apps.svg'
import rows from '../images/rows.svg'
import exit from '../images/exit.svg'
import useLang from '../lang/lang'
import useStore from '../elements/setHomePage'
import { langUz, langRu } from '../lang/language'
import type { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
	const { page, setPage } = useStore()
	const navigate = useNavigate()
	const { lang, setLang } = useLang()

	async function exitOfSystem() {
		try {
			await pb.authStore.clear()
			navigate('/sign-in')
		} catch (error) {
			console.log(error)
		}
		localStorage.setItem('pocketbase_auth', '')
	}

	useEffect(() => {
		if (!pb.authStore.model) {
			navigate('/sign-in')
		}
	}, [navigate])

	if (!pb.authStore.model) return null

	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: {
					xs: 'column',
					lg: 'row',
				},
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: { xs: 1.5, lg: 2 },
				bgcolor: '#eee',
				boxShadow: 1,
			}}
		>
			<Box
				sx={{
					bgcolor: 'white',
					height: {
						md: 'auto',
						lg: '100vh',
					},
					borderRadius: '16px',
					width: {
						xs: '100%',
						lg: '300px',
					},
					padding: { sm: 1, lg: 2 },
					display: 'flex',
					flexDirection: {
						lg: 'column',
						xs: 'row',
					},
					alignItems: 'center',
					justifyContent: {
						lg: 'space-between',
						xs: 'center',
					},
					gap: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						mr: {
							lg: 0,
							xs: 'auto',
						},
					}}
				>
					<Box
						component='img'
						src={fullFase}
						alt='face'
						sx={{
							width: 40,
							height: 40,
							display: {
								xs: 'none',
								md: 'block',
							},
						}}
					/>
					<Typography
						sx={{
							color: 'rgba(6, 186, 209, 1)',
							fontSize: 14,
							fontWeight: 600,
							display: {
								xs: 'none',
								md: 'block',
							},
							lineHeight: 1.2,
						}}
					>
						TAD <br /> INDUSTRIES
					</Typography>
					<IconButton onClick={() => setLang()} sx={{ ml: 'auto' }}>
						<Box
							component='img'
							src={lang === 'uz' ? uz : ru}
							alt='flag'
							sx={{ width: 24, height: 24 }}
						/>
					</IconButton>
				</Box>
				<Typography
					sx={{
						color: 'rgba(6, 186, 209, 1)',
						fontSize: 17,
						display: {
							lg: 'block',
							xs: 'none',
						},
					}}
				>
					FaceIDS
				</Typography>
				<Button
					onClick={() => {
						setPage('monitoring')
						navigate('/')
					}}
					sx={{
						textWrap: 'nowrap',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: { xs: 0, lg: 2 },
						p: 1.5,
						width: {
							lg: '100%',
							md: '200px',
						},
						borderRadius: '8px',
						bgcolor: page === 'monitoring' ? 'rgba(235, 249, 251, 1)' : 'white',
						color:
							page === 'monitoring'
								? 'rgba(6, 186, 209, 1)'
								: 'rgba(100, 109, 126, 1)',
						textTransform: 'none',
						'&:hover': {
							bgcolor:
								page === 'monitoring' ? 'rgba(215, 229, 231, 1)' : 'grey.100',
						},
					}}
					startIcon={
						<Box
							component='img'
							src={apps}
							alt='apps'
							sx={{ width: 24, height: 24 }}
						/>
					}
				>
					{lang === 'uz' ? langUz.monitoring : langRu.monitoring}
				</Button>
				<Button
					onClick={() => {
						setPage('base')
						navigate('/base')
					}}
					sx={{
						textWrap: 'nowrap',
						display: 'flex',
						alignItems: 'center',
						width: {
							lg: '100%',
							md: '200px',
						},
						justifyContent: 'flex-start',
						gap: { xs: 0, lg: 2 },
						p: 1.5,
						borderRadius: '8px',
						bgcolor: page === 'base' ? 'rgba(235, 249, 251, 1)' : 'white',
						color:
							page === 'base'
								? 'rgba(6, 186, 209, 1)'
								: 'rgba(100, 109, 126, 1)',
						textTransform: 'none',
						'&:hover': {
							bgcolor: page === 'base' ? 'rgba(215, 229, 231, 1)' : 'grey.100',
						},
					}}
					startIcon={
						<Box
							component='img'
							src={rows}
							alt='rows'
							sx={{ width: 24, height: 24 }}
						/>
					}
				>
					{lang === 'uz' ? langUz.baseEmployees : langRu.baseEmployees}
				</Button>
				<Button
					onClick={exitOfSystem}
					sx={{
						mt: {
							lg: 'auto',
							md: 'none',
						},
						ml: {
							lg: 0,
							xs: 'auto',
						},
						display: 'flex',
						alignItems: 'center',
						justifyContent: {
							lg: 'flex-start',
							md: 'center',
						},
						gap: 2,
						color: 'rgba(100, 109, 126, 1)',
						textTransform: 'none',
						'&:hover': { bgcolor: 'grey.100' },
					}}
					startIcon={
						<Box
							component='img'
							src={exit}
							alt='exit'
							sx={{ width: 24, height: 24 }}
						/>
					}
				>
					{lang === 'uz' ? langUz.exit : langRu.exit}
				</Button>
			</Box>
			<Box
				sx={{
					width: '100%',
					bgcolor: 'white',
					height: '100%',
					borderRadius: 3,
					overflow: 'auto',
				}}
			>
				{children}
			</Box>
		</Box>
	)
}
export default ProtectedRoute

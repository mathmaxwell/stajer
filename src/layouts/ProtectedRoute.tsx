import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pb from '../lib/pocketbase'
import { Box } from '@mui/material'
import fullFase from '../images/fullFase.svg'
import uz from '../images/UZ.png'
import ru from '../images/RU.png'
import apps from '../images/apps.svg'
import rows from '../images/rows.svg'
import exit from '../images/exit.svg'
import type { ReactNode } from 'react'
interface props {
	children: ReactNode
}
const ProtectedRoute = ({ children }: props) => {
	const [page, setPage] = useState('monitoring')
	const [lang, setLang] = useState(true) //zustanga joylash kk
	const navigate = useNavigate()
	useEffect(() => {
		if (pb.authStore.model) {
			//shu joyiga ! qaytarilsin
			navigate('/sign-in')
		}
	}, [])
	if (pb.authStore.model) return null //shu joyga ham, pb dan oldin
	return (
		<div className='h-screen flex items-center justify-between gap-5 p-5 bg-gray-200'>
			<Box
				sx={{
					width: 300,
					bgcolor: 'white',
					height: '100%',
					borderRadius: 3,
					p: 2.5,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<div className='flex gap-2'>
					<img src={fullFase} alt='face' />
					<h3
						style={{
							color: 'rgba(6, 186, 209, 1)',
							fontSize: 14,
							fontWeight: 600,
						}}
					>
						TAD <br />
						INDUSTRIES
					</h3>
					<button className='ml-auto' onClick={() => setLang(prev => !prev)}>
						<img src={lang ? uz : ru} alt='flag' />
					</button>
				</div>
				<h3 style={{ color: 'rgba(6, 186, 209, 1)', fontSize: 17 }}>FaceIDS</h3>
				<button
					onClick={() => setPage('monitoring')}
					className='flex items-center justify-start gap-2 p-3 rounded-lg'
					style={
						page === 'monitoring'
							? {
									backgroundColor: 'rgba(235, 249, 251, 1)',
									color: 'rgba(6, 186, 209, 1)',
							  }
							: { color: 'rgba(100, 109, 126, 1)', backgroundColor: 'white' }
					}
				>
					<img src={apps} alt='apps' />
					Мониторинг
				</button>
				<button
					className='flex items-center justify-start gap-2 p-3 rounded-lg'
					onClick={() => setPage('base')}
					style={
						page === 'base'
							? {
									backgroundColor: 'rgba(235, 249, 251, 1)',
									color: 'rgba(6, 186, 209, 1)',
							  }
							: { color: 'rgba(100, 109, 126, 1)', backgroundColor: 'white' }
					}
				>
					<img src={rows} alt='rows' />
					Мониторинг
				</button>
				<button className='mt-auto flex items-center justify-start gap-2'>
					<img src={exit} alt='exit' /> Выход
				</button>
			</Box>
			<Box
				sx={{
					width: '100%',
					bgcolor: 'white',
					height: '100%',
					borderRadius: 3,
				}}
			>
				{children}
			</Box>
		</div>
	)
}

export default ProtectedRoute

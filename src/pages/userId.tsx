import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, IconButton, Paper } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'

import employees from '../employees/employees'
import type { IEmployees } from '../types/types'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import UserPage from './userPage'

const UserId = () => {
	const navigate = useNavigate()
	const { lang } = useLang()
	const { id } = useParams<{ id: string }>()
	const [array, setArray] = useState<IEmployees[]>([])

	useEffect(() => {
		const fetch = async () => {
			const data = (await employees) || []
			const filteredData = data.filter(item => item.id === id)
			setArray(filteredData)
		}
		fetch()
	}, [id])

	return (
		<Paper
			elevation={3}
			sx={{
				borderRadius: 4,
				width: '100%',
				height: '100%',
				p: 3,
				boxSizing: 'border-box',
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
				<Typography variant='h6' fontWeight={500}>
					{lang === 'uz' ? langUz.fullInfo : langRu.fullInfo}
				</Typography>
				<IconButton onClick={() => navigate('/base')}>
					<ExitToApp />
				</IconButton>
			</Box>

			{array.length > 0 && <UserPage />}
		</Paper>
	)
}

export default UserId

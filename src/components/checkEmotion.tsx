import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../elements/setHomePage'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import employees from '../employees/employees'
import type { IEmployees } from '../types/types'
import MyPieChart from '../elements/MyPieChart'
import {
	Box,
	Card,
	CardContent,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	Divider,
} from '@mui/material'

const CheckEmotion = () => {
	const [array, setArray] = useState<IEmployees[]>([])
	const [emotions, setEmotions] = useState<Record<string, number>>({})
	const { setPage } = useStore()
	const navigate = useNavigate()
	const { lang } = useLang()

	useEffect(() => {
		const fetch = async () => {
			const data = (await employees) || []
			setArray(data)
			const moodStats: Record<string, number> = {}
			data.forEach((user: IEmployees) => {
				if (user.mood) {
					moodStats[user.mood] = (moodStats[user.mood] || 0) + 1
				}
			})
			setEmotions(moodStats)
		}

		fetch()
	}, [])

	return (
		<Box sx={{ display: 'flex', gap: 3, width: '100%', p: 0 }}>
			<Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3 }}>
				<CardContent>
					<Typography variant='h6' fontWeight={500}>
						{lang === 'uz' ? langUz.employeesMood : langRu.employeesMood}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							mt: 2,
						}}
					>
						<Box>
							<MyPieChart dataObject={emotions} />
						</Box>
						<Button
							variant='contained'
							color='primary'
							onClick={() => {
								navigate('base/all-mood')
								setPage('base')
							}}
						>
							{lang === 'uz' ? langUz.viewAll : langRu.viewAll}
						</Button>
					</Box>
				</CardContent>
			</Card>

			<Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3 }}>
				<CardContent
					sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
				>
					<Typography variant='h6' fontWeight={500} sx={{ mb: 2 }}>
						{lang === 'uz' ? langUz.birthdays : langRu.birthdays}
					</Typography>
					<List sx={{ flexGrow: 1 }}>
						{array.slice(0, 5).map((user, id) => (
							<Box key={id}>
								<ListItem
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										px: 0,
									}}
								>
									<ListItemText primary={user.fullName} />
									<Typography variant='body2'>{user.birthday}</Typography>
								</ListItem>
								{id < 4 && <Divider sx={{ bgcolor: 'grey.400' }} />}
							</Box>
						))}
					</List>
					<Button
						variant='contained'
						color='primary'
						onClick={() => {
							navigate('/base/all-birthday')
							setPage('base')
						}}
						sx={{ mt: 2, alignSelf: 'center' }}
					>
						{lang === 'uz' ? langUz.viewAll : langRu.viewAll}
					</Button>
				</CardContent>
			</Card>
		</Box>
	)
}

export default CheckEmotion

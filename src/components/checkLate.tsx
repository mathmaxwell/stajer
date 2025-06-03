import { useEffect, useMemo, useState } from 'react'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import MyChart from '../elements/MyChart'
import type { IEmployees } from '../types/types'
import employees from '../employees/employees'
import {
	Box,
	Card,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Modal,
	List,
	ListItem,
	ListItemText,
} from '@mui/material'

type LateData = Record<string, number>

const formatDate = (date: Date) =>
	date.toLocaleDateString('ru-RU').split('.').join('-')

const parseDate = (str: string) => {
	const [dd, mm, yyyy] = str.split('-').map(Number)
	return new Date(yyyy, mm - 1, dd)
}

const getLateMinutes = (data: LateData[], from: string, to: string): number => {
	const fromDate = parseDate(from)
	const toDate = parseDate(to)
	let total = 0

	data.forEach(obj => {
		if (obj && typeof obj === 'object') {
			Object.entries(obj).forEach(([key, value]) => {
				const date = parseDate(key)
				if (date >= fromDate && date <= toDate) {
					total += Number(value)
				}
			})
		}
	})
	return total
}

const getWeekLateData = (data: LateData[], today: Date) => {
	const dayOfWeek = today.getDay() || 7
	const monday = new Date(today)
	monday.setDate(today.getDate() - (dayOfWeek - 1))

	return Array.from({ length: 7 }, (_, i) => {
		const day = new Date(monday)
		day.setDate(monday.getDate() + i)
		const str = formatDate(day)
		return day <= today ? getLateMinutes(data, str, str) : 0
	})
}

const getMonthLateData = (data: LateData[], date: Date) => {
	const year = date.getFullYear()
	const month = date.getMonth()
	const daysInMonth = new Date(year, month + 1, 0).getDate()

	return Array.from({ length: daysInMonth }, (_, i) => {
		const day = new Date(year, month, i + 1)
		const str = formatDate(day)
		return day <= new Date() ? getLateMinutes(data, str, str) : 0
	})
}

const getLateDetails = (
	data: LateData[],
	dateStr: string,
	employeesData: IEmployees[]
) => {
	const result: { name: string; lateTime: number }[] = []
	data.forEach((obj, index) => {
		if (obj && typeof obj === 'object' && obj[dateStr]) {
			const employee = employeesData[index]
			if (employee) {
				result.push({
					name: employee.fullName || `Сотрудник ${index + 1}`, // Изменено с name на fullName
					lateTime: Number(obj[dateStr]),
				})
			}
		}
	})
	return result
}

const months = [
	'январь',
	'февраль',
	'март',
	'апрель',
	'май',
	'июнь',
	'июль',
	'август',
	'сентябрь',
	'октябрь',
	'ноябрь',
	'декабрь',
]

const CheckLate = () => {
	const { lang } = useLang()
	const today = new Date()
	const todayStr = formatDate(today)
	const [month, setMonth] = useState(today.getMonth())
	const [allLate, setAllLate] = useState<LateData[]>([])
	const [employeesData, setEmployeesData] = useState<IEmployees[]>([])
	const [showWeek, setShowWeek] = useState(true)
	const [modalOpen, setModalOpen] = useState(false)
	const [selectedDate, setSelectedDate] = useState<string | null>(null)

	const handleBarClick = (dateStr: string) => {
		setSelectedDate(dateStr)
		setModalOpen(true)
	}

	const handleClose = () => {
		setModalOpen(false)
		setSelectedDate(null)
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await employees
			const lateData = (data || [])
				.map((user: IEmployees) => {
					try {
						return user.whenlate ? JSON.parse(user.whenlate) : null
					} catch {
						return null
					}
				})
				.filter(Boolean) as LateData[]
			setAllLate(lateData)
			setEmployeesData(data || [])
		}
		fetchData()
	}, [])

	const todayLate = useMemo(
		() => getLateMinutes(allLate, todayStr, todayStr),
		[allLate]
	)

	const weekLate = useMemo(() => getWeekLateData(allLate, today), [allLate])

	const monthLate = useMemo(() => {
		const date = new Date(today.getFullYear(), month)
		return getMonthLateData(allLate, date)
	}, [allLate, month])

	const lateDetails = useMemo(() => {
		if (!selectedDate) return []
		return getLateDetails(allLate, selectedDate, employeesData)
	}, [selectedDate, allLate, employeesData])

	const currentLang = lang === 'uz' ? langUz : langRu

	return (
		<Card
			sx={{
				borderRadius: 4,
				boxShadow: 3,
				bgcolor: '#fff',
				p: {
					sm: 1,
					lg: 2,
				},
				height: {
					sm: 'auto',
				},
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', sm: 'row' },
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box>
					<Typography variant='h6'>{currentLang.monitoringLateness}</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: { xs: 1, sm: 2, md: 3, lg: 4 },
						}}
					>
						<Typography
							sx={{
								fontSize: { xs: 30, sm: 36 },
								fontWeight: 600,
							}}
						>
							{todayLate}мин
						</Typography>
						<Typography color='text.secondary'>
							{currentLang.latenessInLastDays_part1}
							<br />
							{currentLang.latenessInLastDays_part2}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						gap: { xs: 1.5, lg: 2 },
						alignItems: 'center',
						marginTop: { xs: '10px' },
					}}
				>
					<FormControl sx={{ minWidth: 120, order: { xs: 2, md: 0 } }}>
						<InputLabel id='month-select-label'>Месяц</InputLabel>
						<Select
							labelId='month-select-label'
							id='month-select'
							value={month}
							label='Месяц'
							onChange={e => {
								setMonth(Number(e.target.value))
								setShowWeek(false)
							}}
						>
							{months.map((name, index) => (
								<MenuItem key={index} value={index}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<ToggleButtonGroup
						value={showWeek ? 'week' : 'month'}
						exclusive
						onChange={(_, value) => value && setShowWeek(value === 'week')}
						sx={{ borderRadius: 16, border: '1px solid #B4EAF1' }}
					>
						<ToggleButton
							value='week'
							sx={{ borderRadius: '16px 0 0 16px', width: 96 }}
						>
							{currentLang.week}
						</ToggleButton>
						<ToggleButton
							value='month'
							sx={{ borderRadius: '0 16px 16px 0', width: 96 }}
						>
							{currentLang.month}
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 3,
					flex: 1,
				}}
			>
				<Box
					sx={{
						width: showWeek ? { xs: '100%', sm: '80%', md: '50%' } : '100%',
						display: 'flex',
						marginX: 'auto',
						justifyContent: 'center',
					}}
				>
					<MyChart
						informationArray={showWeek ? weekLate : monthLate}
						month={showWeek ? undefined : month}
						onBarClick={handleBarClick}
					/>
				</Box>

				<Box
					sx={{
						display: { xs: 'none', md: 'flex' },
						flexDirection: 'column',
						gap: 3,
						ml: 'auto',
					}}
				>
					<Card
						sx={{
							borderRadius: 4,
							p: { sm: 1.5, lg: 2 },
							width: { sm: 250, lg: 288 },
						}}
					>
						<Typography fontSize={18} fontWeight={500}>
							{currentLang.lostHoursPerDay}
						</Typography>
						<Typography fontSize={36} fontWeight={600}>
							{todayLate}
							<Typography component='span' fontSize={20} fontWeight={400}>
								{lang === 'uz' ? 'daqiqa' : 'минут'}
							</Typography>
						</Typography>
					</Card>

					<Card
						sx={{
							borderRadius: 4,
							p: { xs: 1.5, lg: 2 },
							width: { sm: 250, lg: 288 },
						}}
					>
						<Typography fontSize={18} fontWeight={500}>
							{currentLang.lostHoursPerWeek}
						</Typography>
						<Typography fontSize={36} fontWeight={600}>
							{weekLate.reduce((sum, n) => sum + n, 0)}
							<Typography component='span' fontSize={20} fontWeight={400}>
								{lang === 'uz' ? 'daqiqa' : 'минут'}
							</Typography>
						</Typography>
					</Card>
				</Box>
			</Box>

			<Modal
				open={modalOpen}
				onClose={handleClose}
				aria-labelledby='modal-title'
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Box
					sx={{
						bgcolor: 'background.paper',
						borderRadius: 2,
						boxShadow: 24,
						p: 4,
						maxWidth: 400,
						width: '100%',
						maxHeight: '80vh',
						overflowY: 'auto',
					}}
				>
					<Typography id='modal-title' variant='h6' component='h2' mb={2}>
						{currentLang.latenessDetails} {selectedDate}
					</Typography>
					<List>
						{lateDetails.length > 0 ? (
							lateDetails.map((item, index) => (
								<ListItem key={index}>
									<ListItemText
										primary={item.name}
										secondary={`${item.lateTime} ${
											lang === 'uz' ? 'daqiqa' : 'минут'
										}`}
									/>
								</ListItem>
							))
						) : (
							<Typography>{currentLang.noLatenessData}</Typography>
						)}
					</List>
				</Box>
			</Modal>
		</Card>
	)
}

export default CheckLate

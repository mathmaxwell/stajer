import { useEffect, useState } from 'react'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import settings from '../images/settings.svg'
import MyChart from '../elements/MyChart'
import type { IEmployees } from '../types/types'
import employees from '../employees/employees'
import {
	Box,
	Card,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
	IconButton,
} from '@mui/material'

const CheckLate = () => {
	const date = new Date()
	const [showWeek, setShowWeek] = useState(true)
	const { lang } = useLang()
	const [allLate, setAllLate] = useState([{}])

	const formatDate = (date: Date) => {
		const dd = String(date.getDate()).padStart(2, '0')
		const mm = String(date.getMonth() + 1).padStart(2, '0')
		const yyyy = date.getFullYear()
		return `${dd}-${mm}-${yyyy}`
	}

	const getLateMinutes = (data: object[], from: string, to: string): number => {
		const parseDate = (str: string) => {
			const [day, month, year] = str.split('-').map(Number)
			return new Date(year, month - 1, day)
		}
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

	const getWeekLateData = (data: object[]): number[] => {
		const dayOfWeek = date.getDay() || 7
		const monday = new Date(date)
		monday.setDate(date.getDate() - (dayOfWeek - 1))
		const result: number[] = []
		for (let i = 0; i < 7; i++) {
			const current = new Date(monday)
			current.setDate(monday.getDate() + i)
			const isPastOrToday = current <= date
			const dateStr = formatDate(current)
			if (isPastOrToday) {
				const minutes = getLateMinutes(data, dateStr, dateStr)
				result.push(minutes)
			} else {
				result.push(0)
			}
		}
		return result
	}

	useEffect(() => {
		const fetch = async () => {
			const data = (await employees) || []
			data.forEach((user: IEmployees) => {
				if (user.whenlate) {
					try {
						const parsed = JSON.parse(user.whenlate)
						setAllLate(prev => [...prev, parsed])
					} catch (error) {
						console.error(error)
					}
				}
			})
		}
		fetch()
	}, [])

	return (
		<Card
			sx={{
				borderRadius: '16px',
				boxShadow: '0 4px 20px rgba(149, 157, 165, 0.2)',
				bgcolor: '#fff',
				p: '12px 20px',
				height: '400px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box sx={{ width: '100%' }}>
					<Typography variant='h6' sx={{ fontSize: 18, fontWeight: 500 }}>
						{lang === 'uz'
							? langUz.monitoringLateness
							: langRu.monitoringLateness}
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
						<Typography sx={{ fontSize: 36, fontWeight: 600 }}>
							{getLateMinutes(allLate, formatDate(date), formatDate(date))} мин
						</Typography>
						<Typography
							sx={{ fontSize: 16, fontWeight: 400, color: 'text.secondary' }}
						>
							{lang === 'uz'
								? langUz.latenessInLastDays_part1
								: langRu.latenessInLastDays_part1}
							<br />
							{lang === 'uz'
								? langUz.latenessInLastDays_part2
								: langRu.latenessInLastDays_part2}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
					<IconButton
						sx={{
							bgcolor: 'rgba(235, 249, 251, 1)',
							border: '1px solid rgba(180, 234, 241, 1)',
							borderRadius: '16px',
							width: 44,
							height: 44,
						}}
					>
						<img
							src={settings}
							alt='settings'
							style={{ width: 24, height: 24 }}
						/>
					</IconButton>
					<ToggleButtonGroup
						value={showWeek ? 'week' : 'month'}
						exclusive
						onChange={(_, value) => value && setShowWeek(value === 'week')}
						sx={{
							border: '1px solid rgba(180, 234, 241, 1)',
							borderRadius: '16px',
						}}
					>
						<ToggleButton
							value='week'
							sx={{
								bgcolor: showWeek ? 'rgba(235, 249, 251, 1)' : 'white',
								borderRadius: '16px 0 0 16px',
								width: 96,
								py: 2,
								border: 'none',
							}}
						>
							{lang === 'uz' ? langUz.week : langRu.week}
						</ToggleButton>
						<ToggleButton
							value='month'
							sx={{
								bgcolor: !showWeek ? 'rgba(235, 249, 251, 1)' : 'white',
								borderRadius: '0 16px 16px 0',
								width: 96,
								py: 2,
								border: 'none',
							}}
						>
							{lang === 'uz' ? langUz.month : langRu.month}
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
				<Box
					sx={{
						width: showWeek ? '33%' : '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{showWeek ? (
						<MyChart informationArray={getWeekLateData(allLate)} />
					) : (
						<MyChart informationArray={getWeekLateData(allLate)} month={2} />
					)}
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 3,
						ml: 'auto',
					}}
				>
					<Card
						sx={{
							borderRadius: '16px',
							boxShadow: '0 4px 20px rgba(149, 157, 165, 0.2)',
							p: '12px 16px',
							width: 288,
						}}
					>
						<Typography sx={{ fontSize: 18, fontWeight: 500 }}>
							{lang === 'uz' ? langUz.lostHoursPerDay : langRu.lostHoursPerDay}
						</Typography>
						<Typography sx={{ fontSize: 36, fontWeight: 600 }}>
							12{' '}
							<Typography
								component='span'
								sx={{ fontSize: 20, fontWeight: 400 }}
							>
								{lang === 'uz' ? 'soat' : 'час'}
							</Typography>
						</Typography>
					</Card>
					<Card
						sx={{
							borderRadius: '16px',
							boxShadow: '0 4px 20px rgba(149, 157, 165, 0.2)',
							p: '12px 16px',
							width: 288,
						}}
					>
						<Typography sx={{ fontSize: 18, fontWeight: 500 }}>
							{lang === 'uz'
								? langUz.lostHoursPerWeek
								: langRu.lostHoursPerWeek}
						</Typography>
						<Typography sx={{ fontSize: 36, fontWeight: 600 }}>
							48{' '}
							<Typography
								component='span'
								sx={{ fontSize: 20, fontWeight: 400 }}
							>
								{lang === 'uz' ? 'soat' : 'час'}
							</Typography>
						</Typography>
					</Card>
				</Box>
			</Box>
		</Card>
	)
}
export default CheckLate

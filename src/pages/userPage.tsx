import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Tabs, Tab, Paper } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

import type { IEmployees } from '../types/types'
import pb from '../lib/pocketbase'
import PageOne from '../components/pageOne'
import PageTwo from '../components/pageTwo'
import HeaderPage from '../components/headerPage'

const UserPage = () => {
	const [tempDate, setTempDate] = useState<Dayjs | null>(null)
	const [tempMinutes, setTempMinutes] = useState('')
	const [value, setValue] = useState(0)
	const [array, setArray] = useState<IEmployees | null>(null)
	const [img, setImg] = useState<string | null>(null)
	const [download, setDownload] = useState(false)
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()

	// Убрали конвертацию в YYYY-MM-DD, оставляем DD-MM-YYYY
	const formatDateFields = (data: IEmployees) => ({
		...data,
		birthday: data.birthday || '',
		PassportIssued: data.PassportIssued || '',
		ExpirationDate: data.ExpirationDate || '',
		IssueDate: data.IssueDate || '',
	})

	const getUser = async (id: string) => {
		try {
			const info = await pb.collection('employees').getOne(id)
			console.log('Fetched user:', info)
			setArray(info as unknown as IEmployees)
			setImg(pb.files.getURL(info, info.image) || null)
		} catch (error) {
			console.error('Error fetching user:', error)
			alert(`Ошибка загрузки данных: ${JSON.stringify(error)}`)
		}
	}

	const updateUser = async () => {
		if (!array || !id) {
			console.log('No array or id')
			return
		}
		let updatedArray = { ...array }
		if (tempDate && tempMinutes) {
			const formattedDate = tempDate.format('DD-MM-YYYY')
			const whenlate = {
				...(array.whenlate ? JSON.parse(array.whenlate) : {}),
				[formattedDate]: Number(tempMinutes),
			}
			updatedArray = { ...array, whenlate: JSON.stringify(whenlate) }
		}
		console.log('Updating with:', formatDateFields(updatedArray))
		try {
			await pb
				.collection('employees')
				.update(id, formatDateFields(updatedArray))
			alert('Изменено')
			setTempDate(null)
			setTempMinutes('')
		} catch (error) {
			console.error('Error updating user:', error)
			alert(`Ошибка при обновлении: ${JSON.stringify(error)}`)
		}
	}

	const createUser = async () => {
		if (!array) {
			console.log('No array')
			return
		}
		try {
			const formData = new FormData()
			const formattedArray = {
				...formatDateFields(array),
				whenlate: array.whenlate || '{}',
			}
			console.log('Creating with:', formattedArray)
			Object.entries(formattedArray).forEach(([key, value]) => {
				if (key !== 'image' && value !== undefined) {
					formData.append(key, value as string)
				}
			})
			if (array.image instanceof File) {
				formData.append('image', array.image)
			}
			await pb.collection('employees').create(formData)
			alert('Создано')
			navigate('/base')
		} catch (error) {
			console.error('Error creating user:', error)
			alert(`Ошибка при создании: ${JSON.stringify(error)}`)
		}
	}

	useEffect(() => {
		if (id) {
			getUser(id)
		} else {
			setArray({
				fullName: '',
				gender: 'Мужчина',
				passport: '',
				birthday: '',
				birthPlace: '',
				PassportIssued: '',
				IssuedBy: '',
				ExpirationDate: '',
				IssueDate: '',
				NationalityCode: '',
				Nationality: '',
				birthCode: '',
				Email: '',
				phone: '',
				Department: '',
				job: '',
				image: '',
				imageUrl: '',
				PINFL: '',
				CountryCode: '',
				where: '',
				mood: '',
				whenlate: '{}',
			})
			setImg(null)
			setDownload(true)
		}
	}, [id])

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Paper
				elevation={3}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
					p: 3,
					borderRadius: 4,
				}}
			>
				<HeaderPage
					download={download}
					setImg={setImg}
					setArray={setArray}
					img={img}
					setDownload={setDownload}
					array={array}
				/>

				<Box>
					<Tabs
						value={value}
						onChange={(e, newValue) => setValue(newValue)}
						aria-label='tabs'
					>
						<Tab label='Раздел 1' />
						<Tab label='Раздел 2' />
					</Tabs>

					{value === 0 && <PageOne array={array} setArray={setArray} />}
					{value === 1 && (
						<PageTwo
							array={array}
							setArray={setArray}
							id={id}
							tempDate={tempDate}
							setTempDate={setTempDate}
							tempMinutes={tempMinutes}
							setTempMinutes={setTempMinutes}
						/>
					)}
				</Box>

				<Box sx={{ display: 'flex', gap: 2 }}>
					<Button variant='contained' onClick={id ? updateUser : createUser}>
						{id ? 'Сохранить' : 'Добавить'}
					</Button>
				</Box>
			</Paper>
		</LocalizationProvider>
	)
}

export default UserPage

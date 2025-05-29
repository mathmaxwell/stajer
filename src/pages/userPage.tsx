import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import pb from '../lib/pocketbase'
import { Box, Button, Tabs, Tab } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

import type { IEmployees } from '../types/types'
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

	const formatDateFields = (data: IEmployees) => ({
		...data,
		birthday: data.birthday
			? dayjs(data.birthday, 'DD-MM-YYYY').format('YYYY-MM-DD')
			: '',
		PassportIssued: data.PassportIssued
			? dayjs(data.PassportIssued, 'DD-MM-YYYY').format('YYYY-MM-DD')
			: '',
		ExpirationDate: data.ExpirationDate
			? dayjs(data.ExpirationDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
			: '',
		IssueDate: data.IssueDate
			? dayjs(data.IssueDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
			: '',
	})

	const getUser = async (id: string) => {
		try {
			const info = await pb.collection('employees').getOne(id)
			setArray(info as unknown as IEmployees)
			setImg(pb.files.getURL(info, info.image) || null)
		} catch (error) {
			console.error('Error fetching user:', error)
			alert(`Ошибка загрузки данных: ${JSON.stringify(error)}`)
		}
	}

	const updateUser = async () => {
		if (!array || !id) return
		let updatedArray = { ...array }
		if (tempDate && tempMinutes) {
			const formattedDate = tempDate.format('DD-MM-YYYY')
			const whenlate = {
				...JSON.parse(array.whenlate || '{}'),
				[formattedDate]: Number(tempMinutes),
			}
			updatedArray = { ...array, whenlate: JSON.stringify(whenlate) }
		}
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
		if (!array) return
		try {
			const formData = new FormData()
			const formattedArray = {
				...formatDateFields(array),
				whenlate: array.whenlate || '{}',
			}
			Object.entries(formattedArray).forEach(([key, value]) => {
				if (key !== 'image' && value !== undefined) formData.append(key, value)
			})
			if (array.image instanceof File) formData.append('image', array.image)
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
			<Box className='flex flex-col gap-5 p-4'>
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
						aria-label='basic tabs'
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
				<Box className='flex gap-4'>
					<Button
						variant='contained'
						onClick={id ? updateUser : createUser}
						className='mt-4'
					>
						{id ? 'Сохранить' : 'Добавить'}
					</Button>
				</Box>
			</Box>
		</LocalizationProvider>
	)
}

export default UserPage

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, Paper, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import employees from '../employees/employees'
import type { IEmployees } from '../types/types'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import UserPage from './userPage'
import type { Dayjs } from 'dayjs'
import pb from '../lib/pocketbase'

const UserId = () => {
	const navigate = useNavigate()
	const { lang } = useLang()
	const { id } = useParams<{ id: string }>()
	const [array, setArray] = useState<IEmployees | null>(null) // Изменил тип на IEmployees | null
	const [tempDate, setTempDate] = useState<Dayjs | null>(null)
	const [tempMinutes, setTempMinutes] = useState('')
	const [img, setImg] = useState<string | null>(null) // Добавил для фото
	const [download, setDownload] = useState(false) // Добавил для загрузки фото

	const formatDateFields = (data: IEmployees) => ({
		...data,
		birthday: data.birthday || '',
		PassportIssued: data.PassportIssued || '',
		ExpirationDate: data.ExpirationDate || '',
		IssueDate: data.IssueDate || '',
	})

	const updateUser = async () => {
		if (!array || !id) {
			console.log('No array or id')
			alert('Данные сотрудника не загружены')
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
			alert('Заполните данные сотрудника')
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
			alert(`Ошибка при создании: ${JSON.stringify(error)}`)
		}
	}

	useEffect(() => {
		const fetch = async () => {
			if (id) {
				try {
					const data = (await employees) || []
					const employee = data.find(item => item.id === id)
					if (employee) {
						setArray(employee)
						setImg(employee.imageUrl || null)
					} else {
						console.log('Employee not found')
						alert('Сотрудник не найден')
					}
				} catch (error) {
					console.error('Error fetching employee:', error)
					alert(`Ошибка загрузки данных: ${JSON.stringify(error)}`)
				}
			} else {
				// Новый сотрудник
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
				onClick={() => navigate('/base')}
			>
				<Typography
					variant='h6'
					fontWeight={500}
					sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
				>
					<ArrowBackIcon />
					{lang === 'uz' ? langUz.back : langRu.back}
				</Typography>
				<Button variant='contained' onClick={id ? updateUser : createUser}>
					{id ? 'Сохранить' : 'Добавить'}
				</Button>
			</Box>
			{array && (
				<UserPage
					array={array}
					setArray={setArray}
					id={id}
					tempDate={tempDate}
					setTempDate={setTempDate}
					tempMinutes={tempMinutes}
					setTempMinutes={setTempMinutes}
					img={img}
					setImg={setImg}
					download={download}
					setDownload={setDownload}
				/>
			)}
		</Paper>
	)
}

export default UserId

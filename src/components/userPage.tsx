import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import pb from '../lib/pocketbase'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {
	Box,
	TextField,
	MenuItem,
	Button,
	FormControl,
	InputLabel,
	Select,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

interface IEmployees {
	id?: string
	fullName: string
	gender: 'Мужчина' | 'Женщина'
	passport: string
	birthday: string
	birthPlace: string
	PassportIssued: string
	IssuedBy: string
	ExpirationDate: string
	IssueDate: string
	NationalityCode: string
	Nationality: string
	birthCode: string
	Email: string
	phone: string
	Department: string
	job: string
	image: string | File
	PINFL: string
	CountryCode: string
	where: 'atWork' | 'onBusinessTrip' | 'onSickLeave' | 'onVacation' | ''
	whenlate: string
	mood: string
}
const UserPage = () => {
	const [tempDate, setTempDate] = useState<Dayjs | null>(null)
	const [tempMinutes, setTempMinutes] = useState('')
	const [value, setValue] = useState(0)
	const [array, setArray] = useState<IEmployees | null>(null)
	const [img, setImg] = useState<string | null>(null)
	const [download, setDownload] = useState(false)
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()

	async function getUser(data: string) {
		try {
			const info = await pb.collection('employees').getOne(data)
			setArray(info as unknown as IEmployees)
			setImg(pb.files.getURL(info, info.image) || null)
		} catch (error) {
			console.error('Error fetching user:', error)
			alert('Ошибка загрузки данных: ' + JSON.stringify(error))
		}
	}

	async function updateUser() {
		if (!array || !id) return
		let updatedArray = { ...array }
		if (tempDate && tempMinutes) {
			const formattedDate = tempDate.format('DD-MM-YYYY')
			const existing = array.whenlate ? JSON.parse(array.whenlate) : {}
			const updatedWhenLate = {
				...existing,
				[formattedDate]: Number(tempMinutes),
			}
			updatedArray = {
				...array,
				whenlate: JSON.stringify(updatedWhenLate), // Всегда строка JSON
			}
		}
		try {
			const formattedArray = {
				...updatedArray,
				birthday: updatedArray.birthday
					? dayjs(updatedArray.birthday, 'DD-MM-YYYY').format('YYYY-MM-DD')
					: '',
				PassportIssued: updatedArray.PassportIssued
					? dayjs(updatedArray.PassportIssued, 'DD-MM-YYYY').format(
							'YYYY-MM-DD'
					  )
					: '',
				ExpirationDate: updatedArray.ExpirationDate
					? dayjs(updatedArray.ExpirationDate, 'DD-MM-YYYY').format(
							'YYYY-MM-DD'
					  )
					: '',
				IssueDate: updatedArray.IssueDate
					? dayjs(updatedArray.IssueDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
					: '',
			}
			await pb.collection('employees').update(id, formattedArray)
			alert('Изменено')
			setTempDate(null)
			setTempMinutes('')
		} catch (error) {
			console.error('Error updating user:', error)
			alert('Ошибка при обновлении: ' + JSON.stringify(error))
		}
	}

	async function createUser() {
		if (!array) return
		try {
			const formData = new FormData()
			const formattedArray = {
				...array,
				birthday: array.birthday
					? dayjs(array.birthday, 'DD-MM-YYYY').format('YYYY-MM-DD')
					: '',
				PassportIssued: array.PassportIssued
					? dayjs(array.PassportIssued, 'DD-MM-YYYY').format('YYYY-MM-DD')
					: '',
				ExpirationDate: array.ExpirationDate
					? dayjs(array.ExpirationDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
					: '',
				IssueDate: array.IssueDate
					? dayjs(array.IssueDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
					: '',
				whenlate: JSON.stringify(
					array.whenlate ? JSON.parse(array.whenlate) : {}
				), // Всегда строка JSON
			}
			Object.entries(formattedArray).forEach(([key, value]) => {
				if (key !== 'image' && value !== undefined) {
					formData.append(key, value)
				}
			})
			if (array.image instanceof File) {
				formData.append('image', array.image)
			}
			const newRecord = await pb.collection('employees').create(formData)
			alert('Создано')
			navigate('/base')
		} catch (error) {
			console.error('Error creating user:', error)
			alert('Ошибка при создании: ' + JSON.stringify(error))
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
				PINFL: '',
				CountryCode: '',
				where: '',
				mood: '',
				whenlate: '{}', // Инициализация пустого JSON для нового пользователя
			})
			setImg(null)
			setDownload(true) // Показать поле загрузки для нового пользователя
		}
	}, [id])

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box className='flex flex-col gap-5 p-4'>
				<Box className='flex gap-4'>
					{download ? (
						<label className='w-[200px] h-[250px] flex items-center justify-center border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-100'>
							<span className='text-gray-500'>Загрузить фото</span>
							<input
								type='file'
								accept='image/*'
								className='hidden'
								onChange={e => {
									const file = e.target.files?.[0]
									if (file) {
										const reader = new FileReader()
										reader.onloadend = () => {
											setImg(reader.result as string)
											setArray(prev => (prev ? { ...prev, image: file } : null))
										}
										reader.readAsDataURL(file)
									}
								}}
							/>
						</label>
					) : img ? (
						<img
							src={img}
							className='w-[200px] h-[250px] rounded-xl cursor-pointer'
							onClick={() => setDownload(true)}
						/>
					) : (
						<div
							onClick={() => setDownload(true)}
							className='w-[200px] h-[250px] flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl cursor-pointer hover:bg-gray-200'
						>
							<PersonAddAltIcon className='text-6xl' />
						</div>
					)}
					<div className='flex flex-col w-full gap-10'>
						<TextField
							label='ФИО'
							value={array?.fullName || ''}
							fullWidth
							onChange={e =>
								setArray(prev =>
									prev ? { ...prev, fullName: e.target.value } : null
								)
							}
						/>
						<div className='grid grid-cols-2 gap-4'>
							<FormControl fullWidth>
								<InputLabel id='gender-label'>Пол</InputLabel>
								<Select
									labelId='gender-label'
									value={array?.gender || ''}
									label='Пол'
									onChange={(e: SelectChangeEvent<string>) =>
										setArray(prev =>
											prev
												? {
														...prev,
														gender: e.target.value as 'Мужчина' | 'Женщина',
												  }
												: null
										)
									}
								>
									<MenuItem value='Мужчина'>Мужчина</MenuItem>
									<MenuItem value='Женщина'>Женщина</MenuItem>
								</Select>
							</FormControl>
							<TextField
								label='Серия и номер паспорта'
								value={array?.passport || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, passport: e.target.value } : null
									)
								}
							/>
							<DatePicker
								label='Дата рождения'
								value={
									array?.birthday &&
									dayjs(array.birthday, 'DD-MM-YYYY').isValid()
										? dayjs(array.birthday, 'DD-MM-YYYY')
										: null
								}
								onChange={(newValue: Dayjs | null) =>
									setArray(prev =>
										prev
											? {
													...prev,
													birthday: newValue
														? newValue.format('DD-MM-YYYY')
														: '',
											  }
											: null
									)
								}
								format='DD-MM-YYYY'
							/>
							<TextField
								label='Место рождения'
								value={array?.birthPlace || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, birthPlace: e.target.value } : null
									)
								}
							/>
						</div>
					</div>
				</Box>
				<Box>
					<Box sx={{ borderColor: 'divider' }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='basic tabs example'
						>
							<Tab label='Раздел 1' />
							<Tab label='Раздел 2' />
						</Tabs>
					</Box>
					{value === 0 && (
						<div className='grid grid-cols-2 gap-5 my-5'>
							<DatePicker
								label='Паспорт выдан'
								value={
									array?.PassportIssued &&
									dayjs(array.PassportIssued, 'DD-MM-YYYY').isValid()
										? dayjs(array.PassportIssued, 'DD-MM-YYYY')
										: null
								}
								onChange={(newValue: Dayjs | null) =>
									setArray(prev =>
										prev
											? {
													...prev,
													PassportIssued: newValue
														? newValue.format('DD-MM-YYYY')
														: '',
											  }
											: null
									)
								}
								format='DD-MM-YYYY'
							/>
							<TextField
								label='Кем выдан'
								value={array?.IssuedBy || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, IssuedBy: e.target.value } : null
									)
								}
							/>
							<DatePicker
								label='Дата истечения срока паспорта'
								value={
									array?.ExpirationDate &&
									dayjs(array.ExpirationDate, 'DD-MM-YYYY').isValid()
										? dayjs(array.ExpirationDate, 'DD-MM-YYYY')
										: null
								}
								onChange={(newValue: Dayjs | null) =>
									setArray(prev =>
										prev
											? {
													...prev,
													ExpirationDate: newValue
														? newValue.format('DD-MM-YYYY')
														: '',
											  }
											: null
									)
								}
								format='DD-MM-YYYY'
							/>
							<DatePicker
								label='Дата выдачи паспорта'
								value={
									array?.IssueDate &&
									dayjs(array.IssueDate, 'DD-MM-YYYY').isValid()
										? dayjs(array.IssueDate, 'DD-MM-YYYY')
										: null
								}
								onChange={(newValue: Dayjs | null) =>
									setArray(prev =>
										prev
											? {
													...prev,
													IssueDate: newValue
														? newValue.format('DD-MM-YYYY')
														: '',
											  }
											: null
									)
								}
								format='DD-MM-YYYY'
							/>
							<TextField
								label='Код страны гражданства'
								value={array?.NationalityCode || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, NationalityCode: e.target.value } : null
									)
								}
							/>
							<TextField
								label='Код страны рождения'
								value={array?.birthCode || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, birthCode: e.target.value } : null
									)
								}
							/>
							<TextField
								label='Национальность'
								value={array?.Nationality || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, Nationality: e.target.value } : null
									)
								}
							/>
							<TextField
								label='ПИНФЛ'
								value={array?.PINFL || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, PINFL: e.target.value } : null
									)
								}
							/>
							<TextField
								label='Код страны'
								value={array?.CountryCode || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, CountryCode: e.target.value } : null
									)
								}
							/>
							<TextField
								label='Email'
								value={array?.Email || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, Email: e.target.value } : null
									)
								}
							/>
						</div>
					)}
					{value === 1 && (
						<div className='grid grid-cols-2 my-5 gap-5'>
							<TextField
								label='Номер телефона'
								value={array?.phone || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, phone: e.target.value } : null
									)
								}
							/>
							<TextField
								label='Отдел'
								value={array?.Department || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, Department: e.target.value } : null
									)
								}
							/>
							<TextField
								label='Должность'
								value={array?.job || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, job: e.target.value } : null
									)
								}
							/>
							<TextField
								label='какое настроение'
								value={array?.mood || ''}
								fullWidth
								onChange={e =>
									setArray(prev =>
										prev ? { ...prev, mood: e.target.value } : null
									)
								}
							/>
							<FormControl fullWidth>
								<InputLabel id='where'>Сейчас на работе?</InputLabel>
								<Select
									labelId='where'
									value={array?.where || ''}
									label='Сейчас на работе?'
									onChange={(e: SelectChangeEvent<string>) =>
										setArray(prev =>
											prev
												? {
														...prev,
														where: e.target.value as
															| 'atWork'
															| 'onBusinessTrip'
															| 'onSickLeave'
															| 'onVacation'
															| '',
												  }
												: null
										)
									}
								>
									<MenuItem value='atWork'>На работе</MenuItem>
									<MenuItem value='onSickLeave'>На больничном</MenuItem>
									<MenuItem value='onBusinessTrip'>На отпуске</MenuItem>
									<MenuItem value='onVacation'>На командировке</MenuItem>
								</Select>
							</FormControl>
							{id && (
								<>
									<DatePicker
										label='Когда опоздал'
										value={tempDate}
										onChange={newValue => setTempDate(newValue)}
										format='DD-MM-YYYY'
									/>
									{tempDate && (
										<TextField
											label='На сколько минут'
											value={tempMinutes}
											onChange={e => setTempMinutes(e.target.value)}
											fullWidth
											type='number'
										/>
									)}
								</>
							)}
						</div>
					)}
				</Box>
				<div className='flex gap-4'>
					{id ? (
						<Button variant='contained' onClick={updateUser} className='mt-4'>
							Сохранить
						</Button>
					) : (
						<Button variant='contained' onClick={createUser} className='mt-4'>
							Добавить
						</Button>
					)}
				</div>
			</Box>
		</LocalizationProvider>
	)
}

export default UserPage

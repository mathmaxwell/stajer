import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import pb from '../lib/pocketbase'
import type { IEmployees } from '../types/types'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
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

const UserPage = () => {
	const navigate = useNavigate()
	const [array, setArray] = useState<IEmployees | null>(null)
	const [img, setImg] = useState<string | null>(null)
	const { id } = useParams<{ id: string }>()

	async function getUser(data: string) {
		try {
			const info = await pb.collection('employees').getOne(data)
			setArray(info as unknown as IEmployees)
			setImg(pb.files.getURL(info, info.image) || null)
		} catch (error) {
			console.error('Error fetching user:', error)
		}
	}

	async function updateUser() {
		if (array && id) {
			try {
				await pb.collection('employees').update(id, array)
				alert('Изменено')
			} catch (error) {
				console.error('Error updating user:', error)
			}
		}
	}

	async function createUser() {
		if (array) {
			try {
				const newRecord = await pb.collection('employees').create(array)
				console.log(newRecord)
				alert('Создано')
				navigate('/base')
			} catch (error) {
				console.error('Error creating user:', error)
			}
		}
	}

	useEffect(() => {
		if (id) {
			getUser(id)
		} else {
			setArray({
				fullName: '',
				gender: 'Мужчина' | 'Женщина',
				passport: '',
				birthday: '',
				birthPlace: '',
				PassportIssued: '',
				IssuedBy: '',
				ExpirationDate: '',
				NationalityCode: '',
				Nationality: '',
				birthCode: '',
				Email: '',
				phone: '',
				Department: '',
				job: '',
				image: null,
			})
		}
	}, [id])
	const [download, setDownload] = useState(false)
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

					<div className='flex flex-col w-full gap-4'>
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
				<div className='grid grid-cols-2 gap-2'>
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
						label='Email'
						value={array?.Email || ''}
						fullWidth
						onChange={e =>
							setArray(prev =>
								prev ? { ...prev, Email: e.target.value } : null
							)
						}
					/>
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
							setArray(prev => (prev ? { ...prev, job: e.target.value } : null))
						}
					/>
				</div>
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

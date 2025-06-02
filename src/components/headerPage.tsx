import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	type SelectChangeEvent,
} from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { DatePicker } from '@mui/x-date-pickers'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { IEmployees } from '../types/types'

const HeaderPage = ({
	download,
	setImg,
	setArray,
	img,
	array,
	setDownload,
}: {
	download: boolean
	setImg: React.Dispatch<React.SetStateAction<string | null>>
	setArray: React.Dispatch<React.SetStateAction<IEmployees | null>>
	img: string | null
	array: IEmployees | null
	setDownload: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const updateArray = (field: keyof IEmployees, value: string | File) =>
		setArray(prev => {
			// Если prev — null, возвращаем начальный объект с обновлённым полем
			if (!prev) {
				return {
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
					[field]: value, // Обновляем указанное поле
				} as IEmployees
			}
			// Если prev существует, обновляем только указанное поле
			return {
				...prev,
				[field]: value,
			}
		})
	return (
		<Box sx={{ display: 'flex', gap: 4 }}>
			{download ? (
				<label
					style={{
						width: 200,
						height: 250,
						border: '2px dashed',
						borderColor: 'grey.400',
						borderRadius: '12px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						cursor: 'pointer',
					}}
					onMouseOver={e =>
						(e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)')
					}
					onMouseOut={e => (e.currentTarget.style.backgroundColor = 'white')}
				>
					<span style={{ color: 'grey.500' }}>Загрузить фото</span>
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
									updateArray('image', file)
								}
								reader.readAsDataURL(file)
							}
						}}
					/>
				</label>
			) : img ? (
				<Box
					component='img'
					src={img}
					sx={{
						width: 200,
						height: 250,
						borderRadius: '12px',
						cursor: 'pointer',
						objectFit: 'cover',
					}}
					onClick={() => setDownload(true)}
				/>
			) : (
				<Box
					sx={{
						width: 200,
						height: 250,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						bgcolor: 'grey.100',
						color: 'grey.400',
						borderRadius: '12px',
						cursor: 'pointer',
						'&:hover': { bgcolor: 'grey.200' },
					}}
					onClick={() => setDownload(true)}
				>
					<PersonAddAltIcon sx={{ fontSize: 60 }} />
				</Box>
			)}
			<Box
				sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 5 }}
			>
				<TextField
					label='ФИО'
					value={array?.fullName || ''}
					fullWidth
					onChange={e => {
						console.log('Введено:', e.target.value)
						updateArray('fullName', e.target.value)
					}}
				/>
				<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
					<FormControl fullWidth>
						<InputLabel id='gender-label'>Пол</InputLabel>
						<Select
							labelId='gender-label'
							value={array?.gender || ''}
							label='Пол'
							onChange={(e: SelectChangeEvent<string>) =>
								updateArray('gender', e.target.value)
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
						onChange={e => updateArray('passport', e.target.value)}
					/>
					<DatePicker
						label='Дата рождения'
						value={
							array?.birthday ? dayjs(array.birthday, 'DD-MM-YYYY', true) : null
						}
						onChange={(newValue: Dayjs | null) => {
							const formatted = newValue ? newValue.format('DD-MM-YYYY') : ''
							console.log('Selected birthday:', formatted)
							updateArray('birthday', formatted)
						}}
						format='DD-MM-YYYY'
					/>
					<TextField
						label='Место рождения'
						value={array?.birthPlace || ''}
						fullWidth
						onChange={e => updateArray('birthPlace', e.target.value)}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default HeaderPage

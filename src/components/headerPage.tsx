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
		setArray(prev => (prev ? { ...prev, [field]: value } : null))

	return (
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
									updateArray('image', file)
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
					onChange={e => updateArray('fullName', e.target.value)}
				/>
				<div className='grid grid-cols-2 gap-4'>
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
							array?.birthday && dayjs(array.birthday, 'DD-MM-YYYY').isValid()
								? dayjs(array.birthday, 'DD-MM-YYYY')
								: null
						}
						onChange={(newValue: Dayjs | null) =>
							updateArray(
								'birthday',
								newValue ? newValue.format('DD-MM-YYYY') : ''
							)
						}
						format='DD-MM-YYYY'
					/>
					<TextField
						label='Место рождения'
						value={array?.birthPlace || ''}
						fullWidth
						onChange={e => updateArray('birthPlace', e.target.value)}
					/>
				</div>
			</div>
		</Box>
	)
}

export default HeaderPage

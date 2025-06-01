import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	type SelectChangeEvent,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import type { Dayjs } from 'dayjs'
import type { IEmployees } from '../types/types'

const PageTwo = ({
	array,
	setArray,
	id,
	tempDate,
	setTempDate,
	tempMinutes,
	setTempMinutes,
}: {
	array: IEmployees | null
	setArray: React.Dispatch<React.SetStateAction<IEmployees | null>>
	id: string | undefined
	tempDate: Dayjs | null
	setTempDate: React.Dispatch<React.SetStateAction<Dayjs | null>>
	tempMinutes: string
	setTempMinutes: React.Dispatch<React.SetStateAction<string>>
}) => {
	const updateArray = (field: keyof IEmployees, value: string) =>
		setArray(prev => (prev ? { ...prev, [field]: value } : null))

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: 5,
				my: 5,
			}}
		>
			<TextField
				label='Номер телефона'
				value={array?.phone || ''}
				fullWidth
				onChange={e => updateArray('phone', e.target.value)}
			/>
			<TextField
				label='Отдел'
				value={array?.Department || ''}
				fullWidth
				onChange={e => updateArray('Department', e.target.value)}
			/>
			<TextField
				label='Должность'
				value={array?.job || ''}
				fullWidth
				onChange={e => updateArray('job', e.target.value)}
			/>
			<TextField
				label='Настроение'
				value={array?.mood || ''}
				fullWidth
				onChange={e => updateArray('mood', e.target.value)}
			/>
			<FormControl fullWidth>
				<InputLabel id='where'>Сейчас на работе?</InputLabel>
				<Select
					labelId='where'
					value={array?.where || ''}
					label='Сейчас на работе?'
					onChange={(e: SelectChangeEvent<string>) =>
						updateArray('where', e.target.value)
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
						onChange={setTempDate}
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
		</Box>
	)
}

export default PageTwo

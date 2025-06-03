import { Box, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { IEmployees } from '../types/types'

const PageOne = ({
	array,
	setArray,
}: {
	array: IEmployees | null
	setArray: React.Dispatch<React.SetStateAction<IEmployees | null>>
}) => {
	const updateArray = (field: keyof IEmployees, value: string) =>
		setArray(prev => {
			const newArray = prev ? { ...prev, [field]: value } : null
			console.log('PageOne Updated:', field, value, newArray)
			return newArray
		})

	const renderDatePicker = (
		label: string,
		field: 'PassportIssued' | 'ExpirationDate' | 'IssueDate'
	) => (
		<DatePicker
			label={label}
			value={array?.[field] ? dayjs(array[field], 'DD-MM-YYYY', true) : null}
			onChange={(newValue: Dayjs | null) => {
				const formatted = newValue ? newValue.format('DD-MM-YYYY') : ''
				updateArray(field, formatted)
			}}
			format='DD-MM-YYYY'
		/>
	)

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: { sm: 2.5, lg: 5 },
				my: { sm: 2.5, lg: 5 },
			}}
		>
			{renderDatePicker('Паспорт выдан', 'PassportIssued')}
			<TextField
				label='Кем выдан'
				value={array?.IssuedBy || ''}
				fullWidth
				onChange={e => updateArray('IssuedBy', e.target.value)}
			/>
			{renderDatePicker('Дата истечения срока паспорта', 'ExpirationDate')}
			{renderDatePicker('Дата выдачи', 'IssueDate')}
			<TextField
				label='Код страны гражданства'
				value={array?.NationalityCode || ''}
				fullWidth
				onChange={e => updateArray('NationalityCode', e.target.value)}
			/>
			<TextField
				label='Код страны рождения'
				value={array?.birthCode || ''}
				fullWidth
				onChange={e => updateArray('birthCode', e.target.value)}
			/>
			<TextField
				label='Национальность'
				value={array?.Nationality || ''}
				fullWidth
				onChange={e => updateArray('Nationality', e.target.value)}
			/>
			<TextField
				label='ПИНФЛ'
				value={array?.PINFL || ''}
				fullWidth
				onChange={e => updateArray('PINFL', e.target.value)}
			/>
			<TextField
				label='Код страны'
				value={array?.CountryCode || ''}
				fullWidth
				onChange={e => updateArray('CountryCode', e.target.value)}
			/>
			<TextField
				label='Email'
				value={array?.Email || ''}
				fullWidth
				onChange={e => updateArray('Email', e.target.value)}
			/>
		</Box>
	)
}

export default PageOne

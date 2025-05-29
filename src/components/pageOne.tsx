import { TextField } from '@mui/material'
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
		setArray(prev => (prev ? { ...prev, [field]: value } : null))

	const renderDatePicker = (
		label: string,
		field: 'PassportIssued' | 'ExpirationDate' | 'IssueDate'
	) => (
		<DatePicker
			label={label}
			value={
				array?.[field] && dayjs(array[field], 'DD-MM-YYYY').isValid()
					? dayjs(array[field], 'DD-MM-YYYY')
					: null
			}
			onChange={(newValue: Dayjs | null) =>
				updateArray(field, newValue ? newValue.format('DD-MM-YYYY') : '')
			}
			format='DD-MM-YYYY'
		/>
	)

	return (
		<div className='grid grid-cols-2 gap-5 my-5'>
			{renderDatePicker('Паспорт выдан', 'PassportIssued')}
			<TextField
				label='Кем выдан'
				value={array?.IssuedBy || ''}
				fullWidth
				onChange={e => updateArray('IssuedBy', e.target.value)}
			/>
			{renderDatePicker('Дата истечения срока паспорта', 'ExpirationDate')}
			{renderDatePicker('Дата выдачи паспорта', 'IssueDate')}
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
		</div>
	)
}

export default PageOne

import {
	Box,
	Typography,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import UserPage from './userPage'
import { useState } from 'react'
import type { IEmployees } from '../types/types'
import type { Dayjs } from 'dayjs'
import pb from '../lib/pocketbase'

const AddEmployees = () => {
	const { lang } = useLang()
	const navigate = useNavigate()
	const [array, setArray] = useState<IEmployees | null>(null)
	const [download, setDownload] = useState(false)
	const { id } = useParams<{ id: string }>()
	const [tempDate, setTempDate] = useState<Dayjs | null>(null)
	const [tempMinutes, setTempMinutes] = useState('')
	const [img, setImg] = useState<string | null>(null)
	const [openConfirm, setOpenConfirm] = useState(false) // состояние модального окна

	const formatDateFields = (data: IEmployees) => ({
		...data,
		birthday: data.birthday || '',
		PassportIssued: data.PassportIssued || '',
		ExpirationDate: data.ExpirationDate || '',
		IssueDate: data.IssueDate || '',
	})

	const updateUser = async () => {
		if (!array || !id) {
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

	const handleOpenConfirm = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (!id) {
			setOpenConfirm(true)
		} else {
			updateUser()
		}
	}

	const handleConfirmCreate = async () => {
		setOpenConfirm(false)
		await createUser()
	}

	const handleCancelCreate = () => {
		setOpenConfirm(false)
	}

	return (
		<>
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
				<Button variant='contained' onClick={handleOpenConfirm}>
					{id ? 'Сохранить' : 'Добавить'}
				</Button>
			</Box>

			<UserPage
				array={array}
				setArray={setArray}
				download={download}
				id={id}
				tempDate={tempDate}
				setDownload={setDownload}
				setTempDate={setTempDate}
				tempMinutes={tempMinutes}
				setTempMinutes={setTempMinutes}
				img={img}
				setImg={setImg}
			/>

			<Dialog
				open={openConfirm}
				onClose={handleCancelCreate}
				aria-labelledby='confirm-dialog-title'
				aria-describedby='confirm-dialog-description'
			>
				<DialogTitle id='confirm-dialog-title'>Подтверждение</DialogTitle>
				<DialogContent>
					<DialogContentText id='confirm-dialog-description'>
						Вы действительно хотите создать нового сотрудника?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelCreate}>Отмена</Button>
					<Button onClick={handleConfirmCreate} autoFocus>
						Создать
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default AddEmployees

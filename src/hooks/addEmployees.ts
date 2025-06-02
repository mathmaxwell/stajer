import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Dayjs } from 'dayjs'
import pb from '../lib/pocketbase'
import type { IEmployees } from '../types/types'

export const useEmployee = () => {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const [array, setArray] = useState<IEmployees | null>(null)
	const [download, setDownload] = useState(false)
	const [tempDate, setTempDate] = useState<Dayjs | null>(null)
	const [tempMinutes, setTempMinutes] = useState('')
	const [img, setImg] = useState<string | null>(null)

	const formatDateFields = (data: IEmployees) => ({
		...data,
		birthday: data.birthday || '',
		PassportIssued: data.PassportIssued || '',
		ExpirationDate: data.ExpirationDate || '',
		IssueDate: data.IssueDate || '',
	})

	const getUser = async (id: string) => {
		try {
			const info = await pb.collection('employees').getOne(id)
			setArray(info as unknown as IEmployees)
			setImg(pb.files.getURL(info, info.image) || null)
		} catch (error) {
			alert(`Ошибка загрузки данных: ${JSON.stringify(error)}`)
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
		try {
			await pb
				.collection('employees')
				.update(id, formatDateFields(updatedArray))
			alert('Изменено')
			setTempDate(null)
			setTempMinutes('')
		} catch (error) {
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

	return {
		array,
		setArray,
		download,
		setDownload,
		tempDate,
		setTempDate,
		tempMinutes,
		setTempMinutes,
		img,
		setImg,
		id,
		updateUser,
		createUser,
		navigate,
	}
}
export default useEmployee
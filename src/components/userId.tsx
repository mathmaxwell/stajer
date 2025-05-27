import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import employees from '../employees/employees'
import type { IEmployees } from '../types/types'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import { IconButton } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'
import UserPage from './userPage'
const UserId = () => {
	const navigate = useNavigate()
	const { lang } = useLang()
	const { id } = useParams<{ id: string }>()
	const [array, setArray] = useState([] as IEmployees[])
	useEffect(() => {
		const fetch = async () => {
			const data = (await employees) || []
			const filteredData = data.filter(item => item.id === id)
			setArray(filteredData)
			console.log(filteredData) //delete this line after testing
		}
		fetch()
	}, [id])
	return (
		<div className='flex flex-col items-center justify-between h-full py-3 px-5 w-full'>
			<div className='flex items-center justify-between w-full mb-5'>
				<h2 style={{ fontSize: 18, fontWeight: 500 }}>
					{lang === 'uz' ? langUz.fullInfo : langRu.fullInfo}
				</h2>
				<IconButton aria-label='' onClick={() => navigate('/base')}>
					<ExitToApp />
				</IconButton>
			</div>
			{array.length > 0 && <UserPage props={array[0]} upDate={setArray} />}
		</div>
	)
}

export default UserId

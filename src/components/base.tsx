import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import { Settings } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Box,
	Switch,
} from '@mui/material'

import employees from '../employees/employees'
import baseStory from '../employees/baseStory'
import { langRu, langUz } from '../lang/language'
import useLang from '../lang/lang'
import type { IEmployees } from '../types/types'

const Base = () => {
	const [settings, setSettings] = useState(false)
	const [search, setSearch] = useState('')
	const { id } = useParams()
	const { lang } = useLang()
	const { baseList, setBaseList, fullList } = baseStory()

	const [array, setArray] = useState<IEmployees[]>([])
	const [page, setPage] = useState(0)
	const navigate = useNavigate()

	useEffect(() => {
		setBaseList(
			id === 'active'
				? ['image', 'fullName', 'job', 'Department', 'phone', 'Email']
				: id === 'not-at-work'
				? ['image', 'fullName', 'passport', 'Department', 'job', 'where']
				: id === 'all-mood'
				? ['image', 'fullName', 'mood', 'Email', 'job', 'birthday']
				: id === 'all-birthday'
				? ['image', 'fullName', 'birthday', 'Department', 'job']
				: ['image', 'fullName', 'where', 'Department', 'job']
		)
	}, [id])

	useEffect(() => {
		const fetch = async () => {
			const data = (await employees) || []
			const filtered = data.filter(human =>
				human.fullName.toLowerCase().includes(search.toLowerCase().trim())
			)
			setArray(filtered)
		}
		fetch()
	}, [search])

	const numberOfPages = baseList.length
	const currentLang = lang === 'uz' ? langUz : langRu

	return (
		<div className='flex flex-col gap-5 h-full bg-gray-200'>
			{/* Settings Dialog */}
			<Dialog fullWidth open={settings} onClose={() => setSettings(false)}>
				<DialogTitle>nastroyka</DialogTitle>
				<DialogContent>
					<Box noValidate component='form' className='grid grid-cols-2'>
						{fullList.map((item, index) => (
							<FormControlLabel
								key={index}
								sx={{ mt: 1 }}
								control={
									<Switch
										checked={baseList.includes(item)}
										onChange={() => {
											const newList = baseList.includes(item)
												? baseList.filter(i => i !== item)
												: [...baseList, item]

											setBaseList(newList)
										}}
									/>
								}
								label={item}
							/>
						))}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setSettings(false)}>zakrit</Button>
				</DialogActions>
			</Dialog>

			{/* Header */}
			<div className='bg-white w-full rounded-2xl flex items-center justify-between p-5'>
				<IconButton onClick={() => setSettings(true)}>
					<p className='text-lg font-medium'>
						{currentLang.baseEmployees.toUpperCase()}
					</p>
					<Settings />
				</IconButton>

				<input
					type='text'
					placeholder='Search'
					className='py-3 px-5 border rounded-2xl'
					onChange={e => setSearch(e.target.value)}
					value={search}
				/>

				<button onClick={() => navigate('/add-employees')}>
					{currentLang.addEmployees}
				</button>
			</div>

			{/* Table */}
			<div className='grid grid-rows-11 rounded-2xl relative h-full bg-white'>
				<ul
					className='grid items-center justify-items-center text-center rounded-tl-2xl rounded-tr-2xl'
					style={{
						backgroundColor: 'rgba(235, 249, 251, 1)',
						fontSize: 16,
						fontWeight: 400,
						gridTemplateColumns: `repeat(${numberOfPages}, 1fr)`,
					}}
				>
					{baseList.map((item, index) => (
						<li
							key={index}
							className='flex items-center justify-center text-center text-base font-semibold text-gray-600'
						>
							{currentLang[item]}
						</li>
					))}
				</ul>

				{array.slice(page * 10, page * 10 + 9).map(human => (
					<ul
						key={human.passport}
						onClick={() => navigate(`/user-id/${human.id}`)}
						className='grid cursor-pointer'
						style={{ gridTemplateColumns: `repeat(${numberOfPages}, 1fr)` }}
					>
						{baseList.map((item, idx) =>
							item === 'image' ? (
								<div key={idx} className='flex items-center justify-center'>
									<img
										className='w-10 h-10 rounded-full'
										src={human.imageUrl}
										alt={item}
									/>
								</div>
							) : item === 'where' ? (
								<li
									key={idx}
									className='flex items-center justify-center text-center'
								>
									{currentLang[human['where']]}
								</li>
							) : (
								<p
									key={idx}
									className='flex items-center justify-center text-center'
								>
									{human[item]}
								</p>
							)
						)}
					</ul>
				))}

				{/* Pagination */}
				<div className='flex items-center justify-center gap-10 absolute bottom-7 left-1/2 right-1/2'>
					<button
						className='px-6 py-3 rounded-2xl text-nowrap'
						style={{
							color: page ? 'rgba(100, 109, 126, 1)' : 'rgba(191, 195, 202, 1)',
							fontSize: 17,
							fontWeight: 600,
							border: page
								? '1px solid rgba(6, 186, 209, 1)'
								: '1px solid rgba(180, 234, 241, 1)',
						}}
						onClick={() => page && setPage(prev => prev - 1)}
					>
						{currentLang.prev}
					</button>

					{page + 1}

					<button
						className='px-6 py-3 rounded-2xl text-nowrap'
						style={{
							color:
								page < Math.floor(array.length / 9)
									? 'rgba(100, 109, 126, 1)'
									: 'rgba(191, 195, 202, 1)',
							fontSize: 17,
							fontWeight: 600,
							border:
								page < Math.floor(array.length / 9)
									? '1px solid rgba(6, 186, 209, 1)'
									: '1px solid rgba(180, 234, 241, 1)',
						}}
						onClick={() =>
							page < Math.floor(array.length / 9) && setPage(prev => prev + 1)
						}
					>
						{currentLang.next}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Base

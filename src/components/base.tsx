import { useEffect, useState } from 'react'
import employees from '../employees/employees'
import baseStory from '../employees/baseStory'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import type { IEmployees } from '../types/types'
import { langRu, langUz } from '../lang/language'
import useLang from '../lang/lang'
const Base = () => {
	const [search, setSearch] = useState('')
	const { baseList } = baseStory()
	const { id } = useParams()
	useEffect(() => {
		id === 'active'
			? baseStory.setState({
					baseList: [
						'image',
						'fullName',
						'job',
						'Department',
						'phone',
						'Email',
					],
			  })
			: id === 'vacation'
			? baseStory.setState({
					baseList: ['image', 'fullName', 'where', 'Department', 'job'],
			  })
			: id === 'all'
			? baseStory.setState({
					baseList: [
						'image',
						'fullName',
						'passport',
						'Department',
						'job',
						'birthday',
					],
			  })
			: id === 'all-mood'
			? baseStory.setState({
					baseList: ['image', 'fullName', 'mood', 'Email', 'job', 'birthday'],
			  })
			: id === 'all-birthday'
			? baseStory.setState({
					baseList: ['image', 'fullName', 'birthday', 'Department', 'job'],
			  })
			: baseStory.setState({
					baseList: [
						'image',
						'fullName',
						'passport',
						'Department',
						'job',
						'where',
					],
			  })
	}, [id])
	const { lang } = useLang()
	const [array, setArray] = useState<IEmployees[]>([])
	useEffect(() => {
		const fetch = async () => {
			const data = (await employees) || []
			const filteredData = data.filter((human: IEmployees) =>
				human.fullName.toLowerCase().includes(search.toLowerCase().trim())
			)
			setArray(filteredData)
		}
		fetch()
	}, [search])

	const [page, setPage] = useState(0)
	const navigate = useNavigate()
	const numberOfPages = baseList.length
	return (
		<div className='flex flex-col gap-5 h-full bg-gray-200'>
			<div className='bg-white w-full rounded-2xl flex items-center justify-between p-5'>
				<p style={{ fontSize: 18, fontWeight: 500 }}>
					{lang === 'uz'
						? langUz.baseEmployees.toUpperCase()
						: langRu.baseEmployees.toUpperCase()}
				</p>
				<input
					type='text'
					placeholder='Search'
					className='py-3 px-5 border rounded-2xl'
					onChange={e => setSearch(e.target.value)}
					value={search}
				/>
				<button onClick={() => navigate('/add-employees')}>
					{lang === 'uz' ? langUz.addEmployees : langRu.addEmployees}
				</button>
			</div>
			<div className='grid grid-rows-11 rounded-2xl relative h-full bg-white'>
				<ul
					style={{
						backgroundColor: 'rgba(235, 249, 251, 1)',
						fontSize: 16,
						fontWeight: 400,
						gridTemplateColumns: `repeat(${numberOfPages}, 1fr)`,
					}}
					className={`grid items-center justify-items-center text-center rounded-tl-2xl rounded-tr-2xl`}
				>
					{baseList.map((item, index) => (
						<li
							className='flex items-center justify-center text-center'
							key={index}
							style={{
								color: 'rgba(100, 109, 126, 1)',
								fontSize: 17,
								fontWeight: 600,
							}}
						>
							{lang === 'uz' ? langUz[item] : langRu[item]}
						</li>
					))}
				</ul>

				{array.slice(page * 10, page * 10 + 9).map(human => (
					<ul
						className={`grid`}
						key={human.passport}
						style={{ gridTemplateColumns: `repeat(${numberOfPages}, 1fr)` }}
					>
						{baseList.map((item, id) =>
							item === 'image' ? (
								<div key={id} className='flex items-center justify-center'>
									<img
										className='w-10 h-10 rounded-full'
										src={human.imageUrl}
										alt={item}
									/>
								</div>
							) : item === 'where' ? (
								<li
									key={id}
									className='flex items-center justify-center text-center'
								>
									{lang === 'uz'
										? langUz[human['where']]
										: langRu[human['where']]}
								</li>
							) : (
								<p
									key={id}
									className='flex items-center justify-center text-center'
								>
									{human[item]}
								</p>
							)
						)}
					</ul>
				))}
				<div className='flex items-center justify-center gap-10 absolute bottom-7 left-1/2 right-1/2'>
					<button
						className='px-6 py-3 rounded-2xl text-nowrap'
						style={
							page
								? {
										color: 'rgba(100, 109, 126, 1)',
										fontSize: 17,
										fontWeight: 600,
										border: '1px soldi rgba(6, 186, 209, 1)',
								  }
								: {
										color: 'rgba(191, 195, 202, 1)',
										fontSize: 17,
										fontWeight: 600,
										border: '1px solid rgba(180, 234, 241, 1)',
								  }
						}
						onClick={() => page && setPage(prev => prev - 1)}
					>
						{lang === 'uz' ? langUz.prev : langRu.prev}
					</button>
					{page + 1}
					<button
						style={
							page < Math.floor(array.length / 9)
								? {
										color: 'rgba(100, 109, 126, 1)',
										fontSize: 17,
										fontWeight: 600,
										border: '1px solid rgba(6, 186, 209, 1)',
								  }
								: {
										color: 'rgba(191, 195, 202, 1)',
										fontSize: 17,
										fontWeight: 600,
										border: '1px solid rgba(180, 234, 241, 1)',
								  }
						}
						className='px-6 py-3 rounded-2xl text-nowrap'
						onClick={() =>
							page < Math.floor(array.length / 9) && setPage(prev => prev + 1)
						}
					>
						{lang === 'uz' ? langUz.next : langRu.next}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Base

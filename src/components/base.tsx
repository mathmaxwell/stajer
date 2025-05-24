import { useEffect, useState } from 'react'
import employees from '../employees/employees'
import baseStory from '../employees/baseStory'
import { useNavigate } from 'react-router-dom'
import type { IEmployees } from '../types/types'
import { langRu, langUz } from '../lang/language'
import useLang from '../lang/lang'
const Base = () => {
	const { lang } = useLang()
	const [array, setArray] = useState<IEmployees[]>([])
	useEffect(() => {
		const fetch = async () => {
			const data = (await employees()) || []
			setArray(data)
		}
		fetch()
	}, [])
	const { baseList } = baseStory()
	const [page, setPage] = useState(0)
	const navigate = useNavigate()

	return (
		<div className='grid grid-rows-11 h-full rounded-2xl relative'>
			<button onClick={() => navigate('/add-employees')}>click</button>
			<ul
				style={{
					backgroundColor: 'rgba(235, 249, 251, 1)',
					fontSize: 16,
					fontWeight: 400,
				}}
				className={`grid grid-cols-${baseList.length} text-black rounded-t-2xl`}
			>
				{baseList.map((item, index) => (
					<li
						key={index}
						className='flex items-center justify-center text-center'
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
					className={`grid grid-cols-${baseList.length} `}
					key={human.passport}
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
			<div className='flex items-center justify-center gap-10 absolute bottom-0 left-1/2 right-1/2'>
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
						page < Math.floor(employees.length / 9)
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
						page < Math.floor(employees.length / 9) && setPage(prev => prev + 1)
					}
				>
					{lang === 'uz' ? langUz.next : langRu.next}
				</button>
			</div>
		</div>
	)
}

export default Base

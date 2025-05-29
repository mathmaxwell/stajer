import { useNavigate } from 'react-router-dom'
import baseStory from '../employees/baseStory'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import { useState } from 'react'
import type { IEmployees } from '../types/types'

const TablePage = ({ array }: { array: IEmployees[] }) => {
	const [page, setPage] = useState(0)
	const navigate = useNavigate()
	const { baseList } = baseStory()
	const { lang } = useLang()
	const numberOfPages = baseList.length
	return (
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
						{(lang === 'uz' ? langUz : langRu)[item]}
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
							<div
								key={1000 - idx}
								className='flex items-center justify-center'
							>
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
								{(lang === 'uz' ? langUz : langRu)[human['where']]}
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
					{lang === 'uz' ? langUz.prev : langRu.prev}
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
					{lang === 'uz' ? langUz.next : langRu.next}
				</button>
			</div>
		</div>
	)
}

export default TablePage

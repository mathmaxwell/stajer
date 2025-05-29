import useLang from '../lang/lang'
import MyPieChart from '../elements/MyPieChart'
import { langRu, langUz } from '../lang/language'
import { useNavigate } from 'react-router-dom'
import useStore from '../elements/setHomePage'
import { useEffect, useState } from 'react'
import employees from '../employees/employees'
import type { IEmployees } from '../types/types'
const CheckEmotion = () => {
	const [array, setArray] = useState<IEmployees[]>([])
	const [emotions, setEmotions] = useState<Record<string, number>>({})
	useEffect(() => {
		const fetch = async () => {
			const data = (await employees) || []
			setArray(data)
			const moodStats: Record<string, number> = {}
			data.forEach((user: IEmployees) => {
				if (user.mood) {
					moodStats[user.mood] = (moodStats[user.mood] || 0) + 1
				}
			})
			setEmotions(moodStats)
		}

		fetch()
	}, []) 
	const { setPage } = useStore()
	const navigate = useNavigate()
	const { lang } = useLang()
	return (
		<div className=' rounded-2xl w-full  flex justify-between items-center gap-5'>
			<div className='bg-white w-full h-full rounded-2xl shadow py-3 px-5'>
				<p style={{ fontWeight: 500, fontSize: 18 }}>
					{lang === 'uz' ? langUz.employeesMood : langRu.employeesMood}
				</p>
				<div className='flex items-end justify-between gap-2 w-full '>
					<div>
						<MyPieChart dataObject={emotions} />
					</div>
					<button
						className='flex items-center justify-center'
						onClick={() => {
							navigate('base/all-mood')
							setPage('base')
						}}
					>
						{lang === 'uz' ? langUz.viewAll : langRu.viewAll}
					</button>
				</div>
			</div>
			<div className='bg-white w-full h-full rounded-2xl shadow py-3 px-5 flex flex-col items-center justify-between'>
				<p style={{ fontWeight: 500, fontSize: 18, marginRight: 'auto' }}>
					{lang === 'uz' ? langUz.birthdays : langRu.birthdays}
				</p>
				<ul className='flex flex-col items-start justify-between gap-2'>
					{array.map(
						(user, id) =>
							id < 5 && (
								<li
									key={id}
									className='flex justify-between items-center w-80 relative  gap-2 before:content-[""] before:w-full before:h-0.25 before:bg-gray-400 before:absolute before:bottom-0'
								>
									<div className='flex items-center justify-start gap-2'>
										<p>{user.fullName}</p>
									</div>
									<p>{user.birthday}</p>
								</li>
							)
					)}
				</ul>
				<button
					onClick={() => {
						navigate('/base/all-birthday')
						setPage('base')
					}}
				>
					{lang === 'uz' ? langUz.viewAll : langRu.viewAll}
				</button>
			</div>
		</div>
	)
}

export default CheckEmotion

import { useNavigate } from 'react-router-dom'
import employees from '../employees/employees'
import useStore from '../elements/setHomePage'
import type { IEmployees } from '../types/types'
import { useEffect, useState } from 'react'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'

const Monitoring = () => {
	const { lang } = useLang()
	const [array, setArray] = useState<IEmployees[]>([])
	useEffect(() => {
		const fetch = async () => {
			const data = (await employees()) || []
			setArray(data)
		}
		fetch()
	}, [])
	const { setPage } = useStore()
	const navigate = useNavigate()
	return (
		<div className='flex flex-col w-full h-full gap-5 bg-gray-200'>
			<ul className='h-1/5 rounded-2xl flex items-center justify-between gap-5 '>
				<li>card</li>
			</ul>
			<div
				style={{
					background: 'rgba(255, 255, 255, 1)',
					boxShadow: 'rgba(149, 157, 165, 0.2)',
				}}
				className='h-2/5 rounded-2xl flex justify-between items-center px-5 py-3 shadow'
			>
				<div className='h-full'>
					<h4 style={{ fontSize: 18, fontWeight: 500 }}>
						{lang === 'uz'
							? langUz.monitoringLateness
							: langRu.monitoringLateness}
					</h4>
					<div className='flex items-center justify-start gap-4'>
						<p style={{ fontSize: 36, fontWeight: 600 }}>son</p>
						<p style={{ fontWeight: 400, fontSize: 16 }}>
							{lang === 'uz'
								? langUz.latenessInLastDays_part1
								: langRu.latenessInLastDays_part1}{' '}
							<strong>nomer qo'yilsin</strong>
							{lang === 'uz'
								? langUz.latenessInLastDays_part2
								: langRu.latenessInLastDays_part2}
						</p>
					</div>
				</div>

				<ul className='h-full'>
					<li>пн:sonlar</li>
					<li>вт:sonlar</li>
					<li>ср:sonlar</li>
					<li>чт:sonlar</li>
					<li>пт:sonlar</li>
					<li>сб:sonlar</li>
					<li>вс:sonlar</li>
				</ul>

				<div className='h-full flex flex-col gap-3'>
					<div className='bg-white shadow rounded-2xl py-3 px-4'>
						<p style={{ fontWeight: 500, fontSize: 18 }}>
							{lang === 'uz' ? langUz.lostHoursPerDay : langRu.lostHoursPerDay}
						</p>
						<p style={{ fontSize: 36, fontWeight: 600 }}>
							atDay son
							<span style={{ fontSize: 20, fontWeight: 400 }}>час</span>
						</p>
					</div>
					<div className='bg-white shadow rounded-2xl py-3 px-4'>
						<p style={{ fontWeight: 500, fontSize: 18 }}>
							{lang === 'uz'
								? langUz.lostHoursPerWeek
								: langRu.lostHoursPerWeek}
						</p>
						<p style={{ fontSize: 36, fontWeight: 600 }}>
							hama vaqt
							<span style={{ fontSize: 20, fontWeight: 400 }}>час</span>
						</p>
					</div>
				</div>
			</div>
			<div className='h-2/5 rounded-2xl w-full flex justify-between items-center gap-5'>
				<div className='bg-white w-full h-full rounded-2xl shadow py-3 px-5'>
					<p style={{ fontWeight: 500, fontSize: 18 }}>
						{lang === 'uz' ? langUz.employeesMood : langRu.employeesMood}
					</p>
					<div className='flex items-center justify-between gap-2'>
						<div
							style={{
								background: 'red',
								width: 227,
								height: 227,
								borderRadius: '50%',
							}}
						></div>
						<div className='flex flex-col items-center justify-between gap-8'>
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
												<p>{user.mood}</p>
											</li>
										)
								)}
							</ul>
							<button
								onClick={() => {
									navigate('base/all-mood')
									setPage('base')
								}}
							>
								{lang === 'uz' ? langUz.viewAll : langRu.viewAll}
							</button>
						</div>
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
		</div>
	)
}

export default Monitoring

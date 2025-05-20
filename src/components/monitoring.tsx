import { useNavigate } from 'react-router-dom'
import cards from '../elements/monitoringCards'
import employees from '../employees/employees'

const Monitoring = () => {
	const navigate = useNavigate()
	return (
		<div className='flex flex-col w-full h-full gap-5 bg-gray-200'>
			<ul className='h-1/5 rounded-2xl flex items-center justify-between gap-5 '>
				{cards.map((card, id) =>
					card.image ? (
						<li
							onClick={() => navigate(`${card.link}`)}
							key={id}
							className='bg-white shadow w-full h-full rounded-2xl px-3 py-2.5 flex flex-col justify-between items-start'
							style={{ fontSize: 18, fontWeight: 500 }}
						>
							{card.about}
							<div className='flex justify-between items-center w-full'>
								<p>{card.number}</p>
								<img src={card.image} alt='image' />
							</div>
						</li>
					) : null
				)}
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
						Мониторинг опозданий
					</h4>
					<div className='flex items-center justify-start gap-4'>
						<p style={{ fontSize: 36, fontWeight: 600 }}>
							{cards[0].lateArrivalsNumber}{' '}
						</p>
						<p style={{ fontWeight: 400, fontSize: 16 }}>
							Опозданий <br /> За последние 7 дней
						</p>
					</div>
				</div>
				{cards[1].result && (
					<ul className='h-full'>
						<li>пн:{cards[1].result[1].length}</li>
						<li>вт:{cards[1].result[2].length}</li>
						<li>ср:{cards[1].result[3].length}</li>
						<li>чт:{cards[1].result[4].length}</li>
						<li>пт:{cards[1].result[5].length}</li>
						<li>сб:{cards[1].result[6].length}</li>
						<li>вс:{cards[1].result[0].length}</li>
					</ul>
				)}
				<div className='h-full flex flex-col gap-3'>
					<div className='bg-white shadow rounded-2xl py-3 px-4'>
						<p style={{ fontWeight: 500, fontSize: 18 }}>
							Потерянных часов за день
						</p>
						<p style={{ fontSize: 36, fontWeight: 600 }}>
							{cards[3].atDay}{' '}
							<span style={{ fontSize: 20, fontWeight: 400 }}>час</span>
						</p>
					</div>
					<div className='bg-white shadow rounded-2xl py-3 px-4'>
						<p style={{ fontWeight: 500, fontSize: 18 }}>
							Потерянных часов за неделю
						</p>
						<p style={{ fontSize: 36, fontWeight: 600 }}>
							{cards[2].allTime}{' '}
							<span style={{ fontSize: 20, fontWeight: 400 }}>час</span>
						</p>
					</div>
				</div>
			</div>
			<div className='h-2/5 rounded-2xl w-full flex justify-between items-center gap-5'>
				<div className='bg-white w-full h-full rounded-2xl shadow py-3 px-5'>
					<p style={{ fontWeight: 500, fontSize: 18 }}>
						Эмоциональное состояние сотрудников
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
								{employees.map(
									(user, id) =>
										id < 5 && (
											<li
												key={id}
												className='flex justify-between items-center w-80 relative  gap-2 before:content-[""] before:w-full before:h-0.25 before:bg-gray-400 before:absolute before:bottom-0'
											>
												<div className='flex items-center justify-start gap-2'>
													<p>{user.firstName}</p>
													<p>{user.lastName}</p>
												</div>
												<p>{user.mood}</p>
											</li>
										)
								)}
							</ul>
							<button onClick={() => navigate('/all-mood')}>
								Посмотреть всех
							</button>
						</div>
					</div>
				</div>
				<div className='bg-white w-full h-full rounded-2xl shadow py-3 px-5 flex flex-col items-center justify-between'>
					<p style={{ fontWeight: 500, fontSize: 18, marginRight: 'auto' }}>
						День рождение сотрудников
					</p>
					<ul className='flex flex-col items-start justify-between gap-2'>
						{employees.map(
							(user, id) =>
								id < 5 && (
									<li
										key={id}
										className='flex justify-between items-center w-80 relative  gap-2 before:content-[""] before:w-full before:h-0.25 before:bg-gray-400 before:absolute before:bottom-0'
									>
										<div className='flex items-center justify-start gap-2'>
											<p>{user.firstName}</p>
											<p>{user.lastName}</p>
										</div>
										<p>{user.birthday}</p>
									</li>
								)
						)}
					</ul>
					<button onClick={() => navigate('/all-birthday')}>
						Посмотреть всех
					</button>
				</div>
			</div>
		</div>
	)
}

export default Monitoring

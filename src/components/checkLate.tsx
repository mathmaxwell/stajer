import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import settings from '../images/settings.svg'
import MyChart from '../elements/MyChart'
const CheckLate = () => {
	const { lang } = useLang()
	return (
		<div
			style={{
				background: 'rgba(255, 255, 255, 1)',
				boxShadow: 'rgba(149, 157, 165, 0.2)',
			}}
			className='h-full rounded-2xl px-5 py-3 shadow flex flex-col justify-between '
		>
			<div className='flex justify-between items-center'>
				<div className='w-full'>
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
								: langRu.latenessInLastDays_part1}
							<br /> nomer qo'yilsin
							{lang === 'uz'
								? langUz.latenessInLastDays_part2
								: langRu.latenessInLastDays_part2}
						</p>
					</div>
				</div>
				<div className='flex  gap-5 justify-center items-center'>
					<button
						className='rounded-2xl flex items-center justify-center'
						style={{
							backgroundColor: 'rgba(235, 249, 251, 1)',
							border: '1px solid rgba(180, 234, 241, 1)',
							width: '44px',
							height: '44px',
						}}
					>
						<img src={settings} alt='settings' />
					</button>
					<div
						className='flex items-center justify-center rounded-2xl '
						style={{ border: '1px solid rgba(180, 234, 241, 1)' }}
					>
						<button
							className='py-4 rounded-bl-2xl rounded-tl-2xl w-24'
							style={{
								backgroundColor: 'rgba(235, 249, 251, 1)',
								border: '1px solid rgba(180, 234, 241, 1)',
							}}
						>
							{lang === 'uz' ? langUz.week : langRu.week}
						</button>
						<button
							className='py-4 rounded-br-2xl rounded-tr-2xl w-24'
							style={{
								backgroundColor: 'rgba(235, 249, 251, 1)',
								border: '1px solid rgba(180, 234, 241, 1)',
							}}
						>
							{lang === 'uz' ? langUz.month : langRu.month}
						</button>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<div className='w-full h-full flex items-center justify-center'>
					<div
						style={{ width: '405px', height: '265px' }}
						className='flex items-center justify-center'
					>
						<MyChart informationArray={[3, 4, 5, 6, 5, 4, 3]} />
					</div>
				</div>
				<div className='h-full flex flex-col gap-3 justify-end '>
					<div className='bg-white shadow-2xl rounded-2xl py-3 px-4 w-72'>
						<p style={{ fontWeight: 500, fontSize: 18 }}>
							{lang === 'uz' ? langUz.lostHoursPerDay : langRu.lostHoursPerDay}
						</p>
						<p style={{ fontSize: 36, fontWeight: 600 }}>
							12
							<span style={{ fontSize: 20, fontWeight: 400 }}>
								{lang === 'uz' ? 'soat' : 'час'}
							</span>
						</p>
					</div>
					<div className='bg-white shadow-2xl rounded-2xl py-3 px-4 w-72 ml-auto'>
						<p style={{ fontWeight: 500, fontSize: 18 }}>
							{lang === 'uz'
								? langUz.lostHoursPerWeek
								: langRu.lostHoursPerWeek}
						</p>
						<p style={{ fontSize: 36, fontWeight: 600 }}>
							48
							<span style={{ fontSize: 20, fontWeight: 400 }}>
								{lang === 'uz' ? 'soat' : 'час'}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CheckLate

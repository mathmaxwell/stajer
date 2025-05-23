import { useState } from 'react'
import employees from '../employees/employees'
const Base = () => {
	const [page, setPage] = useState(0)
	return (
		<div className='grid grid-rows-11 h-full rounded-2xl relative'>
			<ul
				style={{
					backgroundColor: 'rgba(235, 249, 251, 1)',
					fontSize: 16,
					fontWeight: 400,
				}}
				className={`grid grid-cols-6 text-black rounded-t-2xl`}
			></ul>
			{employees.slice(page * 10, page * 10 + 9).map((human, index) => (
				<ul className='grid grid-cols-6' key={human.ID || index}></ul>
			))}
			<div className='flex items-center justify-center gap-10 absolute bottom-0 left-1/2 right-1/2'>
				<button
					className='px-6 py-3 rounded-2xl'
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
					Предыдущая
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
					className='px-6 py-3 rounded-2xl'
					onClick={() =>
						page < Math.floor(employees.length / 9) && setPage(prev => prev + 1)
					}
				>
					Следующая
				</button>
			</div>
		</div>
	)
}

export default Base

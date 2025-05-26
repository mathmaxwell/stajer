import type { ChartOptions } from 'chart.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)
interface IPieChartProps {
	dataObject: Record<string, number>
}

const MyPieChart = ({ dataObject }: IPieChartProps) => {
	const labels = Object.keys(dataObject)
	const dataValues = Object.values(dataObject)

	const backgroundColors = [
		'rgba(189, 241, 180, 1)',
		'rgba(180, 215, 241, 1)',
		'rgba(238, 239, 239, 1)',
		'rgba(241, 180, 180, 1)',
		'#9C27B0',
		'#FF5722',
	]

	const chartData = {
		labels,
		datasets: [
			{
				data: dataValues,
				backgroundColor: backgroundColors.slice(0, dataValues.length),
			},
		],
	}

	const options: ChartOptions<'doughnut'> = {
		cutout: '80%',
		plugins: {
			legend: {
				display: false,
				position: 'right',
			},
		},
	}

	return (
		<div style={{ position: 'relative', width: 350, height: 300 }}>
			<Doughnut data={chartData} options={options} />
			<ul
				className='flex flex-col items-center justify-center'
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-100%, -50%)',
				}}
			>
				{Object.entries(dataObject).map(([key, value], id) => (
					<li className='flex items-center justify-center gap-2' key={id}>
						<p>
							{key === '1'
								? '😭'
								: key === '2'
								? '😡'
								: key === '3'
								? '😢'
								: '😂'}
						</p>
						<p>{value}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
export default MyPieChart

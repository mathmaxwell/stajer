import type { ChartOptions } from 'chart.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Box, List, ListItem, Typography } from '@mui/material'

ChartJS.register(ArcElement, Tooltip, Legend)

interface IPieChartProps {
	dataObject: Record<string, number>
	onSegmentClick?: (emotion: string) => void // Добавляем проп для клика
}

const MyPieChart = ({ dataObject, onSegmentClick }: IPieChartProps) => {
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
		onClick: (_, elements) => {
			if (elements.length > 0 && onSegmentClick) {
				const index = elements[0].index
				const emotion = labels[index]
				onSegmentClick(emotion)
			}
		},
	}

	return (
		<Box sx={{ position: 'relative', width: 350, height: 300 }}>
			<Doughnut data={chartData} options={options} />
			<List
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-100%, -50%)',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					p: 0,
				}}
			>
				{Object.entries(dataObject).map(([key, value], id) => (
					<ListItem
						key={id}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 1,
							py: 0.5,
						}}
					>
						<Typography>
							{key === '1'
								? '😭'
								: key === '2'
								? '😡'
								: key === '3'
								? '😢'
								: '😂'}
						</Typography>
						<Typography>{value}</Typography>
					</ListItem>
				))}
			</List>
		</Box>
	)
}

export default MyPieChart

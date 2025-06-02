import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import ChartJS from 'chart.js/auto'
import type { ChartOptions, ChartData } from 'chart.js'

ChartJS.register(ChartDataLabels)

interface IInformationArray {
	informationArray: number[]
	month?: number
}

const monthNames = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
]

const getDaysInMonth = (month: number, year: number = 2025) => {
	return new Date(year, month + 1, 0).getDate()
}

const MyChart = ({ informationArray, month }: IInformationArray) => {
	let labels: string[]
	let datasetLabel: string

	if (month === undefined || month === null) {
		labels = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
		datasetLabel = 'Значения за неделю'
	} else {
		const daysInMonth = getDaysInMonth(month)
		labels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString())
		datasetLabel = `Значения за ${monthNames[month]}`
	}

	const data: ChartData<'bar', number[], string> = {
		labels,
		datasets: [
			{
				label: datasetLabel,
				data: informationArray,
				backgroundColor: '#4CAF50',
				borderColor: '#388E3C',
				borderWidth: 1,
			},
		],
	}

	const options: ChartOptions<'bar'> = {
		maintainAspectRatio: false,
		layout: {
			padding: {
				top: 20,
				bottom: 10,
			},
		},
		scales: {
			y: {
				display: false,
				grid: {
					display: false,
				},
			},
			x: {
				grid: {
					display: false,
				},
				ticks: {
					font: {
						size: 12,
						weight: 500,
					},
					color: '#333',
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			datalabels: {
				anchor: 'end',
				align: 'end',
				color: '#333',
				font: {
					weight: 'bold',
					size: 12,
				},
			},
		},
		elements: {
			bar: {
				borderRadius: 4,
			},
		},
	}

	return (
		<div
			style={{
				width: '100%',
				maxWidth: '1200px',
				height: '230px',
				margin: '0 auto',
			}}
		>
			<Bar data={data} options={options} />
		</div>
	)
}

export default MyChart

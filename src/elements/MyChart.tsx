import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
ChartJS.register(ChartDataLabels)
import type { ChartOptions } from 'chart.js'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)
interface IInformationArray {
	informationArray: number[]
}
const MyChart = ({ informationArray }: IInformationArray) => {
	const data = {
		labels: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
		datasets: [
			{
				label: 'Значение',
				data: informationArray,
				backgroundColor: '#4CAF50',
				borderColor: '#388E3C',
			},
		],
	}

	const options: ChartOptions<'bar'> = {
		layout: {
			padding: {
				top: 20,
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
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			datalabels: {
				anchor: 'end',
				align: 'end',
				color: '#000',
				font: {
					weight: 'bold',
				},
			},
		},
	}

	return <Bar data={data} options={options} />
}

export default MyChart

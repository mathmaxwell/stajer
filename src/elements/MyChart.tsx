import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
} from 'chart.js'
import { ClassNames } from '@emotion/react'
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

	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	}

	return <Bar data={data} options={options} />
}

export default MyChart

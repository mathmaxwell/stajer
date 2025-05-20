import green from '../images/green.png'
import yellow from '../images/yellow.png'
import blue from '../images/blue.png'
import red from '../images/red.png'
import grey from '../images/grey.png'
import add from '../images/all.png'
import employees from '../employees/employees'
import { get } from 'lodash-es'
let atWorkNumber = 0
let onBusinessTripNumber = 0
let onSickLeaveNumber = 0
let onVacationNumber = 0
let lateArrivalsNumber = 0
let allTime = 0
interface LateArrivalEntry {
	firstName: string
	lastName: string
	lateArrivals: number
}
const result: LateArrivalEntry[][] = [[], [], [], [], [], [], []]
for (let human of employees) {
	for (let days in human.lateArrivals) {
		allTime = get(human, `lateArrivals.${days}`) + allTime
		const date = new Date(days)
		const dayOfWeekNumber = date.getDay()
		result[dayOfWeekNumber].push({
			firstName: human.firstName,
			lastName: human.lastName,
			lateArrivals: get(human, `lateArrivals.${days}`),
		})
	}
	lateArrivalsNumber += Object.keys(human.lateArrivals).length
	if (human.atWork === true) {
		atWorkNumber++
	}
	if (human.onBusinessTrip === true) {
		onBusinessTripNumber++
	}
	if (human.onSickLeave === true) {
		onSickLeaveNumber++
	}
	if (human.onVacation === true) {
		onVacationNumber++
	}
}
const atDay = Math.floor(allTime / 7)
const cards = [
	{ lateArrivalsNumber },
	{ result },
	{ allTime },
	{ atDay },
	{
		about: 'Активных сотрудников',
		image: green,
		number: atWorkNumber,
		link: './active',
	},
	{
		about: 'В отпуске',
		image: yellow,
		number: onVacationNumber,
		link: './vacation',
	},
	{
		about: 'На больничном',
		image: blue,
		number: onSickLeaveNumber,
		link: './sick',
	},
	{
		about: 'В командировке',
		image: red,
		number: onBusinessTripNumber,
		link: './trip',
	},
	{
		about: 'Неявка',
		image: grey,
		number: employees.length - atWorkNumber,
		link: './not-at-work',
	},
	{
		about: 'Всего сотрудников',
		image: add,
		number: employees.length,
		link: 'all',
	},
]
export default cards

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
		link: './base/active',
		object: {
			ID: false,
			image: true,
			firstName: true,
			lastName: true,
			position: true,
			mood: true,
			department: true,
			birthday: false,
			atWork: true,
			onVacation: false,
			onSickLeave: false,
			onBusinessTrip: false,
		},
	},
	{
		about: 'В отпуске',
		image: yellow,
		number: onVacationNumber,
		link: './base/vacation',
		object: {
			ID: false,
			image: true,
			firstName: true,
			lastName: true,
			position: true,
			mood: true,
			department: true,
			birthday: false,
			atWork: false,
			onVacation: true,
			onSickLeave: false,
			onBusinessTrip: false,
		},
	},
	{
		about: 'На больничном',
		image: blue,
		number: onSickLeaveNumber,
		link: './base/sick',
		object: {
			ID: false,
			image: true,
			firstName: true,
			lastName: true,
			position: true,
			mood: true,
			department: true,
			birthday: false,
			atWork: false,
			onVacation: false,
			onSickLeave: true,
			onBusinessTrip: false,
		},
	},
	{
		about: 'В командировке',
		image: red,
		number: onBusinessTripNumber,
		link: './base/trip',
		object: {
			ID: false,
			image: true,
			firstName: true,
			lastName: true,
			position: true,
			mood: true,
			department: true,
			birthday: false,
			atWork: false,
			onVacation: false,
			onSickLeave: false,
			onBusinessTrip: true,
		},
	},
	{
		about: 'Неявка',
		image: grey,
		number: employees.length - atWorkNumber,
		link: './base/not-at-work',
		object: {
			ID: false,
			image: true,
			firstName: true,
			lastName: true,
			position: true,
			mood: true,
			department: true,
			birthday: false,
			atWork: false,
			onVacation: false,
			onSickLeave: false,
			onBusinessTrip: false,
		},
	},
	{
		about: 'Всего сотрудников',
		image: add,
		number: employees.length,
		link: 'base/all',
		object: {
			ID: false,
			image: true,
			firstName: true,
			lastName: true,
			position: true,
			mood: true,
			department: true,
			birthday: false,
			atWork: false,
			onVacation: false,
			onSickLeave: false,
			onBusinessTrip: false,
		},
	},
]
export default cards

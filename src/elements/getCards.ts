
import type { IEmployees } from '../types/types'
import green from '../images/green.png'
import yellow from '../images/yellow.png'
import blue from '../images/blue.png'
import red from '../images/red.png'
import grey from '../images/grey.png'
import add from '../images/all.png'
import employees from '../employees/employees'

export async function getCardsData() {
	const employeesArray: IEmployees[] = await employees() || []

	let atWorkNumber = 0
	let onBusinessTripNumber = 0
	let onSickLeaveNumber = 0
	let onVacationNumber = 0
	let lateArrivalsNumber = 0
	let allTime = 0

	for (const human of employeesArray) {
		switch (human.where) {
			case 'atWork':
				atWorkNumber++
				break
			case 'onBusinessTrip':
				onBusinessTripNumber++
				break
			case 'onSickLeave':
				onSickLeaveNumber++
				break
			case 'onVacation':
				onVacationNumber++
				break
		}
	}

	const atDay = Math.floor(allTime / 7)

	const cards = [
		{
			about: 'Активных сотрудников',
			image: green,
			number: atWorkNumber,
			link: './base/active',
		},
		{
			about: 'В отпуске',
			image: yellow,
			number: onVacationNumber,
			link: './base/vacation',
		},
		{
			about: 'На больничном',
			image: blue,
			number: onSickLeaveNumber,
			link: './base/sick',
		},
		{
			about: 'В командировке',
			image: red,
			number: onBusinessTripNumber,
			link: './base/trip',
		},
		{
			about: 'Неявка',
			image: grey,
			number: employeesArray.length - atWorkNumber,
			link: './base/not-at-work',
		},
		{
			about: 'Всего сотрудников',
			image: add,
			number: employeesArray.length,
			link: 'base/all',
		},
	]

	return cards
}

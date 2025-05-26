import green from '../images/green.png'
import yellow from '../images/yellow.png'
import blue from '../images/blue.png'
import red from '../images/red.png'
import grey from '../images/grey.png'
import add from '../images/all.png'
import employees from '../employees/employees'

export async function getCardsData() {
	const result = employees
	let atWorkNumber = 0
	let onBusinessTripNumber = 0
	let onSickLeaveNumber = 0
	let onVacationNumber = 0
	for (const human of (await result) || []) {
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

	const cards = [
		{
			about: 'activeEmployees',
			image: green,
			number: atWorkNumber,
			link: './base/active',
		},
		{
			about: 'onVacation',
			image: yellow,
			number: onVacationNumber,
			link: './base/vacation',
		},
		{
			about: 'onSickLeave',
			image: blue,
			number: onSickLeaveNumber,
			link: './base/sick',
		},
		{
			about: 'onBusinessTrip',
			image: red,
			number: onBusinessTripNumber,
			link: './base/trip',
		},
		{
			about: 'absence',
			image: grey,
			number: ((await result) || []).length - atWorkNumber,
			link: './base/not-at-work',
		},
		{
			about: 'totalEmployees',
			image: add,
			number: ((await result) || []).length,
			link: 'base/all',
		},
	]

	return cards
}

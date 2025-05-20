interface IEmployees {
	firstName: string
	lastName: string
	atWork: boolean
	onVacation: boolean
	onSickLeave: boolean
	onBusinessTrip: boolean
	birthday: string
	mood: number
	lateArrivals: Record<string, number>
}

const employees: IEmployees[] = [
	{
		firstName: 'Алексей',
		lastName: 'Иванов',
		atWork: true,
		onVacation: false,
		onSickLeave: false,
		onBusinessTrip: false,
		birthday: '1990-03-15',
		mood: 4,
		lateArrivals: {
			'2025-05-13': 10,
			'2025-05-15': 5,
			'2025-05-18': 12,
			'2025-05-20': 8,
		},
	},
	{
		firstName: 'Мария',
		lastName: 'Петрова',
		atWork: false,
		onVacation: true,
		onSickLeave: false,
		onBusinessTrip: false,
		birthday: '1987-11-22',
		mood: 5,
		lateArrivals: {
			'2025-05-14': 7,
			'2025-05-16': 14,
			'2025-05-19': 20,
		},
	},
	{
		firstName: 'Дмитрий',
		lastName: 'Сидоров',
		atWork: false,
		onVacation: false,
		onSickLeave: true,
		onBusinessTrip: false,
		birthday: '1992-06-30',
		mood: 2,
		lateArrivals: {
			'2025-05-13': 18,
			'2025-05-17': 9,
			'2025-05-20': 15,
		},
	},
	{
		firstName: 'Елена',
		lastName: 'Кузнецова',
		atWork: false,
		onVacation: false,
		onSickLeave: false,
		onBusinessTrip: true,
		birthday: '1995-01-10',
		mood: 3,
		lateArrivals: {
			'2025-05-15': 11,
			'2025-05-18': 16,
			'2025-05-19': 5,
		},
	},
	{
		firstName: 'Игорь',
		lastName: 'Смирнов',
		atWork: true,
		onVacation: false,
		onSickLeave: false,
		onBusinessTrip: false,
		birthday: '1985-08-04',
		mood: 5,
		lateArrivals: {
			'2025-05-14': 13,
			'2025-05-16': 25,
			'2025-05-17': 6,
			'2025-05-20': 19,
		},
	},
	{
		firstName: 'Наталья',
		lastName: 'Фомина',
		atWork: true,
		onVacation: false,
		onSickLeave: false,
		onBusinessTrip: false,
		birthday: '1991-12-01',
		mood: 3,
		lateArrivals: {
			'2025-05-13': 17,
			'2025-05-15': 10,
			'2025-05-19': 23,
		},
	},
	{
		firstName: 'Сергей',
		lastName: 'Тихонов',
		atWork: true,
		onVacation: false,
		onSickLeave: false,
		onBusinessTrip: false,
		birthday: '1989-04-18',
		mood: 4,
		lateArrivals: {
			'2025-05-14': 12,
			'2025-05-16': 20,
			'2025-05-18': 8,
		},
	},
	{
		firstName: 'Ольга',
		lastName: 'Лебедева',
		atWork: false,
		onVacation: true,
		onSickLeave: false,
		onBusinessTrip: false,
		birthday: '1993-09-09',
		mood: 5,
		lateArrivals: {
			'2025-05-13': 15,
			'2025-05-17': 9,
			'2025-05-20': 11,
		},
	},
	{
		firstName: 'Павел',
		lastName: 'Мельников',
		atWork: false,
		onVacation: false,
		onSickLeave: true,
		onBusinessTrip: false,
		birthday: '1986-02-25',
		mood: 1,
		lateArrivals: {
			'2025-05-14': 14,
			'2025-05-16': 18,
			'2025-05-19': 7,
		},
	},
	{
		firstName: 'Анна',
		lastName: 'Романова',
		atWork: true,
		onVacation: false,
		onSickLeave: false,
		onBusinessTrip: false,
		birthday: '1994-07-17',
		mood: 5,
		lateArrivals: {
			'2025-05-13': 16,
			'2025-05-15': 21,
			'2025-05-17': 10,
			'2025-05-20': 13,
		},
	},
	{
		firstName: 'Николай',
		lastName: 'Беляев',
		atWork: true,
		onVacation: false,
		onSickLeave: false,
		onBusinessTrip: false,
		birthday: '1990-10-05',
		mood: 2,
		lateArrivals: {
			'2025-05-14': 19,
			'2025-05-16': 12,
			'2025-05-18': 25,
		},
	},
	{
		firstName: 'Ирина',
		lastName: 'Ковалева',
		atWork: false,
		onVacation: false,
		onSickLeave: false,
		onBusinessTrip: true,
		birthday: '1988-06-12',
		mood: 4,
		lateArrivals: {
			'2025-05-13': 11,
			'2025-05-15': 15,
			'2025-05-19': 8,
		},
	},
	{
		firstName: 'Виктор',
		lastName: 'Зайцев',
		atWork: true,
		onVacation: false,
		onSickLeave: false,
		onBusinessTrip: false,
		birthday: '1983-05-01',
		mood: 5,
		lateArrivals: {
			'2025-05-14': 20,
			'2025-05-16': 9,
			'2025-05-18': 14,
			'2025-05-20': 6,
		},
	},
	{
		firstName: 'Татьяна',
		lastName: 'Громова',
		atWork: true,
		onVacation: false,
		onSickLeave: false,
		onBusinessTrip: false,
		birthday: '1996-03-21',
		mood: 3,
		lateArrivals: {
			'2025-05-13': 17,
			'2025-05-15': 22,
			'2025-05-17': 10,
		},
	},
]
function sortByUpcomingBirthdays(obj: IEmployees[]) {
	const today = new Date()
	const currentMonth = today.getMonth()
	const currentDay = today.getDate()
	return obj.slice().sort((a, b) => {
		const [_, monthA, dayA] = a.birthday.split('-').map(Number)
		const [__, monthB, dayB] = b.birthday.split('-').map(Number)
		const offsetA =
			(monthA - currentMonth + 12) % 12 || (dayA >= currentDay ? 0 : 12)
		const offsetB =
			(monthB - currentMonth + 12) % 12 || (dayB >= currentDay ? 0 : 12)
		if (offsetA !== offsetB) {
			return offsetA - offsetB
		}
		return dayA - dayB
	})
}

export default sortByUpcomingBirthdays(employees)

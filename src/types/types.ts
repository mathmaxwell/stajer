export interface IEmployees {
	id?: string
	fullName: string
	gender: 'Мужчина' | 'Женщина'
	passport: string
	birthday: string
	birthPlace: string
	PassportIssued: string
	IssuedBy: string
	ExpirationDate: string
	IssueDate: string
	NationalityCode: string
	Nationality: string
	birthCode: string
	Email: string
	phone: string
	Department: string
	job: string
	image: string | File
	imageUrl: string
	PINFL: string
	CountryCode: string
	where: 'atWork' | 'onBusinessTrip' | 'onSickLeave' | 'onVacation' | ''
	whenlate: string
	mood: string
}

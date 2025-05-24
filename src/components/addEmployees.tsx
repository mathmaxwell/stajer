import pb from '../lib/pocketbase'
import type { RecordModel } from 'pocketbase'

const AddEmployees = () => {
	interface Employee {
		image: string
		imageUrl?: string
		fullName: string
		gender: string
		passport: string
		PINFL: string
		birthday: string
		birthPlace: string
		PassportIssued: string
		IssuedBy: string
		IssueDate: string
		ExpirationDate: string
		Nationality: string
		NationalityCode: string
		CountryCode: string
		birthCode: string
		Email: string
		phone: string
		Department: string
		job: string
		where: string
	}

	async function getImage() {
		const employees: RecordModel[] = await pb
			.collection('employees')
			.getFullList()

		const result: Employee[] = employees.map(record => ({
			image: record.image,
			fullName: record.fullName,
			gender: record.gender,
			passport: record.passport,
			PINFL: record.PINFL,
			birthday: record.birthday,
			birthPlace: record.birthPlace,
			imageUrl: pb.files.getURL(record, record.image),
			PassportIssued: record.PassportIssued,
			IssuedBy: record.IssuedBy,
			IssueDate: record.IssueDate,
			ExpirationDate: record.ExpirationDate,
			Nationality: record.Nationality,
			NationalityCode: record.NationalityCode,
			CountryCode: record.CountryCode,
			birthCode: record.birthCode, 
			Email: record.Email,
			phone: record.phone,
			Department: record.Department,
			job: record.job,
			where: record.where,
		}))
		console.log(result)
	}

	return (
		<>
			<button onClick={() => getImage()}>click</button>
		</>
	)
}

export default AddEmployees

import type { RecordModel } from 'pocketbase'
import pb from '../lib/pocketbase'
import type { IEmployees } from '../types/types'
async function employees() {
	try {
		const employees: RecordModel[] = await pb
			.collection('employees')
			.getFullList()

		const result: IEmployees[] = employees.map(record => ({
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
			mood: record.mood,
			where: record.where,
			id: record.id,
		}))
		return result
	} catch (error) {
		console.log(error)
	}
}
export default employees() || []

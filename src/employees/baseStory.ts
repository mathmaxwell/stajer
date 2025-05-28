import { create } from 'zustand'
import type { IEmployees } from '../types/types'

type ExcludedKeys = 'lateArrivals'
type AllowedBaseListKeys = Exclude<keyof IEmployees, ExcludedKeys>

interface BaseStore {
	baseList: AllowedBaseListKeys[]
	setBaseList: (newBaseList: AllowedBaseListKeys[]) => void
	fullList: AllowedBaseListKeys[]
}

const defaultBaseList: AllowedBaseListKeys[] = [
	'image',
	'fullName',
	'mood',
	'Department',
	'birthday',
]

const baseStory = create<BaseStore>(set => ({
	baseList: defaultBaseList,
	setBaseList: newBaseList => {
		localStorage.setItem('baseList', JSON.stringify(newBaseList))
		set({ baseList: newBaseList })
	},
	fullList: [
		'image',
		'fullName',
		'gender',
		'passport',
		'PINFL',
		'birthday',
		'birthPlace',
		'PassportIssued',
		'IssuedBy',
		'IssueDate',
		'ExpirationDate',
		'Nationality',
		'NationalityCode',
		'CountryCode',
		'birthCode',
		'Email',
		'phone',
		'Department',
		'job',
		'mood',
		'where',
	],
}))

export default baseStory

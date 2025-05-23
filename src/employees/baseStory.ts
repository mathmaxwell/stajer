import { create } from 'zustand'
import type { IEmployees } from '../employees/employees'

type ExcludedKeys =
	| 'atWork'
	| 'onVacation'
	| 'onSickLeave'
	| 'onBusinessTrip'
	| 'lateArrivals'
type AllowedBaseListKeys = Exclude<keyof IEmployees, ExcludedKeys>

interface BaseStore {
	baseList: AllowedBaseListKeys[]
	setBaseList: (newBaseList: AllowedBaseListKeys[]) => void
}

const defaultBaseList: AllowedBaseListKeys[] = [
	'ID',
	'image',
	'firstName',
	'mood',
	'department',
	'birthday',
]

const baseStory = create<BaseStore>(set => ({
	baseList: localStorage.getItem('baseList')
		? (JSON.parse(
				localStorage.getItem('baseList') as string
		  ) as AllowedBaseListKeys[])
		: defaultBaseList,
	setBaseList: newBaseList => {
		localStorage.setItem('baseList', JSON.stringify(newBaseList))
		set({ baseList: newBaseList })
	},
}))

export default baseStory

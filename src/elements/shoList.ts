import { create } from 'zustand'

interface IListStory {
	list: {
		ID: boolean
		image: boolean
		firstName: boolean
		lastName: boolean
		position: boolean
		mood: boolean
		department: boolean
		birthday: boolean
		atWork: boolean
		onVacation: boolean
		onSickLeave: boolean
		onBusinessTrip: boolean
	}
	setList: (newList: IListStory['list']) => void
}

const defaultList: IListStory['list'] = {
	ID: true,
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
}

const localKey = 'my-list-store'

const listStory = create<IListStory>(set => {
	const savedList = localStorage.getItem(localKey)
	const initialList = savedList ? JSON.parse(savedList) : defaultList
	return {
		list: initialList,
		setList: newList => {
			localStorage.setItem(localKey, JSON.stringify(newList))
			set({ list: newList })
		},
	}
})

export default listStory

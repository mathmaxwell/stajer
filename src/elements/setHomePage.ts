import { create } from 'zustand'

const useStore = create<{
	page: string
	setPage: (newStore: string) => void
}>(set => ({
	page: localStorage.getItem('base') === 'base' ? 'base' : 'monitoring',
	setPage: value =>
		set(state => {
			const newStore = value
			localStorage.setItem('base', value)
			return { page: value }
		}),
}))

export default useStore

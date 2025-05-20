import { create } from 'zustand'

const useLang = create<{
	lang: string
	setLang: () => void
}>(set => ({
	lang: localStorage.getItem('lang') === 'ru' ? 'ru' : 'uz',
	setLang: () =>
		set(state => {
			const newLang = state.lang === 'uz' ? 'ru' : 'uz'
			localStorage.setItem('lang', newLang)
			return { lang: newLang }
		}),
}))

export default useLang

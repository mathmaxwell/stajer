import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import employees from '../employees/employees'
import baseStory from '../employees/baseStory'

import type { IEmployees } from '../types/types'

import TablePage from '../components/tablePage'
import SettingsPage from '../components/SettingsPage'
import SearchPage from '../components/searchPage'

const Base = () => {
	const [settings, setSettings] = useState(false)
	const [search, setSearch] = useState('')
	const { id } = useParams()
	const { setBaseList } = baseStory()

	const [array, setArray] = useState<IEmployees[]>([])

	useEffect(() => {
		setBaseList(
			id === 'active'
				? ['image', 'fullName', 'job', 'Department', 'phone', 'Email']
				: id === 'not-at-work'
				? ['image', 'fullName', 'passport', 'Department', 'job', 'where']
				: id === 'all-mood'
				? ['image', 'fullName', 'mood', 'Email', 'job', 'birthday']
				: id === 'all-birthday'
				? ['image', 'fullName', 'birthday', 'Department', 'job']
				: ['image', 'fullName', 'where', 'Department', 'job']
		)
	}, [id])

	useEffect(() => {
		const fetch = async () => {
			const data = (await employees) || []
			const filtered = data.filter(human =>
				human.fullName.toLowerCase().includes(search.toLowerCase().trim())
			)
			setArray(filtered)
		}
		fetch()
	}, [search])

	return (
		<div className='flex flex-col gap-5 h-full bg-gray-200'>
			<SettingsPage settings={settings} setSettings={setSettings} />
			<SearchPage
				setSettings={setSettings}
				search={search}
				setSearch={setSearch}
			/>

			<TablePage array={array} />
		</div>
	)
}

export default Base

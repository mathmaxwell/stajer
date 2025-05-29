import { IconButton } from '@mui/material'

import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import { Settings } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const searchPage = ({
	search,
	setSearch,
	setSettings,
}: {
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
	setSettings: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const navigate = useNavigate()
	const { lang } = useLang()
	return (
		<div className='bg-white w-full rounded-2xl flex items-center justify-between p-5'>
			<IconButton onClick={() => setSettings(true)}>
				<p className='text-lg font-medium'>
					{(lang === 'uz' ? langUz : langRu).baseEmployees.toUpperCase()}
				</p>
				<Settings />
			</IconButton>

			<input
				type='text'
				placeholder='Search'
				className='py-3 px-5 border rounded-2xl'
				onChange={e => setSearch(e.target.value)}
				value={search}
			/>

			<button onClick={() => navigate('/add-employees')}>
				{lang === 'uz' ? langUz.addEmployees : langRu.addEmployees}
			</button>
		</div>
	)
}

export default searchPage

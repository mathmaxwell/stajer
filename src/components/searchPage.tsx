import { Box, IconButton, TextField, Button, Typography } from '@mui/material'
import { Settings } from '@mui/icons-material'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import { useNavigate } from 'react-router-dom'

const SearchPage = ({
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
		<Box
			sx={{
				bgcolor: '#fff',
				width: '100%',
				borderRadius: '16px',
				border: 'none',
				outline: 'none',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				p: 2.5,
			}}
		>
			<IconButton
				onClick={() => setSettings(true)}
				sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
			>
				<Typography
					sx={{
						fontSize: 18,
						fontWeight: 500,
						textTransform: 'uppercase',
					}}
				>
					{(lang === 'uz' ? langUz : langRu).baseEmployees}
				</Typography>
				<Settings />
			</IconButton>

			<TextField
				type='text'
				placeholder='Search'
				value={search}
				onChange={e => setSearch(e.target.value)}
				variant='outlined'
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: '16px',
					},
				}}
			/>

			<Button
				variant='contained'
				onClick={() => navigate('/add-employees')}
				sx={{
					borderRadius: '16px',
					textTransform: 'none',
				}}
			>
				{lang === 'uz' ? langUz.addEmployees : langRu.addEmployees}
			</Button>
		</Box>
	)
}
export default SearchPage

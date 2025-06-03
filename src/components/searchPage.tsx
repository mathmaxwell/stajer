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
				p: {
					xs: 0.5,
					sm: 1.5,
					md: 2.5,
				},
				flexDirection: {
					xs: 'column',
					sm: 'row',
				},
				gap: {
					xs: 1.5,
					sm: 0,
				},
			}}
		>
			<IconButton
				onClick={() => setSettings(true)}
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: {
						xs: 0,
						sm: 1,
					},
					width: {
						xs: '100%',
						sm: 'auto',
					},
					justifyContent: {
						xs: 'flex-start',
						sm: 'center',
					},
				}}
			>
				<Typography
					sx={{
						fontSize: {
							xs: 16,
							sm: 17,
							md: 18,
						},
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
						height: {
							xs: 40,
							sm: 48,
						},
					},
					width: {
						xs: '100%',
						sm: '40%',
						md: 'auto',
					},
				}}
			/>

			<Button
				variant='contained'
				onClick={() => navigate('/add-employees')}
				sx={{
					textWrap: 'nowrap',
					borderRadius: '16px',
					textTransform: 'none',
					width: {
						xs: '100%',
						sm: 'auto',
					},
					px: {
						xs: 1,
						md: 2,
					},
					py: {
						xs: 1,
						sm: 1.5,
					},
					fontSize: {
						xs: 14,
						sm: 16,
					},
				}}
			>
				{lang === 'uz' ? langUz.addEmployees : langRu.addEmployees}
			</Button>
		</Box>
	)
}

export default SearchPage

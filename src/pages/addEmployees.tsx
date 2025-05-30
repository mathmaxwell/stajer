import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import { ExitToAppTwoTone } from '@mui/icons-material'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import UserPage from './userPage'

const AddEmployees = () => {
	const { lang } = useLang()
	const navigate = useNavigate()
	return (
		<div className='rounded-2xl w-full h-full py-3 px-5'>
			<div className='flex items-center justify-between'>
				<Typography
					variant='h4'
					color='initial'
					style={{ fontSize: 18, fontWeight: 500 }}
				>
					{lang === 'uz' ? langUz.addEmployees : langRu.addEmployees}
				</Typography>
				<IconButton aria-label='' onClick={() => navigate('/base')}>
					<ExitToAppTwoTone />
				</IconButton>
			</div>
			<UserPage />
		</div>
	)
}

export default AddEmployees

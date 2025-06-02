import { Box, Button, Paper, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import ErrorBoundary from './ErrorBoundary'
import useLang from '../lang/lang'
import useEmployee from '../hooks/addEmployees'
import { langRu, langUz } from '../lang/language'
import UserPage from '../pages/userPage'

const EmployeeForm = () => {
	const { lang } = useLang()
	const {
		array,
		setArray,
		download,
		setDownload,
		tempDate,
		setTempDate,
		tempMinutes,
		setTempMinutes,
		img,
		setImg,
		id,
		updateUser,
		createUser,
		navigate,
	} = useEmployee()

	return (
		<Paper
			elevation={3}
			sx={{
				borderRadius: 4,
				width: '100%',
				height: '100%',
				p: 3,
				boxSizing: 'border-box',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					mb: 2,
				}}
			>
				<Typography
					variant='h6'
					fontWeight={500}
					sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
					onClick={() => navigate('/base')}
				>
					<ArrowBackIcon />
					{lang === 'uz' ? langUz.back : langRu.back}
				</Typography>
				<Button variant='contained' onClick={id ? updateUser : createUser}>
					{id ? 'Сохранить' : 'Добавить'}
				</Button>
			</Box>
			<ErrorBoundary>
				{array && (
					<UserPage
						array={array}
						setArray={setArray}
						download={download}
						setDownload={setDownload}
						id={id}
						tempDate={tempDate}
						setTempDate={setTempDate}
						tempMinutes={tempMinutes}
						setTempMinutes={setTempMinutes}
						img={img}
						setImg={setImg}
					/>
				)}
			</ErrorBoundary>
		</Paper>
	)
}

export default EmployeeForm

import {
	Box,
	Button,
	Paper,
	Typography,
	Modal,
	Backdrop,
	Fade,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from 'react'

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
	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleConfirm = () => {
		if (id) {
			updateUser()
		} else {
			createUser()
		}
		handleClose()
	}

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
				<Button variant='contained' onClick={handleOpen}>
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
			<Modal
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: 400,
							bgcolor: 'background.paper',
							borderRadius: 2,
							boxShadow: 24,
							p: 4,
						}}
					>
						<Typography variant='h6' component='h2' mb={3}>
							{lang === 'uz'
								? 'Saqlashni xohlaysizmi?'
								: 'Сохранить изменения?'}
						</Typography>
						<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
							<Button onClick={handleClose} variant='outlined'>
								{lang === 'uz' ? 'Bekor qilish' : 'Отмена'}
							</Button>
							<Button onClick={handleConfirm} variant='contained'>
								{lang === 'uz' ? 'Saqlash' : 'Сохранить'}
							</Button>
						</Box>
					</Box>
				</Fade>
			</Modal>
		</Paper>
	)
}

export default EmployeeForm

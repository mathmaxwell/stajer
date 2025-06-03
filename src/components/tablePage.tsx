import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
	Box,
	Button,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Card,
	Avatar,
	useMediaQuery,
} from '@mui/material'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import baseStory from '../employees/baseStory'
import type { IEmployees } from '../types/types'

const TablePage = ({ array }: { array: IEmployees[] }) => {
	const [page, setPage] = useState(0)
	const navigate = useNavigate()
	const { baseList } = baseStory()
	const { lang } = useLang()
	const isMobile = useMediaQuery('(max-width:600px)')
	const rowsPerPage = isMobile ? 7 : window.innerWidth < 1200 ? 8 : 9

	useEffect(() => {
		setPage(0)
	}, [array.length])

	useEffect(() => {
		if (array.length > 0 && page * rowsPerPage >= array.length) {
			setPage(Math.max(0, Math.ceil(array.length / rowsPerPage) - 1))
		}
	}, [array.length, page, rowsPerPage])

	if (!array.length) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
				}}
			>
				<Typography>
					{lang === 'uz'
						? 'Foydalanuvchilar topilmadi'
						: 'Пользователи не найдены'}
				</Typography>
			</Box>
		)
	}

	const langData = lang === 'uz' ? langUz : langRu

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateRows: 'auto 1fr auto',
				borderRadius: '16px',
				height: '100%',
				bgcolor: '#fff',
				position: 'relative',
				p: isMobile ? 2 : 0,
			}}
		>
			{isMobile ? (
				array
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map(human => (
						<Card
							key={human.id}
							sx={{
								mb: 2,
								p: 2,
								cursor: 'pointer',
								'&:hover': { bgcolor: 'grey.100' },
							}}
							onClick={() => navigate(`/user-id/${human.id}`)}
						>
							<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
								<Avatar src={human.imageUrl} sx={{ width: 56, height: 56 }} />
								<Box>
									<Typography fontWeight={600}>{human.fullName}</Typography>
									<Typography color='text.secondary'>{human.job}</Typography>
									<Typography color='text.secondary'>
										{human.birthday}
									</Typography>
									<Typography color='text.secondary'>
										{langData[human.where]}
									</Typography>
								</Box>
							</Box>
						</Card>
					))
			) : (
				<Box sx={{ overflowX: 'auto' }}>
					<Table sx={{ borderRadius: '16px', minWidth: 600 }}>
						<TableHead>
							<TableRow
								sx={{
									bgcolor: 'rgba(235, 249, 251, 1)',
									'& .MuiTableCell-root': {
										fontSize: 16,
										fontWeight: 400,
										textAlign: 'center',
										color: 'grey.600',
										py: 2,
									},
								}}
							>
								{baseList.map((item, index) => (
									<TableCell key={index}>
										<Typography variant='subtitle1' fontWeight={600}>
											{langData[item]}
										</Typography>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{array
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(human => (
									<TableRow
										key={human.id}
										onClick={() => navigate(`/user-id/${human.id}`)}
										sx={{
											cursor: 'pointer',
											'&:hover': { bgcolor: 'grey.100' },
											'& .MuiTableCell-root': {
												textAlign: 'center',
												py: 2,
											},
										}}
									>
										{baseList.map((item, idx) =>
											item === 'image' ? (
												<TableCell key={1000 - idx}>
													<Box
														sx={{ display: 'flex', justifyContent: 'center' }}
													>
														<Avatar
															src={human.imageUrl}
															sx={{ width: 40, height: 40 }}
														/>
													</Box>
												</TableCell>
											) : item === 'where' ? (
												<TableCell key={idx}>
													<Typography>{langData[human['where']]}</Typography>
												</TableCell>
											) : (
												<TableCell key={idx}>
													<Typography>{human[item]}</Typography>
												</TableCell>
											)
										)}
									</TableRow>
								))}
						</TableBody>
					</Table>
				</Box>
			)}

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: { xs: 2, sm: 5 },
					marginX: 'auto',
					mt: 2,
					position: isMobile ? 'static' : 'absolute',
					bottom: isMobile ? 'auto' : 28,
					left: isMobile ? 'auto' : '50%',
					transform: isMobile ? 'none' : 'translateX(-50%)',
				}}
			>
				<Button
					variant='outlined'
					onClick={() => page && setPage(prev => prev - 1)}
					disabled={!page}
					sx={{
						px: 3,
						py: 1.5,
						borderRadius: '16px',
						color: page ? 'rgba(100, 109, 126, 1)' : 'rgba(191, 195, 202, 1)',
						borderColor: page
							? 'rgba(6, 186, 209, 1)'
							: 'rgba(180, 234, 241, 1)',
						fontSize: 17,
						fontWeight: 600,
						textTransform: 'none',
					}}
				>
					{langData.prev}
				</Button>

				<Typography sx={{ fontSize: 17, fontWeight: 600 }}>
					{page + 1}
				</Typography>

				<Button
					variant='outlined'
					onClick={() =>
						page < Math.ceil(array.length / rowsPerPage) - 1 &&
						setPage(prev => prev + 1)
					}
					disabled={page >= Math.ceil(array.length / rowsPerPage) - 1}
					sx={{
						px: 3,
						py: 1.5,
						borderRadius: '16px',
						color:
							page < Math.ceil(array.length / rowsPerPage) - 1
								? 'rgba(100, 109, 126, 1)'
								: 'rgba(191, 195, 202, 1)',
						borderColor:
							page < Math.ceil(array.length / rowsPerPage) - 1
								? 'rgba(6, 186, 209, 1)'
								: 'rgba(180, 234, 241, 1)',
						fontSize: 17,
						fontWeight: 600,
						textTransform: 'none',
					}}
				>
					{langData.next}
				</Button>
			</Box>
		</Box>
	)
}

export default TablePage

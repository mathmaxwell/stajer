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
	const isSmallScreen = window.innerWidth < 1200
	const rowsPerPage = isSmallScreen ? 8 : 9

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

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateRows: 'auto 1fr auto',
				borderRadius: '16px',
				height: '100%',
				bgcolor: '#fff',
				position: 'relative',
			}}
		>
			<Table sx={{ borderRadius: '16px', overflow: 'hidden' }}>
				<TableHead>
					<TableRow
						sx={{
							bgcolor: 'rgba(235, 249, 251, 1)',
							'& .MuiTableCell-root': {
								fontSize: 16,
								fontWeight: 400,
								textAlign: 'center',
								color: 'grey.600',
								fontSizeAdjust: '0.5',
								py: 2,
							},
						}}
					>
						{baseList.map((item, index) => (
							<TableCell key={index}>
								<Typography variant='subtitle1' fontWeight={600}>
									{(lang === 'uz' ? langUz : langRu)[item]}
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
											<Box sx={{ display: 'flex', justifyContent: 'center' }}>
												<Box
													component='img'
													src={human.imageUrl}
													alt={item}
													sx={{ width: 40, height: 40, borderRadius: '50%' }}
												/>
											</Box>
										</TableCell>
									) : item === 'where' ? (
										<TableCell key={idx}>
											<Typography>
												{(lang === 'uz' ? langUz : langRu)[human['where']]}
											</Typography>
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

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 5,
					position: 'absolute',
					bottom: 28,
					left: '50%',
					transform: 'translateX(-50%)',
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
					{lang === 'uz' ? langUz.prev : langRu.prev}
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
					{lang === 'uz' ? langUz.next : langRu.next}
				</Button>
			</Box>
		</Box>
	)
}

export default TablePage

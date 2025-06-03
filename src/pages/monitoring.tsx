import { Box, Paper } from '@mui/material'

import CheckEmotion from '../components/checkEmotion'
import CheckLate from '../components/checkLate'
import CardsComponent from '../elements/monitoringCards'

const Monitoring = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				gap: {
					sm: 1,
					lg: 2,
				},
				height: '100%',
				bgcolor: '#eee',
			}}
		>
			<Paper
				elevation={3}
				sx={{
					borderRadius: '16px',
					border: 'none',
					outline: 'none',
				}}
			>
				<CardsComponent />
			</Paper>

			<Paper
				elevation={3}
				sx={{
					borderRadius: '16px',
					bgcolor: '#eee',
					border: 'none',
					outline: 'none',
				}}
			>
				<CheckLate />
			</Paper>

			<Paper
				elevation={3}
				sx={{
					borderRadius: '16px',
					bgcolor: '#eee',
					border: 'none',
					outline: 'none',
				}}
			>
				<CheckEmotion />
			</Paper>
		</Box>
	)
}

export default Monitoring

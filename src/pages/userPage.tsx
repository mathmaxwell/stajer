// components/UserPage.tsx
import { useState } from 'react'
import { Box, Tabs, Tab, Paper } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import type { IEmployees } from '../types/types'
import HeaderPage from '../components/headerPage'
import PageTwo from '../components/pageTwo'
import PageOne from '../components/pageOne'

const UserPage = ({
	array,
	setArray,
	download,
	id,
	tempDate,
	setDownload,
	setTempDate,
	tempMinutes,
	setTempMinutes,
	img,
	setImg,
}: {
	array: IEmployees | null
	setImg: React.Dispatch<React.SetStateAction<string | null>>
	img: string | null
	setTempMinutes: React.Dispatch<React.SetStateAction<string>>
	tempMinutes: string
	setTempDate: React.Dispatch<React.SetStateAction<Dayjs | null>>
	tempDate: Dayjs | null
	setArray: React.Dispatch<React.SetStateAction<IEmployees | null>>
	id: string | undefined
	download: boolean
	setDownload: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const [value, setValue] = useState(0)

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Paper
				elevation={3}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
					p: 3,
					borderRadius: 4,
				}}
			>
				<HeaderPage
					download={download}
					setImg={setImg}
					setArray={setArray}
					img={img}
					setDownload={setDownload}
					array={array}
				/>
				<Box>
					<Tabs
						value={value}
						onChange={(_, newValue) => setValue(newValue)}
						aria-label='tabs'
					>
						<Tab label='Раздел 1' />
						<Tab label='Раздел 2' />
					</Tabs>
					{value === 0 && <PageOne array={array} setArray={setArray} />}
					{value === 1 && (
						<PageTwo
							array={array}
							setArray={setArray}
							id={id}
							tempDate={tempDate}
							setTempDate={setTempDate}
							tempMinutes={tempMinutes}
							setTempMinutes={setTempMinutes}
						/>
					)}
				</Box>
				<Box sx={{ display: 'flex', gap: 2 }}></Box>
			</Paper>
		</LocalizationProvider>
	)
}

export default UserPage

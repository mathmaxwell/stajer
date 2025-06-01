import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Switch,
} from '@mui/material'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import baseStory from '../employees/baseStory'

const SettingsPage = ({
	settings,
	setSettings,
}: {
	settings: boolean
	setSettings: (value: React.SetStateAction<boolean>) => void
}) => {
	const { fullList, setBaseList, baseList } = baseStory()
	const { lang } = useLang()

	return (
		<Dialog fullWidth open={settings} onClose={() => setSettings(false)}>
			<DialogTitle>
				{lang === 'uz' ? langUz.settings : langRu.settings}
			</DialogTitle>
			<DialogContent>
				<Box
					component='form'
					noValidate
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: 2,
					}}
				>
					{fullList.map((item, index) => (
						<FormControlLabel
							key={index}
							sx={{ mt: 1 }}
							control={
								<Switch
									checked={baseList.includes(item)}
									onChange={() => {
										const newList = baseList.includes(item)
											? baseList.filter(i => i !== item)
											: [...baseList, item]
										setBaseList(newList)
									}}
								/>
							}
							label={item}
						/>
					))}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setSettings(false)}>
					{lang === 'uz' ? langUz.close : langRu.close}
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default SettingsPage

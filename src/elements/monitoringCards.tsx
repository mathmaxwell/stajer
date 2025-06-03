import { useEffect, useState } from 'react'
import { getCardsData } from './getCards'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import { useNavigate } from 'react-router-dom'
import { Box, Card, Typography } from '@mui/material'
import useStore from '../elements/setHomePage'
interface ICards {
	about: string
	image: string
	number: number
	link: string
}

const CardsComponent = () => {
	const { setPage } = useStore()
	const navigate = useNavigate()
	const { lang } = useLang()
	const [cards, setCards] = useState<ICards[]>([])

	useEffect(() => {
		const fetch = async () => {
			const data = await getCardsData()
			setCards(data)
		}
		fetch()
	}, [])

	return (
		<Box
			sx={{
				bgcolor: '#eee',
				display: 'grid',
				gridTemplateColumns: 'repeat(6, 1fr)',
				width: '100%',
				borderRadius: '16px',
				border: 'none',
				outline: 'none',
				gap: 1,
			}}
		>
			{cards.map((card, i) =>
				card.about ? (
					<Card
						key={i}
						onClick={() => {
							navigate(card.link)
							setPage('base')
						}}
						sx={{
							border: 'none',
							outline: 'none',
							position: 'relative',
							height: {
								lg: 140,
								md: 120,
							},
							bgcolor: '#fff',
							cursor: 'pointer',
							'&:hover': { boxShadow: 6 },
							borderRadius: '16px',
							display: 'flex',
							flexDirection: 'column',
							p: 2,
							justifyContent: 'space-between',
						}}
					>
						<Typography
							sx={{
								fontWeight: 500,
								fontSize: 18,
							}}
						>
							{lang === 'uz' ? langUz[card.about] : langRu[card.about]}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								position: 'absolute',
								bottom: 2,
								left: 12,
								width: '90%',
							}}
						>
							<Typography
								sx={{
									fontWeight: 600,
									fontSize: 36,
								}}
							>
								{card.number}
							</Typography>
							<Box
								component='img'
								src={card.image}
								sx={{ width: 40, height: 40 }}
							/>
						</Box>
					</Card>
				) : null
			)}
		</Box>
	)
}
export default CardsComponent

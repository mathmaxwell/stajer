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
				gridTemplateColumns: {
					xs: 'repeat(1, 1fr)',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(6, 1fr)',
				},
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
							p: { xs: 1.5, md: 2 },
							justifyContent: 'space-between',
						}}
					>
						<Typography
							sx={{
								fontWeight: { xs: 400, md: 500 },
								fontSize: { xs: 16, md: 18 },
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
									fontWeight: { xs: 500, md: 600 },
									fontSize: { xs: 28, md: 36 },
									ml: { xs: 'auto', md: 0 },
									mr: { xs: '10px', md: 0 },
								}}
							>
								{card.number}
							</Typography>
							<Box
								component='img'
								src={card.image}
								sx={{
									width: { sm: 30, md: 40 },
									height: { sm: 30, md: 40 },
									display: { xs: 'none', md: 'block' },
								}}
							/>
						</Box>
					</Card>
				) : null
			)}
		</Box>
	)
}
export default CardsComponent

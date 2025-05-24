import { useEffect, useState } from 'react'
import { getCardsData } from './getCards'

const CardsComponent = () => {
	const [cards, setCards] = useState<any[]>([])

	useEffect(() => {
		const fetch = async () => {
			const data = await getCardsData()
			setCards(data)
		}
		fetch()
	}, [])

	return (
		<div>
			{cards.map((card, i) =>
				card.about ? (
					<div key={i}>
						<img src={card.image} alt='' />
						<p>{card.about}</p>
						<p>{card.number}</p>
					</div>
				) : null
			)}
		</div>
	)
}

export default CardsComponent

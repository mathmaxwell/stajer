import { useEffect, useState } from 'react'
import { getCardsData } from './getCards'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'

interface ICards {
	about: string
	image: string
	number: number
	link: string
}
const CardsComponent = () => {
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
		<div className='grid grid-cols-6 gap-4'>
			{cards.map((card, i) =>
				card.about ? (
					<div
						key={i}
						className='flex flex-col justify-between  bg-white p-3 rounded-2xl'
					>
						<p className='text-start' style={{ fontWeight: 500, fontSize: 18 }}>
							{lang === 'uz' ? langUz[card.about] : langRu[card.about]}
						</p>
						<div className='flex items-center justify-between'>
							<p style={{ fontWeight: 600, fontSize: 36 }}>{card.number}</p>
							<img src={card.image} alt='' />
						</div>
					</div>
				) : null
			)}
		</div>
	)
}

export default CardsComponent

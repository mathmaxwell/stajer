import CardsComponent from '../elements/monitoringCards'

import CheckLate from './checkLate'
import CheckEmotion from './checkEmotion'
const Monitoring = () => {
	return (
		<div className='flex flex-col justify-between w-full h-full gap-5 bg-gray-200'>
			<CardsComponent />
			<CheckLate />
			<CheckEmotion />
		</div>
	)
}

export default Monitoring

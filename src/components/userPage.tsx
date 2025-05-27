import useLang from '../lang/lang'
import type { IEmployees } from '../types/types'
import { useState } from 'react'
//import { FieldType, One } from 'react-declarative'
import { langUz, langRu } from '../lang/language'
interface UserPageProps {
	props: IEmployees
	upDate: React.Dispatch<React.SetStateAction<IEmployees[]>>
}
// npm i react-declarative --legacy-peer-deps
const UserPage = ({ props, upDate }: UserPageProps) => {
	const { lang } = useLang()
	const [array, setArray] = useState<IEmployees>(props)
	/* const fields = [
		{
			type: FieldType.Typography,
			typovarient: 'h4',
			placeholder: lang === 'uz' ? langUz.fullInfo : langRu.fullInfo,
		},
		{
			type: FieldType.Paper,
			children: 'photo',
			desktopColumns: 4,
			fields: [
				{
					type: FieldType.Component,
					name: 'image',
					required: false,
					element: (props: { onChange: (val: File) => void }) => (
						<img
							src={array.imageUrl}
							alt='image'
							style={{
								width: '200px',
								height: '250px',
							}}
						/>
					),
				},
			],
		},
	]*/
	return (
		<div className='flex flex-col items-center justify-between h-full py-3 px-5 w-full'>
			{/*<One onChange={(data, initial) => {}} fields={fields} />*/}
		</div>
	)
}

export default UserPage

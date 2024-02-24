import React, {useEffect} from 'react'

import s from './index.module.scss'
import {transitAPI} from '../../api/data.api'

const TransitPage: React.FC = () => {
	const queryParams = new URLSearchParams(window.location.search)
	const masked_url = queryParams.get('masked_url')

	useEffect(() => {
		const getInfo = async () => {
			const res = await transitAPI(masked_url || '')
			console.log(res.data.normal_url, 'TRANSIT')
			//if http:// or https:// not exist on start url + add this
			//check regex

			if (
				!res.data.normal_url.startsWith('http://') &&
				!res.data.normal_url.startsWith('https://')
			) {
				res.data.normal_url = 'https://' + res.data.normal_url
			}

			window.location.href = res.data.normal_url
		}

		getInfo()
	}, [])

	return (
		<div className={s.wrapper}>
			<p className="text-red-500">Transit</p>
		</div>
	)
}

export default TransitPage

import React from 'react'

import s from './index.module.scss'

const ErrorPage: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<p className="text-red-500">Error</p>
		</div>
	)
}

export default ErrorPage

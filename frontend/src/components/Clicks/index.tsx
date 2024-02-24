import React from 'react'
import s from './index.module.scss'
import Row from '../Row/index'

//svg
import clicks from '../../assets/clicks.svg'

interface IClicks {
	width?: string
	count?: number
	className?: string
}

const Clicks: React.FC<IClicks> = ({width, count, className}: IClicks) => {
	return (
		<Row
			className={s.clickRow + ' ' + className}
			width={width ? width : '72px'}>
			<img className={s.clickImg} src={clicks} alt="clicks" />
			<p className={s.clickText}>{count}</p>
		</Row>
	)
}

export default Clicks

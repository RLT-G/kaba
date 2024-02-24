import React from 'react'
import s from './index.module.scss'
import Row from '../Row/index'
import Col from '../Col/index'

//svg
import clicks from '../../assets/clicks.svg'
import Clicks from '../Clicks'

interface IClickCounter {
	width?: string
	count?: number
	className?: string
}

const ClickCounter: React.FC<IClickCounter> = ({
	width,
	count,
	className,
}: IClickCounter) => {
	return (
		<div
			className={s.clickCounter + ' ' + className}
			style={{width: width ? width : '72px'}}>
			<Clicks count={count} />
		</div>
	)
}

export default ClickCounter

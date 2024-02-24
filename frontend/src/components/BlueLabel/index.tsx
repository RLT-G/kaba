import React from 'react'
import s from './index.module.scss'

interface IBlueLabel {
	text?: string
	isMini?: boolean
	className?: string
	onClick?: () => void
}

const BlueLabel: React.FC<IBlueLabel> = ({
	text,
	isMini,
	className,
	onClick,
}: IBlueLabel) => {
	return (
		<label
			className={
				s.blueLabel +
				(className ? ` ${className}` : '') +
				(isMini ? ` ${s.miniLabel}` : '')
			}
			onClick={onClick}>
			{text}
		</label>
	)
}

export default BlueLabel

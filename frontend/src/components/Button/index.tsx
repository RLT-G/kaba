import React from 'react'
import s from './index.module.scss'

interface IButton {
	text?: string
	width?: string
	className?: string // Added className prop
	style?: React.CSSProperties // Added style propm
	onClick?: () => void
}

const Button: React.FC<IButton> = ({
	text,
	width,
	className,
	style,
	onClick,
}: IButton) => {
	return (
		<button
			onClick={onClick}
			className={s.button + ' ' + className}
			style={{width: width, ...style}}>
			{text}
		</button>
	)
}

export default Button

import React, {ReactNode} from 'react'
import s from './index.module.scss'

interface IButtonSVG {
	children?: ReactNode[] | ReactNode
	text?: string
	className?: string
	width?: string
	onClick?: () => void
	disabled?: boolean
}

const ButtonSVG: React.FC<IButtonSVG> = ({
	text,
	children,
	className,
	width,
	onClick,
	disabled,
}: IButtonSVG) => {
	return (
		<div className={s.wrapper}>
			<button
				disabled={disabled}
				onClick={onClick}
				style={{width: `${width}`}}
				className={`${s.button} ${disabled ? '' : s.hover} ${className}`}>
				{children}
				{text}
				
			</button>
		</div>
	)
}

export default ButtonSVG

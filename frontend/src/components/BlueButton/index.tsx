import React from 'react'
import s from './index.module.scss'

interface IBlueButton {
	text?: string
	width?: string
	className?: string // Add className prop
	onClick?: () => void
	disabled?: boolean
}

/**
 * Renders a blue button component with the given properties.
 *
 * @param {IBlueButton} {text, width, className, onClick} - The properties for the blue button.
 * @return {ReactNode} The rendered blue button component.
 */
const BlueButton: React.FC<IBlueButton> = ({
	text,
	width,
	className,
	onClick,
	disabled,
}: IBlueButton) => {
	return (
		<button
			onClick={onClick}
			className={`${s.blueButton} ${className}`}
			style={{width: width}}
			disabled={disabled}>
			{text}
		</button>
	)
}

export default BlueButton

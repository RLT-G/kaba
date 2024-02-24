import React from 'react'
import s from './index.module.scss'

interface ILabel {
	text?: string
	isMini?: boolean
	className?: string // Added className prop
	forHtml?: string
	width?: string
	htmlFor?: string
	onClick?: () => void
}

const Label: React.FC<ILabel> = ({
	text,
	isMini,
	width,
	className,
	// forHtml,
	onClick,
	htmlFor
}: ILabel) => {
	return (
		<label
			onClick={onClick}
			style={{width: width}}
			htmlFor={htmlFor}
			// htmlFor={`${forHtml}`}
			className={
				s.label +
				(isMini ? ' ' + s.miniLabel : '') +
				(className ? ' ' + className : '')
			}>
			{text}
		</label>
	)
}

export default Label

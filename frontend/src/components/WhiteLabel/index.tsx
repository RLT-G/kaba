import React from 'react'
import s from './index.module.scss'

interface IWhiteLabel {
	text?: string
	isMini?: boolean
	className?: string
	size?: string
}

const WhiteLabel: React.FC<IWhiteLabel> = ({
	text,
	isMini,
	className,
	size,
}: IWhiteLabel) => {
	return (
		<label
			style={{fontSize: size}}
			className={
				`${className} ` + s.whiteLabel + (isMini ? ' ' + s.miniLabel : '')
			}>
			{text}
		</label>
	)
}

export default WhiteLabel

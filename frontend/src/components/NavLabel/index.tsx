import React from 'react'
import s from './index.module.scss'

interface INavLabel {
	text?: string
	className?: string // Added className prop
	style?: React.CSSProperties
}

const NavLabel: React.FC<INavLabel> = ({text, className, style}: INavLabel) => {
	return (
		<h1 style={style} className={s.navLabel + ' ' + className}>
			{text}
		</h1>
	)
}

export default NavLabel

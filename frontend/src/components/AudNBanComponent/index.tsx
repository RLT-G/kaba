import React from 'react'
import s from './index.module.scss'

import Col from '../Col'
import NavLabel from '../NavLabel/index'

import Label from '../Label'

interface IAuditorNBannersComponent {
	className?: string // Added className prop
	style?: React.CSSProperties
	title: string
	id: string
}

const AuditorNBannersComponent: React.FC<IAuditorNBannersComponent> = ({
	style,
	className,
	title,
	id,
}: IAuditorNBannersComponent) => {
	return (
		<div className={s.wrapper + ' ' + className} style={style}>
			<Col width="248px">
				<NavLabel className={s.navLabel} text={`${title}`} />
				<Label className={s.Label} isMini={true} text={`ID ${id}`} />
			</Col>
		</div>
	)
}

export default AuditorNBannersComponent

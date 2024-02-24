import React from 'react'
import s from './index.module.scss'

interface IChipForBanners {
	className?: string // Added className prop
	text: string
}

const ChipForBanners: React.FC<IChipForBanners> = ({
	className,
	text,
}: IChipForBanners) => {
	return (
		<div className={s.wrapper + ' ' + className}>
			<span className={s.text}>{text}</span>
		</div>
	)
}

export default ChipForBanners

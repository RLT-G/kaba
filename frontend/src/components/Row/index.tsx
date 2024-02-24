import React, {ReactNode} from 'react'
import s from './index.module.scss'

interface IRow {
	children?: ReactNode[] | ReactNode | string | number
	width?: string
	className?: string // Added className prop
	onClick?: () => void
}

const Row: React.FC<IRow> = ({onClick, children, width, className}: IRow) => {
	// const rowClassName = `row ${className}`; // Combine className with "col" class

	return (
		<div
			onClick={onClick}
			className={s.row + ' ' + className}
			style={{width: width ? width : '360px'}}>
			{children}
		</div>
	)
}

export default Row

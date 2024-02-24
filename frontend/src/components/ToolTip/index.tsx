import React, {ReactNode} from 'react'
import s from './index.module.scss'

interface IToolTip {
	children?: ReactNode[] | ReactNode
	text: string
	className?: string // Added className prop
	top?: string
	bottom?: string
	left?: string
	right?: string
}

const ToolTip: React.FC<IToolTip> = ({
	text,
	className,
	children,
	top,
	bottom,
	left,
	right,
}: IToolTip) => {
	return (
		<div className={s.ToolTip + ' ' + className}>
			<span
				className={s.tooltiptext + ' ' + className}
				style={{
					top: `${top}`,
					bottom: `${bottom}`,
					left: `${left}`,
					right: `${right}`,
				}}>
				{text}
			</span>
			{children}
		</div>
	)
}

export default ToolTip

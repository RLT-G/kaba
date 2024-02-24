import React from 'react'
import s from './index.module.scss'
import Row from '../Row/index'

interface Info {
	color?: string
	text?: string
	count?: string
}

interface IGraphTooltip {
	info?: Info[]
}

const GraphTooltip: React.FC<IGraphTooltip> = ({info}: IGraphTooltip) => {
	return (
		<div className={s.tooltipContainer} id="tooltip-graph">
			{info?.map((item, index) => (
				<Row key={index}>
					<div className={s.leftSideTooltip}>
						<div
							className={s.colorDot}
							style={{backgroundColor: item.color}}></div>
						<p className={s.textTooltip}>{item.text}</p>
					</div>
					<div className={s.rightSideTooltip}>
						<p>{item.count}</p>
					</div>
				</Row>
			))}
		</div>
	)
}

export default GraphTooltip

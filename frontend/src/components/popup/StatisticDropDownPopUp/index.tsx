import React from 'react'
import s from './index.module.scss'
import Row from '../../Row'
import Col from '../../Col'
import Line from '../../Line'
import WhiteLabel from '../../WhiteLabel/index'
import {Collapse, ListItemButton} from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'

interface IStatisticDropDownPopUp {
	className?: string // Added className prop
}

const StatisticDropDownPopUp: React.FC<IStatisticDropDownPopUp> = ({
	className,
}: IStatisticDropDownPopUp) => {
	return (
		<div className={s.wrapper + ' ' + className}>
			<Col width="150px" className={s.ColWrapper}>
				<button className={s.WhiteLabelBtn}>
					<WhiteLabel className={s.WhiteLabel} text="Сводка" />
				</button>
				<Line width="157px" className={s.Line} />
				<button className={s.WhiteLabelBtn}>
					<WhiteLabel className={s.WhiteLabel} text="Виджеты" />
				</button>
				<Line width="157px" className={s.Line} />
				<button className={s.WhiteLabelBtn}>
					<WhiteLabel className={s.WhiteLabel} text="Отчёты" />
				</button>
				<Line width="157px" className={s.Line} />
				<button className={s.WhiteLabelBtn}>
					<WhiteLabel className={s.WhiteLabel} text="Видеоотчёты" />
				</button>
				<Line width="157px" className={s.Line} />
				<button className={s.WhiteLabelBtn}>
					<WhiteLabel className={s.WhiteLabel} text="Карта кликов" />
				</button>
				<Line width="157px" className={s.Line} />
				<button className={s.WhiteLabelBtn}>
					<WhiteLabel className={s.WhiteLabel} text="Карта скроллингов" />
				</button>
				<Line width="157px" className={s.Line} />
				<button className={s.WhiteLabelBtn}>
					<WhiteLabel className={s.WhiteLabel} text="Аналитика форм" />
				</button>
			</Col>
		</div>
	)
}

export default StatisticDropDownPopUp

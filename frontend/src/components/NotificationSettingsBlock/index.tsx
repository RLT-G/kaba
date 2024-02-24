import React, {ReactNode} from 'react'
import s from './index.module.scss'
import Col from '../Col'
import Row from '../Row'
import NavLabel from '../NavLabel/index'
import CheckBox from '../CheckBox/index'
import Line from '../Line'
import {Switch} from '@mui/material'

interface INotificationSettingsBlock {
	className?: string // Added className prop
	id_container: string
	title: string
	svg_icon: ReactNode
	checked_fristTime: boolean
}

const NotificationSettingsBlock: React.FC<INotificationSettingsBlock> = ({
	className,
	id_container,
	title,
	svg_icon,
	checked_fristTime,
}: INotificationSettingsBlock) => {
	const [checked, setChecked] = React.useState(checked_fristTime)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
	}
	return (
		<div className={s.wrapper + ' ' + className}>
			<Col width="528px">
				<Row className={s.headerNotiBlock} width="528px">
					<Row className={s.headerNotiTitle} width="auto">
						{svg_icon}
						<NavLabel className={s.navLabel} text={`${title}`} />
					</Row>
					<Switch
						checked={checked}
						onChange={handleChange}
						className={s.SwitchButton}
					/>
				</Row>
				<div
					className={s.checkboxesRow}
					style={checked ? {display: 'flex'} : {display: 'none'}}>
					<CheckBox id={`Financy_${id_container}`} labelText="Финансы" />
					<Line width="528px" className={s.Line} />
					<CheckBox id={`Moderation_${id_container}`} labelText="Модерация" />
					<Line width="528px" className={s.Line} />
					<CheckBox
						id={`Advertising_${id_container}`}
						labelText="Рекламные компании"
					/>
					<Line width="528px" className={s.Line} />
					<CheckBox
						id={`Rules_${id_container}`}
						labelText="Правила для объявлений"
					/>
				</div>
			</Col>
		</div>
	)
}

export default NotificationSettingsBlock

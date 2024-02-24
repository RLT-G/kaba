import * as React from 'react'
import s from './index.module.scss'
import Col from '../Col'
import * as mui from '@mui/base'

interface ISelect {
	placeholder?: string
	width?: string
	maxSelectWidth?: string
	className?: string // Add className property
	data?: string[] //['name', 'name2', 'name3', ...],
	bgColor?: string,
	style?: React.CSSProperties,
	valueForm?: string
}

const Select: React.FC<ISelect> = ({
	maxSelectWidth,
	placeholder,
	width,
	className,
	data,
	style,
	valueForm
}: ISelect) => {
	return (
		<div className={`${s.inputContainer} ${className}`} style={{width: width}}>
			<mui.Select
				className={`${s.inputText} ${s.addIcon}`}
				style={style}
				renderValue={(option: mui.SelectOption<number> | null) => {
					if (option == null || option.value === null) {
						return placeholder
					}
					return `${option.label}`
				}}>
				<Col width={maxSelectWidth} className={s.showList}>
					<mui.Option className={s.itemText} value={null}>
						Ничего
					</mui.Option>
					{data?.map((item, index) => (
						<mui.Option className={s.itemText} key={index} value={index}>
							{item}
						</mui.Option>
					))}
				</Col>
			</mui.Select>
		</div>
	)
}

export default Select

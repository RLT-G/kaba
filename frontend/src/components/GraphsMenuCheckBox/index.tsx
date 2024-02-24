import React, {useEffect} from 'react'
import s from './index.module.scss'
import Col from '../Col'
import Row from '../Row'
import CheckBox from '../CheckBox/index'
import NavLabel from '../NavLabel'
import StatisticDropDownMenuGraphPopUp from '../popup/StatisticDropDownMenuGraphPopUp/index'

interface IGraphsMenuCheckBox {
	className?: string // Added className prop

	topPopUp?: string
	StatisticClassName?: string
	clicks?: number
	cpc_sum: number
	consumption_sum: number
	bool_click: (bool: boolean) => void
	bool_cpc: (bool: boolean) => void
	bool_consumption: (bool: boolean) => void
	BlogerStatistic?:boolean
}

const GraphsMenuCheckBox: React.FC<IGraphsMenuCheckBox> = ({
	className,
	topPopUp,
	StatisticClassName,
	clicks,
	cpc_sum,
	consumption_sum,
	bool_click,
	bool_cpc,
	bool_consumption = false,
	BlogerStatistic,
}: IGraphsMenuCheckBox) => {
	const [StatisticDropDown_1, setStatisticDropDown_1] = React.useState(false)
	const [StatisticDropDown_2, setStatisticDropDown_2] = React.useState(false)
	const [StatisticDropDown_3, setStatisticDropDown_3] = React.useState(false)
	const [StatisticDropDown_4, setStatisticDropDown_4] = React.useState(false)
	const [StatisticDropDown_5, setStatisticDropDown_5] = React.useState(false)

	const StatisitcRef_1 = React.useRef<HTMLDivElement>(null)
	const StatisitcRef_2 = React.useRef<HTMLDivElement>(null)
	const StatisitcRef_3 = React.useRef<HTMLDivElement>(null)
	const StatisitcRef_4 = React.useRef<HTMLDivElement>(null)
	const StatisitcRef_5 = React.useRef<HTMLDivElement>(null)

	const StatisitcRefButton_1 = React.useRef<HTMLDivElement>(null)
	const StatisitcRefButton_2 = React.useRef<HTMLDivElement>(null)
	const StatisitcRefButton_3 = React.useRef<HTMLDivElement>(null)
	const StatisitcRefButton_4 = React.useRef<HTMLDivElement>(null)
	const StatisitcRefButton_5 = React.useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				StatisitcRef_1.current &&
				!StatisitcRef_1.current.contains(event.target) &&
				!StatisitcRefButton_1.current.contains(event.target)
			) {
				setStatisticDropDown_1(false)
			}

			if (
				StatisitcRef_2.current &&
				!StatisitcRef_2.current.contains(event.target) &&
				!StatisitcRefButton_2.current.contains(event.target)
			) {
				setStatisticDropDown_2(false)
			}

			if (
				StatisitcRef_3.current &&
				!StatisitcRef_3.current.contains(event.target) &&
				!StatisitcRefButton_3.current.contains(event.target)
			) {
				setStatisticDropDown_3(false)
			}

			if (
				StatisitcRef_4.current &&
				!StatisitcRef_4.current.contains(event.target) &&
				!StatisitcRefButton_4.current.contains(event.target)
			) {
				setStatisticDropDown_4(false)
			}

			if (
				StatisitcRef_5.current &&
				!StatisitcRef_5.current.contains(event.target) &&
				!StatisitcRefButton_5.current.contains(event.target)
			) {
				setStatisticDropDown_5(false)
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [
		StatisticDropDown_1,
		StatisticDropDown_2,
		StatisticDropDown_3,
		StatisticDropDown_4,
		StatisticDropDown_5,
	])

	return (
		<div className={s.wrapper + ' ' + className}>
			<Row width="1164px" className={s.MenuWrapper}>
				<div
					ref={StatisitcRefButton_1}
					// onClick={() => setStatisticDropDown_1(!StatisticDropDown_1)}
					className={s.MenuCol}>
					<Row className={s.MenuHeaderRow} width="auto">
						<CheckBox
							id="Blue"
							className={s.CheckBox}
							onChange={(check) => bool_click(!check)}
							labelText="Клики"
						/>
						<svg
							// onClick={() => bool_click(!clicks)}
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								d="M5 10L8 13L11 10"
								stroke="#808080"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M5 6L8 3L11 6"
								stroke="#808080"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Row>
					<NavLabel text={String(clicks)} />
				</div>

				<div
					ref={StatisitcRefButton_2}
					// onClick={() => setStatisticDropDown_2(!StatisticDropDown_2)}
					className={s.MenuCol}>
					<Row className={s.MenuHeaderRow} width="auto">
						<CheckBox
							onChange={(check) => bool_cpc(!check)}
							id="Orange"
							className={`${s.CheckBox} ${s.Orange}`}
							labelText="СРС"
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								d="M5 10L8 13L11 10"
								stroke="#808080"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M5 6L8 3L11 6"
								stroke="#808080"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Row>
					<NavLabel text={String(cpc_sum).slice(0, 5)} />
				</div>

				<div
					ref={StatisitcRefButton_3}
					// onClick={() => setStatisticDropDown_3(!StatisticDropDown_3)}
					className={s.MenuCol}>
					<Row className={s.MenuHeaderRow} width="auto">
						<CheckBox
							onChange={(check) => bool_consumption(!check)}
							id="Purple"
							className={`${s.CheckBox} ${s.Purple}`}
							labelText={BlogerStatistic ? "Доходы" : "Расходы"}
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								d="M5 10L8 13L11 10"
								stroke="#808080"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M5 6L8 3L11 6"
								stroke="#808080"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Row>
					<NavLabel text={String(consumption_sum)} />
				</div>

				{/* <div
					ref={StatisitcRefButton_4}
					onClick={() => setStatisticDropDown_4(!StatisticDropDown_4)}
					className={s.MenuCol}>
					<Row className={s.MenuHeaderRow} width="auto">
						<CheckBox
							id="Green"
							className={`${s.CheckBox} ${s.Green}`}
							labelText="Доля рекламных ра…"
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								d="M5 10L8 13L11 10"
								stroke="#808080"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M5 6L8 3L11 6"
								stroke="#808080"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Row>
					<NavLabel text="27,89%" />
				</div>

				<div
					ref={StatisitcRefButton_5}
					onClick={() => setStatisticDropDown_5(!StatisticDropDown_5)}
					className={s.MenuCol}>
					<Row className={s.MenuHeaderRow} width="auto">
						<CheckBox
							id="Red"
							className={`${s.CheckBox} ${s.Red}`}
							labelText="Доходы: Все цели"
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								d="M5 10L8 13L11 10"
								stroke="#808080"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M5 6L8 3L11 6"
								stroke="#808080"
								strokeWidth="1.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Row>
					<NavLabel text="121,414.39₽" />
				</div> */}
			</Row>
			{StatisticDropDown_1 && (
				<div
					ref={StatisitcRef_1}
					className={`${s.StatisticDropDown_1} ${StatisticClassName}`}>
					<StatisticDropDownMenuGraphPopUp />
				</div>
			)}
			{StatisticDropDown_2 && (
				<div
					ref={StatisitcRef_2}
					className={`${s.StatisticDropDown_2} ${StatisticClassName}`}>
					<StatisticDropDownMenuGraphPopUp />
				</div>
			)}
			{StatisticDropDown_3 && (
				<div
					ref={StatisitcRef_3}
					className={`${s.StatisticDropDown_3} ${StatisticClassName}`}>
					<StatisticDropDownMenuGraphPopUp />
				</div>
			)}
			{StatisticDropDown_4 && (
				<div
					ref={StatisitcRef_4}
					className={`${s.StatisticDropDown_4} ${StatisticClassName}`}>
					<StatisticDropDownMenuGraphPopUp />
				</div>
			)}
			{StatisticDropDown_5 && (
				<div
					ref={StatisitcRef_5}
					className={`${s.StatisticDropDown_5} ${StatisticClassName}`}>
					<StatisticDropDownMenuGraphPopUp />
				</div>
			)}
		</div>
	)
}

export default GraphsMenuCheckBox

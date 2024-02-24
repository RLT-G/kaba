import React, {useEffect, useState} from 'react'
import s from './index.module.scss'
import NavLabel from '../../NavLabel/index'
import Row from '../../Row'
import Col from '../../Col'
import Label from '../../Label'
import Line from '../../Line'
import CourseForBlogger from '../../CourseForBlogger/index'
import {Bar, Bubble, Line as LineChart} from 'react-chartjs-2'

import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
	LineElement,
	CategoryScale,
} from 'chart.js'
import HeaderSubTitle from '../../HeaderSubTitle'
import DatePicker from 'react-multi-date-picker'
import Button from '../../Button'
import GraphsMenuCheckBox from '../../GraphsMenuCheckBox'
import LineGraph from '../../LineGraph'
import CheckBox from '../../CheckBox'
import moment from 'moment'
import InputIcon from 'react-multi-date-picker/components/input_icon'
import * as mui from '@mui/base'
import Calendar from '../../Calendar/index'
import {getBloggerStatistics, getStatisticsAPI} from '../../../api/data.api'
import {useSelector} from 'react-redux'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
)
ChartJS.defaults.borderColor = '#333333'

// //generate array of dates from start date to end date like ["1 January", "2 January", "3 January",..., "1 December","2 December", ..., "31 December"]

//End line chart

//Bubble chart
const dataBubble = {
	//Generate random data for bubble chart from chart.js 2 react
	datasets: [
		{
			label: 'Red dataset',
			data: Array.from({length: 50}, () => ({
				x: Math.abs(Math.random() * 100 - 50),
				y: Math.abs(Math.random() * 100 - 50),
				r: Math.abs(Math.random() * 30 - 5),
			})),
			borderColor: '#57BD53',
			backgroundColor: '#57BD53',
		},
		{
			label: 'Blue dataset',
			data: Array.from({length: 50}, () => ({
				x: Math.abs(Math.random() * 100 - 50),
				y: Math.abs(Math.random() * 100 - 50),
				r: Math.abs(Math.random() * 30 - 5),
			})),
			borderColor: '#4169E1',
			backgroundColor: '#4169E1',
		},
	],
}

const optionsBubble = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
			text: 'Chart.js Bubble Chart',
		},
	},
	scales: {
		x: {
			gridLines: {
				borderDash: [8, 10],
				dashOffset: 2,
				color: '#333',
			},
			border: {dash: [4, 4]},
			grid: {
				BorderDash: [33, 40],
				BorderDashOffset: 2,
				tickLength: 10,
			},
			ticks: {
				callback: function (val, index) {
					// Hide every 10nd tick label
					return index % 10 === 0 ? this.getLabelForValue(val) : ''
				},
				align: 'center',
				maxRotation: 0,
			},
		},
		y: {
			gridLines: {
				borderDash: [10, 10],
				color: '#333',
			},
			//don't display the y values, but dispaly the grid
			ticks: {
				display: false,
			},
		},
	},
}

//End Bubble chart

//Bar chart
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
export const dataBar = {
	labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: labels.map(() => Math.abs(Math.random() * 1000 - 500)),
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: 'Dataset 2',
			data: labels.map(() => Math.abs(Math.random() * 1000 - 500)),
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
}
//End Bar chart

//Area chart
const getLabels = async () => {
	const arr = []
	for (let i = 0; i < 12; i++) {
		arr.push(String(i))
	}
	return arr
}

let labels2: string[] = await getLabels()
export const dataArea = {
	labels,
	datasets: [
		{
			fill: true,
			label: 'Поиск',
			data: labels.map(() => Math.abs(Math.random() * 20 - 5)),
			borderWidth: 1,
			backgroundColor: '#6049B4',
			borderColor: '#6049B4',
			pointRadius: 0,
		},
		{
			fill: true,
			label: 'РСЯ',
			data: labels.map(() => Math.abs(Math.random() * 20 - 5)),
			borderWidth: 1,
			backgroundColor: '#7BBFDE',
			borderColor: '#7BBFDE',
			pointRadius: 0,
		},
	],
}
interface IStatisticPageMini {
	className?: string // Added className prop
	svg?: React.ReactNode
	name_company?: string
	id_company?: string
	link_company?: string
	ooo_company?: string
	see_link?: string
	id_masked?: string
	cut_link?: boolean
	tin?:string
}

const StatisticPageMini: React.FC<IStatisticPageMini> = ({
	className,
	svg,
	name_company,
	id_company,
	link_company,
	ooo_company,
	see_link,
	id_masked,
	cut_link,
	tin,
}: IStatisticPageMini) => {
	const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
	const months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]

	const user = useSelector((state: any) => state.user)
	const token = user?.token
	const [graphChange, setGraphChange] = React.useState<number>(1)
	const [info, setInfo] = useState({})
	const [step, setStep] = useState('hour')

	const [d_click, bool_click] = useState(true)
	const [d_cpc, bool_cpc] = useState(true)
	const [d_consumption, bool_consumption] = useState(true)

	useEffect(() => {
		console.log(id_masked)

		const getInfo = async () => {
			const res = await getBloggerStatistics(token, [String(id_masked)], step)
			console.log(res)
			setInfo(res)
			console.log(info)
		}
		getInfo()
		console.log(info)
	}, [step])

	// sum all total_clicks
	let click = info.statistics?.map((el) => el.total_clicks)
	let cpc: number[] = info.statistics?.map((el) => el.avg_cpc)
	let consumption: number[] = info.statistics?.map((el) => el.total_consumption)

	let clicks = info.click_sum
	let cpc_sum = info.cpc_sum
	let consumption_sum = info.consumption
	console.log(info.datalabels)

	const data = {
		labels: info.datalabels,
		datasets: [
			{
				hidden: d_click,
				label: 'Клики (цифрай)',
				data: click, //array of only value [{data: ..., value: ...}]
				borderWidth: 1,
				backgroundColor: '#4169E1',
				borderColor: '#4169E1',
				pointRadius: 0,
			},
			{
				hidden: d_cpc,
				label: 'Конверсия: Все цели (%))',
				data: cpc,
				borderWidth: 1,
				backgroundColor: '#F3A63B',
				borderColor: '#F3A63B',
				pointRadius: 0,
			},
			{
				hidden: d_consumption,
				label: 'Доходы (Рубли знак валюты)',
				data: consumption,
				borderWidth: 1,
				backgroundColor: '#6049B4',
				borderColor: '#6049B4',
				pointRadius: 0,
			},
		],
	}
	return (
		<div className={s.wrapper}>
			<Col width="1164px">
				<Row width="1164px" className={s.RowHeader}>
					<NavLabel style={{fontSize: '16px'}} text="Статистика" />
					<button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none">
							<path
								d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
								fill="#808080"
							/>
						</svg>
					</button>
				</Row>
				<CourseForBlogger
					cut_link={cut_link}
					NeedClicks={false}
					svg={svg}
					link={link_company}
					id={id_company}
					ooo={ooo_company}
					title={name_company}
					see_link={see_link}
					tin={tin}
					width_block="1164px"
					width_text="1164px"
				/>
				<Line width="1164px" />

				<HeaderSubTitle textHeader="Ключевые показатели" />
				<div className={s.extendedBlock}>
					<div className={s.extendedLink}>
						<Button
							onClick={() => setStep('hour')}
							width="84px"
							className={`${s.extendedButton} ${step === 'hour' && s.active}`}
							text="Часы"
						/>
						<Button
							onClick={() => setStep('day')}
							width="78px"
							className={`${s.extendedButton} ${step === 'day' && s.active}`}
							text="Дни"
						/>
						<Button
							onClick={() => setStep('month')}
							width="89px"
							className={`${s.extendedButton} ${step === 'month' && s.active}`}
							text="Месяцы"
						/>
						<Button
							onClick={() => setStep('years')}
							width="89px"
							className={`${s.extendedButton} ${step === 'years' && s.active}`}
							text="Годы"
						/>
					</div>
					{/* <div className={s.DatePicker}>
						<mui.Select
							multiple
							className={`${s.sortTableButtonCalendar}  text-[#808080] cursor-pointer hover:text-[#f2f2f2] transition-all`}
							renderValue={(option: mui.SelectOption<number> | null) => {
								if (option == null || option.value === null) {
									return (
										<>
											<div
												className={`${s.sortTableButtonWrapper}  text-[#808080] cursor-pointer hover:text-[#f2f2f2] transition-all`}>
												<p className={s.sortTableButtonTextGray}>Дата:</p>
								
												<p></p>
												<svg
													className=" text-[#808080] cursor-pointer hover:text-[#f2f2f2] transition-all"
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none">
													<path
														d="M3 6L8 11L13 6"
														stroke="CurrentColor"
														stroke-width="1.4"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</svg>
											</div>
										</>
									)
								}
								return (
									<>
										<div
											className={`${s.sortTableButtonWrapper} text-[#808080] cursor-pointer hover:text-[#f2f2f2] transition-all`}>
											<p className={s.sortTableButtonTextGray}>Дата:</p>
											
											<p></p>
											<svg
												className="text-[#808080] cursor-pointer hover:text-[#f2f2f2] transition-all"
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none">
												<path
													d="M3 6L8 11L13 6"
													stroke="CurrentColor"
													stroke-width="1.4"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</div>
									</>
								)
							}}>
							<mui.Option value={1} className={`cursor-pointer z-10 mt-1`}>
								<Calendar />
							</mui.Option>
						</mui.Select>
					</div> */}
				</div>
				<GraphsMenuCheckBox
					bool_click={bool_click}
					bool_cpc={bool_cpc}
					bool_consumption={bool_consumption}
					clicks={clicks}
					cpc_sum={cpc_sum}
					consumption_sum={consumption_sum}
				/>
				<div className="w-[1164px] h-[394px] mt-[16px]">
					<LineGraph data={data} />
				</div>

				<Line width="1164px" className={s.Line} />

				{/* <HeaderSubTitle textHeader="Эффективность продвижения" />
				<Row width="auto" className={s.RowButtonsGraph}>
					<div className={s.extendedLink}>
						<Button
							width="101px"
							onClick={() => setGraphChange(1)}
							className={`${s.extendedButton} ${
								graphChange === 1 ? s.activeGraphBtn : ''
							}`}
							text="Компании"
						/>
						<Button
							width="68px"
							onClick={() => setGraphChange(2)}
							className={`${s.extendedButton}  ${
								graphChange === 2 ? s.activeGraphBtn : ''
							}`}
							text="Цели"
						/>
						<Button
							width="90px"
							onClick={() => setGraphChange(3)}
							className={`${s.extendedButton}  ${
								graphChange === 3 ? s.activeGraphBtn : ''
							}`}
							text="Воронка"
						/>
					</div>
					<button className={s.sortTableButton}>
						<div className={s.sortTableButtonWrapper}>
							<p className={s.sortTableButtonTextGray}>Показатель:</p>
							<p>Конверсии</p>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="7"
								viewBox="0 0 12 7"
								fill="none">
								<path
									d="M1 1L6 6L11 1"
									stroke="#808080"
									stroke-width="1.4"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					</button>
				</Row>
				<Row width="1164px" className={s.MenuWrapper}>
					<Col className={s.MenuCol} width="220px">
						<Row className={s.MenuHeaderRow} width="auto">
							<CheckBox id="Blue" className={s.CheckBox} labelText="Клики" />
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
						<NavLabel text="1,007,265" />
					</Col>

					<Col className={s.MenuCol} width="220px">
						<Row className={s.MenuHeaderRow} width="auto">
							<CheckBox
								id="Orange"
								className={`${s.CheckBox} ${s.Orange}`}
								labelText="Конверсия: Все цели"
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
						<NavLabel text="4.16%" />
					</Col>

					<Col className={s.MenuCol} width="220px">
						<Row className={s.MenuHeaderRow} width="auto">
							<CheckBox
								id="Purple"
								className={`${s.CheckBox} ${s.Purple}`}
								labelText="Расходы"
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
						<NavLabel text="41,941.32₽" />
					</Col>

					<Col className={s.MenuCol} width="220px">
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
					</Col>

					<Col className={s.MenuCol} width="220px">
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
					</Col>
				</Row> */}
				{/* <div style={graphChange === 1 ? {display: 'block'} : {display: 'none'}}>
					<Bubble data={dataBubble} options={optionsBubble} />
				</div>
				<div style={graphChange === 2 ? {display: 'block'} : {display: 'none'}}>
					<Bar data={dataBar} options={optionsBubble} />
				</div>
				<div style={graphChange === 3 ? {display: 'block'} : {display: 'none'}}>
					<LineChart data={dataArea} options={optionsBubble} />
				</div> */}
			</Col>
		</div>
	)
}

export default StatisticPageMini

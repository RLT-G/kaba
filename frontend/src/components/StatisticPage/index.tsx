import React, {ReactNode, useEffect, useRef, useState} from 'react'
import s from './index.module.scss'
import Row from '../Row'
import Col from '../Col'
import ButtonSVG from '../ButtonSVG/index'
import WhiteLabel from '../WhiteLabel/index'
import Label from '../Label'
import HeaderSubTitle from '../HeaderSubTitle/index'
import Line from '../Line'
import Button from '../Button'
import DatePicker from 'react-multi-date-picker'
import InputIcon from 'react-multi-date-picker/components/input_icon'
import GraphsMenuCheckBox from '../GraphsMenuCheckBox/index'
import LineGraph from '../LineGraph/index'
import moment from 'moment'
import 'moment/locale/ru'
import {useSelector} from 'react-redux'

import NavLabel from '../NavLabel'
import CheckBox from '../CheckBox'
import {Bar, Bubble, Line as LineChart} from 'react-chartjs-2'
import StatisticAddCompanyPopUp from '../popup/StatisticAddCompanyPopUp/index'

import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	Tooltip,
	Legend,
	LineElement,
	CategoryScale,
} from 'chart.js'
import {getCompaniesAPI, getStatisticsAPI} from '../../api/data.api'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
)
ChartJS.defaults.borderColor = '#333333'

interface IStatisticPage {
	children?: ReactNode[] | ReactNode
	width?: string
	className?: string // Added className prop
	needDownMenu?: boolean
	textHeader: string
}

//Line chart

function randomArray(length: number) {
	const arr = []
	let prev = 0
	for (let i = 0; i < length; i++) {
		//generate random numbers but prev number should be +- 50
		const num = Math.floor(Math.random() * 100) + prev - 50
		prev = num
		arr.push(num)
	}
	return arr
}

// //generate array of dates from start date to end date like ["1 January", "2 January", "3 January",..., "1 December","2 December", ..., "31 December"]
moment().locale('ru')
function generateArrayOfDates(startDate: string, endDate: string): string[] {
	const start = moment(startDate, 'YYYY-MM-DD')
	const end = moment(endDate, 'YYYY-MM-DD')
	const dates: string[] = []

	// const user = useSelector((state: any) => state.user)
	// const token = user.token
	// const [companies, setCompanies] = useState([])

	// useEffect(() => {
	// 	const getInfo = async () => {
	// 		const res = await getCompaniesAPI(token)
	// 		console.log(res.data, 'List of companies AAA')

	// 		setCompanies(res.data)
	// 	}
	// 	getInfo()
	// }, [])

	while (start.isSameOrBefore(end)) {
		const translateDate = translateToRussian(start.format('D MMMM'))
		dates.push(translateDate)
		start.add(1, 'day')
	}

	return dates
}

function translateToRussian(date: string): string {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	const monthNamesInRussian = [
		'Января',
		'Февраля',
		'Марта',
		'Апреля',
		'Мая',
		'Июня',
		'Июля',
		'Августа',
		'Сентября',
		'Октября',
		'Ноября',
		'Декабря',
	]

	const monthIndex = monthNames.indexOf(date.split(' ')[1])
	const translatedDate = date.replace(
		monthNames[monthIndex],
		monthNamesInRussian[monthIndex],
	)

	return translatedDate
}

// // Example usage
const startDate = '2022-01-01'
const endDate = '2022-12-31'
const arrayOfDates = generateArrayOfDates(startDate, endDate)
console.log(arrayOfDates)

// function to create data from "2023-02-03 17:29:39" to "2023-02-03"

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
const labels = [
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
//End Area chart

const StatisticPage: React.FC<IStatisticPage> = ({
	className,
}: IStatisticPage) => {
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

	const [graphChange, setGraphChange] = React.useState<number>(1)
	const [addCompany, setAddCompany] = React.useState(false)

	const addCompanyPopUp = useRef()
	const addCompanyPopUpButton = useRef()

	const user = useSelector((state: any) => state.user)
	const token = user?.token
	const [companies, setCompanies] = useState([])
	const [currentCompanies, setCurrentCompanies] = useState([])
	const [info, setInfo] = useState({})
	const [step, setStep] = useState('hour')

	const [d_click, bool_click] = useState(true)
	const [d_cpc, bool_cpc] = useState(true)
	const [d_consumption, bool_consumption] = useState(true)

	useEffect(() => {
		const getInfo = async () => {
			const res = await getCompaniesAPI(token)
			console.log(res.data)

			setCompanies(res.data)
		}
		getInfo()
	}, [])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				addCompanyPopUp.current &&
				!addCompanyPopUp.current.contains(event.target) &&
				!addCompanyPopUpButton.current.contains(event.target)
			) {
				setAddCompany(false)
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [addCompany])

	useEffect(() => {
		//get current companies id's (string)
		const ids: string[] = []

		currentCompanies.forEach((el) => {
			ids.push(String(el.id))
		})

		console.log(ids)

		const getInfo = async () => {
			const res = await getStatisticsAPI(token, ids, step)
			console.log(res)
			setInfo(res)
			console.log(info)
		}
		getInfo()
		console.log(info)
	}, [currentCompanies, step])

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
				label: 'Расходы (Рубли знак валюты)',
				data: consumption,
				borderWidth: 1,
				backgroundColor: '#6049B4',
				borderColor: '#6049B4',
				pointRadius: 0,
			},
		],
	}

	return (
		<div className={s.wrapper + ' ' + className}>
			<Col width="100%" className={s.ColStatistic}>
				<HeaderSubTitle textHeader="Компании" />
				<div className={s.AddCompanyWrapper}>
					<div ref={addCompanyPopUpButton}>
						<ButtonSVG
							onClick={() => setAddCompany(!addCompany)}
							width="220px"
							className={s.AddCompanyBtn}
							text="Добавить компанию">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none">
								<path
									d="M12 6V18"
									stroke="white"
									strokeWidth="1.4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6 12H18"
									stroke="white"
									strokeWidth="1.4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</ButtonSVG>
					</div>
					{addCompany && (
						<div ref={addCompanyPopUp} className={s.StatisticAddCompanyPopUp}>
							<StatisticAddCompanyPopUp
								companies={companies}
								setCurrentCompanies={setCurrentCompanies}
								currentCompanies={currentCompanies}
							/>
						</div>
					)}
					{currentCompanies.map((company: any, index: number) => {
						return (
							<Col width="220px" className={s.AddCompanySpan}>
								<Row className={s.AddCompanySpanTitle} width="200px">
									<p className={s.AddCompanySpanP}>{company.name}</p>
									<svg
										onClick={() => {
											setCurrentCompanies(
												currentCompanies.filter(
													(c: any) => c.id !== company.id,
												),
											)
										}}
										className={s.AddCompanyDel}
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none">
										<rect width="24" height="24" rx="7" fill="#262626" />
										<path
											d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
											fill="CurrentColor"
										/>
									</svg>
								</Row>
								<p className={s.AddCompanyLabel}>ID{company.id}</p>
							</Col>
						)
					})}
				</div>

				<Line width="100%" className={s.Line} />

				{/* Graphs */}
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
						<DatePicker
							range
							weekDays={weekDays}
							months={months}
							numberOfMonths={2}
							fixMainPosition={true}
							arrow={false}
							highlightToday={false}
							// animations={[
							//     opacity({ from: 0.1, to: 1, duration: 400 })

							// ]}
							render={<InputIcon />}
						/>
					</div> */}
				</div>
				<GraphsMenuCheckBox
					bool_click={bool_click}
					bool_cpc={bool_cpc}
					bool_consumption={bool_consumption}
					clicks={clicks}
					cpc_sum={cpc_sum}
					consumption_sum={consumption_sum}
					topPopUp="550px"
				/>
				<div
					style={{
						width: '100%',
						overflowX: 'scroll',
						height: '420px',
						marginTop: '16px',
						marginBottom: '50px',
					}}>
					<LineGraph data={data} />
				</div>

				{/* <Line width="1164px" className={s.Line} /> */}

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
					<Col className={s.MenuCol} width="179px">
						<Row className={s.MenuHeaderRow} width="auto">
							<Label text="Показы" />
						</Row>
						<NavLabel text="1,007,265" />
					</Col>

					<Col className={s.MenuCol} width="179px">
						<Row className={s.MenuHeaderRow} width="auto">
							<Label text="CTR" />
						</Row>
						<NavLabel text="4.16%" />
					</Col>

					<Col className={s.MenuCol} width="179px">
						<Row className={s.MenuHeaderRow} width="auto">
							<Label text="Клики" />
						</Row>
						<NavLabel text="345,503" />
					</Col>

					<Col className={s.MenuCol} width="179px">
						<Row className={s.MenuHeaderRow} width="auto">
							<Label text="Конверсии, %(CR)" />
						</Row>
						<NavLabel text="27,89%" />
					</Col>

					<Col className={s.MenuCol} width="179px">
						<Row className={s.MenuHeaderRow} width="auto">
							<Label text="Конверсии" />
						</Row>
						<NavLabel text="11,381" />
					</Col>

					<Col className={s.MenuCol} width="179px">
						<Row className={s.MenuHeaderRow} width="auto">
							<Label text="Цена цели" />
						</Row>
						<NavLabel text="19.07₽" />
					</Col>
				</Row>

				<div style={graphChange === 1 ? {display: 'block'} : {display: 'none'}}>
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

export default StatisticPage

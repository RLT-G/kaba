import React, {ReactNode, useEffect, useRef, useState} from 'react'
import s from './index.module.scss'
import * as pr from 'react-multi-date-picker'
import './index.css'
import Col from '../Col'
import Row from '../Row'
import Label from '../Label'
import BlueButton from '../BlueButton/index'
import BlueLabel from '../BlueLabel/index'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import {min} from 'moment'

interface ICalendar {
	setDateOutside: (start: string, end: string) => void
}

const Calendar: React.FC<ICalendar> = ({setDateOutside}: ICalendar) => {
	const [date, setDate] = useState()
	const inputStart = useRef()
	const inputEnd = useRef()

	const [sDate, setSDate] = useState('')
	const [eDate, setEDate] = useState('')

	useEffect(() => {
		if (Array.isArray(date)) {
			console.log(
				new Date(date[0]).toLocaleDateString(),
				'date0',
				new Date(date[1]).toLocaleDateString(),
				'date1',
			)
			setSDate(new Date(date[0]).toLocaleDateString())
			setEDate(new Date(date[1]).toLocaleDateString())

			inputStart.current.value = sDate || ''
			inputEnd.current.value = eDate || ''
		}
	}, [date, sDate, eDate])

	var dateInputMask = function dateInputMask(elm) {
		elm.addEventListener('keypress', function (e) {
			if (e.keyCode < 47 || e.keyCode > 57) {
				e.preventDefault()
			}

			var len = elm.value.length

			// If we're at a particular place, let the user type the slash
			// i.e., 12/12/1212
			if (len !== 1 || len !== 3) {
				if (e.keyCode == 47) {
					e.preventDefault()
				}
			}

			// If they don't add the slash, do it for them...
			if (len === 2) {
				elm.value += '.'
			}

			// If they don't add the slash, do it for them...
			if (len === 5) {
				elm.value += '.'
			}
		})
	}

	const monthNames = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]

	const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
	//2 yours for now (get date) (generayte array of strings like 2023, 2024, ...). Only years
	const yearsGen = () => {
		const currentYear = new Date().getFullYear()
		const years = []
		for (let i = 0; i < 3; i++) {
			years.push(currentYear + i)
		}
		return years
	}

	const years = yearsGen()
	const [value, setValue] = useState(years)

	return (
		<div className={s.wrapper}>
			<Col width="504px" className={s.header}>
				{/*Here header for choose range of dates*/}
				<RangeSlider
					id="range-slider-ab"
					className="margin-lg mx-4 mt-3 w-full"
					step={null}
					rangeSlideDisabled={true}
				/>
				{value?.toDate?.().toString()}
				<div className="text-[#f2f2f2] w-[440px] top-[130px] ">
					<div className="mx-8 w-full relative bottom-[20px] flex justify-between ">
						{years.map((year, index) => (
							<span className="text-[10px]" key={year}>
								{year}
							</span> // Calculate the left offset based on the indexss
						))}
					</div>
				</div>
			</Col>
			<pr.Calendar
				value={date}
				onChange={(dateObject) => {
					setDate(dateObject)
				}}
				numberOfMonths={2}
				disableMonthPicker={true}
				disableYearPicker={true}
				months={monthNames}
				weekDays={weekDays}
				range
				className={s.Calendar}
				minDate={Date.now()}
				monthYearSeparator=" "
				mapDays={({date, today, selectedDate, currentMonth, isSameDate}) => {
					let props = {}

					props.style = {
						borderRadius: '18px',
						backgroundColor: isSameDate(date, selectedDate) ? '#4169E1' : '',
						// color: 'white',4169E1
					}

					if (isSameDate(date, today))
						props.style = {
							...props.style,
							color: '#4169E1',
						}

					if (isSameDate(date, selectedDate))
						props.style = {
							...props.style,
							color: 'white',
							backgroundColor: '#4169E1',
						}

					return props
				}}
				renderButton={(direction, handleClick) => (
					<button onClick={handleClick}>
						{direction === 'right' ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="mr-3"
								fill="none">
								<path
									d="M10.5 17L15.5 12L10.5 7"
									stroke="#808080"
									stroke-width="1.4"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="8"
								height="12"
								viewBox="0 0 8 12"
								className="ml-3"
								fill="none">
								<path
									d="M6.5 11L1.5 6L6.5 1"
									stroke="#808080"
									stroke-width="1.4"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						)}
					</button>
				)}
			/>
			<Col width="504px" className={s.footer}>
				<Row width="504px">
					<div
						className="border-[1px]
					 	rounded-[10px]
					  	w-[260px]
					  	max-w-[260px]
						h-[36px]
						outline-none
						outline-offset-0
						border-[#333]
						flex
						items-center
						justify-between
						px-4
						text-[#f2f2f2]
						text-sm
						mx-2">
						<Label text="Начало:" />
						<input
							maxLength={10}
							onChange={(e) => {
								dateInputMask(inputStart.current)
							}}
							disabled
							ref={inputStart}
							className="w-[100px]
						border-none
						outline-none
						bg-transparent"
							type="text"
						/>
					</div>
					<div
						className="border-[1px]
					 rounded-[10px]
					  w-[260px]
					  max-w-[260px]
					   h-[36px]
					   outline-none
					   outline-offset-0
					   border-[#333]
					   flex
					   items-center
					   justify-between
					   px-4
					   text-[#f2f2f2]
						text-sm

					   mx-2">
						<Label text="Окончание:" />
						<input
							maxLength={10}
							onChange={(e) => {
								dateInputMask(inputEnd.current)
							}}
							ref={inputEnd}
							disabled
							className="w-[100px]
						border-none
						outline-none
						bg-transparent"
							type="text"
						/>
					</div>
				</Row>
				<Row
					className="mt-6 mb-4 ml-8 justify-between items-center"
					width="456px">
					<Label className="cursor-pointer" text="Отмена" />
					<div className="flex items-center flex-row">
						<BlueLabel
							className="mr-6 cursor-pointer"
							text="Сбросить"
							onClick={() => {
								setDate([undefined, undefined])
							}}
						/>
						<BlueButton
							width="120px"
							text="Применить"
							onClick={() => {
								if (sDate !== 'Invalid date' && eDate !== 'Invalid date')
									setDateOutside(sDate, eDate)
								console.log('date append')
							}}
						/>
					</div>
				</Row>
			</Col>
		</div>
	)
}

export default Calendar

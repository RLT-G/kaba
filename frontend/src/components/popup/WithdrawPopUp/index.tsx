import React, {useEffect} from 'react'
import s from './index.module.scss'
import Col from '../../Col'
import Row from '../../Row'
import WhiteLabel from '../../WhiteLabel'
import Label from '../../Label'

import CheckBox from '../../CheckBox'

import NavLabel from '../../NavLabel/index'
import Line from '../../Line'
import ButtonSVG from '../../ButtonSVG'
import {deposit, depositApply, payoutToBlogger} from '../../../api/payment.api'
import {useSelector} from 'react-redux'
import * as mui from '@mui/base'
import {Link} from 'react-router-dom'
interface IWithdrawPopUp {
	// className?: string // Added className prop
	// style?: React.CSSProperties
	sum_in_rub?: string
	onExit?: () => void
}
const WithdrawPopUp: React.FC<IWithdrawPopUp> = ({
	// style,
	// className,
	sum_in_rub,
	onExit,
}: IWithdrawPopUp) => {
	// const colClassName = `col ${className}`; // Combine className with "col" class using s[className]
	const user = useSelector((state: any) => state.user)
	const token = user?.token

	const [disabledBtn, setDisabledBtn] = React.useState(true)
	const [value, setValue] = React.useState('0')
	const [numCard, setNumCard] = React.useState<string>('')

	let root = document.getElementsByTagName('body')[0]

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value.replace(/[^0-9]/g, '') // remove non-digit characters
		setValue(hormalizeValue(newValue))
	}

	const hormalizeValue = (value: string) => {
		value = value.replace(/[^0-9]/g, '') // remove non-digit characters
		//remove leading zeros
		value = value.replace(/^0+/, '')
		return value
	}

	const handleWithDraw = async () => {
		let res = await payoutToBlogger(token, Number(value), numCard)

		console.log(res)

		root.classList.remove('stop-scrolling')
		onExit()
	}

	// const data = [
	// 	'Тинькофф',
	// 	'Альфа-Банк',
	// 	'Сбербанк',
	// 	'ВТБ',
	// 	'Райффайзенбанк',
	// 	'МТС Банк',
	// ]

	return (
		<div className={s.wrapper}>
			<Col width="248px" className={s.DepositeCol}>
				<Row width="248px" className={s.DepositeHeader}>
					<NavLabel className={s.NavLabel} text="Вывод" />
					<button
						onClick={() => {
							root.classList.remove('stop-scrolling')
							onExit()
						}}>
						<svg
							className="text-[#808080] hover:text-[#f2f2f2] transition-all"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none">
							<path
								d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
								fill="CurrentColor"
							/>
						</svg>
					</button>
				</Row>
				<Line width="280px" className={s.Line} />
				<WhiteLabel text="Сумма вывода" className={s.whiteLabel} />
				<input
					placeholder="Сумма, ₽"
					className={`${s.input} mb-[16px]`}
					value={`${value ? `${value}` : '0'}`}
					onChange={handleChange}
				/>

				<WhiteLabel text="Введите номер карты" className={s.whiteLabel} />
				<input
					placeholder="Номер карты"
					className={`${s.input} mb-[16px]`}
					value={numCard}
					onChange={(e) => {
						const newValue = e.target.value.replace(/[^0-9]/g, '')
						setNumCard(hormalizeValue(newValue))
					}}
					maxLength={16}
				/>

				{/* <WhiteLabel text="Банк или кошелёк" className={s.whiteLabel} />
				<mui.Select
					className={s.muiSelectDetails}
					defaultValue={1}
					renderValue={(option: mui.SelectOption<number> | null) => {
						if (option == null || option.value === null) {
							return
							;<>
								<div className="w-full flex items-center justify-between px-[16px]">
									<p
										className={`text-[#808080] text-[14px] font-normal w-[72px] mr-[52px]`}>
										Куда
									</p>
									<p className="text-[14px] text-[#f2f2f2] font-normal whitespace-nowrap mr-[8px]"></p>
									<div className="w-[16px] h-[16px]">
										<svg
											className=""
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M3 6L8 11L13 6"
												stroke="#808080"
												stroke-width="1.4"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</div>
								</div>
							</>
						}
						// return `${option.label}`
						return (
							<>
								<div className="w-full flex items-center justify-between px-[16px]">
									<p
										className={`text-[#808080] text-[14px] font-normal w-[72px] mr-[52px]`}>
										Куда
									</p>
									<p className="text-[14px] text-[#f2f2f2] font-normal whitespace-nowrap mr-[8px]">
										{option.label}
									</p>
									<div className="w-[16px] h-[16px]">
										<svg
											className=""
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M3 6L8 11L13 6"
												stroke="#808080"
												stroke-width="1.4"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</div>
								</div>
							</>
						)
					}}>
					<div className="w-[248px] bg-[#262626] border-[1px] border-[#333] rounded-[10px] mt-1 px-[16px] py-[8px]">
						{data?.map((item, index) => (
							<>
								<mui.Option
									value={index}
									key={index}
									className={`cursor-pointer text-[#f2f2f2]`}>
									{item}
								</mui.Option>
								{data.length > 1 && index !== data.length - 1 && (
									<>
										<Line width="248px" className={s.LineSelect} />
									</>
								)}
							</>
						))}
					</div>
				</mui.Select> */}

				<Line width="280px" className={s.Line} />
				<div
					onClick={() => {
						let checkbox = document.getElementById('checkbox_reg_1')
						checkbox.checked ? setDisabledBtn(false) : setDisabledBtn(true)
					}}
					className={s.checkbox_container_reg}>
					<CheckBox id="checkbox_reg_1" />
					<label htmlFor="checkbox_reg_1">
						Создавая учетную запись, я соглашаюсь с{' '}
						<Link to="/UserSuccess" className={s.blueLink}>
							Пользовательским соглашением
						</Link>{' '}
						и{' '}
						<Link to="/PrivacyPolicy" className={s.blueLink}>
							Политикой конфиденциальности
						</Link>
						.
					</label>
				</div>
				<div className={s.ButtonWrapper}>
					<div></div>
					<ButtonSVG
						disabled={disabledBtn}
						onClick={handleWithDraw}
						width="120px"
						text="Вывести"
						className={s.ButtonDep}
					/>
				</div>
			</Col>
		</div>
	)
}

export default WithdrawPopUp

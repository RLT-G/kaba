import React, {useState} from 'react'
import s from './index.module.scss'
import Col from '../Col'
import Row from '../Row'

import BlueButton from '../BlueButton/index'
import NavLabel from '../NavLabel/index'
import Label from '../Label/index'
import ToolTip from '../ToolTip/index'
import Input from '../Input'
import Select from '../Select'
import {useSelector} from 'react-redux'
import {generalSettings} from '../../api/data.api'
import * as mui from '@mui/base'
interface IGeneralSettings {
	className?: string // Added className prop
	text_id_table?: string
	text_course_table?: string
}

const handleChangeOrganization = (e: React.ChangeEvent<HTMLInputElement>) => {
	//log length of string
	console.log(e.target.value.length)
}

const data = ['Рубль, ₽', 'Евро, €', 'Доллар США, $', 'Йена, ¥', 'Tенге, ₸']

const dataOrganization = [
	'(ООО) Общество с ограниченной ответственностью',
	'(АО) Акционерное общество',
	'(СЗ) Самозанятый',
	'(ИП) Индивидуальный предприниматель',
	'(НКО) Некоммерческая организация',
]

// const dataOrganization = [{
// 	'СЗ': 'Самозанятый',
// 	'АО': 'Акционерное общество',
// 	'ООО': 'Общество с ограниченной ответственностью',
// 	'ИП': 'Индивидуальный предприниматель',
	
// }]

const GeneralSettings: React.FC<IGeneralSettings> = ({
	className,
}: IGeneralSettings) => {
	const user = useSelector((state: any) => state.user)
	const token = user?.token

	const [formOrg, setFormOrg] = useState<string>('')
	const [tin, setTin] = useState<string>('')

	async function sendData() {
		let response = await generalSettings(token, tin, formOrg)
		console.log(response)
	}
	return (
		<div className={s.wrapper + ' ' + className}>
			<Col width="528px" className={s.GeneralSettings}>
				<NavLabel text="Юридические данные" className={s.navLabel} />
				{/* <Row className={s.tooltiprow} width="144px">
					<Label text="Страна и валюта" />
					<ToolTip className={s.tooltip} text="info" top="20px">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M10.3147 13.5294C9.59118 13.8431 8.81961 14 8 14C7.18039 14 6.40882 13.8431 5.68529 13.5294C4.96176 13.2157 4.32353 12.7824 3.77059 12.2294C3.21765 11.6765 2.78431 11.0382 2.47059 10.3147C2.15686 9.59118 2 8.81961 2 8C2 7.18039 2.15686 6.40882 2.47059 5.68529C2.78431 4.96176 3.21667 4.32353 3.76765 3.77059C4.31863 3.21765 4.95588 2.78431 5.67941 2.47059C6.40294 2.15686 7.17451 2 7.99412 2C8.81373 2 9.58627 2.15686 10.3118 2.47059C11.0373 2.78431 11.6765 3.21765 12.2294 3.77059C12.7824 4.32353 13.2157 4.96176 13.5294 5.68529C13.8431 6.40882 14 7.18039 14 8C14 8.81961 13.8431 9.59118 13.5294 10.3147C13.2157 11.0382 12.7824 11.6765 12.2294 12.2294C11.6765 12.7824 11.0382 13.2157 10.3147 13.5294ZM6.05294 12.6118C6.65686 12.8706 7.30588 13 8 13C8.69412 13 9.34412 12.8706 9.95 12.6118C10.5559 12.3529 11.0873 11.9951 11.5441 11.5382C12.001 11.0814 12.3578 10.551 12.6147 9.94706C12.8716 9.34314 13 8.69412 13 8C13 7.30588 12.8706 6.65686 12.6118 6.05294C12.3529 5.44902 11.9941 4.91765 11.5353 4.45882C11.0765 4 10.5451 3.64216 9.94118 3.38529C9.33726 3.12843 8.68824 3 7.99412 3C7.3 3 6.65098 3.12843 6.04706 3.38529C5.44314 3.64216 4.91373 4 4.45882 4.45882C4.00392 4.91765 3.64804 5.44902 3.39118 6.05294C3.13431 6.65686 3.00588 7.30588 3.00588 8C3.00588 8.69412 3.13431 9.34314 3.39118 9.94706C3.64804 10.551 4.0049 11.0814 4.46176 11.5382C4.91863 11.9951 5.44902 12.3529 6.05294 12.6118ZM7.88235 9.21765C8.02745 9.21765 8.14216 9.17647 8.22647 9.09412C8.31078 9.01176 8.35294 8.91373 8.35294 8.8V8.76176V8.72941C8.35294 8.56471 8.40196 8.42255 8.5 8.30294C8.59804 8.18333 8.75098 8.0549 8.95882 7.91765C9.24118 7.72941 9.47451 7.53333 9.65882 7.32941C9.84314 7.12549 9.93529 6.84706 9.93529 6.49412C9.93529 6.16863 9.84804 5.89412 9.67353 5.67059C9.49902 5.44706 9.27059 5.27745 8.98824 5.16176C8.70588 5.04608 8.39804 4.98824 8.06471 4.98824C7.55882 4.98824 7.14608 5.09118 6.82647 5.29706C6.50686 5.50294 6.30588 5.74118 6.22353 6.01176C6.20784 6.05882 6.19608 6.10588 6.18824 6.15294C6.18039 6.2 6.17647 6.24902 6.17647 6.3C6.17647 6.43333 6.21961 6.53431 6.30588 6.60294C6.39216 6.67157 6.48431 6.70588 6.58235 6.70588C6.68039 6.70588 6.76373 6.68431 6.83235 6.64118C6.90098 6.59804 6.96078 6.54118 7.01177 6.47059L7.11765 6.32941C7.18824 6.21569 7.26863 6.11863 7.35882 6.03824C7.44902 5.95784 7.55 5.89608 7.66177 5.85294C7.77353 5.8098 7.89412 5.78824 8.02353 5.78824C8.29412 5.78824 8.5098 5.85784 8.67059 5.99706C8.83137 6.13627 8.91177 6.31765 8.91177 6.54118C8.91177 6.74118 8.84902 6.9049 8.72353 7.03235C8.59804 7.1598 8.40588 7.31373 8.14706 7.49412C7.93529 7.63922 7.7598 7.8 7.62059 7.97647C7.48137 8.15294 7.41177 8.38627 7.41177 8.67647V8.71471V8.75294C7.41177 9.06275 7.56863 9.21765 7.88235 9.21765ZM8.31176 10.7941C8.18627 10.9118 8.03726 10.9706 7.86471 10.9706C7.69608 10.9706 7.54902 10.9108 7.42353 10.7912C7.29804 10.6716 7.23529 10.5275 7.23529 10.3588C7.23529 10.1902 7.29706 10.0461 7.42059 9.92647C7.54412 9.80686 7.69216 9.74706 7.86471 9.74706C8.03726 9.74706 8.18627 9.80588 8.31176 9.92353C8.43726 10.0412 8.5 10.1863 8.5 10.3588C8.5 10.5314 8.43726 10.6765 8.31176 10.7941Z"
								fill="#808080"
							/>
						</svg>
					</ToolTip>
				</Row> */}
				{/* <Input
					width="528px"
					minWidth="528px"
					conteinerWidth="528px"
					className={s.Input}
					placeholder="Введите страну"
				/>
				<Select
					width="528px"
					maxSelectWidth="528px"
					className={s.SelectMoney}
					placeholder="Выберите валюту"
					data={data}
				/> */}

				<Row className={s.tooltiprow} width="auto">
					<Label text="Данные рекломодателя" />
					<ToolTip className={s.tooltip} text="info" top="20px">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M10.3147 13.5294C9.59118 13.8431 8.81961 14 8 14C7.18039 14 6.40882 13.8431 5.68529 13.5294C4.96176 13.2157 4.32353 12.7824 3.77059 12.2294C3.21765 11.6765 2.78431 11.0382 2.47059 10.3147C2.15686 9.59118 2 8.81961 2 8C2 7.18039 2.15686 6.40882 2.47059 5.68529C2.78431 4.96176 3.21667 4.32353 3.76765 3.77059C4.31863 3.21765 4.95588 2.78431 5.67941 2.47059C6.40294 2.15686 7.17451 2 7.99412 2C8.81373 2 9.58627 2.15686 10.3118 2.47059C11.0373 2.78431 11.6765 3.21765 12.2294 3.77059C12.7824 4.32353 13.2157 4.96176 13.5294 5.68529C13.8431 6.40882 14 7.18039 14 8C14 8.81961 13.8431 9.59118 13.5294 10.3147C13.2157 11.0382 12.7824 11.6765 12.2294 12.2294C11.6765 12.7824 11.0382 13.2157 10.3147 13.5294ZM6.05294 12.6118C6.65686 12.8706 7.30588 13 8 13C8.69412 13 9.34412 12.8706 9.95 12.6118C10.5559 12.3529 11.0873 11.9951 11.5441 11.5382C12.001 11.0814 12.3578 10.551 12.6147 9.94706C12.8716 9.34314 13 8.69412 13 8C13 7.30588 12.8706 6.65686 12.6118 6.05294C12.3529 5.44902 11.9941 4.91765 11.5353 4.45882C11.0765 4 10.5451 3.64216 9.94118 3.38529C9.33726 3.12843 8.68824 3 7.99412 3C7.3 3 6.65098 3.12843 6.04706 3.38529C5.44314 3.64216 4.91373 4 4.45882 4.45882C4.00392 4.91765 3.64804 5.44902 3.39118 6.05294C3.13431 6.65686 3.00588 7.30588 3.00588 8C3.00588 8.69412 3.13431 9.34314 3.39118 9.94706C3.64804 10.551 4.0049 11.0814 4.46176 11.5382C4.91863 11.9951 5.44902 12.3529 6.05294 12.6118ZM7.88235 9.21765C8.02745 9.21765 8.14216 9.17647 8.22647 9.09412C8.31078 9.01176 8.35294 8.91373 8.35294 8.8V8.76176V8.72941C8.35294 8.56471 8.40196 8.42255 8.5 8.30294C8.59804 8.18333 8.75098 8.0549 8.95882 7.91765C9.24118 7.72941 9.47451 7.53333 9.65882 7.32941C9.84314 7.12549 9.93529 6.84706 9.93529 6.49412C9.93529 6.16863 9.84804 5.89412 9.67353 5.67059C9.49902 5.44706 9.27059 5.27745 8.98824 5.16176C8.70588 5.04608 8.39804 4.98824 8.06471 4.98824C7.55882 4.98824 7.14608 5.09118 6.82647 5.29706C6.50686 5.50294 6.30588 5.74118 6.22353 6.01176C6.20784 6.05882 6.19608 6.10588 6.18824 6.15294C6.18039 6.2 6.17647 6.24902 6.17647 6.3C6.17647 6.43333 6.21961 6.53431 6.30588 6.60294C6.39216 6.67157 6.48431 6.70588 6.58235 6.70588C6.68039 6.70588 6.76373 6.68431 6.83235 6.64118C6.90098 6.59804 6.96078 6.54118 7.01177 6.47059L7.11765 6.32941C7.18824 6.21569 7.26863 6.11863 7.35882 6.03824C7.44902 5.95784 7.55 5.89608 7.66177 5.85294C7.77353 5.8098 7.89412 5.78824 8.02353 5.78824C8.29412 5.78824 8.5098 5.85784 8.67059 5.99706C8.83137 6.13627 8.91177 6.31765 8.91177 6.54118C8.91177 6.74118 8.84902 6.9049 8.72353 7.03235C8.59804 7.1598 8.40588 7.31373 8.14706 7.49412C7.93529 7.63922 7.7598 7.8 7.62059 7.97647C7.48137 8.15294 7.41177 8.38627 7.41177 8.67647V8.71471V8.75294C7.41177 9.06275 7.56863 9.21765 7.88235 9.21765ZM8.31176 10.7941C8.18627 10.9118 8.03726 10.9706 7.86471 10.9706C7.69608 10.9706 7.54902 10.9108 7.42353 10.7912C7.29804 10.6716 7.23529 10.5275 7.23529 10.3588C7.23529 10.1902 7.29706 10.0461 7.42059 9.92647C7.54412 9.80686 7.69216 9.74706 7.86471 9.74706C8.03726 9.74706 8.18627 9.80588 8.31176 9.92353C8.43726 10.0412 8.5 10.1863 8.5 10.3588C8.5 10.5314 8.43726 10.6765 8.31176 10.7941Z"
								fill="#808080"
							/>
						</svg>
					</ToolTip>
				</Row>
				{/* <Select
					maxSelectWidth="528px"
					width="100%"
					placeholder="Выберите организационную форму"
					data={dataOrganization}
					className={s.SelectMarketing}
					defaultValue={'Организационная форма'}
				/> */}

				<mui.Select
					className={`${s.inputText} ${s.addIcon}`}
					// style={style}

					renderValue={(option: mui.SelectOption<number> | null) => {
						if (option == null || option.value === null) {
							return 'Выберите организационную форму'
						}
						return `${option.label}`
					}}>
					<Col width="528px" className={s.showList}>
						{dataOrganization?.map((item, index) => (
							<mui.Option
								onClick={() => {
									setFormOrg(item)
								}}
								className={s.itemText}
								key={index}
								value={index}>
								{item}
							</mui.Option>
						))}
					</Col>
				</mui.Select>
				<Input
					className={s.InputForm}
					maximumLength={12}
					// onChange={handleChangeOrganization}
					onChange={(e) => {
						setTin(e.target.value)
						console.log(e.target.value)
					}}
					width="528px"
					minWidth="528px"
					conteinerWidth="528px"
					placeholder="ИНН"
					isDigits={true}
					value={tin}
				/>
				<Row width="auto" className={s.blueLinkRow}>
					<Label
						className="mr-2"
						text="Узнать свой ИНН можно на сайте "
						isMini={true}
					/>
					<a href="https://nalog.gov.ru" className={s.blueLink}>
						nalog.gov.ru
					</a>
				</Row>
				<BlueButton width="120px" text="Сохранить" onClick={sendData} />
			</Col>
		</div>
	)
}

export default GeneralSettings
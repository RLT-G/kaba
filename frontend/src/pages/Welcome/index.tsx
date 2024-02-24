import React from 'react'
import s from './index.module.scss'
import Col from '../../components/Col'
import Row from '../../components/Row'

//svg
import NavLabel from '../../components/NavLabel/index'
import Label from '../../components/Label/index'
import CheckBox from '../../components/CheckBox'
import Input from '../../components/Input/index'
import BlueButton from '../../components/BlueButton'
import Select from '../../components/Select'

const data = ['Рубль, ₽', 'Евро, €', 'Доллар США, $', 'Йена, ¥', 'Tенге, ₸']

const dataOrganization = ['Организационная форма']

const handleChangeOrganization = (e: React.ChangeEvent<HTMLInputElement>) => {
	//log length of string
	console.log(e.target.value.length)
}

const Welcome: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<Col width="360px">
				<NavLabel text="Добро пожаловать в каба рекламу!" />
				<div className={s.inputContainerWelcome}>
					<Label text="Страна и валюта" />
					<Input
						className={s.countryInputWelcome}
						placeholder="Введите название"
					/>
					<Select
						maxSelectWidth="164"
						placeholder="Выберите валюту"
						data={data}
					/>
				</div>
				<div className={s.inputContainerWelcome}>
					<Label text="Данные рекламодателя" />
					<Select
						maxSelectWidth="164"
						placeholder="Выберите организационную форму"
						data={dataOrganization}
						className={s.orgInput}
					/>
					<Input
						maximumLength={12}
						width="360px"
						onChange={handleChangeOrganization}
						className={s.countryInputWelcome}
						placeholder="ИНН"
					/>
					<Row>
						<Label
							className="mr-2"
							text="Узнать свой ИНН можно на сайте "
							isMini={true}
						/>
						<a href="#" className={s.blueLink}>
							nalog.gov.ru
						</a>
					</Row>
				</div>
				<Col className={s.inputContainerWelcome}>
					<div className={s.checkbox_container_reg}>
						<CheckBox id="checkbox_reg_1" />
						<label htmlFor="checkbox_reg_1">
							Создавая учетную запись, я соглашаюсь с{' '}
							<a className={s.blueLink}>Условиями использования</a> и{' '}
							<a className={s.blueLink}>Политой конфиденциальности</a>.
						</label>
					</div>
					<div className={s.checkbox_container_reg}>
						<CheckBox id="checkbox_reg_2" />
						<label htmlFor="checkbox_reg_2">
							Я принимаю условия договора <a className={s.blueLink}>договора</a>
						</label>
					</div>
				</Col>
				<div>
					<BlueButton text="Начать пользоваться" />
				</div>
			</Col>
		</div>
	)
}

export default Welcome

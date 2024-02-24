import React from 'react'
import s from './index.module.scss'
import Col from '../../components/Col'
import Row from '../../components/Row'
import BlueLabel from '../../components/BlueLabel/index'

//svg
import arrowLeft from '../../assets/arrow-left.svg'
import NavLabel from '../../components/NavLabel/index'
import Label from '../../components/Label/index'
import AccountLine from '../../components/AccountLine/index'
import Line from '../../components/Line/index'

const ChooseAccount: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<Col width="360px">
				<Row className={s.toBack}>
					<img className={s.arrow} src={arrowLeft} alt="arrowLeft" />
					<BlueLabel text="Ввод логина или телефона" />
				</Row>
				<NavLabel text="Выбор аккаунта для входа" />
				<Label className={s.subTitle} text="Через номер +79 (***) *** 01-11" />
				<Col className={s.chooseAccount}>
					<AccountLine name="Александр Иванов" nick="@itsaloginexample1" />
					<Line width="380px" className={s.lineAccount} />
					<AccountLine name="Екатерина Смирнова" nick="@loginpractice" />
					<Line width="380px" className={s.lineAccount} />
					<AccountLine name="Михаил Козлов" nick="@userlogin123" />
					<Line width="380px" className={s.lineAccount} />
					<AccountLine name="Ольга Петрова" nick="@loginhere456" />
					<Line width="380px" className={s.lineAccount} />
					<AccountLine name="Наталья Морозова" nick="@samplelogin789" />
					<Line width="380px" className={s.lineAccount} />
					<AccountLine name="Дмитрий Соколов" nick="@myuserlogin" />
				</Col>
			</Col>
		</div>
	)
}

export default ChooseAccount

import React from 'react'
import s from './index.module.scss'
import LeftCompanyMenu from '../../components/LeftCompanyMenu/index'
import HeaderCompany from '../../components/HeaderCompany/index'
import Table from '../../components/Table/index'
import TableLineFooter from '../../components/TableLineFooter'
import StatisticPage from '../../components/StatisticPage/index'
import Col from '../../components/Col'
import NavLabel from '../../components/NavLabel'
import BlueButton from '../../components/BlueButton'
import Label from '../../components/Label'
import PopUpWrapper from '../../components/PopUpWrapper/index'
import FiltersBanners from '../../components/FiltersBanners'
import Deposite from '../../components/popup/DepositePopUp'
import ProfilePopUp from '../../components/popup/ProfilePopUp/index'
import StatisticAddCompanyPopUp from '../../components/popup/StatisticAddCompanyPopUp/index'
import StatisticDropDownMenuGraphPopUp from '../../components/popup/StatisticDropDownMenuGraphPopUp/index'
import TableCol from '../../components/popup/TableColsPopUp/index'

const Statistic: React.FC = () => {
	return (
		<>
			<div className={s.wrapper}>
				
				<div className={s.rightMenu}>
					{/* Statistic */}
					<HeaderCompany positionPopUp='top-[30px]' textHeader="Статистика" />
					<StatisticPage textHeader="Статистика" />
					{/* <Col width='360px' className={s.noCompany}>
					<NavLabel className={s.noCompanyTitle} text='Нет кампаний'/>
					<Label className={s.noCompanyLabel} width='360px' isMini={true} text='У вас нет ни одной кампании соответствующей заданным параметрам'/>
					<BlueButton width='180px' text='Создать'/>
            	</Col> */}
				</div>
				<div className={s.leftMenu}>
					<LeftCompanyMenu />
				</div>
			</div>
		</>
	)
}

export default Statistic

import React, {useEffect} from 'react'
import s from './index.module.scss'
import LeftCompanyMenu from '../../components/LeftCompanyMenu/index'
import HeaderCompany from '../../components/HeaderCompany/index'
import Table from '../../components/Table/index'
import TableLineFooter from '../../components/TableLineFooter'
import StatisticPageMini from '../../components/popup/StatisticPageMini/index'
import PopUpWrapper from '../../components/PopUpWrapper/index'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import AuditorNBanners from '../../components/AuditorNBanners/index'
import {Calendar} from 'primereact/calendar'
import Col from '../../components/Col/index';
import NavLabel from '../../components/NavLabel/index';
import Label from '../../components/Label/index';
import BlueButton from '../../components/BlueButton/index';
import TableAudi from '../../components/TableAudi/index';
import TableBannerCompany from '../../components/TableBannerCompany'

const Company: React.FC = () => {
	const user = useSelector((state: any) => state.user)
	const navigate = useNavigate()
	const switchTable = useSelector((state: any) => state.SwitchTableCompany)
	useEffect(() => {
		console.log(user)

		if (user == null) {
			navigate('/login')
		}
	}, [])

	return (
		<div className={s.wrapper}>
			<div className={s.leftMenu}>
				<LeftCompanyMenu />
			</div>
			<div className={s.rightMenu}>
				{/* <Calendar/> */}
				{/* COMPANY */}
				{/* <HeaderCompany textHeader="Компании" needDownMenu={true} /> */}
				{switchTable === 1 && <Table />}
				{switchTable === 2 && <TableAudi/>}
				{switchTable === 3 && <TableBannerCompany />}
				{/* NO COMPANY CONTENT */}
				{/* <Col width="360px" className={s.noCompany}>
					<NavLabel className={s.noCompanyTitle} text="Нет кампаний" />
					<Label
						className={s.noCompanyLabel}
						width="360px"
						isMini={true}
						text="У вас нет ни одной кампании соответствующей заданным параметрам"
					/>
					<BlueButton width="180px" text="Создать" />
				</Col> */}

			</div>
		</div>
	)
}

export default Company

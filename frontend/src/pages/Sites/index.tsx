import React from 'react'
import s from './index.module.scss'
import LeftCompanyMenu from '../../components/LeftCompanyMenu/index'
import HeaderCompany from '../../components/HeaderCompany/index'
import Table from '../../components/Table/index'
import TableLineFooter from '../../components/TableLineFooter'
import TableSites from '../../components/TableSites/index'

const Sites: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.leftMenu}>
				<LeftCompanyMenu />
			</div>
			<div className={s.rightMenu}>

				{/* SITES */}
				{/* <HeaderCompany textHeader="Компании" /> */}
				<TableSites />

			</div>
		</div>
	)
}

export default Sites

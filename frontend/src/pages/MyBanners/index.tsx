import React from 'react'
import s from './index.module.scss'
import LeftCompanyMenu from '../../components/LeftCompanyMenu/index'
import HeaderCompany from '../../components/HeaderCompany/index'
import Table from '../../components/Table/index'
import TableLineFooter from '../../components/TableLineFooter'
import TableBanners from '../../components/TableBanners/index';
import TableFinancy from '../../components/TableFinancy/index';
import WithdrawPopUp from '../../components/popup/WithdrawPopUp/index';

const MyBanners: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.leftMenu}>
				<LeftCompanyMenu />
			</div>
			<div className={s.rightMenu}>
				{/* COMPANY */}
				{/* <HeaderCompany  textHeader="Мои баннеры"/> */}
				<TableBanners/>
				{/* <TableLineFooter className={s.TableLineFooter} /> */}
				

				
			</div>
		</div>
	)
}

export default MyBanners

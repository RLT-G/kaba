import React from 'react'
import s from './index.module.scss'
import LeftCompanyMenu from '../../components/LeftCompanyMenu/index'
import TableFinancy from '../../components/TableFinancy'
import HeaderCompany from '../../components/HeaderCompany'
import TableMedia from '../../components/TableMedia'

const Media: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.leftMenu}>
				<LeftCompanyMenu />
			</div>
			<div className={s.rightMenu}>
				{/* <HeaderCompany textHeader='Медиаплощадки'/> */}
            	<TableMedia/>



			</div>
		</div>
	)
}

export default Media

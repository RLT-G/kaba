import React, {ReactNode, useEffect, useRef} from 'react'
import s from './index.module.scss'
import NavLabel from '../NavLabel/index'
import InfoCompany from '../infoCompany/index'
import RatePopUp from '../popup/RatePopUp'
import { useDispatch, useSelector } from 'react-redux'

interface IHeaderDownMenu {
	children?: ReactNode[] | ReactNode
	className?: string // Added className prop
}

const HeaderDownMenu: React.FC<IHeaderDownMenu> = ({
	className,
}: IHeaderDownMenu) => {
	const dispatch = useDispatch()
	const switchComapny = useSelector((state: any) => state.SwitchTableCompany)
	return (
		<div className={s.wrapper + ' ' + className}>
			<div className={s.down}>
				<div onClick={() => dispatch({type: 'setSwitchTableCompany', SwitchTableCompany: 1})} className={`${s.companiesMenu}  ${switchComapny === 1 && s.active}`}>
					<span className={s.companiesText}>Компании</span>
					{/* <span className={s.companiesNum}>332</span> */}
				</div>
				<div onClick={() => dispatch({type: 'setSwitchTableCompany', SwitchTableCompany: 2})} className={`${s.companiesMenu}  ${switchComapny === 2 && s.active}`}>
					<span className={s.companiesText}>Аудитории</span>
					{/* <span className={s.companiesNum}>0</span> */}
				</div>
				<div onClick={() => dispatch({type: 'setSwitchTableCompany', SwitchTableCompany: 3})} className={`${s.companiesMenu}  ${switchComapny === 3 && s.active}`}>
					<span className={s.companiesText}>Баннеры</span>
					{/* <span className={s.companiesNum}>33</span> */}
				</div>
			</div>
		</div>
	)
}

export default HeaderDownMenu

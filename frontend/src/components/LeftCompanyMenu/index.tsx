import React, {useEffect, useRef} from 'react'
import s from './index.module.scss'
import Col from '../Col'
import Label from '../Label'
import NavLabel from '../NavLabel/index'
import Button from '../Button/index'
import BlueButton from '../BlueButton/index'
import {Link, redirect, useLocation} from 'react-router-dom'
import AccountAvatar from '../AccountAvatar'
import * as mui from '@mui/base'
import WhiteLabel from '../WhiteLabel'
import {useDispatch, useSelector} from 'react-redux'
import {IUser} from '../../types'
import PopUpWrapper from '../PopUpWrapper/index'
import Deposite from '../popup/DepositePopUp/index'
import './index.css'
import StatisticDropDownPopUp from '../popup/StatisticDropDownPopUp/index'
import logo from '../../assets/logo.svg'
import BetaLogo from '../../assets/icons/BetaLogo.svg'
import miniBeta from '../../assets/icons/MiniBeta.svg'
import ExtraDropDownPopUp from '../popup/ExtraDropDownPopUp/index'
import StatisticIcon from '../../assets/statistic.svg'
import CompanyIcon from '../../assets/company.svg'
import SitesIcon from '../../assets/sites.svg'
import logoLeftMenu from '../../assets/logo_w_leftMenu.svg'
import {getBalanceAPI} from '../../api/data.api'
import WithdrawPopUp from '../popup/WithdrawPopUp/index';

enum PagePopup {
	Deposite,
	CreateBanner,
	Withdraw,
	None,
}

const LeftCompanyMenu: React.FC = () => {
	const dispatch = useDispatch()
	const isBlogger = useSelector((state: any) => state.isBlogger)
	const currentUser = useSelector((state: any) => state.user)
	const CurrentURL = useSelector((state: any) => state.CurrentURL)
	const users = useSelector((state: any) => state.users)
	const location = useLocation()
	const statisticRef = useRef()
	// const statisticButtonRef = useRef()
	const extraRef = useRef()
	const extraButtonRef = useRef()
	//Current shown popup
	const [pagePopup, setPagePopup] = React.useState<PagePopup | null>(null)
	const [statisticDropDown, setStatisticDropDown] =
		React.useState<boolean>(false)
	const [extraDropDown, setExtraDropDown] = React.useState<boolean>(false)

	const [balance, setBalance] = React.useState<number>(0)
	const [currency, setCurrency] = React.useState<string>('₽')

	useEffect(() => {
		const getBalance = async () => {
			const res = await getBalanceAPI(currentUser.token)
			console.log(res.data)

			setBalance(res.data.balance)
			setCurrency(res.data.currency)
		}

		getBalance()
	}, [])

	const createCompany = () => {
		console.log('create company')

		redirect('/create', 1)
	}

	const handleChangeUser = (user: any) => {
		console.log(user?.id + 'asas')
		dispatch({
			type: 'setUser',
			user: user,
		})
	}

	const setCurrentUrl = (url: string) => {
		dispatch({
			type: 'setUrl',
			CurrentURL: url,
		})
		console.log(CurrentURL)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// if (
			// 	statisticRef.current &&
			// 	!statisticRef.current.contains(event.target) &&
			// 	!statisticButtonRef.current.contains(event.target)
			// ) {
			// 	setStatisticDropDown(false)
			// }

			if (
				extraRef.current &&
				!extraRef.current.contains(event.target) &&
				!extraButtonRef.current.contains(event.target)
			) {
				setExtraDropDown(false)
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [statisticDropDown, extraDropDown])
	console.log(CurrentURL, 'CURRENT URL')

	return (
		<>
			<div className={s.backgroundWrapper}>
				<div className={`${s.wrapper} top-4 h-screen`}>
					<Col className={s.wrapperLeft} width="180px">
						{['/', '/media', '/mybanners', '/sites'].includes(
							location.pathname,
						) ? (
							<Link to={'/'} className={s.logoMini}>
								<img src={logo} alt="Logo" />
								<img className="w-[24px] h-[24px]" src={miniBeta} alt="B" />
							</Link>
						) : (
							<>
								<Link to={'/'} className={s.logoMini}>
									<img src={logo} alt="Logo" />
									{/* <img src={BetaLogo} alt="B" /> */}
									<img className="w-[24px] h-[24px]" src={miniBeta} alt="B" />
								</Link>
							</>
						)}
						{/* <div className={s.userNameLeft}>
							<span className={s.userNameText}>
								<AccountAvatar
									img={currentUser?.avatar}
									className={s.userMenuAvatar}
									size={16}
									char="О"
								/>
								<p className="truncate w-[103px]">{currentUser?.name}</p>
							</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<path
									d="M5 10L8 13L11 10"
									stroke="#808080"
									strokeWidth="1.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M5 6L8 3L11 6"
									stroke="#808080"
									strokeWidth="1.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>

							<mui.Select
								className={`w-[180px] h-[36px] rounded-[10px] absolute opacity-0 z-10 overflow-hidden`}
								renderValue={(option: mui.SelectOption<number> | null) => {
									if (option == null || option.value === null) {
										return ''
									}
									return `${option.label}`
								}}>
								<Col width="280px" className={`cursor-pointer ${s.userBlock}`}>
									{users.map((user: IUser) => (
										<mui.Option
											key={user.id}
											onClick={() => {
												handleChangeUser(user)
											}}
											className={`cursor-pointer ${s.itemUserText}`}
											value={user.id}>
											<AccountAvatar
												img={user.avatar}
												className={s.userMenuAvatar}
												size={36}
												char="О"
											/>
											<Col
												width="200px"
												className={`${s.userBlockText} ml-[16px]`}>
												<WhiteLabel size="16px" text={user.name} />
												<Label text={user.permission.name} />
											</Col>
										</mui.Option>
									))}
								</Col>
							</mui.Select>
						</div> */}
						<div className={s.balance}>
							<Label
								isMini={true}
								text={`Баланс:`}
								className={s.balanceLabel}
							/>
							<NavLabel
								className={s.NavLabelBalance}
								text={`${balance}${currency}`}
							/>
							{isBlogger ? (
								<Button onClick={() => setPagePopup(PagePopup.Withdraw)} className={s.buttonBalance} text="Вывести" />
							) : (
								<Button
									onClick={() => setPagePopup(PagePopup.Deposite)}
									className={s.buttonBalance}
									text="Пополнить"
								/>
							)}
						</div>
						{isBlogger ? (
							<Link to="/bloggers">
								<BlueButton
									onClick={() => {
										setPagePopup(PagePopup.CreateBanner)
									}}
									className={s.buttonCreateComp}
									text="Сформировать"
								/>
							</Link>
						) : (
							<Link to="/create">
								<BlueButton
									onClick={() => {
										createCompany()
									}}
									className={s.buttonCreateComp}
									text="Создать компанию"
								/>
							</Link>
						)}
						<div className={s.companyListPages}>
							{isBlogger ? (
								<Link to="/ " onClick={() => setCurrentUrl('mybanners')}>
									<div
										className={`${s.companies} ${s.companyPage} ${
											location.pathname === '/' ? s.active : ''
										}`}>
										<div className={s.companyPageLeft}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M8.18928 10.4169C7.6661 10.7313 7.09025 10.8885 6.46175 10.8885C5.83272 10.8885 5.25535 10.7313 4.72963 10.4169C4.20391 10.1025 3.78421 9.68403 3.47053 9.16147C3.15684 8.63891 3 8.06498 3 7.43968C3 6.81542 3.15684 6.24199 3.47053 5.71938C3.78421 5.19678 4.20265 4.77956 4.72583 4.46774C5.24902 4.15591 5.82766 4 6.46175 4C7.09025 4 7.6661 4.15591 8.18928 4.46774C8.71247 4.77956 9.13091 5.19678 9.44459 5.71938C9.75827 6.24199 9.91512 6.81542 9.91512 7.43968C9.91512 8.06993 9.75827 8.64509 9.44459 9.16518C9.13091 9.68527 8.71247 10.1025 8.18928 10.4169ZM5.36337 9.33029C5.69793 9.53022 6.06406 9.63018 6.46175 9.63018C6.85901 9.63018 7.22365 9.53022 7.55567 9.33029C7.8877 9.13037 8.1544 8.86412 8.35578 8.53154C8.55716 8.19897 8.65785 7.83502 8.65785 7.43968C8.65785 7.04477 8.55716 6.68116 8.35578 6.34885C8.1544 6.01654 7.8877 5.75029 7.55567 5.5501C7.22365 5.34991 6.85901 5.24982 6.46175 5.24982C6.06406 5.24982 5.69793 5.34991 5.36337 5.5501C5.02882 5.75029 4.76096 6.01654 4.5598 6.34885C4.35864 6.68116 4.25806 7.04477 4.25806 7.43968C4.25806 7.83502 4.35864 8.19897 4.5598 8.53154C4.76096 8.86412 5.02882 9.13037 5.36337 9.33029ZM6.46175 20C7.09025 20 7.6661 19.8441 8.18928 19.5323C8.71247 19.2204 9.13091 18.8032 9.44459 18.2806C9.75827 17.758 9.91512 17.1843 9.91512 16.5595C9.91512 15.9298 9.75827 15.355 9.44459 14.8352C9.13091 14.3154 8.71247 13.8996 8.18928 13.5877C7.6661 13.2759 7.09025 13.12 6.46175 13.12C5.82766 13.12 5.24902 13.2759 4.72583 13.5877C4.20265 13.8996 3.78421 14.3166 3.47053 14.839C3.15684 15.3613 3 15.9348 3 16.5595C3 17.1843 3.15684 17.758 3.47053 18.2806C3.78421 18.8032 4.20391 19.2204 4.72963 19.5323C5.25535 19.8441 5.83272 20 6.46175 20ZM5.36337 18.4503C5.69793 18.6502 6.06406 18.7502 6.46175 18.7502C6.85901 18.7502 7.22365 18.6502 7.55567 18.4503C7.8877 18.2504 8.1544 17.9841 8.35578 17.6515C8.55716 17.319 8.65785 16.955 8.65785 16.5595C8.65785 16.1647 8.55716 15.801 8.35578 15.4685C8.1544 15.1359 7.8877 14.8696 7.55567 14.6697C7.22365 14.4698 6.85901 14.3698 6.46175 14.3698C6.06406 14.3698 5.69793 14.4698 5.36337 14.6697C5.02882 14.8696 4.76096 15.1359 4.5598 15.4685C4.35864 15.801 4.25806 16.1647 4.25806 16.5595C4.25806 16.955 4.35864 17.319 4.5598 17.6515C4.76096 17.9841 5.02882 18.2504 5.36337 18.4503ZM12.3646 8.10027H20.337C20.5193 8.10027 20.6754 8.03683 20.8052 7.90996C20.9351 7.78308 21 7.62936 21 7.44879C21 7.26762 20.9351 7.11485 20.8052 6.99049C20.6754 6.86614 20.5193 6.80396 20.337 6.80396H12.3646C12.1823 6.80396 12.0288 6.86614 11.904 6.99049C11.7792 7.11485 11.7168 7.26762 11.7168 7.44879C11.7168 7.62936 11.7792 7.78308 11.904 7.90996C12.0288 8.03683 12.1823 8.10027 12.3646 8.10027ZM20.337 17.2192H12.3646C12.1823 17.2192 12.0288 17.1559 11.904 17.0293C11.7792 16.9027 11.7168 16.7488 11.7168 16.5676C11.7168 16.3864 11.7792 16.2337 11.904 16.1093C12.0288 15.985 12.1823 15.9228 12.3646 15.9228H20.337C20.5193 15.9228 20.6754 15.985 20.8052 16.1093C20.9351 16.2337 21 16.3864 21 16.5676C21 16.7488 20.9351 16.9027 20.8052 17.0293C20.6754 17.1559 20.5193 17.2192 20.337 17.2192Z"
													fill="#F2F2F2"
												/>
											</svg>
											<span className={s.companyPageText}>Мои баннеры</span>
										</div>
									</div>
								</Link>
							) : (
								<Link to="/" onClick={() => setCurrentUrl('company')}>
									<div
										className={`${s.companies} ${s.companyPage} ${
											location.pathname === '/' ? s.active : ''
										}`}>
										<div className={s.companyPageLeft}>
											<img src={CompanyIcon} alt="Company" />
											<span className={s.companyPageText}>Компании</span>
										</div>
									</div>
								</Link>
							)}
							{isBlogger ? (
								<Link to="/media" onClick={() => setCurrentUrl('media')}>
									<div
										className={`${s.statics} ${s.companyPage} ${
											location.pathname === '/media' ? s.active : ''
										}`}>
										<div className={s.companyPageLeft}>
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M13.0228 14.3455L11.8939 15.4886C11.3507 15.3927 10.898 15.253 10.5359 15.0695C10.1738 14.886 9.85972 14.6588 9.59378 14.3879C8.90346 13.7048 8.44513 12.9526 8.21879 12.1312C7.99246 11.3099 7.99387 10.4899 8.22304 9.67141C8.4522 8.85288 8.90629 8.10491 9.58529 7.4275L12.4795 4.53158C13.1586 3.85418 13.9083 3.40116 14.7288 3.17253C15.5492 2.94391 16.3711 2.9425 17.1944 3.1683C18.0177 3.3941 18.7745 3.85135 19.4648 4.54005C20.1495 5.2231 20.605 5.97531 20.8313 6.79666C21.0576 7.61802 21.0562 8.43797 20.8271 9.2565C20.5979 10.075 20.1466 10.823 19.4733 11.5004L16.978 13.9814C17.0232 13.7048 17.0303 13.4169 16.9992 13.1177C16.9681 12.8185 16.8931 12.5335 16.7743 12.2625L18.4378 10.6028C18.9301 10.1117 19.2583 9.5698 19.4224 8.97707C19.5865 8.38434 19.5865 7.79019 19.4224 7.19464C19.2583 6.59909 18.9301 6.05575 18.4378 5.56463C17.9399 5.06786 17.3938 4.73904 16.7997 4.57815C16.2056 4.41727 15.6115 4.41868 15.0173 4.58239C14.4232 4.74609 13.8772 5.07351 13.3792 5.56463L10.6123 8.32506C10.12 8.81618 9.79182 9.35811 9.62773 9.95084C9.46363 10.5436 9.46363 11.1377 9.62773 11.7333C9.79182 12.3288 10.1228 12.875 10.6208 13.3717C10.898 13.6484 11.2276 13.8685 11.6096 14.0322C11.9915 14.1959 12.4626 14.3004 13.0228 14.3455ZM10.9772 9.65448L12.1061 8.51135C12.6493 8.60732 13.102 8.74703 13.4641 8.9305C13.8262 9.11396 14.1403 9.34118 14.4062 9.61214C15.0965 10.2952 15.5549 11.0474 15.7812 11.8688C16.0075 12.6901 16.0061 13.5101 15.777 14.3286C15.5478 15.1471 15.0937 15.8951 14.4147 16.5725L11.512 19.4769C10.8386 20.1486 10.0917 20.5988 9.27125 20.8275C8.45079 21.0561 7.62891 21.0575 6.80561 20.8317C5.98232 20.6059 5.22551 20.1486 4.53519 19.4599C3.85053 18.7769 3.39503 18.0247 3.1687 17.2033C2.94236 16.382 2.94378 15.562 3.17294 14.7435C3.4021 13.925 3.85336 13.177 4.52671 12.4996L7.02205 10.0186C6.97678 10.2952 6.96971 10.5845 7.00083 10.8865C7.03195 11.1885 7.10692 11.4722 7.22575 11.7375L5.56219 13.3972C5.06991 13.8883 4.74172 14.4302 4.57763 15.0229C4.41354 15.6157 4.41354 16.2098 4.57763 16.8054C4.74172 17.4009 5.06991 17.9471 5.56219 18.4438C6.05447 18.935 6.59908 19.261 7.19604 19.4218C7.793 19.5827 8.38854 19.5813 8.98267 19.4176C9.5768 19.2539 10.12 18.9265 10.6123 18.4354L13.3877 15.6749C13.88 15.1838 14.2068 14.6419 14.368 14.0492C14.5293 13.4564 14.5279 12.8623 14.3638 12.2667C14.1997 11.6712 13.8715 11.125 13.3792 10.6283C13.102 10.3516 12.7724 10.1315 12.3904 9.96778C12.0085 9.80407 11.5374 9.69964 10.9772 9.65448Z"
													fill="#F2F2F2"
												/>
											</svg>
											<span className={s.companyPageText}>Медиаплощадки</span>
										</div>
									</div>
								</Link>
							) : (
								<></>
							)}
							
							{isBlogger ? <></> : 
							<>
								<Link
									to={`/${!isBlogger ? 'statistics' : 'statisticBlogger'}`} 
									onClick={() => setCurrentUrl('statistics')}>
									<div
										className={`${s.statics} ${s.companyPage} ${
											location.pathname === '/statistics' ||
											location.pathname === '/statisticBlogger'
												? s.active
												: ''
										}`}>
										<div className={s.companyPageLeft}>
											<img src={StatisticIcon} alt="Statistic" srcSet="" />
											<span className={s.companyPageText}>Статистика</span>
										</div>
										{/* <svg
											ref={statisticButtonRef}
											onClick={() => setStatisticDropDown(!statisticDropDown)}
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5C7.44772 5 7 4.55228 7 4ZM7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7Z"
												fill="#808080"
											/>
										</svg> */}
									</div>
								</Link>
							
							</>}
							{isBlogger ? (
								<></>
							) : (
								<>
									<Link to="/sites" onClick={() => setCurrentUrl('sites')}>
										<div
											className={`${s.sites} ${s.companyPage} ${
												location.pathname === '/sites' ? s.active : ''
											}`}>
											<div className={s.companyPageLeft}>
												<img src={SitesIcon} alt="Sites" />
												<span className={s.companyPageText}>Сайты</span>
											</div>
										</div>
									</Link>
								</>
							)}
							<mui.Select
								className=" w-[180px] h-[36px]  opacity-1 "
								renderValue={(option: mui.SelectOption<number> | null) => {
									if (option == null || option.value === null) {
										return (
											<>
												<div
													className={`${s.statics} ${s.companyPage} ${
														location.pathname === '/finance' ||
														location.pathname === '/settings'
															? s.active
															: ''
													}`}
													// onClick={() => setExtraDropDown(!extraDropDown)}
													// ref={extraButtonRef}
												>
													<div className={`${s.companyPageLeft}`}>
														<span className={s.companyPageText}>Дополнит.</span>
													</div>
													<svg
														onClick={() =>
															setStatisticDropDown(!statisticDropDown)
														}
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none">
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5C7.44772 5 7 4.55228 7 4ZM7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7Z"
															fill="#808080"
														/>
													</svg>
												</div>
											</>
										)
									}
									return `${option.label}`
								}}>
								<mui.Option
									value={1}
									className="relative top-[-35px] left-[185px]">
									<ExtraDropDownPopUp />
								</mui.Option>
							</mui.Select>
							{/* <div
								className={`${s.statics} ${s.companyPage} ${
									location.pathname === '//finance' || location.pathname === '//settings'
										? s.active
										: ''
								}`}
								// onClick={() => setExtraDropDown(!extraDropDown)}
								// ref={extraButtonRef}
							>
								<div className={`${s.companyPageLeft}`}>
									<span className={s.companyPageText}>Дополнит.</span>
								</div>
								<svg
									onClick={() => setStatisticDropDown(!statisticDropDown)}
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5C7.44772 5 7 4.55228 7 4ZM7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7Z"
										fill="#808080"
									/>
								</svg>
							</div> */}
						</div>
					</Col>

					{/* Footer */}
					<Col className={s.wrapperRight} width="180px">
						<div className={s.footerCompany}>
							<img src={logoLeftMenu} alt="Invest" />
							{/* <div className={s.footerAbout}>
								<span className={s.footerAboutText}>
									<a href="#!" className={s.footerTextLink}>
										О сервисе
									</a>
									<a href="#!" className={s.footerTextLink}>
										Обучение
									</a>
									<br />
									<a href="#!" className={s.footerTextLink}>
										Правила пользования
									</a>
									<br />
									<div className={s.ContainerfooterTextLink}>
										<a href="#!" className={s.footerTextLink}>
											Справка
										</a>
										<a href="#!" className={s.footerTextLink}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none">
												<path
													d="M1.7357 8.35502C1.7357 8.35502 7.04301 6.15984 8.88367 5.38686C9.58929 5.07769 11.9822 4.08827 11.9822 4.08827C11.9822 4.08827 13.0866 3.65544 12.9945 4.70665C12.9639 5.13952 12.7184 6.6545 12.473 8.29319C12.1049 10.6121 11.7061 13.1474 11.7061 13.1474C11.7061 13.1474 11.6447 13.8585 11.1232 13.9822C10.6017 14.1059 9.74265 13.5494 9.58929 13.4256C9.46655 13.3329 7.28842 11.9416 6.4908 11.2614C6.27604 11.0759 6.03063 10.7049 6.52145 10.272C7.62588 9.25167 8.94503 7.98402 9.74265 7.18015C10.1108 6.80911 10.4789 5.9434 8.94503 6.99461C6.76691 8.50963 4.61944 9.93188 4.61944 9.93188C4.61944 9.93188 4.12858 10.241 3.20825 9.96277C2.28787 9.68455 1.21414 9.3135 1.21414 9.3135C1.21414 9.3135 0.477909 8.84973 1.7357 8.35502Z"
													fill="#808080"
												/>
											</svg>
										</a>
										<a href="#!" className={s.footerTextLink}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M14.2007 4.53684C14.2921 4.22105 14.2007 4 13.7739 4H12.3515C11.9857 4 11.8231 4.2 11.7317 4.42105C11.7317 4.42105 11.0103 6.25263 9.98406 7.43158C9.64876 7.77895 9.50651 7.88421 9.32362 7.88421C9.23218 7.88421 9.10009 7.77895 9.10009 7.46316V4.53684C9.10009 4.15789 8.99848 4 8.69367 4H6.45835C6.23482 4 6.09257 4.17895 6.09257 4.33684C6.09257 4.69474 6.60059 4.77895 6.66156 5.76842V7.93684C6.66156 8.41053 6.58027 8.49474 6.39738 8.49474C5.91984 8.49474 4.74121 6.66316 4.0503 4.55789C3.90805 4.16842 3.77596 4 3.41018 4H1.98771C1.58128 4 1.5 4.2 1.5 4.42105C1.5 4.81053 1.97755 6.74737 3.74548 9.30526C4.9241 11.0526 6.58027 12 8.08403 12C8.98832 12 9.10009 11.7895 9.10009 11.4316V10.1053C9.10009 9.68421 9.18137 9.6 9.47603 9.6C9.6894 9.6 10.045 9.70526 10.8883 10.5474C11.8536 11.5474 12.0162 12 12.5547 12H13.9772C14.3836 12 14.5868 11.7895 14.4649 11.3789C14.3328 10.9684 13.8755 10.3684 13.2659 9.65263C12.9306 9.24211 12.4327 8.81053 12.2905 8.58947C12.0771 8.30526 12.1381 8.17895 12.2905 7.93684C12.2905 7.92632 14.028 5.4 14.2007 4.53684Z"
													fill="#808080"
												/>
											</svg>
										</a>
									</div>
								</span>
							</div> */}
							{/* <div className={s.footerCopy}>
								<span className={s.footerCopyText}>© 2023 OOO «ИТКАБА»</span>
							</div> */}
						</div>
					</Col>
					{pagePopup === PagePopup.Deposite && (
						<PopUpWrapper onExit={() => setPagePopup(PagePopup.None)}>
							<Deposite onExit={() => setPagePopup(PagePopup.None)} />
						</PopUpWrapper>
					)}
					{pagePopup === PagePopup.Withdraw && (
						<PopUpWrapper onExit={() => setPagePopup(PagePopup.None)}>
							<WithdrawPopUp onExit={() => setPagePopup(PagePopup.None)} />
						</PopUpWrapper>
					)}
					{/* {statisticDropDown && (
						<div ref={statisticRef} className={s.statisticDropDown}>
							<StatisticDropDownPopUp />
						</div>
					)} */}
				</div>
			</div>
		</>
	)
}

export default LeftCompanyMenu

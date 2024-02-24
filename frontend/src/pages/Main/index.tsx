import React, {useEffect} from 'react'
import s from './index.module.scss'
import Input from '../../components/Input'
import NavLabel from '../../components/NavLabel'
import Label from '../../components/Label'
import Col from '../../components/Col'
import BlueButton from '../../components/BlueButton/index'
import Button from '../../components/Button/index'
import SocialButtons from '../../components/SocialButtons'
import {Link, useNavigate} from 'react-router-dom'
import {loginAPI, vkLoginAPI, yandexLoginAPI} from '../../api/auth.api'
import {useDispatch, useSelector} from 'react-redux'
import Row from '../../components/Row/index'
import Gosuslugi from '../../assets/gosuslugiID_znak_L.svg'
import VkIcon from '../../assets/vk-svgrepo-com (1).svg'
import TGIcon from '../../assets/telegram-new-2019-seeklogo.com.svg'
import YandexIcon from '../../assets/Yandex_icon.svg'

const MainPage: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const phoneRegex = /^(\+7|8)\d{10}$/
	const isBloggerSelector = useSelector((state: any) => state.isBlogger)

	const [phoneNumber, setPhoneNumber] = React.useState<string>('')
	const [whoUser, setWhoUser] = React.useState<boolean>(false)

	console.log(isBloggerSelector, 'ISBLOGGER')
	console.log(whoUser, 'whouser')

	useEffect(() => {
		setWhoUser(isBloggerSelector)
	}, [whoUser, isBloggerSelector])

	const isPhone: boolean = phoneRegex.test(phoneNumber)

	const queryParams = new URLSearchParams(window.location.search)
	const code = queryParams.get('code')
	const social_type = queryParams.get('sn')

	const login = async () => {
		if (isPhone) {
			const res = await loginAPI(phoneNumber)

			if (res.data.status === 'success') {
				let uid = await res.data.user_id

				dispatch({type: 'setVerifyUser', verify_user: uid})
				dispatch({type: 'setVerifyUserPhone', verify_user_phone: phoneNumber})
				navigate('/acceptCode')
			}
		}
	}

	if (code) {
		//api

		switch (social_type) {
			case 'ya':
				yandexLoginAPI(code).then((res) => {
					console.log(res)

					if (res.status === 200 && res.data.status === 'success') {
						dispatch({type: 'setUser', user: res.data})
						window.location.pathname = '/'
					}
				})
				break
			default:
				vkLoginAPI(code).then((res) => {
					console.log(res)

					if (res.status === 200 && res.data.status === 'success') {
						dispatch({type: 'setUser', user: res.data})
						window.location.pathname = '/'
					}
				})
		}
	}

	const vk_login = () => {
		const urlParams = {
			client_id: '51643989',
			redirect_uri: 'http://localhost:5001/login/',
			display: 'popup',
			scope: '274572383',
			response_type: 'code',
		}

		const url = `https://oauth.vk.com/authorize?client_id=${
			urlParams.client_id
		}&redirect_uri=${encodeURIComponent(urlParams.redirect_uri)}&display=${
			urlParams.display
		}&scope=${urlParams.scope}&response_type=${urlParams.response_type}`

		window.location.href = url
	}

	const yandex_login = () => {
		const urlParams = {
			client_id: 'c850608ba62d47d6a780eaef664b1d04',
			scope: 'login:info login:email login:avatar login:phone',
		}

		const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${urlParams.client_id}`

		window.location.href = url
	}

	const isBlogger = (isBlogger: boolean) => {
		dispatch({type: 'setIsBlogger', isBlogger: isBlogger})
		setWhoUser(isBlogger)
		console.log(whoUser, 'whouser 2')
	}

	return (
		<div className={s.wrapper}>
			<Col className={s.signin} width="360px">
				<NavLabel className={s.NavLabel} text="Вход в аккаунт" />
				<Col
					width="360px"
					onClick={() => isBlogger(false)}
					className={`${s.ChooseCol} ${whoUser ? '' : s.active}`}>
					<NavLabel className={s.ChooseNavLabel} text="Рекламодатель" />
					<p className={s.ChooseText}>
						Создавайте и настраиваете рекламные объявления, отслеживаете
						результаты и анализируете эффективность
					</p>
				</Col>

				<Col
					width="360px"
					onClick={() => isBlogger(true)}
					className={`${s.ChooseCol} ${s.ChooseColLast} ${
						whoUser ? s.active : ''
					}`}>
					<NavLabel className={s.ChooseNavLabel} text="Блоггер" />
					<p className={s.ChooseText}>
						Находите интересные рекламные предложения, чтобы максимизировать
						вашу прибыль от контента
					</p>
				</Col>
				{/* <Row className={s.SocButtonRow} width="360px">
					<img src={Gosuslugi} alt="Gosuslugi" />
					<p className={s.SocText}>Продолжить с Госуслуги</p>
				</Row> */}
				<Row
					onClick={() => vk_login()}
					className={s.SocButtonRow}
					width="360px">
					<img src={VkIcon} alt="Vkontakte" />
					<p className={s.SocText}>Продолжить с Вконтакте</p>
				</Row>
				{/* <Row className={s.SocButtonRow} width="360px">
					<img src={TGIcon} alt="Telegram" />
					<p className={s.SocText}>Продолжить с Telegram</p>
				</Row> */}
				<Row
					onClick={() => yandex_login()}
					className={s.SocButtonRow}
					width="360px">
					<img src={YandexIcon} alt="Yandex" />
					<p className={s.SocText}>Продолжить с Yandex</p>
				</Row>

				<p className={s.CreateAccText}>
					Создавая учетную запись, я соглашаюсь с{' '}
					<Link to="/UserSuccess" className={s.BlueLink}>
						Пользовательским соглашением
					</Link>{' '}
					и{' '}
					<Link to="/PrivacyPolicy" className={s.BlueLink}>
						Политикой конфиденциальности
					</Link>
					.
				</p>
			

				{/* Old Login In Account */}
				{/* <div className={s.input_container}>
					<Label text="Логин или телефон" />
					<Input
						placeholder="Ввести..."
						id="1"
						className={s.login}
						isSecure={false}
						onChange={(e) => setPhoneNumber(e.target.value)}
						errorMsg={
							!isPhone && phoneNumber.length > 0 ? 'Неверный формат' : ''
						}
					/>
				</div>
				<div className={s.button_container}>
					<BlueButton onClick={login} text="Войти" />
					<Button
						onClick={() => navigate('/register')}
						className={s.createAccount}
						text="Создать аккаунт"
					/>
				</div>
				<div className={s.socials}>
					<Label text="Или войти с помощью" />
					<SocialButtons className={s.socialButtons} />
				</div> */}
			</Col>
		</div>
	)
}

export default MainPage

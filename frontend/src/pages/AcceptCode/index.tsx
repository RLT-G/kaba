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
import {loginAPI, verifyAPI} from '../../api/auth.api'
import {useDispatch, useSelector} from 'react-redux'
import ToolTip from '../../components/ToolTip'
import {IUser} from '../../types'

const AcceptCode: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userId = useSelector((state: any) => state.verify_user)
	const userPhone = useSelector((state: any) => state.verify_user_phone)
	const user_ = useSelector((state: any) => state.user)

	const [code, setCode] = React.useState<string>('')
	const [value, setValue] = React.useState(userPhone) // State to hold the input value

	const [cooldown, setCooldown] = React.useState(60)

	const formatPhoneNumber = (input: string) => {
		// Strip all characters from the input except digits
		const digits = input.replace(/[^+\d]/g, '')

		return digits
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setCooldown((prevCooldown) => prevCooldown - 1)
		}, 1000)

		return () => {
			clearInterval(timer)
		}
	}, [])

	const formatCooldown = () => {
		const minutes = Math.floor(cooldown / 60)
			.toString()
			.padStart(2, '0')
		const seconds = (cooldown % 60).toString().padStart(2, '0')
		return `${minutes}:${seconds}`
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputVal = event.target.value
		// Handle deletion to keep "+7"
		if (inputVal === '') {
			setValue('')
		} else {
			const formattedInput = formatPhoneNumber(inputVal)
			setValue(formattedInput)
		}
	}

	const login = async () => {
		console.log(userId, code)
		const res = await verifyAPI(userId, code)

		if (res.data.status === 'success') {
			console.log(res.data)

			let user = (await res.data) as IUser
			console.log(user, 'USER')

			await dispatch({type: 'setUser', user: user})
			await dispatch({type: 'addUser', user: user})
			console.log(user_)

			window.location.pathname = '/'
		}
	}

	const resendCode = async () => {
		setCooldown(60)

		console.log(value)

		const res = await loginAPI(value)
		console.log(res)
	}

	return (
		<div className={s.wrapper}>
			<Col className={s.signin} width="360px">
				<NavLabel className={s.NavLabel} text="Вход в аккаунт" />
				<div className={s.input_container}>
					<div className={s.input_row_question}>
						<Label text="Номер телефона" />
						<ToolTip top="140%" text="info">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M8.31471 11.5294C7.59118 11.8431 6.81961 12 6 12C5.18039 12 4.40882 11.8431 3.68529 11.5294C2.96176 11.2157 2.32353 10.7824 1.77059 10.2294C1.21765 9.67647 0.784314 9.03824 0.470588 8.31471C0.156863 7.59118 0 6.81961 0 6C0 5.18039 0.156863 4.40882 0.470588 3.68529C0.784314 2.96176 1.21667 2.32353 1.76765 1.77059C2.31863 1.21765 2.95588 0.784314 3.67941 0.470588C4.40294 0.156863 5.17451 0 5.99412 0C6.81373 0 7.58627 0.156863 8.31176 0.470588C9.03726 0.784314 9.67647 1.21765 10.2294 1.77059C10.7824 2.32353 11.2157 2.96176 11.5294 3.68529C11.8431 4.40882 12 5.18039 12 6C12 6.81961 11.8431 7.59118 11.5294 8.31471C11.2157 9.03824 10.7824 9.67647 10.2294 10.2294C9.67647 10.7824 9.03824 11.2157 8.31471 11.5294ZM4.05294 10.6118C4.65686 10.8706 5.30588 11 6 11C6.69412 11 7.34412 10.8706 7.95 10.6118C8.55588 10.3529 9.08726 9.9951 9.54412 9.53824C10.001 9.08137 10.3578 8.55098 10.6147 7.94706C10.8716 7.34314 11 6.69412 11 6C11 5.30588 10.8706 4.65686 10.6118 4.05294C10.3529 3.44902 9.99412 2.91765 9.53529 2.45882C9.07647 2 8.5451 1.64216 7.94118 1.38529C7.33726 1.12843 6.68824 1 5.99412 1C5.3 1 4.65098 1.12843 4.04706 1.38529C3.44314 1.64216 2.91373 2 2.45882 2.45882C2.00392 2.91765 1.64804 3.44902 1.39118 4.05294C1.13431 4.65686 1.00588 5.30588 1.00588 6C1.00588 6.69412 1.13431 7.34314 1.39118 7.94706C1.64804 8.55098 2.0049 9.08137 2.46176 9.53824C2.91863 9.9951 3.44902 10.3529 4.05294 10.6118ZM5.88235 7.21765C6.02745 7.21765 6.14216 7.17647 6.22647 7.09412C6.31078 7.01176 6.35294 6.91373 6.35294 6.8V6.76176V6.72941C6.35294 6.56471 6.40196 6.42255 6.5 6.30294C6.59804 6.18333 6.75098 6.0549 6.95882 5.91765C7.24118 5.72941 7.47451 5.53333 7.65882 5.32941C7.84314 5.12549 7.93529 4.84706 7.93529 4.49412C7.93529 4.16863 7.84804 3.89412 7.67353 3.67059C7.49902 3.44706 7.27059 3.27745 6.98824 3.16176C6.70588 3.04608 6.39804 2.98824 6.06471 2.98824C5.55882 2.98824 5.14608 3.09118 4.82647 3.29706C4.50686 3.50294 4.30588 3.74118 4.22353 4.01176C4.20784 4.05882 4.19608 4.10588 4.18824 4.15294C4.18039 4.2 4.17647 4.24902 4.17647 4.3C4.17647 4.43333 4.21961 4.53431 4.30588 4.60294C4.39216 4.67157 4.48431 4.70588 4.58235 4.70588C4.68039 4.70588 4.76373 4.68431 4.83235 4.64118C4.90098 4.59804 4.96078 4.54118 5.01177 4.47059L5.11765 4.32941C5.18824 4.21569 5.26863 4.11863 5.35882 4.03824C5.44902 3.95784 5.55 3.89608 5.66177 3.85294C5.77353 3.8098 5.89412 3.78824 6.02353 3.78824C6.29412 3.78824 6.5098 3.85784 6.67059 3.99706C6.83137 4.13627 6.91177 4.31765 6.91177 4.54118C6.91177 4.74118 6.84902 4.9049 6.72353 5.03235C6.59804 5.1598 6.40588 5.31373 6.14706 5.49412C5.93529 5.63922 5.7598 5.8 5.62059 5.97647C5.48137 6.15294 5.41177 6.38627 5.41177 6.67647V6.71471V6.75294C5.41177 7.06275 5.56863 7.21765 5.88235 7.21765ZM6.31176 8.79412C6.18627 8.91177 6.03726 8.97059 5.86471 8.97059C5.69608 8.97059 5.54902 8.91078 5.42353 8.79118C5.29804 8.67157 5.23529 8.52745 5.23529 8.35882C5.23529 8.1902 5.29706 8.04608 5.42059 7.92647C5.54412 7.80686 5.69216 7.74706 5.86471 7.74706C6.03726 7.74706 6.18627 7.80588 6.31176 7.92353C6.43726 8.04118 6.5 8.18627 6.5 8.35882C6.5 8.53137 6.43726 8.67647 6.31176 8.79412Z"
									fill="#808080"
								/>
							</svg>
						</ToolTip>
					</div>
					<div className={s.input_row_phone} id="input_row_phone">
						<Input
							placeholder="+7 (938) 823 39-19"
							id="phone_reg"
							isSecure={false}
							width="248px"
							value={value}
							onChange={handleChange}
							maximumLength={12}
							isShowMaxLength={false}
						/>
						<Link to={'/login'} className={s.blueButtonRegLink}>
							<BlueButton className={s.blueButtonReg} text="Назад" />
						</Link>
					</div>
					<Label
						isMini={true}
						text="Мы отправим на указанный номер код подтверждения"
					/>
				</div>
				<div className={s.input_container}>
					<div className={s.input_row_question}>
						<Label text="Подтверждение номера" />
						<ToolTip top="140%" text="info">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M8.31471 11.5294C7.59118 11.8431 6.81961 12 6 12C5.18039 12 4.40882 11.8431 3.68529 11.5294C2.96176 11.2157 2.32353 10.7824 1.77059 10.2294C1.21765 9.67647 0.784314 9.03824 0.470588 8.31471C0.156863 7.59118 0 6.81961 0 6C0 5.18039 0.156863 4.40882 0.470588 3.68529C0.784314 2.96176 1.21667 2.32353 1.76765 1.77059C2.31863 1.21765 2.95588 0.784314 3.67941 0.470588C4.40294 0.156863 5.17451 0 5.99412 0C6.81373 0 7.58627 0.156863 8.31176 0.470588C9.03726 0.784314 9.67647 1.21765 10.2294 1.77059C10.7824 2.32353 11.2157 2.96176 11.5294 3.68529C11.8431 4.40882 12 5.18039 12 6C12 6.81961 11.8431 7.59118 11.5294 8.31471C11.2157 9.03824 10.7824 9.67647 10.2294 10.2294C9.67647 10.7824 9.03824 11.2157 8.31471 11.5294ZM4.05294 10.6118C4.65686 10.8706 5.30588 11 6 11C6.69412 11 7.34412 10.8706 7.95 10.6118C8.55588 10.3529 9.08726 9.9951 9.54412 9.53824C10.001 9.08137 10.3578 8.55098 10.6147 7.94706C10.8716 7.34314 11 6.69412 11 6C11 5.30588 10.8706 4.65686 10.6118 4.05294C10.3529 3.44902 9.99412 2.91765 9.53529 2.45882C9.07647 2 8.5451 1.64216 7.94118 1.38529C7.33726 1.12843 6.68824 1 5.99412 1C5.3 1 4.65098 1.12843 4.04706 1.38529C3.44314 1.64216 2.91373 2 2.45882 2.45882C2.00392 2.91765 1.64804 3.44902 1.39118 4.05294C1.13431 4.65686 1.00588 5.30588 1.00588 6C1.00588 6.69412 1.13431 7.34314 1.39118 7.94706C1.64804 8.55098 2.0049 9.08137 2.46176 9.53824C2.91863 9.9951 3.44902 10.3529 4.05294 10.6118ZM5.88235 7.21765C6.02745 7.21765 6.14216 7.17647 6.22647 7.09412C6.31078 7.01176 6.35294 6.91373 6.35294 6.8V6.76176V6.72941C6.35294 6.56471 6.40196 6.42255 6.5 6.30294C6.59804 6.18333 6.75098 6.0549 6.95882 5.91765C7.24118 5.72941 7.47451 5.53333 7.65882 5.32941C7.84314 5.12549 7.93529 4.84706 7.93529 4.49412C7.93529 4.16863 7.84804 3.89412 7.67353 3.67059C7.49902 3.44706 7.27059 3.27745 6.98824 3.16176C6.70588 3.04608 6.39804 2.98824 6.06471 2.98824C5.55882 2.98824 5.14608 3.09118 4.82647 3.29706C4.50686 3.50294 4.30588 3.74118 4.22353 4.01176C4.20784 4.05882 4.19608 4.10588 4.18824 4.15294C4.18039 4.2 4.17647 4.24902 4.17647 4.3C4.17647 4.43333 4.21961 4.53431 4.30588 4.60294C4.39216 4.67157 4.48431 4.70588 4.58235 4.70588C4.68039 4.70588 4.76373 4.68431 4.83235 4.64118C4.90098 4.59804 4.96078 4.54118 5.01177 4.47059L5.11765 4.32941C5.18824 4.21569 5.26863 4.11863 5.35882 4.03824C5.44902 3.95784 5.55 3.89608 5.66177 3.85294C5.77353 3.8098 5.89412 3.78824 6.02353 3.78824C6.29412 3.78824 6.5098 3.85784 6.67059 3.99706C6.83137 4.13627 6.91177 4.31765 6.91177 4.54118C6.91177 4.74118 6.84902 4.9049 6.72353 5.03235C6.59804 5.1598 6.40588 5.31373 6.14706 5.49412C5.93529 5.63922 5.7598 5.8 5.62059 5.97647C5.48137 6.15294 5.41177 6.38627 5.41177 6.67647V6.71471V6.75294C5.41177 7.06275 5.56863 7.21765 5.88235 7.21765ZM6.31176 8.79412C6.18627 8.91177 6.03726 8.97059 5.86471 8.97059C5.69608 8.97059 5.54902 8.91078 5.42353 8.79118C5.29804 8.67157 5.23529 8.52745 5.23529 8.35882C5.23529 8.1902 5.29706 8.04608 5.42059 7.92647C5.54412 7.80686 5.69216 7.74706 5.86471 7.74706C6.03726 7.74706 6.18627 7.80588 6.31176 7.92353C6.43726 8.04118 6.5 8.18627 6.5 8.35882C6.5 8.53137 6.43726 8.67647 6.31176 8.79412Z"
									fill="#808080"
								/>
							</svg>
						</ToolTip>
					</div>
					<Input
						placeholder="Код из СМС"
						id={s.codeSMS_reg}
						isSecure={false}
						onChange={(e) => setCode(e.target.value)}
					/>
					<Label isMini={true} text="Введите цифры из полученого сообщения" />
				</div>
				<BlueButton
					onClick={resendCode}
					className={
						cooldown <= 0
							? `${s.blueButtonRegisterDis_reg} mb-4`
							: s.blueButtonSendCode_reg
					}
					text={`Отправить код повторно ${
						cooldown <= 0 ? '' : `через ${formatCooldown()}`
					}`}
					disabled={cooldown > 0}
				/>
				<BlueButton
					onClick={login}
					className={s.blueButtonRegisterDis_reg}
					text="Войти"
				/>
			</Col>
		</div>
	)
}

export default AcceptCode

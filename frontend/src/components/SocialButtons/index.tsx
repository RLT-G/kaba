import React, {useEffect, useState} from 'react'
import s from './index.module.scss'

//import svg's google, gos, ok, other, telegram, vk, ya
import vk from '../../assets/vk.svg'
import telegram from '../../assets/telegram.svg'
import ok from '../../assets/ok.svg'
import gos from '../../assets/gos.svg'
import google from '../../assets/google.svg'
import other from '../../assets/other.svg'
import ya from '../../assets/ya.svg'
import mir from '../../assets/mir.svg'
import ToolTip from '../ToolTip'

interface ISocialButtons {
	className?: string // Add className prop
}

const SocialButtons: React.FC<ISocialButtons> = ({
	className,
}: ISocialButtons) => {
	const [showOther, setShowOther] = useState(false)
	//ref for other
	const otherRef = React.useRef(null)
	const otherButton = React.useRef(null)

	//handle on click change showOther
	const handleClick = () => {
		setShowOther(!showOther)
		console.log(otherButton.current)
	}

	//On load set position using translate around button
	useEffect(() => {
		// otherRef.current.style.transform = `translate(${otherButton.current.offsetWidth+20}px, ${otherButton.current.offsetHeight-40}px)`;
	})

	return (
		<div className={s.wrapper_socialBtn}>
			<div className={s.socialButtons + ' ' + className}>
				<ToolTip text="Войти через ВКонтакте" top="43px" left="20%">
					<img className={s.socialButton} id="vk" src={vk} alt="VK" />
				</ToolTip>
				<ToolTip text="Войти через Телеграм" top="43px" left="20%">
					<img
						className={s.socialButton}
						id="telegram"
						src={telegram}
						alt="Telegram"
					/>
				</ToolTip>
				<ToolTip text="Войти через ОК" top="43px" left="20%">
					<img className={s.socialButton} id="ok" src={ok} alt="OK" />
				</ToolTip>
				<ToolTip text="Войти через Госуслуги" top="43px" left="20%">
					<img className={s.socialButton} id="gos" src={gos} alt="Gos" />
				</ToolTip>
				<ToolTip text="Войти через Гугл" top="43px" left="20%">
					<img
						className={s.socialButton}
						id="google"
						src={google}
						alt="Google"
					/>
				</ToolTip>
				<ToolTip text="Войти через Яндекс" top="43px" left="20%">
					<img className={s.socialButton} id="ya" src={ya} alt="Yandex" />
				</ToolTip>
			</div>
			<div className={s.other_box}>
				<img
					className={s.socialButton}
					id="other"
					src={other}
					alt="Other"
					ref={otherButton}
					onClick={handleClick}
				/>
				<div
					className={`${s.other} ${showOther ? s.visible : s.hidden}`}
					ref={otherRef}>
					<div className={s.mir}>
						<img src={mir} alt="Mir" className={s['mir-icon']} />
						<p className={s['mir-label']}>Мой мир</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SocialButtons

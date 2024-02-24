import React from 'react'
import s from './index.module.scss'
import NavLabel from '../NavLabel/index'
import DeleteCompany from '../DeleteCompany/index'
import PopUpWrapper from '../PopUpWrapper'
import {useNavigate} from 'react-router-dom'

interface IHeaderCompanyCreate {
	exitFunc?: () => void
}

enum CurrentPopup {
	None,
	Delete,
}

const HeaderCompanyCreate: React.FC<IHeaderCompanyCreate> = ({
	exitFunc,
}: IHeaderCompanyCreate) => {
	const [currentPopup, setCurrentPopup] = React.useState(CurrentPopup.None)

	const onExit = () => {
		// Exit logic here
		
		setCurrentPopup(CurrentPopup.None)
	}
	const navigate = useNavigate()

	return (
		<>
			<div className={s.wrapper}>
				<div className={s.up}>
					<NavLabel text="Создание компании" />
					<svg
						onClick={() => setCurrentPopup(CurrentPopup.Delete)}
						className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
						width="10"
						height="10"
						viewBox="0 0 10 10"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.164743 9.83518C0.240399 9.90666 0.326563 9.95502 0.423234 9.98025C0.519905 10.0055 0.616577 10.0055 0.713248 9.98025C0.809919 9.95502 0.893981 9.90666 0.965434 9.83518L5.00041 5.79829L9.03539 9.83518C9.10684 9.90666 9.1909 9.95502 9.28757 9.98025C9.38425 10.0055 9.48197 10.0065 9.58074 9.98341C9.67951 9.96028 9.76463 9.91087 9.83608 9.83518C9.90753 9.76369 9.95482 9.67959 9.97793 9.58287C10.0011 9.48616 10.0011 9.38944 9.97793 9.29272C9.95482 9.196 9.90753 9.1119 9.83608 9.04042L5.8011 4.99722L9.83608 0.960337C9.90753 0.888851 9.95587 0.804749 9.98109 0.708032C10.0063 0.611315 10.0063 0.514598 9.98109 0.417881C9.95587 0.321164 9.90753 0.237062 9.83608 0.165575C9.76042 0.0898838 9.67426 0.040474 9.57759 0.017346C9.48092 -0.005782 9.38425 -0.005782 9.28757 0.017346C9.1909 0.040474 9.10684 0.0898838 9.03539 0.165575L5.00041 4.20246L0.965434 0.165575C0.893981 0.0898838 0.808869 0.040474 0.710096 0.017346C0.611323 -0.005782 0.513601 -0.005782 0.416929 0.017346C0.320258 0.040474 0.236196 0.0898838 0.164743 0.165575C0.0932906 0.237062 0.0460057 0.321164 0.0228886 0.417881C-0.000228429 0.514598 -0.000228429 0.611315 0.0228886 0.708032C0.0460057 0.804749 0.0932906 0.888851 0.164743 0.960337L4.19972 4.99722L0.164743 9.04042C0.0932906 9.1119 0.0449549 9.196 0.0197363 9.29272C-0.00548231 9.38944 -0.00653308 9.48616 0.016584 9.58287C0.039701 9.67959 0.0890875 9.76369 0.164743 9.83518Z"
							fill="CurrentColor"
						/>
					</svg>
				</div>
				{/* <div className={s.down}>
					<button onClick={switch_1} className={`${s.companiesMenu} ${currentPage === 1 ? s.active : ''}}`}>
						<span className={s.companiesText}>Настройки компании</span>
					</button>
					<button onClick={switch_2} className={`${s.companiesMenu} ${currentPage === 2 ? s.active : ''}}`}>
						<span className={s.companiesText}>Аудитория</span>
						<span className={s.companiesNum}>0</span>
					</button>
					<button onClick={switch_3} className={`${s.companiesMenu} ${currentPage === 3 ? s.active : ''}}`}>
						<span className={s.companiesText}>Баннеры</span>
						<span className={s.companiesNum}>33</span>
					</button>
				</div> */}
			</div>
			{currentPopup === CurrentPopup.Delete && (
				<PopUpWrapper onExit={onExit}>
					<DeleteCompany
						onExit={onExit}
						CreateCompany={true}
						saveFunc={exitFunc}
						resetFunc={() => {
							window.localStorage.removeItem('create_temp')
							navigate('/create')
						}}
						tableDelete={false}
					/>
				</PopUpWrapper>
			)}
		</>
	)
}

export default HeaderCompanyCreate

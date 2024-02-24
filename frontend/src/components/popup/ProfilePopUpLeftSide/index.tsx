import React from 'react'
import s from './index.module.scss'
import Col from '../../Col/index'
import Row from '../../Row'
import NavLabel from '../../NavLabel/index'
import Label from '../../Label/index'
import AccountAvatar from '../../AccountAvatar/index'
import Line from '../../Line'
// import { useDispatch, useSelector } from 'react-redux';

interface IProfilePopUpLeftSide {
	className?: string // Added className prop
}

const ProfilePopUpLeftSide: React.FC<
	IProfilePopUpLeftSide
> = ({}: IProfilePopUpLeftSide) => {
	//   const dispatch = useDispatch();
	//   const user = useSelector((state: any) => state.user);

	return (
		<div className={s.wrapper}>
			<Col className={s.profileContainer} width="276px">
				<Row width="174px" className={s.addAccWrapper}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M13.966 10.6366C14.6052 10.6366 15.188 10.4609 15.7144 10.1094C16.2408 9.75789 16.6611 9.2897 16.9754 8.70481C17.2896 8.11991 17.4467 7.47323 17.4467 6.76476C17.4467 6.06178 17.291 5.42609 16.9794 4.85767C16.6679 4.28924 16.2489 3.83753 15.7225 3.50252C15.1961 3.16751 14.6106 3 13.966 3C13.3321 3 12.7507 3.17025 12.2216 3.51076C11.6925 3.85126 11.2708 4.30709 10.9566 4.87826C10.6423 5.44943 10.4852 6.08375 10.4852 6.78124C10.4906 7.48421 10.6504 8.12815 10.9646 8.71304C11.2789 9.29794 11.6992 9.76476 12.2256 10.1135C12.752 10.4622 13.3321 10.6366 13.966 10.6366ZM12.0806 18.2568H19.026C20.342 18.2568 21 17.8174 21 16.9387C21 16.4005 20.8402 15.8265 20.5206 15.2169C20.201 14.6073 19.7363 14.032 19.1267 13.4911C18.517 12.9501 17.7771 12.5094 16.9069 12.1689C16.0367 11.8284 15.0564 11.6581 13.966 11.6581C13.2355 11.6581 12.5546 11.7391 11.9235 11.9011C11.2923 12.0632 10.7189 12.2842 10.2032 12.5643C10.3697 12.7016 10.5295 12.8485 10.6826 13.005C10.8357 13.1616 10.9794 13.3304 11.1137 13.5117C11.5058 13.3249 11.9409 13.1767 12.419 13.0668C12.897 12.957 13.4127 12.9021 13.966 12.9021C14.8899 12.9021 15.7077 13.038 16.4194 13.3098C17.1312 13.5817 17.7314 13.9236 18.2202 14.3355C18.709 14.7474 19.0783 15.1744 19.3281 15.6165C19.5779 16.0586 19.7028 16.4471 19.7028 16.7822C19.7028 16.87 19.6799 16.9304 19.6343 16.9634C19.5886 16.9963 19.5148 17.0128 19.4127 17.0128H12.282C12.2766 17.227 12.2578 17.4384 12.2256 17.6471C12.1934 17.8558 12.145 18.059 12.0806 18.2568ZM12.8823 9.04256C13.2126 9.27597 13.5739 9.39268 13.966 9.39268C14.3635 9.39268 14.7274 9.2746 15.0577 9.03844C15.3881 8.80229 15.6526 8.48513 15.8514 8.08696C16.0501 7.68879 16.1495 7.24805 16.1495 6.76476C16.1495 6.28696 16.0515 5.85721 15.8554 5.47551C15.6594 5.09382 15.3961 4.79314 15.0658 4.57346C14.7355 4.35378 14.3688 4.24394 13.966 4.24394C13.5685 4.24394 13.2046 4.35652 12.8742 4.58169C12.5439 4.80686 12.2793 5.1103 12.0806 5.49199C11.8818 5.87368 11.7825 6.30343 11.7825 6.78124C11.7825 7.26453 11.8832 7.70389 12.0846 8.09931C12.286 8.49474 12.5519 8.80915 12.8823 9.04256ZM7.09311 21C7.64637 21 8.1701 20.8902 8.66428 20.6705C9.15846 20.4508 9.5949 20.1487 9.97359 19.7643C10.3523 19.3799 10.6491 18.935 10.8639 18.4297C11.0788 17.9245 11.1862 17.3863 11.1862 16.8151C11.1862 16.2384 11.0801 15.6975 10.8679 15.1922C10.6558 14.687 10.3617 14.2421 9.98568 13.8577C9.60967 13.4732 9.17457 13.1725 8.68039 12.9556C8.18621 12.7387 7.65712 12.6302 7.09311 12.6302C6.53447 12.6302 6.00806 12.7387 5.51388 12.9556C5.0197 13.1725 4.5846 13.4746 4.20859 13.8618C3.83259 14.249 3.53715 14.6938 3.32229 15.1963C3.10743 15.6989 3 16.2384 3 16.8151C3 17.3918 3.10743 17.9327 3.32229 18.438C3.53715 18.9432 3.83259 19.3881 4.20859 19.7725C4.5846 20.157 5.0197 20.4577 5.51388 20.6746C6.00806 20.8915 6.53447 21 7.09311 21ZM6.73456 19.2947C6.82319 19.3881 6.9427 19.4348 7.09311 19.4348C7.24351 19.4348 7.36303 19.3881 7.45166 19.2947C7.54029 19.2014 7.5846 19.0805 7.5846 18.9323V17.3176H9.16383C9.30886 17.3176 9.42704 17.2723 9.51835 17.1817C9.60967 17.0911 9.65533 16.9689 9.65533 16.8151C9.65533 16.6613 9.60967 16.5391 9.51835 16.4485C9.42704 16.3579 9.30886 16.3126 9.16383 16.3126H7.5846V14.6979C7.5846 14.5497 7.54029 14.4288 7.45166 14.3355C7.36303 14.2421 7.24351 14.1954 7.09311 14.1954C6.9427 14.1954 6.82319 14.2421 6.73456 14.3355C6.64593 14.4288 6.60161 14.5497 6.60161 14.6979V16.3126H5.02238C4.87735 16.3126 4.75918 16.3579 4.66786 16.4485C4.57654 16.5391 4.53089 16.6613 4.53089 16.8151C4.53089 16.9689 4.57654 17.0911 4.66786 17.1817C4.75918 17.2723 4.87735 17.3176 5.02238 17.3176H6.60161V18.9323C6.60161 19.0805 6.64593 19.2014 6.73456 19.2947Z"
							fill="#4169E1"
						/>
					</svg>
					<a href="#!" className={s.blueLink}>
						Добавить аккаунт
					</a>
				</Row>
				<Line width="212px" className={s.line} />
				<div className={s.AccountLineWrapper}>
					<Row className={s.AccountLine} width="196px">
						<AccountAvatar className={s.AccountAvatar} char={'B'} />
						<Col className={s.AccountText} width="128px">
							<NavLabel className={s.AccountName} text="Александр Иванов" />
							<Row width="128px">
								<Label isMini={true} text="@itsaloginexample1" />
							</Row>
						</Col>
					</Row>
				</div>
				<Line width="212px" className={s.line} />
				<div className={s.AccountLineWrapper}>
					<Row className={s.AccountLine} width="196px">
						<AccountAvatar className={s.AccountAvatar} char={'B'} />
						<Col className={s.AccountText} width="128px">
							<NavLabel className={s.AccountName} text="Александр Иванов" />
							<Row width="128px">
								<Label isMini={true} text="@itsaloginexample1" />
							</Row>
						</Col>
					</Row>
				</div>
				<Line width="212px" className={s.line} />
				<div className={s.AccountLineWrapper}>
					<Row className={s.AccountLine} width="196px">
						<AccountAvatar className={s.AccountAvatar} char={'B'} />
						<Col className={s.AccountText} width="128px">
							<NavLabel className={s.AccountName} text="Александр Иванов" />
							<Row width="128px">
								<Label isMini={true} text="@itsaloginexample1" />
							</Row>
						</Col>
					</Row>
				</div>
				<Line width="212px" className={s.line} />
				<div className={s.AccountLineWrapper}>
					<Row className={s.AccountLine} width="196px">
						<AccountAvatar className={s.AccountAvatar} char={'B'} />
						<Col className={s.AccountText} width="128px">
							<NavLabel className={s.AccountName} text="Александр Иванов" />
							<Row width="128px">
								<Label isMini={true} text="@itsaloginexample1" />
							</Row>
						</Col>
					</Row>
				</div>
				<Line width="212px" className={s.line} />
				<div className={s.AccountLineWrapper}>
					<Row className={s.AccountLine} width="196px">
						<AccountAvatar className={s.AccountAvatar} char={'B'} />
						<Col className={s.AccountText} width="128px">
							<NavLabel className={s.AccountName} text="Александр Иванов" />
							<Row width="128px">
								<Label isMini={true} text="@itsaloginexample1" />
							</Row>
						</Col>
					</Row>
				</div>
			</Col>
		</div>
	)
}

export default ProfilePopUpLeftSide

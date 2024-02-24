import * as React from 'react'
import s from './index.module.scss'
import Col from '../../Col'
import Row from '../../Row'
import Line from '../../Line/index'
import Rating from '@mui/material/Rating'
import {styled} from '@mui/material/styles'
import ButtonSVG from '../../ButtonSVG/index'
import BlueButton from '../../BlueButton/index'
import { useSelector } from 'react-redux'
import { rate } from '../../../api/data.api'

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#faaf00',
	},
	'& .MuiRating-iconHover': {
		color: '#faaf00',
	},
})

interface IRatePopUp {
	onExit?: () => void
}

const RatePopUp: React.FC = ({onExit}: IRatePopUp) => {
	const user = useSelector((state: any) => state.user)
	const token = user?.token
	const isBlogger = useSelector((state: any) => state.isBlogger)
	const [value, setValue] = React.useState<number>(0)
	const [rateInput, setRateInput] = React.useState<string>('')
	async function sendDataRate() {
		let locationPath = window.location.pathname
		if (locationPath === '/' && !isBlogger) {
			locationPath = window.location.pathname + 'company'
		} else if (locationPath === '/' && isBlogger) {
			locationPath = window.location.pathname + 'mybanners'
		}

		let res = await rate(token, rateInput, value, locationPath)
		setValue(0)
		setRateInput('')
		onExit()
	}
	return (
		<div className={s.wrapper}>
			<Col width="248px" className={s.containerRate}>
				<Row className={s.headerRate} width="248px">
					<span>Оценить</span>
					<button onClick={onExit}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none">
							<path
								d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
								fill="CurrentColor"
							/>
						</svg>
					</button>
				</Row>
				<Line width="280px" className={s.LineHeader} />
				<StyledRating
					className={s.RatingStars}
					// defaultValue={4}
					value={value}
					onChange={(_event, newValue) => {
						setValue(newValue)
					}}
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none">
							<path
								d="M12.602 30.8104C12.8254 30.9763 13.0775 31.0333 13.3586 30.9815C13.6396 30.9297 13.9458 30.7897 14.2772 30.5617L19.9946 26.5292L25.7228 30.5617C26.0542 30.7897 26.3604 30.9297 26.6414 30.9815C26.9225 31.0333 27.1746 30.9763 27.398 30.8104C27.6214 30.6515 27.7565 30.4373 27.8033 30.1677C27.8501 29.8982 27.8051 29.5769 27.6682 29.2037L25.4093 22.7559L31.1808 18.7753C31.5194 18.5473 31.7536 18.3123 31.8833 18.0704C32.013 17.8285 32.0346 17.5797 31.9481 17.324C31.8617 17.0753 31.6923 16.8887 31.4402 16.7643C31.188 16.6399 30.8529 16.5811 30.435 16.588L23.3559 16.6295L21.2051 10.1506C21.0754 9.77055 20.9115 9.48376 20.7133 9.29025C20.5152 9.09675 20.2756 9 19.9946 9C19.7208 9 19.4848 9.09675 19.2867 9.29025C19.0885 9.48376 18.9246 9.77055 18.7949 10.1506L16.6441 16.6295L9.56498 16.588C9.14708 16.5811 8.81203 16.6399 8.55985 16.7643C8.30766 16.8887 8.13834 17.0753 8.05188 17.324C7.96541 17.5797 7.98703 17.8285 8.11673 18.0704C8.24642 18.3123 8.48059 18.5473 8.81924 18.7753L14.5907 22.7559L12.3318 29.2037C12.1949 29.5769 12.1499 29.8982 12.1967 30.1677C12.2435 30.4373 12.3786 30.6515 12.602 30.8104Z"
								fill="#F3A63B"
							/>
						</svg>
					}
					emptyIcon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none">
							<path
								d="M12.602 30.8104C12.8254 30.9763 13.0775 31.0333 13.3586 30.9815C13.6396 30.9297 13.9458 30.7897 14.2772 30.5617L19.9946 26.5292L25.7228 30.5617C26.0542 30.7897 26.3604 30.9297 26.6414 30.9815C26.9225 31.0333 27.1746 30.9763 27.398 30.8104C27.6214 30.6515 27.7565 30.4373 27.8033 30.1677C27.8501 29.8982 27.8051 29.5769 27.6682 29.2037L25.4093 22.7559L31.1808 18.7753C31.5194 18.5473 31.7536 18.3123 31.8833 18.0704C32.013 17.8285 32.0346 17.5797 31.9481 17.324C31.8617 17.0753 31.6923 16.8887 31.4402 16.7643C31.188 16.6399 30.8529 16.5811 30.435 16.588L23.3559 16.6295L21.2051 10.1506C21.0754 9.77055 20.9115 9.48376 20.7133 9.29025C20.5152 9.09675 20.2756 9 19.9946 9C19.7208 9 19.4848 9.09675 19.2867 9.29025C19.0885 9.48376 18.9246 9.77055 18.7949 10.1506L16.6441 16.6295L9.56498 16.588C9.14708 16.5811 8.81203 16.6399 8.55985 16.7643C8.30766 16.8887 8.13834 17.0753 8.05188 17.324C7.96541 17.5797 7.98703 17.8285 8.11673 18.0704C8.24642 18.3123 8.48059 18.5473 8.81924 18.7753L14.5907 22.7559L12.3318 29.2037C12.1949 29.5769 12.1499 29.8982 12.1967 30.1677C12.2435 30.4373 12.3786 30.6515 12.602 30.8104Z"
								fill="#474747"
							/>
						</svg>
					}
					size="large"
				/>
				<textarea
					name="About"
					id="About"
					placeholder="Расскажите, что мы можем улучшить"
					value={rateInput}
					onChange={(e) => setRateInput(e.target.value)}
					className={s.textareaRate}></textarea>
				<Row className={s.buttonWrapper} width="248px">
					<div></div>
					<BlueButton
						onClick={() => sendDataRate()}
						width="120px"
						text="Отправить"
					/>
				</Row>
			</Col>
		</div>
	)
}

export default RatePopUp

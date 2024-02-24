import React from 'react'
import s from './index.module.scss'
import Col from '../Col'
import Row from '../Row'
import Label from '../Label'
import WhiteLabel from '../WhiteLabel'

type Step = {
	title: string
	isDone?: boolean
	isError?: boolean
}

interface IStepsInfo {
	steps: Step[]
}

/**
 * Renders a component that displays information about the steps.
 *
 * @param {IStepsInfo} steps - The steps object containing an array of step objects and a className string.
 * @param {string} className - The className string to be applied to the component.
 * @return {ReactElement} The rendered component.
 */
const StepsInfo: React.FC<IStepsInfo> = ({steps}: IStepsInfo) => {
	// const colClassName = `col ${className}`; // Combine className with "col" class using s[className]

	return (
		<Col width="246px" className={s.stepsInfo}>
			{steps.map((step, index) => (
				<Row width="246px" key={index} className={s.stepRow}>
					{step.isDone ? (
						<>
							<WhiteLabel
								size="14px"
								text={step.title}
								className={s.stepTitle}
							/>
							<svg
								className={s.stepDone}
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<path
									d="M11.5 5.5L6.6875 10.5L4.5 8.22727"
									stroke="#F2F2F2"
									stroke-width="1.4"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</>
					) : step.isError ? (
						<>
							<WhiteLabel
								size="14px"
								text={step.title}
								className={s.stepTitleRed}
							/>

							<svg
							className={s.stepDone}
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g id="Group 4 Copy 14">
									<g id="&#244;&#128;&#129;&#158;">
										<path
											id="Shape"
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M15.4721 20.2941C14.3868 20.7647 13.2294 21 12 21C10.7706 21 9.61324 20.7647 8.52794 20.2941C7.44265 19.8235 6.48529 19.1735 5.65588 18.3441C4.82647 17.5147 4.17647 16.5574 3.70588 15.4721C3.23529 14.3868 3 13.2294 3 12C3 10.7706 3.23529 9.61324 3.70588 8.52794C4.17647 7.44265 4.825 6.48529 5.65147 5.65588C6.47794 4.82647 7.43382 4.17647 8.51912 3.70588C9.60441 3.23529 10.7618 3 11.9912 3C13.2206 3 14.3794 3.23529 15.4676 3.70588C16.5559 4.17647 17.5147 4.82647 18.3441 5.65588C19.1735 6.48529 19.8235 7.44265 20.2941 8.52794C20.7647 9.61324 21 10.7706 21 12C21 13.2294 20.7647 14.3868 20.2941 15.4721C19.8235 16.5574 19.1735 17.5147 18.3441 18.3441C17.5147 19.1735 16.5574 19.8235 15.4721 20.2941ZM9.07941 18.9176C9.98529 19.3059 10.9588 19.5 12 19.5C13.0412 19.5 14.0162 19.3059 14.925 18.9176C15.8338 18.5294 16.6309 17.9926 17.3162 17.3074C18.0015 16.6221 18.5368 15.8265 18.9221 14.9206C19.3074 14.0147 19.5 13.0412 19.5 12C19.5 10.9588 19.3059 9.98529 18.9176 9.07941C18.5294 8.17353 17.9912 7.37647 17.3029 6.68824C16.6147 6 15.8176 5.46324 14.9118 5.07794C14.0059 4.69265 13.0324 4.5 11.9912 4.5C10.95 4.5 9.97647 4.69265 9.07059 5.07794C8.16471 5.46324 7.37059 6 6.68824 6.68824C6.00588 7.37647 5.47206 8.17353 5.08676 9.07941C4.70147 9.98529 4.50882 10.9588 4.50882 12C4.50882 13.0412 4.70147 14.0147 5.08676 14.9206C5.47206 15.8265 6.00735 16.6221 6.69265 17.3074C7.37794 17.9926 8.17353 18.5294 9.07941 18.9176ZM11.9912 13.5882C12.4324 13.5882 12.6559 13.3559 12.6618 12.8912L12.7941 8.23235C12.8 8.00882 12.725 7.82206 12.5691 7.67206C12.4132 7.52206 12.2176 7.44706 11.9824 7.44706C11.7412 7.44706 11.5456 7.52059 11.3956 7.66765C11.2456 7.81471 11.1735 8 11.1794 8.22353L11.2941 12.8912C11.3059 13.3559 11.5382 13.5882 11.9912 13.5882ZM12.6574 16.1912C12.4662 16.3676 12.2441 16.4559 11.9912 16.4559C11.7324 16.4559 11.5088 16.3662 11.3206 16.1868C11.1324 16.0074 11.0382 15.7912 11.0382 15.5382C11.0382 15.2853 11.1324 15.0691 11.3206 14.8897C11.5088 14.7103 11.7324 14.6206 11.9912 14.6206C12.25 14.6206 12.4735 14.7088 12.6618 14.8853C12.85 15.0618 12.9441 15.2794 12.9441 15.5382C12.9441 15.7971 12.8485 16.0147 12.6574 16.1912Z"
											fill="#F3553E"
										/>
									</g>
								</g>
							</svg>
						</>
					) : (
						<>
							<Label text={step.title} className={s.stepTitleGrey} />
						</>
					)}
				</Row>
			))}
		</Col>
	)
}

export default StepsInfo

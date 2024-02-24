import React, {ReactNode} from 'react'
import s from './index.module.scss'
import Col from '../../Col/index';
import Row from '../../Row/index';
import NavLabel from '../../NavLabel/index';


interface IStatusAccDropDown {
	className?: string // Add className property
	

	// Circle for Drop Down Menu. Max 4 elements
	circle_color_dw_1?: boolean // Green = True , Red = False
	circle_color_dw_2?: boolean // Green = True , Red = False
	circle_color_dw_3?: boolean // Green = True , Red = False
	circle_color_dw_4?: boolean // Green = True , Red = False

	// Text For Drop Down. Max 4 elements
	text_dw_1?: string
	text_dw_2?: string
	text_dw_3?: string
	text_dw_4?: string
}

const StatusSitePopUp: React.FC<IStatusAccDropDown> = ({
	className,

	circle_color_dw_1,
	circle_color_dw_2,
	circle_color_dw_3,
	circle_color_dw_4,
	text_dw_1,
	text_dw_2,
	text_dw_3,
	text_dw_4,
}: IStatusAccDropDown) => {


	return (
		<div className={s.OneBlockList + ' ' + className}>
			
				<Col width="276px" className={s.ListInside}>
					<Row width="248px" className={s.ListInsideRow}>
						{circle_color_dw_1 ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<rect x="4" y="4" width="8" height="8" rx="4" fill="#57BD53" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<rect x="4" y="4" width="8" height="8" rx="4" fill="#F3553E" />
							</svg>
						)}
						<NavLabel className={s.NavLabelListInside} text={`${text_dw_1}`} />
					</Row>
					<Row width="248px" className={s.ListInsideRow}>
						{circle_color_dw_2 ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<rect x="4" y="4" width="8" height="8" rx="4" fill="#57BD53" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<rect x="4" y="4" width="8" height="8" rx="4" fill="#F3553E" />
							</svg>
						)}
						<NavLabel className={s.NavLabelListInside} text={`${text_dw_2}`} />
					</Row>
					<Row width="248px" className={s.ListInsideRow}>
						{circle_color_dw_3 ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<rect x="4" y="4" width="8" height="8" rx="4" fill="#57BD53" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<rect x="4" y="4" width="8" height="8" rx="4" fill="#F3553E" />
							</svg>
						)}
						<NavLabel className={s.NavLabelListInside} text={`${text_dw_3}`} />
					</Row>
					<Row width="248px" className={s.ListInsideRow}>
						{circle_color_dw_4 ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<rect x="4" y="4" width="8" height="8" rx="4" fill="#57BD53" />
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none">
								<rect x="4" y="4" width="8" height="8" rx="4" fill="#F3553E" />
							</svg>
						)}
						<NavLabel className={s.NavLabelListInside} text={`${text_dw_4}`} />
					</Row>
				</Col>
		</div>
	)
}

export default StatusSitePopUp

import React from 'react'
import s from './index.module.scss'
import Col from '../Col/index'
import Row from '../Row'

import Label from '../Label/index'

import Clicks from '../Clicks/index'
import WhiteLabel from '../WhiteLabel/index'
import ButtonSVG from '../ButtonSVG'

interface ICourseForBlogger {
	className?: string // Added className prop
	text_course_table?: string
	text_id_table?: string
	width_block?: string
	width_text?: string
	NeedClicks?: boolean
	svg?: React.ReactNode
	title?: string
	id?: string
	ooo?: string
	link?: string
	see_link?: string
	tin?: string
	cut_link?:boolean
}

const CourseForBlogger: React.FC<ICourseForBlogger> = ({
	className,
	width_block,
	width_text,
	NeedClicks,
	svg,
	title,
	id,
	ooo,
	link,
	see_link,
	tin,
	cut_link,
}: ICourseForBlogger) => {
	return (
		<div className={s.wrapper + ' ' + className}>
			<Col
				width={`${width_block ? width_block : '528px'}`}
				className={s.BlogerHeader}>
				<Row
					width={`${width_block ? width_block : '528px'}`}
					className={s.BlogerHeaderUp}>
					<img src={svg} alt={svg} className="w-[36px] h-[36px] mr-[16px]" />
					<Col width={`${width_text ? width_text : '316px'}`} className="mr-4">
						<WhiteLabel text={title} size="14px" />
						<Row width="316px" className="whitespace-nowrap">
							<Label className="mr-2" text={`ID ${id}`} />
							{NeedClicks ? (
								<Clicks className={s.Clicks} count={245} />
							) : (
								<>
									<Label text={ooo} className="mr-2" />
									<Label text={`ИНН ${tin}`} />
								</>
							)}
						</Row>
					</Col>
					{/* <Row width="auto" className={s.BlogerButtons}>
						<ButtonSVG text="Удалить" className="mr-2" />
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="36"
								height="36"
								viewBox="0 0 36 36"
								fill="none">
								<rect width="36" height="36" rx="8" fill="#4169E1" />
								<path
									d="M12.9436 26C13.1573 26 13.3591 25.9391 13.549 25.8172C13.7389 25.6954 14.0356 25.4704 14.4392 25.1422L17.9199 22.2704C17.9733 22.2207 18.0267 22.2207 18.0801 22.2704L21.5608 25.1422C21.9644 25.4654 22.2596 25.6892 22.4466 25.8135C22.6335 25.9378 22.8368 26 23.0564 26C23.3531 26 23.5846 25.9204 23.7507 25.7613C23.9169 25.6022 24 25.3784 24 25.09V12.1408C24 11.4297 23.7893 10.8951 23.368 10.5371C22.9466 10.179 22.3175 10 21.4807 10H14.5193C13.6825 10 13.0534 10.179 12.632 10.5371C12.2107 10.8951 12 11.4297 12 12.1408V25.09C12 25.3784 12.0831 25.6022 12.2493 25.7613C12.4154 25.9204 12.6469 26 12.9436 26Z"
									fill="#F2F2F2"
								/>
							</svg>
						</button>
					</Row> */}
				</Row>
				{cut_link ? (
					<>
						<a href={link} className={s.blueLink}>
							{see_link.length > 70
								? `${see_link.substring(0, 70)}...`
								: see_link}
						</a>
					</>
				) : (
					<>
						<a href={link} className={s.blueLink}>
							{see_link}
						</a>
					</>
				)}
			</Col>
		</div>
	)
}

export default CourseForBlogger

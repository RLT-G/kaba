import React from 'react'
import s from './index.module.scss'
import Col from '../Col/index'
import Row from '../Row'
import NavLabel from '../NavLabel/index'
import Label from '../Label/index'

import Clicks from '../Clicks/index'

import CourseForBlogger from '../CourseForBlogger/index'

export interface IContentBanner {
	className?: string // Added className prop
	text_course_table?: string
	text_id_table?: string
	bloger?: boolean
	bloger_svg?: React.ReactNode
	bloger_title?: string
	bloger_id?: string
	bloger_ooo?: string
	bloger_link?: string
	onExit?: () => void
	arrayVariantDesc?: string[]
	arrayVariantTitle?: string[]
	arrayVariatImg?: string[]
	see_link?: string
	tin?:string
	cut_link?:boolean
}

const ContentBanner: React.FC<IContentBanner> = ({
	className,
	text_id_table,
	text_course_table,
	bloger,
	onExit,
	bloger_link,
	bloger_svg,
	arrayVariantDesc,
	arrayVariantTitle,
	arrayVariatImg,
	see_link,
	bloger_ooo,
	tin,
	cut_link,
}: IContentBanner) => {
	return (
		<div className={s.wrapper}>
			<Col className={s.contentBanner} width="528px">
				<Row className={s.headerBanner} width="528px">
					<NavLabel className={s.navLabel} text="Контент баннера" />
					<svg
						onClick={onExit}
						className="cursor-pointer"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
							fill="#808080"
						/>
					</svg>
				</Row>
				{bloger ? (
					<CourseForBlogger
						cut_link={cut_link}
						NeedClicks={false}
						svg={bloger_svg}
						title={text_course_table}
						id={text_id_table}
						ooo={bloger_ooo}
						link={bloger_link}
						see_link={see_link}
						tin={tin}
					/>
				) : (
					<div className={s.TableContainer}>
						<Row width="528px" className={s.TableMenu}>
							<Col width="178px" className={s.TableText}>
								<p>{text_course_table}</p>
								<Label isMini={true} text={text_id_table} />
							</Col>
							<Clicks count={`+${245}`} />
						</Row>
					</div>
				)}
				<Col className={s.variantTextCol} width="528px">
					<Label text="Варианты текста" className={s.Label} />
					<Row width="528px">
						<div className={s.variantTextWrapperLeft}>
							{arrayVariantDesc &&
								arrayVariantDesc.map((item, index) => (
									<div key={index} className={s.variantTextBlock}>
										<Row width="auto" className={s.TitleHeaderInsideBlock}>
											<Label isMini={true} text="Описание" />
											<svg
												onClick={() =>
													navigator.clipboard.writeText(
														item
															.slice(item.indexOf("'text':"), item.length - 1)
															.replace("'text': ", '')
															.replace("'", '')
															.replace("'", '')
															.replace('"', '')
															.replace('"', ''),
													)
												}
												className="cursor-pointer"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none">
												<rect width="24" height="24" rx="7" fill="#262626" />
												<rect
													x="10.2002"
													y="10.2031"
													width="7.8"
													height="7.8"
													rx="1.2"
													stroke="#F2F2F2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M7.8 13.8H7.2C6.53726 13.8 6 13.2627 6 12.6V7.2C6 6.53726 6.53726 6 7.2 6H12.6C13.2627 6 13.8 6.53726 13.8 7.2V7.8"
													stroke="#F2F2F2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</Row>
										<span className={s.variantTextSpan}>
											{item
												.slice(item.indexOf("'text':"), item.length - 1)
												.replace("'text': ", '')
												.replace("'", '')
												.replace("'", '')
												.replace('"', '')
												.replace('"', '')}
										</span>
									</div>
								))}

							{arrayVariantTitle &&
								arrayVariantTitle.map((item, index) => (
									<div key={index} className={s.variantTextBlock}>
										<Row width="auto" className={s.TitleHeaderInsideBlock}>
											<Label isMini={true} text="Заголовок" />
											<svg
												onClick={() =>
													navigator.clipboard.writeText(
														item
															.slice(item.indexOf("'text':"), item.length - 1)
															.replace("'text': ", '')
															.replace("'", '')
															.replace("'", '')
															.replace('"', '')
															.replace('"', ''),
													)
												}
												className="cursor-pointer"
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none">
												<rect width="24" height="24" rx="7" fill="#262626" />
												<rect
													x="10.2002"
													y="10.2031"
													width="7.8"
													height="7.8"
													rx="1.2"
													stroke="#F2F2F2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M7.8 13.8H7.2C6.53726 13.8 6 13.2627 6 12.6V7.2C6 6.53726 6.53726 6 7.2 6H12.6C13.2627 6 13.8 6.53726 13.8 7.2V7.8"
													stroke="#F2F2F2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</Row>
										<span className={s.variantTextSpan}>
											{item
												.slice(item.indexOf("'text':"), item.length - 1)
												.replace("'text': ", '')
												.replace("'", '')
												.replace("'", '')
												.replace('"', '')
												.replace('"', '')}
										</span>
									</div>
								))}
						</div>
					</Row>
				</Col>
				{/* <Col width="528px" className={s.variantVideo}>
					<NavLabel text="Варианты видео" className={s.navLabel} />
					<Row width="528px">
						<iframe
							width="256"
							height="144"
							src=""
							title="Video 1"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className={s.videoPlayers}></iframe>
						<iframe
							width="256"
							height="144"
							src=""
							title="Video 2"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className={s.videoPlayers}></iframe>
					</Row>
				</Col> */}
				<Col width="528px" className={s.variantImg}>
					<Label text="Варианты изображений" className={s.Label} />
					<Row className={s.variantImgWrapper} width="528px">
						{arrayVariatImg &&
							arrayVariatImg.map((item, index) => (
								<img
									key={index}
									src={`http://localhost:5000${item}`}
									alt={item}
									className={s.imgPlayers}
								/>
							))}
					</Row>
				</Col>
				{/* <Col width="528px" className={s.variantAudio}>
					<NavLabel text="Варианты аудио" className={s.navLabel} />
				</Col> */}
			</Col>
		</div>
	)
}

export default ContentBanner

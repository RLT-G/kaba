import React from 'react'
import s from './index.module.scss'
import Col from '../Col'
import NavLabel from '../NavLabel/index'
import Label from '../Label'
import 'react-slideshow-image/dist/styles.css'
import {Slide} from 'react-slideshow-image'
import Row from '../Row'

// const spanStyle = {
//     padding: '20px',
//     background: '#efefef',
//     color: '#000000'
//   }

const divStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundSize: 'cover',
	height: '936px',
}
const slideImages = [
	{
		url: 'https://placehold.co/1120x936',
		caption: 'Slide 1',
		id: 1,
	},
	{
		url: 'https://placehold.co/1120x936',
		caption: 'Slide 2',
		id: 2,
	},
	{
		url: 'https://placehold.co/1120x936',
		caption: 'Slide 3',
		id: 3,
	},
]

const VariantIMGSlider: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<Col className={s.sliderContainer} width="100%">
				<Col width="100%" className={s.header}>
					<NavLabel className={s.navLabel} text="Заголовок текст текст текст" />
					<Label isMini={true} text="Название файла_т… мелкий.mp4" />
				</Col>
				<div className="slide-container">
					<Slide
						nextArrow={
							<button style={{paddingRight: '16px'}}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="36"
									height="36"
									viewBox="0 0 36 36"
									fill="none">
									<rect width="36" height="36" rx="18" fill="#333333" />
									<path
										d="M16.5 23L21.5 18L16.5 13"
										stroke="white"
										strokeWidth="1.4"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						}
						prevArrow={
							<button style={{paddingLeft: '16px'}}>
								<svg
									width="36"
									height="36"
									viewBox="0 0 36 36"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<rect width="36" height="36" rx="18" fill="#333333" />
									<path
										d="M19.5 23L14.5 18L19.5 13"
										stroke="white"
										strokeWidth="1.4"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						}>
						{slideImages.map((slideImage, index) => (
							<div key={index}>
								<div
									style={{
										...divStyle,
										backgroundImage: `url(${slideImage.url})`,
									}}>
									{/* <span style={spanStyle}>{slideImage.caption}</span> */}
								</div>
							</div>
						))}
					</Slide>
				</div>
				<div className={s.Footer}>
					<Row className={s.footerRow} width="auto">
						<NavLabel className={s.navLabel} text="Варианты изображение" />
						<Label isMini={true} text="2 из 6" />
					</Row>
				</div>
			</Col>
		</div>
	)
}

export default VariantIMGSlider

import React from 'react'
import s from './index.module.scss'
import Row from '../Row'
import Col from '../Col'
import NavLabel from '../NavLabel/index'
import Line from '../Line'
import Label from '../Label'
import AuditorNBannersComponent from '../AudNBanComponent/index'

interface IAuditorNBanners {
	className?: string // Added className prop
	style?: React.CSSProperties
	auditories?: any
	banners?: any
}

const AuditorNBanners: React.FC<IAuditorNBanners> = ({
	style,
	className,
	auditories,
	banners,
}: IAuditorNBanners) => {
	return (
		<div className={s.wrapper + ' ' + className} style={style}>
			<Row width="560px">
				<Col className={s.AuditorWrapper} width="248px">
					<Row className={s.AuditorHeader} width="248px">
						<NavLabel className={s.navLabelTitle} text="Аудитории" />
						<a href="#!" className={s.blueLink}>
							Перейти
						</a>
					</Row>
					<Line width="560px" className={s.Line} />
					{auditories.map((item, index) => (
						<>
							{index !== 0 ? (
								<Line width="560px" className={s.Line_Aud} />
							) : null}
							<Col width="248px">
								<NavLabel className={s.navLabel} text={`${item.name}`} />
								<Label
									className={s.Label}
									isMini={true}
									text={`ID${item.id} `}
								/>
							</Col>
							{auditories.length - 1 !== index ? (
								<Line width="560px" className={s.Line_Aud} />
							) : null}
						</>
					))}
				</Col>

				{/* Banners */}
				<Col className={s.BannerWrapper} width="248px">
					<Row className={s.BannerHeader} width="248px">
						<NavLabel className={s.navLabelTitle} text="Баннеры" />
						<a href="#!" className={s.blueLink}>
							Перейти
						</a>
					</Row>
					{/* <Col className={s.RightCol} width="248px"> */}
					<Line width="0px" className={s.Line} />

					{banners.map((item, index) => (
						<>
							{index !== 0 ? (
								<Line width="280px" className={s.Line_Ban} />
							) : null}
							<AuditorNBannersComponent title={item.name} id={`ID${item.id}`} />
							{banners.length - 1 !== index ? (
								<Line width="280px" className={s.Line_Ban} />
							) : null}
						</>
					))}

					{/* </Col> */}
				</Col>
			</Row>
			<Line width="393px" className={s.LineHeight} />
		</div>
	)
}

export default AuditorNBanners

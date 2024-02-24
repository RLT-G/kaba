import React from 'react'
import s from './index.module.scss'
import Col from '../Col'
import Row from '../Row'

const InfoCompany: React.FC = () => {
	return (
		<div className={s.wrapper}>
			<Col width="270px" className={s.infoContainer}>
				<span style={{marginBottom: '16px'}}>
					Пояснение — пояснение Поясн ение пояснение. Пояснение{' '}
					<a href="#!" className={s.blueLink}>
						пояснение
					</a>{' '}
					Пояснение пояс нение
				</span>
				<a href="#!" style={{marginBottom: '16px'}} className={s.blueLink}>
					Пояснение в видео
				</a>
				<a href="#!" style={{marginBottom: '16px'}} className={s.blueLink}>
					Подробнее в справка
				</a>
				<Col width="236px">
					<Row width="236px" className={s.RowList}>
						<span>1.</span>
						<span>Пункт</span>
					</Row>
					<Row width="236px" className={s.RowList}>
						<span>2.</span>
						<span>Пункт</span>
					</Row>
					<Row width="236px" className={s.RowList}>
						<span>3.</span>
						<span>Пункт</span>
					</Row>
				</Col>
			</Col>
		</div>
	)
}

export default InfoCompany

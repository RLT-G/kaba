import React, {useEffect} from 'react'
import s from './index.module.scss'
import NavLabel from '../../NavLabel/index'
import Row from '../../Row'
import Col from '../../Col'
import CheckBox from '../../CheckBox'
import Label from '../../Label'
import Line from '../../Line'

interface ICompany {
	id: number
	name: string
	date_start: string
	date_end: string
	status_text: string
}

interface ICompaniesTablePopUp {
	className?: string // Added className prop
	companies: ICompany[]
	needCompanies?: boolean
}

const CompaniesTablePopUp: React.FC<ICompaniesTablePopUp> = ({
	className,
	companies,
	needCompanies = true,
}: ICompaniesTablePopUp) => {
	useEffect(() => {
		console.log(JSON.stringify(companies), 'companies')
	}, [])
	return (
		<>
			<div className={s.wrapper + ' ' + className}>
				<Col width="280px" className={s.ColWrapper}>
					{companies.map((company: ICompany, index: number) => {
						return (
							<React.Fragment key={index}>
								<div className={s.RowCourseWrapper}>
									<div className={s.RowCourse}>
										<Col width="200px" className=" whitespace-nowrap">
											{needCompanies ? (
												<>
													<NavLabel
														className={s.navLabel}
														text={company.name}
													/>
													<Label isMini={true} text={`ID${company.id}`} />
												</>
											) : (
												<>
													<NavLabel className={s.navLabel} text={company} />
												</>
											)}
										</Col>
									</div>
								</div>
								{index !== companies.length - 1 && (
									<Line width="280px" className={s.Line} />
								)}
							</React.Fragment>
						)
					})}
				</Col>
			</div>
		</>
	)
}

export default CompaniesTablePopUp

import React, {useEffect} from 'react'
import s from './index.module.scss'
import NavLabel from '../../NavLabel/index'
import Row from '../../Row'
import Col from '../../Col'
import CheckBox from '../../CheckBox'
import Label from '../../Label'
import Line from '../../Line'

interface IStatisticAddCompanyPopUp {
	className?: string // Added className prop
	companies?: any
	setCurrentCompanies?: any
	currentCompanies?: any
}

const StatisticAddCompanyPopUp: React.FC<IStatisticAddCompanyPopUp> = ({
	className,
	companies,
	setCurrentCompanies,
	currentCompanies,
}: IStatisticAddCompanyPopUp) => {
	useEffect(() => {
		console.log(currentCompanies, 'currentCompanies')
	}, [currentCompanies])

	return (
		<div className={s.wrapper + ' ' + className}>
			<Col width="280px" className={s.ColWrapper}>
				{companies.map((company: any, index: number) => {
					return (
						<div>
							<label htmlFor={company.id} className={s.RowCourseWrapper}>
								<div className={s.RowCourse}>
									<CheckBox
										isOnChecked={
											currentCompanies.find((c: any) => c.id === company.id)
												? true
												: false
										}
										id={company.id}
										onChange={(checked) => {
											console.log(checked)

											//setCurrentCompanies is useState
											setCurrentCompanies(
												checked
													? [...currentCompanies, company]
													: currentCompanies.filter(
															(c: any) => c.id !== company.id,
													  ),
											)
										}}
									/>
									<Col
										width="200px"
										className="ml-[8px] whitespace-nowrap cursor-pointer">
										<label className={s.navLabel} htmlFor={company.id}>
											{company.name}
										</label>
										<Label
											htmlFor={company.id}
											isMini={true}
											className="cursor-pointer"
											text={`ID${company.id}`}
										/>
									</Col>
								</div>
							</label>
							{index !== companies.length - 1 && (
								<Line width="280px" className={s.Line} />
							)}
						</div>
					)
				})}
			</Col>
		</div>
	)
}

export default StatisticAddCompanyPopUp

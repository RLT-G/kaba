import React, {useEffect} from 'react'
import s from './index.module.scss'
import LeftCompanyMenu from '../../components/LeftCompanyMenu'
import MenuBannersWCourse from '../../components/MenuBannersWCourses'
import Row from '../../components/Row'
import PopUpWrapper from '../../components/PopUpWrapper'
import HeaderCompany from '../../components/HeaderCompany/index'
import {getAllActiveCompaniesAPI, getCompaniesAPI, getStatisticsAPI} from '../../api/data.api'
import ContentBanner, {
	IContentBanner,
} from '../../components/ContentBanner/index'
import ContentBannerDetails, {
	IContentBannerDetails,
} from '../../components/ContentBannerDetails'
import moment from 'moment'
import FiltersBanners from '../../components/FiltersBanners/index'
import {useSelector} from 'react-redux'

enum CurrentPopup {
	None,
	Content,
	Filter,
}

const Bloggers: React.FC = () => {
	const [currentPopup, setCurrentPopup] = React.useState<CurrentPopup>(
		CurrentPopup.None,
	)

	const user = useSelector((state: any) => state.user)
	const token = user?.token
	const [info, setInfo] = React.useState([])

	// useEffect(() => {
	// 	const getInfo = async () => {
	// 		let res = await getAllActiveCompaniesAPI(token)
	// 		console.log(res.data.companies)

	// 		setInfo(res.data.companies)
	// 	}
	// 	getInfo()
	// }, [])

	useEffect(() => {
		async function getCompaniesAndStatistics(token: string) {
			try {
				const res = await getAllActiveCompaniesAPI(token)
				console.log(res.data.companies, 'List of companies')

				// Fetch statistics for each company and add it to the company object
				const companiesWithStatistics = await Promise.all(
					res.data.companies.map(async (company: any) => {
						const stata = await getStatisticsAPI(token, [company.id], 'hour')
						console.log(stata, `Statistics for company ${company.id}`)

						// Assuming stata is an array with a single statistic object for the company
						return {...company, statistics: stata}
					}),
				)

				setInfo(companiesWithStatistics)
			} catch (error) {
				console.error('Error fetching companies and statistics:', error)
			}
		}

		console.log(info, 'companies')
		getCompaniesAndStatistics(token)
	}, [token]) // Added token as a dependency

	const [currentItem, setCurrentItem] = React.useState<object>({})
	const DiffrentDate = (item) => {
		const dateStart = new Date(item.date_start)
		const dateFinish = new Date(item.date_finish)

		const differenceInTime = dateFinish.getTime() - dateStart.getTime()
		const differenceInDays = differenceInTime / (1000 * 3600 * 24)
		console.log(differenceInDays, 'differenceInDays', item.date_start), '123'

		return differenceInDays
	}

	const bannerContent: IContentBannerDetails = {
		className: 'banner-class',

		// Course
		course_svg: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-book">
				<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
			</svg>
		),
		course_title: '',
		course_id: '12345',
		course_ooo: 'OOO',
		course_link: 'https://example.com',

		// Statistics
		stat_toEnd: 'To End',
		stat_budget: '$1000',
		stat_income: '$500',
		stat_targetAct: '100',
		stat_maxPrice: '$200',
		stat_Price: '$150',
		stat_incomeUndo: '$300',
		stat_AbPay: '$100',

		// Target
		target_1_title: 'Target 1',
		target_1_value: 'Value 1',
		target_1_id: '1',
		target_2_title: 'Target 2',
		target_2_value: 'Value 2',
		target_2_id: '2',

		// ForBidden
		forBidden_1: 'Forbidden 1',
		forBidden_2: 'Forbidden 2',
		forBidden_3: 'Forbidden 3',

		// MainData Second Grid
		sg_clicks: '100',
		sg_conversion: '10%',
		sg_expenses: '$200',
		sg_ads: '50',
		sg_income_all: '$500',

		// Array
		arrayCategory: ['Category 1', 'Category 2'],
		arrayGeo: ['Geo 1', 'Geo 2'],
		arrayGender: [
			{Gender: 'Male', AgeFrom: 18, AgeTo: 24},
			{Gender: 'Female', AgeFrom: 25, AgeTo: 30},
		],
		arrayDevice: ['Device 1', 'Device 2'],
		arrayInteres: ['Interest 1', 'Interest 2'],

		// Exit
		onExit: () => {
			// Exit logic here
			setCurrentPopup(CurrentPopup.None)
		},
	}

	function translateToRussian(date: string): string {
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]

		const monthNamesInRussian = [
			'Января',
			'Февраля',
			'Марта',
			'Апреля',
			'Мая',
			'Июня',
			'Июля',
			'Августа',
			'Сентября',
			'Октября',
			'Ноября',
			'Декабря',
		]

		const monthIndex = monthNames.indexOf(date.split(' ')[1])
		const translatedDate = date.replace(
			monthNames[monthIndex],
			monthNamesInRussian[monthIndex],
		)

		return translatedDate
	}

	const getEndDate = (endDate: string) => {
		const now = moment()
		const end = moment(endDate, 'YYYY-MM-DD')

		//get the difference in days
		const difference = end.diff(now, 'days')

		const translateDate = difference
		return translateDate
	}

	const getFaviconUrl36 = (url: string) => {
		try {
			let favico = `https://s2.googleusercontent.com/s2/favicons?domain=${url}&sz=32`
			console.log(favico, 'favico')

			return favico // Fallback to default location
		} catch (error) {
			console.error('Error fetching or parsing URL:', error)
			return ''
		}
	}

	return (
		<div className={s.wrapper}>
			<div className={s.leftMenu}>
				<LeftCompanyMenu />
			</div>
			<div className={s.rightMenu}>
				<HeaderCompany
					positionPopUp="top-[30px]"
					textHeader="Формирование баннера"
				/>
				<div className={s.headerTable}>
					<label htmlFor="search" className={s.LabelSearch}>
						<input
							className={s.InputSearch}
							id="search"
							type="text"
							placeholder="Найти..."
						/>
						<svg
							className={s.iconSearch}
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M1.44422 8.85859C1.14807 8.17503 1 7.44298 1 6.66244C1 5.88191 1.14807 5.14986 1.44422 4.4663C1.74036 3.78273 2.15114 3.18077 2.67656 2.66042C3.20198 2.14006 3.80979 1.73323 4.5 1.43994C5.19021 1.14665 5.92938 1 6.7175 1C7.50563 1 8.2448 1.14665 8.93501 1.43994C9.62521 1.73323 10.233 2.14006 10.7584 2.66042C11.2839 3.18077 11.6946 3.78273 11.9908 4.4663C12.2869 5.14986 12.435 5.88191 12.435 6.66244C12.435 7.31053 12.3311 7.92549 12.1233 8.50735C11.9156 9.0892 11.6278 9.61666 11.26 10.0897L14.7636 13.5808C14.84 13.6565 14.8985 13.744 14.9391 13.8434C14.9797 13.9427 15 14.0492 15 14.1627C15 14.3188 14.9654 14.4607 14.8961 14.5884C14.8269 14.7162 14.7301 14.8167 14.6059 14.89C14.4817 14.9633 14.3385 15 14.176 15C14.0614 15 13.9527 14.9799 13.8501 14.9397C13.7474 14.8995 13.653 14.8392 13.567 14.7587L10.042 11.2605C9.57387 11.5917 9.058 11.8518 8.49437 12.0411C7.93074 12.2303 7.33845 12.3249 6.7175 12.3249C5.92938 12.3249 5.19021 12.1782 4.5 11.8849C3.80979 11.5917 3.20198 11.1848 2.67656 10.6645C2.15114 10.1441 1.74036 9.54215 1.44422 8.85859ZM2.57267 4.93462C2.34101 5.47153 2.22518 6.04747 2.22518 6.66244C2.22518 7.27741 2.34101 7.85335 2.57267 8.39027C2.80433 8.92718 3.12675 9.39905 3.53992 9.80588C3.95309 10.2127 4.43074 10.532 4.97288 10.7638C5.51501 10.9956 6.09655 11.1115 6.7175 11.1115C7.33845 11.1115 7.91999 10.9956 8.46213 10.7638C9.00426 10.532 9.48072 10.2127 9.8915 9.80588C10.3023 9.39905 10.6247 8.92718 10.8588 8.39027C11.0928 7.85335 11.2098 7.27741 11.2098 6.66244C11.2098 6.04747 11.0928 5.47153 10.8588 4.93462C10.6247 4.3977 10.3023 3.92465 9.8915 3.51546C9.48072 3.10627 9.00426 2.78696 8.46213 2.55753C7.91999 2.3281 7.33845 2.21338 6.7175 2.21338C6.09655 2.21338 5.51501 2.3281 4.97288 2.55753C4.43074 2.78696 3.95309 3.10627 3.53992 3.51546C3.12675 3.92465 2.80433 4.3977 2.57267 4.93462Z"
								fill="#808080"
							/>
						</svg>
					</label>
					{/* <div className={s.sortTableButtons}>
						<button
							onClick={() => {
								setCurrentPopup(CurrentPopup.Filter)
							}}
							className={s.filterTableButton}>
							<div className={s.filterTableButtonWrapper}>
								<p className={s.filterTableButtonText}>Фильтры</p>
								<p></p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5C7.44772 5 7 4.55228 7 4ZM7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7Z"
										fill="#808080"
									/>
								</svg>
							</div>
						</button>
						<button className={s.sortTableButton}>
							<div className={s.sortTableButtonWrapper}>
								<p className={s.sortTableButtonTextGray}>Сортировать:</p>
								<p>Все</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="7"
									viewBox="0 0 12 7"
									fill="none">
									<path
										d="M1 1L6 6L11 1"
										stroke="#808080"
										strokeWidth="1.4"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</button>
					</div> */}
				</div>

				<Row width="1200px" className={s.BloggersBannersWCourse}>
					{info.map((item) => (
						<MenuBannersWCourse
							svg={getFaviconUrl36(item.site.domain)}
							title={item.name}
							id={item.id}
							link={item.site.domain}
							// count="245"
							categories={item.audiences[0].category}
							to_end={getEndDate(item.date_finish)}
							budget={item.budget_week}
							income="19.07"
							// mark="29"
							// error_link="file:///private/tmp/main%253Ap…  "
							// error={true}
							ButtonAdd={true}
							fav_active={true}
							className={`${s.MenuBannersWCourse}`}
							onDetails={() => {
								setCurrentItem(item)
								setCurrentPopup(CurrentPopup.Content)
								DiffrentDate(item)
								console.log(currentItem.audiences[0].category, 'ITEM')
							}}
						/>
					))}
				</Row>
				{/* <Row width="1164px" className={s.LoadMore}>
					<span className={s.SpanLoadMore}>Загрузить ещё</span>
				</Row> */}
			</div>
			{currentPopup === CurrentPopup.Content && (
				<PopUpWrapper onExit={bannerContent.onExit}>
					<ContentBannerDetails
						className={bannerContent.className}
						course_svg={getFaviconUrl36(currentItem.site.domain)} // TO DO
						course_title={currentItem.name}
						course_id={currentItem.id}
						// course_ooo={bannerContent.course_ooo} //To DO
						see_link={currentItem.site.domain}
						course_link={`${
							String(window.location).split('/')[2]
						}/go?masked_url=${currentItem.site.masked_domain}`}
						stat_toEnd={
							getEndDate(currentItem.date_finish) <= 0
								? 'Завершена'
								: `${getEndDate(currentItem.date_finish)}`
						}
						stat_budget={currentItem.budget_week}
						stat_income={currentItem.price_target}
						stat_maxPrice={currentItem.price_target}
						// stat_targetAct={bannerContent.stat_targetAct} // TO DO

						// stat_maxPrice={bannerContent.stat_maxPrice} // TO DO
						// stat_Price={bannerContent.stat_Price} // TO DO

						// stat_incomeUndo={bannerContent.stat_incomeUndo} // TO DO
						// stat_AbPay={bannerContent.stat_AbPay} // TO DO
						// target_1_title={bannerContent.target_1_title} // TO DO
						// target_1_value={bannerContent.target_1_value} // TO DO
						// target_1_id={bannerContent.target_1_id} // TO DO
						// target_2_title={bannerContent.target_2_title} // TO DO
						// target_2_value={bannerContent.target_2_value} // TO DO
						// target_2_id={bannerContent.target_2_id} // TO DO
						// forBidden_1={bannerContent.forBidden_1} // TO DO
						// forBidden_2={bannerContent.forBidden_2} // TO DO
						// forBidden_3={bannerContent.forBidden_3} // TO DO
						sg_clicks={currentItem.statistics.click_sum} // TO DO
						sg_conversion={bannerContent.sg_conversion}
						sg_expenses={bannerContent.sg_expenses}
						sg_ads={bannerContent.sg_ads}
						sg_income_all={bannerContent.sg_income_all}
						arrayForBidden={currentItem.ban_show}
						arrayCategory={currentItem.audiences[0].category}
						arrayGeo={currentItem.audiences[0].geography}
						arrayGender={currentItem.audiences[0].gender_age}
						arrayDevice={currentItem.audiences[0].device}
						arrayInteres={currentItem.audiences[0].interest}
						arrayVariantDesc={currentItem.banners[0].description_option}
						arrayVariantTitle={currentItem.banners[0].title_option}
						arrayVariatImg={currentItem.banners[0].images}
						onExit={bannerContent.onExit}
					/>
				</PopUpWrapper>
			)}
			{currentPopup === CurrentPopup.Filter && (
				<PopUpWrapper onExit={bannerContent.onExit}>
					<FiltersBanners />
				</PopUpWrapper>
			)}
		</div>
	)
}

export default Bloggers

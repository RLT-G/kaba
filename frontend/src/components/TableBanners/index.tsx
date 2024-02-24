import React, {useEffect, useState} from 'react'
import s from './index.module.scss'

import {useTheme} from '@table-library/react-table-library/theme'
import {
	HeaderCellSelect,
	CellSelect,
	SelectClickTypes,
	useRowSelect,
} from '@table-library/react-table-library/select'
import {useSort} from '@table-library/react-table-library/sort'

import * as tl from '@table-library/react-table-library/table'

//svg
import Clicks from '../Clicks'
import Col from '../Col/index'
import Row from '../Row'
import Label from '../Label'
import WhiteLabel from '../WhiteLabel'
import {IContentBanner} from '../ContentBanner'
import PopUpWrapper from '../PopUpWrapper'
import TableCol from '../popup/TableColsPopUp/index'
import TableLineFooter from '../TableLineFooter'
import ContentBanner from '../contentBanner/index'
import ContentBannerDetails, {
	IContentBannerDetails,
} from '../ContentBannerDetails/index'
import {useSelector} from 'react-redux'
import {getBloggerStatistics, getCompanyBloggersAPI} from '../../api/data.api'
import StatisticPageMini from '../popup/StatisticPageMini/index'
import moment from 'moment'
import * as mui from '@mui/base'
import CompaniesTablePopUp from '../popup/CompaniesTablePopUp'
const list = [
	{
		id: '1',
		name: 'курсы английского языка',
		nameImg: './asia.svg',
		companyStatus: '+31',
		toEnd: '15',
		PRC: '205%',
		color: '#57BD53',
		budget: '599,941.32',
		shows: '3',
	},
]
for (let i = 2; i <= 50; i++) {
	list.push({
		id: i.toString(),
		name: 'курсы английского языка',
		nameImg: './asia.svg',
		companyStatus: '+31',
		toEnd: '15',
		PRC: '205%',
		color: '#57BD53',
		budget: '599,941.32',
		shows: '3',
	})
}

const THEME = {
	Table: `
  --data-table-library_grid-template-columns:  30px repeat(1, minmax(0, 1fr)) repeat(1, minmax(0, 1fr)) repeat(1, minmax(0, 1fr)) repeat(1, minmax(0, 1fr)) repeat(1, minmax(0, 1fr)) repeat(1, minmax(0, 1fr)) repeat(1, minmax(0, 1fr)) ;
  width: 100%;
  max-height: 810px;

  
  // scrollbar-gutter: stable;
  overflow: auto;

  &::-webkit-scrollbar {
    // position:absolute;
    // width: 10px;
  }
    ::-webkit-scrollbar-track {
      // background: none;
  }
  ::-webkit-scrollbar-thumb {
    // background: red;
    // border-radius: 10px;
  }

`,
	Header: `
    font-size: 14px;

    height: 36px;
    min-height: 36px;
  `,
	HeaderRow: `
    color: #808080;
    border-radius: 10px;
    border: 1px solid #333333;


    .th {
      padding-top: 10px;
      padding-bottom: 10px;
      background-color: #262626;
      height: 36px;
      min-height: 36px;
      display: flex;
      align-items: center;
    }
	.th:first-child {
		padding-left: 8px;
	}
	.th:first-child {
		border-radius: 0 0 0 10px;
	}

	.th:last-child {
		border-radius: 0 0 10px 0
	}
  `,
	HeaderCell: `
    &:not(:last-child):not(:first-child) {
      border-right: 1px solid #333333;
    }

    // div {
    //   div {
    //     padding-top: 4px;
    //     padding-bottom: 4px;
    //     background-color: #474747;
    //   }
    // }
  `,
	Row: `
	&:hover {
		transition: all .2s;
		background-color: #262626;
	}
    &.row-select-selected {
      background-color: #262626;
      font-size: 14px;
      font-weight: 400;
    }
    background-color: #1A1A1A;
    color: #F2F2F2;
    
  `,
	Cell: `
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 8px;
    font-size: 14px;
    display: flex;
    align-items: center;

    div {
      display: flex;

      #green {
        color: #57BD53;
      }
      #red {
        color: #F3553E;
      }
      #gray {
        color: #808080;
      }
      #yellow {
        color: #F3A63B;
      }
    }

    &:not(:last-child):not(:first-child)  {
      border-right: 1px solid #333333;
    }
    &:not(:last-child) {
		border-top: 1px solid #333333;
	  }
  
	  &:last-child {
		border-top: 1px solid #333333;
	  }

  `,
	Body: `
    background-color: #1A1A1A;
    border-radius: 10px;
    border: 1px solid #333333;
  `,
}

export interface ITableBanners {
	width?: string
	count?: number
}

enum CurrentPopup {
	None,
	Details,
	Cols,
	Content,
	Statistic,
}

const TableBanners: React.FC<ITableBanners> = ({}: ITableBanners) => {
	const [dataTable, setDataTable] = React.useState([])
	const user = useSelector((state: any) => state.user)
	const token = user.token
	// useEffect(() => {
	// 	const getData = async () => {
	// 		const res = await getCompanyBloggersAPI(token)
	// 		console.log(res.data.companies, 'RES DATA')
	// 		setDataTable(res.data.companies)
	// 	}
	// 	getData()
	// }, [])

	useEffect(() => {
		async function getCompaniesAndStatistics(token: string) {
			try {
				const res = await getCompanyBloggersAPI(token)
				console.log(res.data.companies, 'List of companies')

				// Fetch statistics for each company and add it to the company object
				const companiesWithStatistics = await Promise.all(
					res.data.companies.map(async (company: any) => {
						const stata = await getBloggerStatistics(
							String(token),
							String(company.site.masked_domain),
							'hour',
						)
						console.log(stata, `Statistics for company ${company.id}`)

						// Assuming stata is an array with a single statistic object for the company
						return {...company, statistics: stata}
					}),
				)

				setDataTable(companiesWithStatistics)
			} catch (error) {
				console.error('Error fetching companies and statistics:', error)
			}
		}

		console.log(dataTable, 'companies123454566')
		getCompaniesAndStatistics(token)
	}, [token]) // Added token as a dependency
	// console.log(dataTable, 'DATA TABLE');

	const data = {nodes: dataTable}
	const [search, setSearch] = useState('')
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}
	// const sort = useSort(data);

	const [currentPopup, setCurrentPopup] = useState(CurrentPopup.None)
	const [currentObject, setCurrentObject] = useState<object>({})

	const bannerContent: IContentBanner = {
		className: 'banner-class',
		text_course_table: 'Course Table',
		text_id_table: 'ID Table',
		bloger: true,
		bloger_svg: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-user">
				<circle cx="12" cy="7" r="4" />
				<path d="M12 14h.01M12 14v1M12 14h2.5" />
			</svg>
		),
		bloger_title: 'Bloger Title',
		bloger_id: '12345',
		bloger_ooo: 'OOO',
		bloger_link: 'https://example.com',
	}

	const bannerContentDetails: IContentBannerDetails = {
		className: 'banner-detail-class',

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
		course_title: 'Course Title',
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

	const getEndDate = (endDate: string) => {
		const now = moment()
		const end = moment(endDate, 'YYYY-MM-DD')

		//get the difference in days
		const difference = end.diff(now, 'days')

		const translateDate = difference
		return translateDate
	}

	const [downMenu, setDownMenu] = useState(false)

	const [company, setCompany] = useState<number>(0)
	const theme = useTheme(THEME)
	const select = useRowSelect(
		data,
		{
			onChange: onSelectChange,
		},
		{
			clickType: SelectClickTypes.ButtonClick,
		},
	)

	const sort = useSort(
		data,
		{
			onChange: onSortChange,
		},
		{
			sortFns: {
				TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
				DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
				TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
				COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
				TASKS: (array) =>
					array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
			},
		},
	)

	tl.useCustom('search', data, {
		state: {search},
		onChange: onSearchChange,
	})

	function onSearchChange(action: any, state: any) {
		console.log(action, state)
	}

	function onSortChange(action: any, state: any) {
		console.log(action, state)
	}

	function onSelectChange(action: any, state: any) {
		console.log(action, state)

		setCompany(Number(state.ids.length))
		let isOpen = 0
		if (Number(state.ids.length) > 0 && isOpen === 0) {
			setDownMenu(true)
			isOpen += 1
		} else if (Number(state.ids.length) === 0) {
			setDownMenu(false)
			isOpen = 0
		}
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
		<>
			<div className={s.wrapper}>
				<Col width="100%" className={s.Table}>
					<div className={s.headerTable}>
						<label htmlFor="search" className={s.LabelSearch}>
							<input
								className={s.InputSearch}
								id="search"
								type="text"
								value={search}
								onChange={handleSearch}
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
						<div className={s.sortTableButtons}>
							{/* <button
								onClick={() => {
									setCurrentPopup(CurrentPopup.Cols)
								}}
								className={s.sortTableButton}>
								<div className={s.sortTableButtonWrapper}>
									<p className={s.sortTableButtonTextGray}>Столбцы:</p>
									<p>Все</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5C7.44772 5 7 4.55228 7 4ZM7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7Z"
											fill="#808080"
										/>
									</svg>
								</div>
							</button> */}
							{/* <button className={s.sortTableButton}>
							<div className={s.sortTableButtonWrapper}>
								<div className={`absolute right-[0px] w-[139px]`}></div>
								<p className={s.sortTableButtonTextGray}>Статус:</p>
								<p>Все</p>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none">
									<path
										d="M3 11L8 6L13 11"
										stroke="#F2F2F2"
										strokeWidth="1.4"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</button> */}
						</div>
					</div>

					<tl.Table
						id="mainTableScrollWrapper"
						data={data}
						select={select}
						theme={theme}
						sort={sort}
						layout={{custom: true}}
						className=" border-[#333333] border rounded-[10px] h-auto w-[1164px]">
						{(tableList: any) => (
							<>
								<tl.Header height={36}>
									<tl.HeaderRow className="bg-[#262626] color-[#808080] h-[36px] rounded-[10px]">
										<HeaderCellSelect
											className={`CheckBox` + ' ' + s.headerCellSort}
										/>
										<tl.HeaderCell
											className={s.HeaderCell}
											style={{fontWeight: '400'}}>
											<p>Баннер</p>
										</tl.HeaderCell>

										<tl.HeaderCell
											style={{fontWeight: '400', fill: '#808080'}}
											className={s.HeaderCell}
											sortKey="Status">
											<p className={s.sortText}>До завершения</p>
										</tl.HeaderCell>

										<tl.HeaderCell
											style={{fontWeight: '400', fill: '#808080'}}
											className={s.HeaderCell}
											sortKey="Status">
											<p className={s.sortText}>Категории</p>
										</tl.HeaderCell>

										<tl.HeaderCell
											style={{fontWeight: '400', fill: '#808080'}}
											className={s.headerCellSort_Sort}
											sortKey="Status">
											<button
												className={s.headerCellSort_Sort}
												style={{fontWeight: '400', fill: '#808080'}}
												onClick={() =>
													sort.fns.onToggleSort({
														sortKey: 'Status',
													})
												}>
												<p className={s.sortText}>Бюджет на неделю</p>
												<div>
													<svg
														id="svg-icon-chevron-single-up-down"
														data-name="svg-icon-chevron-single-up-down"
														data-testid="svg-icon-chevron-single-up-down"
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none">
														<path
															d="M5 10L8 13L11 10"
															stroke="CurrentColor"
															strokeWidth="1.2"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M5 6L8 3L11 6"
															stroke="CurrentColor"
															strokeWidth="1.2"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
											</button>
										</tl.HeaderCell>

										<tl.HeaderCell
											style={{fontWeight: '400', fill: '#808080'}}
											className={s.HeaderCell}
											sortKey="Status">
											<p className={s.sortText}>Средняя цена клика</p>
										</tl.HeaderCell>

										<tl.HeaderCell
											style={{fontWeight: '400', fill: '#808080'}}
											className={s.HeaderCell}
											sortKey="Status">
											<p className={s.sortText}>Всего доход</p>
										</tl.HeaderCell>

										<tl.HeaderCell
											style={{fontWeight: '400', fill: '#808080'}}
											className={s.HeaderCell}
											sortKey="Status">
											<p className={s.sortText}>Всего кликов</p>
										</tl.HeaderCell>

										{/* <tl.HeaderCell
											style={{fontWeight: '400', fill: '#808080'}}
											className={s.headerCellSort_Sort}
											sortKey="Status">
											<button
												className={s.headerCellSort_Sort}
												style={{fontWeight: '400', fill: '#808080'}}
												onClick={() =>
													sort.fns.onToggleSort({
														sortKey: 'Status',
													})
												}>
												<p className={s.sortText}>Ваш PRC (%)</p>
												<div className={s.headerCellSort_SVG}>
													<svg
														id="svg-icon-chevron-single-up-down"
														data-name="svg-icon-chevron-single-up-down"
														data-testid="svg-icon-chevron-single-up-down"
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none">
														<path
															d="M5 10L8 13L11 10"
															stroke="CurrentColor"
															strokeWidth="1.2"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M5 6L8 3L11 6"
															stroke="CurrentColor"
															strokeWidth="1.2"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="12"
														height="12"
														viewBox="0 0 12 12"
														fill="none">
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M8.31471 11.5294C7.59118 11.8431 6.81961 12 6 12C5.18039 12 4.40882 11.8431 3.68529 11.5294C2.96176 11.2157 2.32353 10.7824 1.77059 10.2294C1.21765 9.67647 0.784314 9.03824 0.470588 8.31471C0.156863 7.59118 0 6.81961 0 6C0 5.18039 0.156863 4.40882 0.470588 3.68529C0.784314 2.96176 1.21667 2.32353 1.76765 1.77059C2.31863 1.21765 2.95588 0.784314 3.67941 0.470588C4.40294 0.156863 5.17451 0 5.99412 0C6.81373 0 7.58627 0.156863 8.31176 0.470588C9.03726 0.784314 9.67647 1.21765 10.2294 1.77059C10.7824 2.32353 11.2157 2.96176 11.5294 3.68529C11.8431 4.40882 12 5.18039 12 6C12 6.81961 11.8431 7.59118 11.5294 8.31471C11.2157 9.03824 10.7824 9.67647 10.2294 10.2294C9.67647 10.7824 9.03824 11.2157 8.31471 11.5294ZM4.05294 10.6118C4.65686 10.8706 5.30588 11 6 11C6.69412 11 7.34412 10.8706 7.95 10.6118C8.55588 10.3529 9.08726 9.9951 9.54412 9.53824C10.001 9.08137 10.3578 8.55098 10.6147 7.94706C10.8716 7.34314 11 6.69412 11 6C11 5.30588 10.8706 4.65686 10.6118 4.05294C10.3529 3.44902 9.99412 2.91765 9.53529 2.45882C9.07647 2 8.5451 1.64216 7.94118 1.38529C7.33726 1.12843 6.68824 1 5.99412 1C5.3 1 4.65098 1.12843 4.04706 1.38529C3.44314 1.64216 2.91373 2 2.45882 2.45882C2.00392 2.91765 1.64804 3.44902 1.39118 4.05294C1.13431 4.65686 1.00588 5.30588 1.00588 6C1.00588 6.69412 1.13431 7.34314 1.39118 7.94706C1.64804 8.55098 2.0049 9.08137 2.46176 9.53824C2.91863 9.9951 3.44902 10.3529 4.05294 10.6118ZM4.97059 9.22941H7.36471C7.48627 9.22941 7.58823 9.1902 7.67059 9.11176C7.75294 9.03333 7.79412 8.93529 7.79412 8.81765C7.79412 8.7 7.75294 8.60196 7.67059 8.52353C7.58823 8.4451 7.48627 8.40588 7.36471 8.40588H6.63529V5.41176C6.63529 5.25098 6.59608 5.12255 6.51765 5.02647C6.43922 4.93039 6.32549 4.88235 6.17647 4.88235H5.07059C4.94902 4.88235 4.84706 4.92157 4.76471 5C4.68235 5.07843 4.64118 5.17647 4.64118 5.29412C4.64118 5.41176 4.68235 5.5098 4.76471 5.58824C4.84706 5.66667 4.94902 5.70588 5.07059 5.70588H5.7V8.40588H4.97059C4.84902 8.40588 4.74706 8.4451 4.66471 8.52353C4.58235 8.60196 4.54118 8.7 4.54118 8.81765C4.54118 8.93529 4.58235 9.03333 4.66471 9.11176C4.74706 9.1902 4.84902 9.22941 4.97059 9.22941ZM6.49118 3.67647C6.34412 3.82549 6.16274 3.9 5.94706 3.9C5.73529 3.9 5.5549 3.82549 5.40588 3.67647C5.25686 3.52745 5.18235 3.34706 5.18235 3.13529C5.18235 2.91961 5.25686 2.73725 5.40588 2.58824C5.5549 2.43922 5.73529 2.36471 5.94706 2.36471C6.16274 2.36471 6.34412 2.43922 6.49118 2.58824C6.63824 2.73725 6.71176 2.91961 6.71176 3.13529C6.71176 3.34706 6.63824 3.52745 6.49118 3.67647Z"
															fill="CurrentColor"
														/>
													</svg>
												</div>
											</button>
										</tl.HeaderCell>

										<tl.HeaderCell
											style={{fontWeight: '400', fill: '#808080'}}
											className={s.headerCellSort_Sort}
											sortKey="Status">
											<button
												className={s.headerCellSort_Sort}
												style={{fontWeight: '400', fill: '#808080'}}
												onClick={() =>
													sort.fns.onToggleSort({
														sortKey: 'Status',
													})
												}>
												<p className={s.sortText}>Цели</p>
												<Row width="auto">
													<svg
														id="svg-icon-chevron-single-up-down"
														data-name="svg-icon-chevron-single-up-down"
														data-testid="svg-icon-chevron-single-up-down"
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none">
														<path
															d="M5 10L8 13L11 10"
															stroke="CurrentColor"
															strokeWidth="1.2"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M5 6L8 3L11 6"
															stroke="CurrentColor"
															strokeWidth="1.2"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none">
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M10.3147 13.5294C9.59118 13.8431 8.81961 14 8 14C7.18039 14 6.40882 13.8431 5.68529 13.5294C4.96176 13.2157 4.32353 12.7824 3.77059 12.2294C3.21765 11.6765 2.78431 11.0382 2.47059 10.3147C2.15686 9.59118 2 8.81961 2 8C2 7.18039 2.15686 6.40882 2.47059 5.68529C2.78431 4.96176 3.21667 4.32353 3.76765 3.77059C4.31863 3.21765 4.95588 2.78431 5.67941 2.47059C6.40294 2.15686 7.17451 2 7.99412 2C8.81373 2 9.58627 2.15686 10.3118 2.47059C11.0373 2.78431 11.6765 3.21765 12.2294 3.77059C12.7824 4.32353 13.2157 4.96176 13.5294 5.68529C13.8431 6.40882 14 7.18039 14 8C14 8.81961 13.8431 9.59118 13.5294 10.3147C13.2157 11.0382 12.7824 11.6765 12.2294 12.2294C11.6765 12.7824 11.0382 13.2157 10.3147 13.5294ZM6.05294 12.6118C6.65686 12.8706 7.30588 13 8 13C8.69412 13 9.34412 12.8706 9.95 12.6118C10.5559 12.3529 11.0873 11.9951 11.5441 11.5382C12.001 11.0814 12.3578 10.551 12.6147 9.94706C12.8716 9.34314 13 8.69412 13 8C13 7.30588 12.8706 6.65686 12.6118 6.05294C12.3529 5.44902 11.9941 4.91765 11.5353 4.45882C11.0765 4 10.5451 3.64216 9.94118 3.38529C9.33726 3.12843 8.68824 3 7.99412 3C7.3 3 6.65098 3.12843 6.04706 3.38529C5.44314 3.64216 4.91373 4 4.45882 4.45882C4.00392 4.91765 3.64804 5.44902 3.39118 6.05294C3.13431 6.65686 3.00588 7.30588 3.00588 8C3.00588 8.69412 3.13431 9.34314 3.39118 9.94706C3.64804 10.551 4.0049 11.0814 4.46176 11.5382C4.91863 11.9951 5.44902 12.3529 6.05294 12.6118ZM6.97059 11.2294H9.36471C9.48627 11.2294 9.58823 11.1902 9.67059 11.1118C9.75294 11.0333 9.79412 10.9353 9.79412 10.8176C9.79412 10.7 9.75294 10.602 9.67059 10.5235C9.58823 10.4451 9.48627 10.4059 9.36471 10.4059H8.63529V7.41176C8.63529 7.25098 8.59608 7.12255 8.51765 7.02647C8.43922 6.93039 8.32549 6.88235 8.17647 6.88235H7.07059C6.94902 6.88235 6.84706 6.92157 6.76471 7C6.68235 7.07843 6.64118 7.17647 6.64118 7.29412C6.64118 7.41176 6.68235 7.5098 6.76471 7.58824C6.84706 7.66667 6.94902 7.70588 7.07059 7.70588H7.7V10.4059H6.97059C6.84902 10.4059 6.74706 10.4451 6.66471 10.5235C6.58235 10.602 6.54118 10.7 6.54118 10.8176C6.54118 10.9353 6.58235 11.0333 6.66471 11.1118C6.74706 11.1902 6.84902 11.2294 6.97059 11.2294ZM8.49118 5.67647C8.34412 5.82549 8.16274 5.9 7.94706 5.9C7.73529 5.9 7.5549 5.82549 7.40588 5.67647C7.25686 5.52745 7.18235 5.34706 7.18235 5.13529C7.18235 4.91961 7.25686 4.73725 7.40588 4.58824C7.5549 4.43922 7.73529 4.36471 7.94706 4.36471C8.16274 4.36471 8.34412 4.43922 8.49118 4.58824C8.63824 4.73725 8.71176 4.91961 8.71176 5.13529C8.71176 5.34706 8.63824 5.52745 8.49118 5.67647Z"
															fill="CurrentColor"
														/>
													</svg>
												</Row>
											</button>
										</tl.HeaderCell> */}
									</tl.HeaderRow>
								</tl.Header>

								<tl.Body id="mainTable" style={{overflow: 'overlay'}}>
									{tableList.map((item: any, index: number) => (
										<tl.Row className="CheckBox" key={index} item={item}>
											<CellSelect item={item} />
											<tl.Cell className="bg-[#1A1A1A]">
												<Row width="auto">
													<Col width="auto">
														<Row width="auto">
															<img
																// src={item.nameImg}
																// alt={item.name}
																className="mr-2"
															/>
															<label htmlFor="checkbox_1">{item.name}</label>
														</Row>
														<Row width="auto" className={s.rowIdCheckbox}>
															{/* <svg
																className="mr-2 cursor-pointer"
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 16 16"
																fill="none">
																<path
																	d="M8 12.7164H13"
																	stroke="#808080"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M10.5 3.35262C10.7977 3.0485 11.2317 2.92973 11.6384 3.04105C12.045 3.15236 12.3627 3.47685 12.4717 3.89229C12.5807 4.30772 12.4644 4.75098 12.1667 5.0551L5.22222 12.1488L3 12.7163L3.55556 10.4463L10.5 3.35262Z"
																	stroke="#808080"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg> */}
															<Label
																isMini={true}
																forHtml="checkbox_1"
																text={`${item.id}`}
															/>
														</Row>
													</Col>

													<Row width="auto" className={s.ButtonsSVG}>
														<button
															onClick={() => {
																setCurrentObject(item)
																setCurrentPopup(CurrentPopup.Details)
															}}
															className={s.ButtonSVG}>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="24"
																height="24"
																viewBox="0 0 24 24"
																fill="none">
																<rect
																	x="0.5"
																	y="0.5"
																	width="23"
																	height="23"
																	rx="11.5"
																	stroke="#333333"
																/>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M14.6212 14.462L14.8795 14.21C14.9521 14.3325 14.9885 14.4585 14.9885 14.5881C14.9885 14.8068 14.8902 15.0138 14.6936 15.2089L14.0263 15.865C13.8298 16.0568 13.6168 16.1519 13.3875 16.1502C13.1582 16.1485 12.9435 16.0484 12.7435 15.8499L11.6417 14.7698C11.5176 14.9111 11.3857 15.0962 11.246 15.325C11.1063 15.5538 10.9606 15.7986 10.8089 16.0593C10.6572 16.3201 10.5029 16.5682 10.346 16.8038C10.1891 17.0393 10.0313 17.2328 9.87265 17.3842C9.44849 17.798 8.99674 18.0033 8.5174 17.9999C8.03806 17.9966 7.58286 17.7829 7.1518 17.3589C6.72074 16.9384 6.50349 16.4942 6.50004 16.0265C6.49659 15.5588 6.70695 15.1181 7.13111 14.7042C7.28629 14.5528 7.48458 14.4006 7.72598 14.2475C7.96737 14.0944 8.22083 13.943 8.48636 13.7932C8.7519 13.6435 9.00191 13.5005 9.23641 13.3642C9.4709 13.228 9.66057 13.101 9.80541 12.9832L8.69845 11.9082C8.49499 11.7097 8.39326 11.4994 8.39326 11.2773C8.39326 11.0552 8.49154 10.8483 8.6881 10.6565L9.35538 10.0004C9.55539 9.80862 9.76834 9.71356 9.99421 9.71525C10.0947 9.71599 10.1929 9.73621 10.2889 9.77589C10.2111 9.89124 10.1223 10.0165 10.0227 10.1518L10.6175 10.7322C10.7352 10.5826 10.8406 10.44 10.9339 10.3044L14.3266 13.6189L14.0419 13.8967L14.6212 14.462ZM14.3266 13.6189L16.4368 11.5599C16.5472 11.4523 16.6024 11.3328 16.6024 11.2016C16.6024 11.0704 16.542 10.9459 16.4213 10.8281L16.0496 10.4659C16.0711 10.4419 16.0916 10.418 16.1109 10.3941L14.9729 9.28877C14.9688 9.32723 14.964 9.36527 14.9587 9.4029L12.5469 7.05295C12.4883 6.99575 12.428 6.96462 12.3659 6.95958C12.3038 6.95453 12.2478 6.97303 12.1978 7.01509C12.1478 7.05715 12.1107 7.12192 12.0866 7.2094C11.9624 7.66027 11.8573 8.04468 11.771 8.36265C11.6848 8.68061 11.596 8.96408 11.5046 9.21307C11.4133 9.46205 11.2995 9.70515 11.1632 9.94236C11.0974 10.0569 11.021 10.1776 10.9339 10.3044L10.6382 10.0155C10.5252 9.90532 10.4088 9.82543 10.2889 9.77589C10.335 9.70761 10.3773 9.64281 10.4158 9.5815C10.5192 9.41663 10.6072 9.2526 10.6796 9.08942C10.752 8.92623 10.8184 8.74454 10.8787 8.54434C10.9391 8.34414 11.0029 8.10357 11.0701 7.82262C11.1374 7.54166 11.2193 7.19763 11.3158 6.7905C11.3641 6.58526 11.4521 6.4187 11.5796 6.29085C11.7072 6.16299 11.8547 6.07719 12.0219 6.03345C12.1892 5.98971 12.3581 5.98887 12.5288 6.03093C12.6995 6.07298 12.8539 6.15962 12.9918 6.29085L17.0524 10.2578C17.3455 10.5472 17.4946 10.8508 17.4998 11.1688C17.505 11.4867 17.3645 11.7854 17.0782 12.0646L14.8795 14.21C14.8295 14.1257 14.7624 14.0432 14.6781 13.9623L14.3266 13.6189ZM14.9587 9.4029C14.9014 9.80323 14.7742 10.1572 14.5772 10.4647C14.3617 10.8012 14.1091 11.1107 13.8194 11.3934C13.747 11.4607 13.7418 11.5246 13.8039 11.5852C13.8729 11.6525 14.0048 11.6592 14.1996 11.6054C14.3945 11.5515 14.6152 11.4598 14.8617 11.3303C15.1083 11.2008 15.3454 11.0527 15.573 10.8862C15.7669 10.7442 15.9258 10.6042 16.0496 10.4659L14.9587 9.4029ZM9.40711 11.1057L9.8261 10.707C9.89507 10.6397 9.9649 10.6052 10.0356 10.6035C10.1063 10.6018 10.1744 10.6346 10.2399 10.7019L13.9798 14.3459C14.1143 14.4805 14.1108 14.6167 13.9694 14.7547L13.566 15.1534C13.4246 15.3014 13.2832 15.3031 13.1418 15.1585L11.9055 13.9472C11.809 13.853 11.7029 13.8101 11.5874 13.8185C11.4719 13.8269 11.3589 13.8832 11.2486 13.9875C11.1486 14.0851 11.0296 14.2483 10.8917 14.4771C10.7537 14.7059 10.602 14.965 10.4365 15.2543C10.271 15.5437 10.0942 15.8297 9.90628 16.1123C9.71833 16.395 9.52091 16.6355 9.314 16.8341C9.06571 17.0797 8.79931 17.2017 8.51481 17.2C8.23032 17.1983 7.95875 17.073 7.70011 16.824C7.44492 16.575 7.31647 16.3109 7.31474 16.0316C7.31302 15.7523 7.43803 15.4916 7.68977 15.2493C7.89323 15.0508 8.13979 14.859 8.42946 14.6739C8.71914 14.4889 9.01226 14.3156 9.30883 14.1541C9.6054 13.9926 9.87179 13.8454 10.108 13.7125C10.3442 13.5796 10.5123 13.4643 10.6124 13.3668C10.7158 13.2591 10.7727 13.1481 10.7831 13.0337C10.7934 12.9193 10.7503 12.8166 10.6537 12.7258L9.40711 11.5145C9.26572 11.3766 9.26572 11.2403 9.40711 11.1057ZM8.94156 16.5035C8.81742 16.6263 8.66741 16.6877 8.49154 16.6877C8.31566 16.6877 8.16479 16.6263 8.03892 16.5035C7.91306 16.3807 7.85012 16.2335 7.85012 16.0619C7.85012 15.8903 7.91306 15.7439 8.03892 15.6228C8.16479 15.5016 8.31566 15.4411 8.49154 15.4411C8.66741 15.4411 8.81742 15.5016 8.94156 15.6228C9.06571 15.7439 9.12778 15.8903 9.12778 16.0619C9.12778 16.2335 9.06571 16.3807 8.94156 16.5035Z"
																	fill="#F2F2F2"
																/>
															</svg>
														</button>
														<button
															onClick={() => {
																setCurrentObject(item)
																setCurrentPopup(CurrentPopup.Content)
															}}
															className={s.ButtonSVG}>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="24"
																height="24"
																viewBox="0 0 24 24"
																fill="none">
																<rect
																	x="0.5"
																	y="0.5"
																	width="23"
																	height="23"
																	rx="11.5"
																	stroke="#333333"
																/>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M16.5392 17.5606C16.2321 17.8535 15.7713 18 15.157 18H8.84304C8.2287 18 7.76794 17.8535 7.46076 17.5606C7.15359 17.2677 7 16.8302 7 16.2481V7.75746C7 7.17164 7.15359 6.73228 7.46076 6.43937C7.76794 6.14646 8.2287 6 8.84304 6H10.6029C10.8248 6 10.9358 6.11194 10.9358 6.33582C10.9358 6.62687 11.0339 6.86474 11.2301 7.04944C11.4263 7.23414 11.6829 7.32649 12 7.32649C12.3171 7.32649 12.5727 7.23414 12.7669 7.04944C12.9612 6.86474 13.0583 6.62687 13.0583 6.33582C13.0583 6.11194 13.1692 6 13.3912 6H15.157C15.7713 6 16.2321 6.14646 16.5392 6.43937C16.8464 6.73228 17 7.17164 17 7.75746V16.2481C17 16.8302 16.8464 17.2677 16.5392 17.5606ZM8.19203 16.8722C8.34859 17.0233 8.58145 17.0989 8.89061 17.0989H15.1094C15.4185 17.0989 15.6514 17.0233 15.808 16.8722C15.9645 16.7211 16.0428 16.5075 16.0428 16.2313V7.77425C16.0428 7.4944 15.9645 7.27892 15.808 7.1278C15.6514 6.97668 15.4185 6.90112 15.1094 6.90112L13.9123 6.90112C13.9407 6.79981 13.9612 6.69347 13.9738 6.58209L13.415 6.90112L13.9123 6.90112C13.8161 7.24441 13.6295 7.52985 13.3526 7.75746C12.9939 8.05224 12.543 8.19963 12 8.19963C11.457 8.19963 11.0061 8.05224 10.6474 7.75746C10.3705 7.52985 10.1851 7.24441 10.0913 6.90112H10.585L10.0321 6.58209C10.0438 6.69347 10.0636 6.79981 10.0913 6.90112H8.89061C8.58145 6.90112 8.34859 6.97668 8.19203 7.1278C8.03547 7.27892 7.95719 7.4944 7.95719 7.77425V16.2313C7.95719 16.5075 8.03547 16.7211 8.19203 16.8722ZM9.74673 10.1698H14.2592C14.3623 10.1698 14.4485 10.1362 14.5178 10.069C14.5872 10.0019 14.6219 9.91791 14.6219 9.81716C14.6219 9.72015 14.5872 9.63899 14.5178 9.57369C14.4485 9.5084 14.3623 9.47575 14.2592 9.47575H9.74673C9.63971 9.47575 9.55153 9.5084 9.48216 9.57369C9.4128 9.63899 9.37812 9.72015 9.37812 9.81716C9.37812 9.91791 9.4128 10.0019 9.48216 10.069C9.55153 10.1362 9.63971 10.1698 9.74673 10.1698ZM11.8811 12.1567H9.74673C9.63971 12.1567 9.55153 12.1241 9.48216 12.0588C9.4128 11.9935 9.37812 11.9123 9.37812 11.8153C9.37812 11.7183 9.4128 11.6362 9.48216 11.569C9.55153 11.5019 9.63971 11.4683 9.74673 11.4683H11.8811C11.9881 11.4683 12.0763 11.5019 12.1457 11.569C12.215 11.6362 12.2497 11.7183 12.2497 11.8153C12.2497 11.9123 12.215 11.9935 12.1457 12.0588C12.0763 12.1241 11.9881 12.1567 11.8811 12.1567Z"
																	fill="#F2F2F2"
																/>
															</svg>
														</button>
														<button
															className={s.ButtonSVG}
															onClick={() => {
																setCurrentObject(item)
																// TO DO ERROR WITH CHART JS INSIDE POPUP
																setCurrentPopup(CurrentPopup.Statistic)
															}}>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="24"
																height="24"
																viewBox="0 0 24 24"
																fill="none">
																<rect
																	x="0.5"
																	y="0.5"
																	width="23"
																	height="23"
																	rx="11.5"
																	stroke="#333333"
																/>
																<path
																	fillRule="evenodd"
																	clipRule="evenodd"
																	d="M12 18C12.8196 18 13.5912 17.8431 14.3147 17.5294C15.0382 17.2157 15.6765 16.7824 16.2294 16.2294C16.7824 15.6765 17.2157 15.0382 17.5294 14.3147C17.8431 13.5912 18 12.8196 18 12C18 11.1804 17.8431 10.4088 17.5294 9.68529C17.2157 8.96176 16.7824 8.32353 16.2294 7.77059C15.6765 7.21765 15.0373 6.78431 14.3118 6.47059C13.5863 6.15686 12.8137 6 11.9941 6C11.1745 6 10.4029 6.15686 9.67941 6.47059C8.95588 6.78431 8.31863 7.21765 7.76765 7.77059C7.21667 8.32353 6.78431 8.96176 6.47059 9.68529C6.15686 10.4088 6 11.1804 6 12C6 12.8196 6.15686 13.5912 6.47059 14.3147C6.78431 15.0382 7.21765 15.6765 7.77059 16.2294C8.32353 16.7824 8.96176 17.2157 9.68529 17.5294C10.4088 17.8431 11.1804 18 12 18ZM15.5471 16.0765L16.1412 15.5235L15.8351 15.2213C16.1553 14.8409 16.4152 14.4162 16.6147 13.9471C16.8716 13.3431 17 12.6941 17 12C17 11.3059 16.8706 10.6569 16.6118 10.0529C16.6074 10.0428 16.603 10.0326 16.5986 10.0225L16.8118 9.9L16.4176 9.21765L16.2296 9.32549C16.0315 9.01245 15.8 8.72356 15.5353 8.45882C15.0765 8 14.5451 7.64216 13.9412 7.38529C13.474 7.18661 12.9799 7.06477 12.4588 7.01977V6.77059H11.6706V7.00949C11.0974 7.04348 10.5562 7.16875 10.0471 7.38529C9.44314 7.64216 8.91373 8 8.45882 8.45882C8.00392 8.91765 7.64804 9.44902 7.39118 10.0529C7.13431 10.6569 7.00588 11.3059 7.00588 12C7.00588 12.6941 7.13431 13.3431 7.39118 13.9471C7.64804 14.551 8.0049 15.0814 8.46176 15.5382C8.91863 15.9951 9.44902 16.3529 10.0529 16.6118C10.6569 16.8706 11.3059 17 12 17C12.6941 17 13.3441 16.8706 13.95 16.6118C14.4355 16.4043 14.8732 16.1333 15.2631 15.7987L15.5471 16.0765ZM11.6706 7.00949V12.0824C11.6706 12.149 11.6804 12.2098 11.7 12.2647C11.7196 12.3196 11.7569 12.3725 11.8118 12.4235L15.2631 15.7987C15.3597 15.7158 15.4534 15.629 15.5441 15.5382C15.6461 15.4362 15.7431 15.3306 15.8351 15.2213L12.7882 12.2118L16.5986 10.0225C16.4921 9.77818 16.3691 9.54585 16.2296 9.32549L12.4588 11.4882V7.01977C12.3062 7.00659 12.1513 7 11.9941 7C11.8852 7 11.7773 7.00316 11.6706 7.00949Z"
																	fill="#F2F2F2"
																/>
															</svg>
														</button>
													</Row>
												</Row>
											</tl.Cell>

											<tl.Cell>
												<p>
													{getEndDate(item.date_finish) <= 0
														? 'Завершена'
														: `${getEndDate(item.date_finish)} дней`}
												</p>
											</tl.Cell>
											<tl.Cell>
												<mui.Select
													className={s.muiSelectDetails}
													renderValue={(
														option: mui.SelectOption<number> | null,
													) => {
														if (option == null || option.value === null) {
															return (
																<>
																	<p className={s.DetailsCell}>
																		{item.audiences[0].interest.length}
																	</p>
																</>
															)
														}
														// return `${option.label}`
														return (
															<>
																<p className={s.DetailsCell}>
																	{item.audiences[0].interest.length}
																</p>
															</>
														)
													}}>
													<mui.Option
														value={1}
														className={`cursor-pointer z-10 mt-1`}>
														<CompaniesTablePopUp
															companies={item.audiences[0].interest}
															needCompanies={false}
														/>
													</mui.Option>
												</mui.Select>
											</tl.Cell>

											<tl.Cell>
												<p>{item.budget_week}₽</p>
											</tl.Cell>
											{/* TO DO */}
											<tl.Cell>
												<p>{item.statistics.cpc_sum}₽</p>
											</tl.Cell>

											<tl.Cell>
												<p>{item.statistics.consumption}₽</p>
											</tl.Cell>

											<tl.Cell>
												<p>{item.clicks}</p>
											</tl.Cell>

											{/* <tl.Cell>
												<p id={String(item.views).charAt(0) === '2' ? 'green' : ''}>
													{item.views}
												</p>
											</tl.Cell>

											<tl.Cell>
												<p className={s.DetailsCell}>{item.views}</p>
											</tl.Cell> */}
										</tl.Row>
									))}
								</tl.Body>
							</>
						)}
					</tl.Table>
					<div id="scrollbarForTable"></div>
				</Col>
				{downMenu ? (
					<TableLineFooter
						companies={`${String(company)}`}
						className={s.TableLineFooter}
						blogger={true}
					/>
				) : null}
			</div>
			{currentPopup === CurrentPopup.Details ? (
				<PopUpWrapper
					onExit={() => {
						setCurrentPopup(CurrentPopup.None)
					}}>
					<ContentBanner
						cut_link={true}
						className={bannerContent.className}
						text_course_table={currentObject.name}
						text_id_table={currentObject.id}
						bloger={true}
						bloger_svg={getFaviconUrl36(currentObject.site.domain)}
						bloger_title={bannerContent.bloger_title}
						see_link={`${String(window.location).split('/')[2]}/go?masked_url=${
							currentObject.site.masked_domain
						}`}
						// bloger_id={bannerContent.bloger_id}
						tin={currentObject.tin}
						bloger_ooo={currentObject.formOrganization}
						bloger_link={`${
							String(window.location).split('/')[2]
						}/go?masked_url=${currentObject.site.masked_domain}`} // MASKED LINK
						arrayVariantDesc={currentObject.banners[0].description_option}
						arrayVariantTitle={currentObject.banners[0].title_option}
						arrayVariatImg={currentObject.banners[0].images}
						onExit={() => {
							setCurrentPopup(CurrentPopup.None)
						}}
					/>
				</PopUpWrapper>
			) : currentPopup === CurrentPopup.Cols ? (
				<PopUpWrapper
					onExit={() => {
						setCurrentPopup(CurrentPopup.None)
					}}>
					<TableCol
						onExit={() => {
							setCurrentPopup(CurrentPopup.None)
						}}
					/>
				</PopUpWrapper>
			) : null}

			{currentPopup === CurrentPopup.Content && (
				<PopUpWrapper onExit={bannerContentDetails.onExit}>
					<ContentBannerDetails
					cut_link={true}
						className={bannerContentDetails.className}
						course_svg={getFaviconUrl36(currentObject.site.domain)} // TO DO
						course_title={currentObject.name}
						course_id={currentObject.id}
						course_ooo={currentObject.formOrganization}
						tin={currentObject.tin}
						see_link={`${String(window.location).split('/')[2]}/go?masked_url=${
							currentObject.site.masked_domain
						}`}
						course_link={`${
							String(window.location).split('/')[2]
						}/go?masked_url=${currentObject.site.masked_domain}`}
						stat_toEnd={
							getEndDate(currentObject.date_finish) <= 0
								? 'Завершена'
								: `${getEndDate(currentObject.date_finish)}`
						}
						stat_budget={currentObject.budget_week}
						stat_income={currentObject.price_target}
						stat_maxPrice={currentObject.price_target}
						// stat_targetAct={bannerContentDetails.stat_targetAct} // TO DO

						// stat_maxPrice={bannerContentDetails.stat_maxPrice} // TO DO
						// stat_Price={bannerContentDetails.stat_Price} // TO DO

						// stat_incomeUndo={bannerContentDetails.stat_incomeUndo} // TO DO
						// stat_AbPay={bannerContentDetails.stat_AbPay} // TO DO
						// target_1_title={bannerContentDetails.target_1_title} // TO DO
						// target_1_value={bannerContentDetails.target_1_value} // TO DO
						// target_1_id={bannerContentDetails.target_1_id} // TO DO
						// target_2_title={bannerContentDetails.target_2_title} // TO DO
						// target_2_value={bannerContentDetails.target_2_value} // TO DO
						// target_2_id={bannerContentDetails.target_2_id} // TO DO
						// forBidden_1={bannerContentDetails.forBidden_1} // TO DO
						// forBidden_2={bannerContentDetails.forBidden_2} // TO DO
						// forBidden_3={bannerContentDetails.forBidden_3} // TO DO
						sg_clicks={currentObject.clicks} // TO DO
						sg_conversion={bannerContentDetails.sg_conversion}
						sg_expenses={bannerContentDetails.sg_expenses}
						sg_ads={bannerContentDetails.sg_ads}
						sg_income_all={bannerContentDetails.sg_income_all}
						arrayForBidden={currentObject.ban_show}
						arrayCategory={currentObject.audiences[0].category}
						arrayGeo={currentObject.audiences[0].geography}
						arrayGender={currentObject.audiences[0].gender_age}
						arrayDevice={currentObject.audiences[0].device}
						arrayInteres={currentObject.audiences[0].interest}
						arrayVariantDesc={currentObject.banners[0].description_option}
						arrayVariantTitle={currentObject.banners[0].title_option}
						arrayVariatImg={currentObject.banners[0].images}
						onExit={bannerContentDetails.onExit}
					/>
				</PopUpWrapper>
			)}

			{currentPopup === CurrentPopup.Statistic && (
				<PopUpWrapper
					onExit={() => {
						setCurrentPopup(CurrentPopup.None)
					}}>
					<StatisticPageMini
						name_company={currentObject.name}
						id_company={currentObject.id}
						link_company={`${
							String(window.location).split('/')[2]
						}/go?masked_url=${currentObject.site.masked_domain}`}
						svg={getFaviconUrl36(currentObject.site.domain)}
						see_link={`${String(window.location).split('/')[2]}/go?masked_url=${
							currentObject.site.masked_domain
						}`}
						id_masked={currentObject.site.masked_domain}
						ooo_company={currentObject.formOrganization}
						tin={currentObject.tin}
					/>
				</PopUpWrapper>
			)}
		</>
	)
}

export default TableBanners

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
import PopUpWrapper from '../PopUpWrapper'
import TableCol from '../popup/TableColsPopUp'
import TableLineFooter from '../TableLineFooter'
import {getBloggerStatistics, getCompanyBloggersAPI} from '../../api/data.api'
import {useSelector} from 'react-redux'

const list = [
	{
		id: '1',
		name: 'курсы английского языка',
		nameImg: './asia.svg',
		companyStatus: '+31',
		access: 'Открытый',
		PRC: '205%',
		color: '#57BD53',
		status: 'Активная',
		shows: '1000',
	},
]
for (let i = 2; i <= 51; i++) {
	list.push({
		id: i.toString(),
		name: 'курсы английского языка',
		nameImg: './asia.svg',
		companyStatus: '+31',
		access: 'Открытый',
		PRC: '205%',
		color: '#57BD53',
		status: 'Активная',
		shows: '1000',
	})
}

const THEME = {
	Table: `
  --data-table-library_grid-template-columns:  30px repeat(1, minmax(0, 1fr)) repeat(1, minmax(0, 1fr)) repeat(1, minmax(0, 1fr)) repeat(1, minmax(0, 1fr)); // 30px 30% 18% 20% 20% repeat(1, minmax(0, 1fr))
  max-height: 810px;
  width: 100%;
  
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

	.th:first-child,  {
		padding-left:8px;
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

interface ITableMedia {
	width?: string
	count?: number
}

enum CurrentPopup {
	None,
	Cols,
}

const TableMedia: React.FC<ITableMedia> = ({}: ITableMedia) => {
	const [downMenu, setDownMenu] = useState(false)
	const [search, setSearch] = useState('')
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}
	// const sort = useSort(data);

	const [currentPopup, setCurrentPopup] = useState(CurrentPopup.None)

	const user = useSelector((state: any) => state.user)
	const token = user.token

	const [companies, setCompanies] = useState([])

	// useEffect(() => {
	// 	const getCompanies = async () => {
	// 		let res = await getCompanyBloggersAPI(token)
	// 		console.log(res.data.companies, 'List of companies')
	// 		setCompanies(res.data.companies)
	// 	}
	// 	getCompanies()
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

				setCompanies(companiesWithStatistics)
			} catch (error) {
				console.error('Error fetching companies and statistics:', error)
			}
		}

		console.log(companies, 'companies123454566')
		getCompaniesAndStatistics(token)
	}, [token]) // Added token as a dependency

	const data = {nodes: companies}

	const getFaviconUrl = (url: string) => {
		try {
			let favico = `https://s2.googleusercontent.com/s2/favicons?domain=${url}&sz=16`
			console.log(favico, 'favico')

			return favico // Fallback to default location
		} catch (error) {
			console.error('Error fetching or parsing URL:', error)
			return ''
		}
	}

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

	return (
		<>
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
										<p className={s.sortText}>Доступ</p>
									</tl.HeaderCell> */}

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
											<p className={s.sortText}>Статус</p>
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
									</tl.HeaderCell> */}

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
											<p className={s.sortText}>Показ</p>
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
													<Row width="auto" className="flex items-center">
														<img
															// src={getFaviconUrl(item.companysite.domain)}
															src={getFaviconUrl('google.com')}
															alt={item.name}
															className="mr-2 w-[16px] h-[16px]"
														/>
														<label htmlFor="checkbox_1">{item.name}</label>
													</Row>
													<Row width="auto" className={s.rowIdCheckbox}>
														{/* <svg
															className="mr-2"
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
											</Row>
										</tl.Cell>

										{/* <tl.Cell>
											<Row width="auto">
												<WhiteLabel text={item.company.access} />
											</Row>
										</tl.Cell>
										<tl.Cell>
											<p
												id={
													item.company.status_text === 'Активная'
														? 'green'
														: item.company.status_text === 'Отклонена'
														  ? 'red'
														  : item.company.status_text === 'Завершена'
														    ? 'gray'
														    : item.company.status_text === 'На модерации'
														      ? 'yellow'
														      : 'gray'
												}>
												{item.company.status_text}
											</p>
										</tl.Cell> */}

										<tl.Cell>
											<p>{item.statistics.cpc_sum}₽</p>
										</tl.Cell>

										<tl.Cell>
											<p>{item.statistics.consumption}₽</p>
										</tl.Cell>

										<tl.Cell>
											<p>{item.clicks}</p>
										</tl.Cell>
									</tl.Row>
								))}
							</tl.Body>
						</>
					)}
				</tl.Table>
				<div id="scrollbarForTable"></div>
			</Col>
			{currentPopup === CurrentPopup.Cols ? (
				<PopUpWrapper>
					<TableCol
						onExit={() => {
							setCurrentPopup(CurrentPopup.None)
						}}
					/>
				</PopUpWrapper>
			) : null}
			{downMenu ? (
				<TableLineFooter
					companies={`${String(company)}`}
					className={s.TableLineFooter}
					blogger={true}
				/>
			) : null}
		</>
	)
}

export default TableMedia

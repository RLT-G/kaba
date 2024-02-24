import React, {useEffect, useState} from 'react'
import s from './index.module.scss'

import {useTheme} from '@table-library/react-table-library/theme'
import {
	SelectClickTypes,
	useRowSelect,
} from '@table-library/react-table-library/select'
import {useSort} from '@table-library/react-table-library/sort'

import * as tl from '@table-library/react-table-library/table'

//svg
import Button from '../Button'

import DatePicker from 'react-multi-date-picker'
import InputIcon from 'react-multi-date-picker/components/input_icon'
import Col from '../Col'
import {format, parseISO} from 'date-fns'
import {ru} from 'date-fns/locale'

import {getUserWalletOperationsAPI} from '../../api/payment.api'
import {useSelector} from 'react-redux'
import * as mui from '@mui/base'
// import './index.css'
import NavLabel from '../NavLabel/index'
import Label from '../Label/index'
import {Link} from 'react-router-dom'
import BlueButton from '../BlueButton/index'
import BlueLabel from '../BlueLabel'
import Calendar from '../Calendar'

const list = [
	{
		id: '1',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},

	{
		id: '2',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},

	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
	{
		id: '3',
		date: '27 янв. 2024, 07:24',
		operation: 'Оплата рекламы',
		Sum: '-599,941.32₽',
		Details: '3',
	},
]

const THEME = {
	Table: `
  --data-table-library_grid-template-columns: 25% 25% 25% repeat(1, minmax(0, 1fr)) ;
  width: 100%;
  max-height: 500px;

  
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
		border-radius: 0 0 0 10px;
	}

	.th:last-child {
		border-radius: 0 0 10px 0
	}

  `,
	HeaderCell: `
    &:not(:last-child) {
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

    &:not(:last-child)  {
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

interface ITableFinancy {
	width?: string
	count?: number
}

const TableFinancy: React.FC<ITableFinancy> = ({}: ITableFinancy) => {
	const [data, setData] = useState({nodes: []}) // Изменено с list на useState
	const [isLoading, setIsLoading] = useState(true) // Состояние загрузки
	const user = useSelector((state: any) => state.user)
	const token = user?.token

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response = await getUserWalletOperationsAPI(token)
				if (response.status === 200) {
					const formattedData = response.data.map((item) => ({
						...item,
						date_creation: format(
							parseISO(item.date_creation),
							'd MMM yyyy, HH:mm',
							{locale: ru},
						),
					}))
					setData({nodes: formattedData}) // Предполагается, что API возвращает массив операций
				} else {
					console.error('Error fetching data:', response.status)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			}
			setIsLoading(false)
		}
		fetchData()

		console.log(data, 'data')
	}, []) // Пустой массив зависимостей гарантирует, что данные загружаются только при монтировании компонента

	const [search, setSearch] = useState('')
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}
	// const sort = useSort(data);

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
	}

	// Calendar
	const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
	const months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	]
	const [cDateStart, setCDateStart] = useState()
	const [cDateEnd, setCDateEnd] = useState()
	const setDate = (start: string, end: string) => {
		setCDateStart(start)
		setCDateEnd(end)

		console.log(start, end, 'Date')
	}

	return (
		<>
			{!(data.nodes.length > 0) ? (
				<></>
			) : (
				<Col width="100%" className={s.Table}>
					<div className={s.extendedBlock}>
						<div className={s.extendedLink}>
							<Button width="84px" className={s.extendedButton} text="Неделя" />
							<Button width="78px" className={s.extendedButton} text="Месяц" />
							<Button
								width="89px"
								className={s.extendedButton}
								text="Квартал"
							/>
							<Button width="58px" className={s.extendedButton} text="Год" />
						</div>
						<div className={s.DatePicker}>
							<mui.Select
								multiple={true}
								className="cursor-pointer w-full flex justify-center "
								renderValue={(option: mui.SelectOption<number> | null) => {
									if (option == null || option.value === null) {
										return (
											<>
												<div className="w-full flex justify-between">
													<p>{`${
														cDateStart || cDateEnd
															? `${cDateStart} - ${cDateEnd}`
															: 'Указать'
													}`}</p>
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<g id="Group 4 Copy 5">
															<path
																id="Shape"
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M18.1731 20.25H5.83593C4.89062 20.25 4.18164 20.0185 3.70898 19.5554C3.23633 19.0923 3 18.3977 3 17.4716V6.52838C3 5.60225 3.23633 4.90766 3.70898 4.4446C4.18164 3.98153 4.89062 3.75 5.83593 3.75H18.1731C19.1184 3.75 19.8259 3.98153 20.2955 4.4446C20.7652 4.90766 21 5.60225 21 6.52838V17.4716C21 18.3977 20.7652 19.0923 20.2955 19.5554C19.8259 20.0185 19.1184 20.25 18.1731 20.25ZM4.77923 18.4889C4.99599 18.701 5.30306 18.807 5.70045 18.807H18.2905C18.6939 18.807 19.004 18.701 19.2208 18.4889C19.4375 18.2768 19.5459 17.9646 19.5459 17.5523V9.10062C19.5459 8.68835 19.4375 8.37615 19.2208 8.16404C19.004 7.95193 18.6939 7.84587 18.2905 7.84587H5.70045C5.30306 7.84587 4.99599 7.95193 4.77923 8.16404C4.56247 8.37615 4.45409 8.68835 4.45409 9.10062V17.5523C4.45409 17.9646 4.56247 18.2768 4.77923 18.4889ZM10.2434 11.0724H10.7762C10.9328 11.0724 11.0426 11.0425 11.1059 10.9828C11.1691 10.923 11.2007 10.8155 11.2007 10.6601V10.1313C11.2007 9.97596 11.1691 9.86991 11.1059 9.81314C11.0426 9.75638 10.9328 9.728 10.7762 9.728H10.2434C10.0868 9.728 9.97692 9.75638 9.9137 9.81314C9.85048 9.86991 9.81887 9.97596 9.81887 10.1313V10.6601C9.81887 10.8155 9.85048 10.923 9.9137 10.9828C9.97692 11.0425 10.0868 11.0724 10.2434 11.0724ZM13.7747 11.0724H13.2418C13.0853 11.0724 12.9769 11.0425 12.9167 10.9828C12.8565 10.923 12.8264 10.8155 12.8264 10.6601V10.1313C12.8264 9.97596 12.8565 9.86991 12.9167 9.81314C12.9769 9.75638 13.0853 9.728 13.2418 9.728H13.7747C13.9373 9.728 14.0487 9.75638 14.1089 9.81314C14.1691 9.86991 14.1992 9.97596 14.1992 10.1313V10.6601C14.1992 10.8155 14.1691 10.923 14.1089 10.9828C14.0487 11.0425 13.9373 11.0724 13.7747 11.0724ZM16.2494 11.0724H16.7732C16.9358 11.0724 17.0472 11.0425 17.1074 10.9828C17.1676 10.923 17.1977 10.8155 17.1977 10.6601V10.1313C17.1977 9.97596 17.1676 9.86991 17.1074 9.81314C17.0472 9.75638 16.9358 9.728 16.7732 9.728H16.2494C16.0868 9.728 15.9754 9.75638 15.9152 9.81314C15.855 9.86991 15.8249 9.97596 15.8249 10.1313V10.6601C15.8249 10.8155 15.855 10.923 15.9152 10.9828C15.9754 11.0425 16.0868 11.0724 16.2494 11.0724ZM7.77772 14.0031H7.24486C7.08229 14.0031 6.9709 13.9732 6.91069 13.9135C6.85048 13.8537 6.82037 13.7462 6.82037 13.5908V13.071C6.82037 12.9097 6.85048 12.8007 6.91069 12.7439C6.9709 12.6871 7.08229 12.6587 7.24486 12.6587H7.77772C7.93427 12.6587 8.04265 12.6871 8.10286 12.7439C8.16307 12.8007 8.19318 12.9097 8.19318 13.071V13.5908C8.19318 13.7462 8.16307 13.8537 8.10286 13.9135C8.04265 13.9732 7.93427 14.0031 7.77772 14.0031ZM10.2434 14.0031H10.7762C10.9328 14.0031 11.0426 13.9732 11.1059 13.9135C11.1691 13.8537 11.2007 13.7462 11.2007 13.5908V13.071C11.2007 12.9097 11.1691 12.8007 11.1059 12.7439C11.0426 12.6871 10.9328 12.6587 10.7762 12.6587H10.2434C10.0868 12.6587 9.97692 12.6871 9.9137 12.7439C9.85048 12.8007 9.81887 12.9097 9.81887 13.071V13.5908C9.81887 13.7462 9.85048 13.8537 9.9137 13.9135C9.97692 13.9732 10.0868 14.0031 10.2434 14.0031ZM13.7747 14.0031H13.2418C13.0853 14.0031 12.9769 13.9732 12.9167 13.9135C12.8565 13.8537 12.8264 13.7462 12.8264 13.5908V13.071C12.8264 12.9097 12.8565 12.8007 12.9167 12.7439C12.9769 12.6871 13.0853 12.6587 13.2418 12.6587H13.7747C13.9373 12.6587 14.0487 12.6871 14.1089 12.7439C14.1691 12.8007 14.1992 12.9097 14.1992 13.071V13.5908C14.1992 13.7462 14.1691 13.8537 14.1089 13.9135C14.0487 13.9732 13.9373 14.0031 13.7747 14.0031ZM16.2494 14.0031H16.7732C16.9358 14.0031 17.0472 13.9732 17.1074 13.9135C17.1676 13.8537 17.1977 13.7462 17.1977 13.5908V13.071C17.1977 12.9097 17.1676 12.8007 17.1074 12.7439C17.0472 12.6871 16.9358 12.6587 16.7732 12.6587H16.2494C16.0868 12.6587 15.9754 12.6871 15.9152 12.7439C15.855 12.8007 15.8249 12.9097 15.8249 13.071V13.5908C15.8249 13.7462 15.855 13.8537 15.9152 13.9135C15.9754 13.9732 16.0868 14.0031 16.2494 14.0031ZM7.77772 16.9339H7.24486C7.08229 16.9339 6.9709 16.9055 6.91069 16.8487C6.85048 16.792 6.82037 16.6829 6.82037 16.5216V16.0018C6.82037 15.8404 6.85048 15.7314 6.91069 15.6746C6.9709 15.6179 7.08229 15.5895 7.24486 15.5895H7.77772C7.93427 15.5895 8.04265 15.6179 8.10286 15.6746C8.16307 15.7314 8.19318 15.8404 8.19318 16.0018V16.5216C8.19318 16.6829 8.16307 16.792 8.10286 16.8487C8.04265 16.9055 7.93427 16.9339 7.77772 16.9339ZM10.2434 16.9339H10.7762C10.9328 16.9339 11.0426 16.9055 11.1059 16.8487C11.1691 16.792 11.2007 16.6829 11.2007 16.5216V16.0018C11.2007 15.8404 11.1691 15.7314 11.1059 15.6746C11.0426 15.6179 10.9328 15.5895 10.7762 15.5895H10.2434C10.0868 15.5895 9.97692 15.6179 9.9137 15.6746C9.85048 15.7314 9.81887 15.8404 9.81887 16.0018V16.5216C9.81887 16.6829 9.85048 16.792 9.9137 16.8487C9.97692 16.9055 10.0868 16.9339 10.2434 16.9339ZM13.7747 16.9339H13.2418C13.0853 16.9339 12.9769 16.9055 12.9167 16.8487C12.8565 16.792 12.8264 16.6829 12.8264 16.5216V16.0018C12.8264 15.8404 12.8565 15.7314 12.9167 15.6746C12.9769 15.6179 13.0853 15.5895 13.2418 15.5895H13.7747C13.9373 15.5895 14.0487 15.6179 14.1089 15.6746C14.1691 15.7314 14.1992 15.8404 14.1992 16.0018V16.5216C14.1992 16.6829 14.1691 16.792 14.1089 16.8487C14.0487 16.9055 13.9373 16.9339 13.7747 16.9339Z"
																fill="#808080"
															/>
														</g>
													</svg>
												</div>
											</>
										)
									}
									return (
										<>
											<div className="w-full flex justify-between items-center">
												<p>{`${
													cDateStart || cDateEnd
														? `${cDateStart} - ${cDateEnd}`
														: 'Указать'
												}`}</p>
												<svg
													className="w-[16px] h-[16px]"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<g id="Group 4 Copy 5">
														<path
															id="Shape"
															fill-rule="evenodd"
															clip-rule="evenodd"
															d="M18.1731 20.25H5.83593C4.89062 20.25 4.18164 20.0185 3.70898 19.5554C3.23633 19.0923 3 18.3977 3 17.4716V6.52838C3 5.60225 3.23633 4.90766 3.70898 4.4446C4.18164 3.98153 4.89062 3.75 5.83593 3.75H18.1731C19.1184 3.75 19.8259 3.98153 20.2955 4.4446C20.7652 4.90766 21 5.60225 21 6.52838V17.4716C21 18.3977 20.7652 19.0923 20.2955 19.5554C19.8259 20.0185 19.1184 20.25 18.1731 20.25ZM4.77923 18.4889C4.99599 18.701 5.30306 18.807 5.70045 18.807H18.2905C18.6939 18.807 19.004 18.701 19.2208 18.4889C19.4375 18.2768 19.5459 17.9646 19.5459 17.5523V9.10062C19.5459 8.68835 19.4375 8.37615 19.2208 8.16404C19.004 7.95193 18.6939 7.84587 18.2905 7.84587H5.70045C5.30306 7.84587 4.99599 7.95193 4.77923 8.16404C4.56247 8.37615 4.45409 8.68835 4.45409 9.10062V17.5523C4.45409 17.9646 4.56247 18.2768 4.77923 18.4889ZM10.2434 11.0724H10.7762C10.9328 11.0724 11.0426 11.0425 11.1059 10.9828C11.1691 10.923 11.2007 10.8155 11.2007 10.6601V10.1313C11.2007 9.97596 11.1691 9.86991 11.1059 9.81314C11.0426 9.75638 10.9328 9.728 10.7762 9.728H10.2434C10.0868 9.728 9.97692 9.75638 9.9137 9.81314C9.85048 9.86991 9.81887 9.97596 9.81887 10.1313V10.6601C9.81887 10.8155 9.85048 10.923 9.9137 10.9828C9.97692 11.0425 10.0868 11.0724 10.2434 11.0724ZM13.7747 11.0724H13.2418C13.0853 11.0724 12.9769 11.0425 12.9167 10.9828C12.8565 10.923 12.8264 10.8155 12.8264 10.6601V10.1313C12.8264 9.97596 12.8565 9.86991 12.9167 9.81314C12.9769 9.75638 13.0853 9.728 13.2418 9.728H13.7747C13.9373 9.728 14.0487 9.75638 14.1089 9.81314C14.1691 9.86991 14.1992 9.97596 14.1992 10.1313V10.6601C14.1992 10.8155 14.1691 10.923 14.1089 10.9828C14.0487 11.0425 13.9373 11.0724 13.7747 11.0724ZM16.2494 11.0724H16.7732C16.9358 11.0724 17.0472 11.0425 17.1074 10.9828C17.1676 10.923 17.1977 10.8155 17.1977 10.6601V10.1313C17.1977 9.97596 17.1676 9.86991 17.1074 9.81314C17.0472 9.75638 16.9358 9.728 16.7732 9.728H16.2494C16.0868 9.728 15.9754 9.75638 15.9152 9.81314C15.855 9.86991 15.8249 9.97596 15.8249 10.1313V10.6601C15.8249 10.8155 15.855 10.923 15.9152 10.9828C15.9754 11.0425 16.0868 11.0724 16.2494 11.0724ZM7.77772 14.0031H7.24486C7.08229 14.0031 6.9709 13.9732 6.91069 13.9135C6.85048 13.8537 6.82037 13.7462 6.82037 13.5908V13.071C6.82037 12.9097 6.85048 12.8007 6.91069 12.7439C6.9709 12.6871 7.08229 12.6587 7.24486 12.6587H7.77772C7.93427 12.6587 8.04265 12.6871 8.10286 12.7439C8.16307 12.8007 8.19318 12.9097 8.19318 13.071V13.5908C8.19318 13.7462 8.16307 13.8537 8.10286 13.9135C8.04265 13.9732 7.93427 14.0031 7.77772 14.0031ZM10.2434 14.0031H10.7762C10.9328 14.0031 11.0426 13.9732 11.1059 13.9135C11.1691 13.8537 11.2007 13.7462 11.2007 13.5908V13.071C11.2007 12.9097 11.1691 12.8007 11.1059 12.7439C11.0426 12.6871 10.9328 12.6587 10.7762 12.6587H10.2434C10.0868 12.6587 9.97692 12.6871 9.9137 12.7439C9.85048 12.8007 9.81887 12.9097 9.81887 13.071V13.5908C9.81887 13.7462 9.85048 13.8537 9.9137 13.9135C9.97692 13.9732 10.0868 14.0031 10.2434 14.0031ZM13.7747 14.0031H13.2418C13.0853 14.0031 12.9769 13.9732 12.9167 13.9135C12.8565 13.8537 12.8264 13.7462 12.8264 13.5908V13.071C12.8264 12.9097 12.8565 12.8007 12.9167 12.7439C12.9769 12.6871 13.0853 12.6587 13.2418 12.6587H13.7747C13.9373 12.6587 14.0487 12.6871 14.1089 12.7439C14.1691 12.8007 14.1992 12.9097 14.1992 13.071V13.5908C14.1992 13.7462 14.1691 13.8537 14.1089 13.9135C14.0487 13.9732 13.9373 14.0031 13.7747 14.0031ZM16.2494 14.0031H16.7732C16.9358 14.0031 17.0472 13.9732 17.1074 13.9135C17.1676 13.8537 17.1977 13.7462 17.1977 13.5908V13.071C17.1977 12.9097 17.1676 12.8007 17.1074 12.7439C17.0472 12.6871 16.9358 12.6587 16.7732 12.6587H16.2494C16.0868 12.6587 15.9754 12.6871 15.9152 12.7439C15.855 12.8007 15.8249 12.9097 15.8249 13.071V13.5908C15.8249 13.7462 15.855 13.8537 15.9152 13.9135C15.9754 13.9732 16.0868 14.0031 16.2494 14.0031ZM7.77772 16.9339H7.24486C7.08229 16.9339 6.9709 16.9055 6.91069 16.8487C6.85048 16.792 6.82037 16.6829 6.82037 16.5216V16.0018C6.82037 15.8404 6.85048 15.7314 6.91069 15.6746C6.9709 15.6179 7.08229 15.5895 7.24486 15.5895H7.77772C7.93427 15.5895 8.04265 15.6179 8.10286 15.6746C8.16307 15.7314 8.19318 15.8404 8.19318 16.0018V16.5216C8.19318 16.6829 8.16307 16.792 8.10286 16.8487C8.04265 16.9055 7.93427 16.9339 7.77772 16.9339ZM10.2434 16.9339H10.7762C10.9328 16.9339 11.0426 16.9055 11.1059 16.8487C11.1691 16.792 11.2007 16.6829 11.2007 16.5216V16.0018C11.2007 15.8404 11.1691 15.7314 11.1059 15.6746C11.0426 15.6179 10.9328 15.5895 10.7762 15.5895H10.2434C10.0868 15.5895 9.97692 15.6179 9.9137 15.6746C9.85048 15.7314 9.81887 15.8404 9.81887 16.0018V16.5216C9.81887 16.6829 9.85048 16.792 9.9137 16.8487C9.97692 16.9055 10.0868 16.9339 10.2434 16.9339ZM13.7747 16.9339H13.2418C13.0853 16.9339 12.9769 16.9055 12.9167 16.8487C12.8565 16.792 12.8264 16.6829 12.8264 16.5216V16.0018C12.8264 15.8404 12.8565 15.7314 12.9167 15.6746C12.9769 15.6179 13.0853 15.5895 13.2418 15.5895H13.7747C13.9373 15.5895 14.0487 15.6179 14.1089 15.6746C14.1691 15.7314 14.1992 15.8404 14.1992 16.0018V16.5216C14.1992 16.6829 14.1691 16.792 14.1089 16.8487C14.0487 16.9055 13.9373 16.9339 13.7747 16.9339Z"
															fill="#808080"
														/>
													</g>
												</svg>
											</div>
										</>
									)
								}}>
								<mui.Option
									value={1}
									className={`cursor-pointer z-10 mt-1`}></mui.Option>
								<Calendar setDateOutside={setDate} />
							</mui.Select>
						</div>
					</div>

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
						{/* <div className={s.sortTableButtons}>
							<button className={s.sortTableButton}>
								<div className={s.sortTableButtonWrapper}>
									<p className={s.sortTableButtonTextGray}>Операции:</p>
									<p>Все</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none">
										<path
											d="M3 6L8 11L13 6"
											stroke="#808080"
											stroke-width="1.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
							</button>
							<button className={s.sortTableButton}>
								<div className={s.sortTableButtonWrapper}>
									<p className={s.sortTableButtonTextGray}>Компании:</p>
									<p>Все</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none">
										<path
											d="M3 6L8 11L13 6"
											stroke="#808080"
											stroke-width="1.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
							</button>
							<button className={s.sortTableButton}>
								<div className={s.sortTableButtonWrapper}>
									<p className={s.sortTableButtonTextGrayExtra}>Дополнительно</p>
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
							</button>
						</div> */}
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
										<tl.HeaderCell
											className={s.HeaderCell}
											style={{fontWeight: '400', fill: '#808080'}}>
											Дата
										</tl.HeaderCell>

										<tl.HeaderCell
											style={{fontWeight: '400', fill: '#808080'}}
											className={s.HeaderCell}
											sortKey="Status">
											<p className={s.sortText}>Операция</p>
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
												<p className={s.sortText}>Сумма</p>
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
											<p className={s.sortText}>Детали</p>
										</tl.HeaderCell>
									</tl.HeaderRow>
								</tl.Header>

								<tl.Body id="mainTable" style={{overflow: 'overlay'}}>
									{tableList.map((item: any) => (
										<tl.Row key={item.id} item={item}>
											<tl.Cell>
												<p>{item.date_creation}</p>
											</tl.Cell>
											<tl.Cell>
												{item.operation === '' ? (
													<p className={`text-[#808080]`}>Ожидание платежа</p>
												) : (
													<p>{item.operation}</p>
												)}
											</tl.Cell>
											<tl.Cell>
												<p
													id={
														item.operationType.charAt(0) === '+' ? 'green' : ''
													}>
													{item.operationType}
													{item.balance}
													{item.currency_sign}
												</p>
											</tl.Cell>
											<tl.Cell>
												<p className={s._DetailsCell}>
													Инвойс №{item.invoice_id}
												</p>
											</tl.Cell>
										</tl.Row>
									))}
								</tl.Body>
							</>
						)}
					</tl.Table>
					<div id="scrollbarForTable"></div>
				</Col>
			)}
		</>
	)
}

export default TableFinancy

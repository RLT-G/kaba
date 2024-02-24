import React, {useEffect, useState} from 'react'
import s from './index.module.scss'
import LeftCompanyMenu from '../../components/LeftCompanyMenu/index'
import Row from '../../components/Row/index'
import Label from '../../components/Label'
import Input from '../../components/Input'
import Col from '../../components/Col'
import HeaderCompanyCreate from '../../components/HeaderCompanyCreate'
import WhiteLabel from '../../components/WhiteLabel'
import BlueLabel from '../../components/BlueLabel'
import BlueButton from '../../components/BlueButton'
import {Chips} from 'primereact/chips'
import StepsInfo from '../../components/StepsInfo/index'
import Line from '../../components/Line'
import {Collapse, ListItemButton, Switch} from '@mui/material'
import NavLabel from '../../components/NavLabel'
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import Image from '../../components/Image'
import Upload from '../../components/Upload'
import {FileType, TGenderNAge} from '../../types'
import Select from '../../components/Select/index'
import {useSelector, useDispatch} from 'react-redux'
import {addCompanyAPI} from '../../api/data.api'
import DatePicker from 'react-multi-date-picker'
import InputIcon from 'react-multi-date-picker/components/input_icon'
import * as mui from '@mui/base'
import {eachHourOfInterval} from 'date-fns'
// import {TreeSelect, TreeSelectChangeEvent} from 'primereact/treeselect'
// import {TreeNode} from 'primereact/treenode'
// import 'primereact/resources/themes/md-light-indigo/theme.css'
// import './index.css'
// import { NodeService } from './service/NodeService';
import {TreeSelectCustom, Option} from '../../components/TreeSelectCustom/index'
import Calendar from '../../components/Calendar'
import {useNavigate} from 'react-router-dom'

const CompanyCreate: React.FC = () => {
	// const [value, setValue] = React.useState<any>()
	// const [value2, setValue2] = React.useState<any>()
	// const [value3, setValue3] = React.useState<any>()
	// const [switchPage, setSwitchPage] = React.useState<number>(1)
	const dispatch = useDispatch()

	let switchPage = useSelector((state: any) => state.SwitchCreatePage)

	const [checked, setChecked] = React.useState(false)
	const [checked_1, setChecked_1] = React.useState(false)
	const [checkedTitle, setCheckedTitle] = React.useState(false)

	const [Gender, setGender] = useState<boolean>(true)
	const [AgeTo, setAgeTo] = useState<number>()
	const [AgeFrom, setAgeFrom] = useState<number>()

	// Banner's textArea
	const [textAreaValue, setTextAreaValue] = useState<string>('')
	const [textAreaTitle, setTextAreaTitle] = useState<string>('')

	const [open_settings, setOpen_settings] = React.useState(false)

	const [globalState, setGlobalState] = useState<object>()

	// Settings Company - (C)
	const [cName, setCName] = useState<string>('')
	const [cLink, setCLink] = useState<string>('')
	const [cSettingsLink, setCSettingsLink] = useState<string>('')
	const [cDateStart, setCDateStart] = useState<string>('')
	const [cDateEnd, setCDateEnd] = useState<string>('')
	const [cTarget, setCTarget] = useState<string>('')
	const [cWeekBudget, setCWeekBudget] = useState<string>('')
	const [cKeyWord, setCKeyWord] = useState<string[]>([])
	const [cKeyWordDel, setCKeyWordDel] = useState<string[]>([])
	const [cBanShow, setCBanShow] = useState<string[]>([])

	// Auditor Company - (A)
	const [aName, setAName] = useState<string>('')
	const [aGeography, setAGeography] = useState<string[]>([])
	// Category
	const [aFavor, setAFavor] = useState<string[]>([])
	const [aDevice, setADevice] = useState<string[]>([])
	const [aGenderNAge, setAGenderNAge] = useState<TGenderNAge[]>([])

	const [GenderNAgeObject, setGenderNAgeObject] = useState<object[]>([])

	// Banner's Company (B)

	const [bName, setBName] = useState<string>('')
	const [bLink, setBLink] = useState<string>('')
	const [bOptionTitle, setBOptionTitle] = useState<boolean>(false)
	// const [bOptionDescription, setBOptionDescription] = useState<boolean>(false)
	const [bOptionDescText, setBOptionDescText] = useState<string[]>([])
	const [bVideo, setBVideo] = useState<File>()
	const [bAudio, setBAudio] = useState<File>()
	const [bImg, setBImg] = useState<File>()
	const [bUnvirfied, setBUnvirfied] = useState<boolean>(false)

	// Array DOM Element's
	const [banShowArray, setBanShowArray] = useState<object[]>([])
	const [descrArray, setDescrArray] = useState<object[]>([])
	const [titleArray, setTitleArray] = useState<object[]>([])
	const [categories, setCategories] = useState<object>({})

	// useEffect(() => {
	//     NodeService.getTreeNodes().then((data) => setNodes(data));
	// }, []); // eslint-disable-line react-hooks/exhaustive-deps

	const user = useSelector((state: any) => state.user)
	const token = user.token

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

	const handleClick_settings = () => {
		setOpen_settings(!open_settings)
	}

	const setDate = (start: string, end: string) => {
		setCDateStart(start)
		setCDateEnd(end)
		if (end !== 'Invalid Date' && end !== 'Указать') {
			setStepCompany((prevStepCompany) =>
				prevStepCompany.map((step) =>
					step.title === 'Начало и окончание компании*'
						? {...step, isDone: true, isError: false}
						: step,
				),
			)
		} else {
			setStepCompany((prevStepCompany) =>
				prevStepCompany.map((step) =>
					step.title === 'Начало и окончание компании*'
						? {...step, isDone: false}
						: step,
				),
			)
		}
		console.log(start, end, 'Date')
	}

	let op: Option[] = [
		{
			value: 'Авто',
			label: 'Авто',
			subOptions: [
				{
					value: 'Авто внедорожники',
					label: 'Авто внедорожники',
				},
				{
					value: 'Авто премиум класс',
					label: 'Авто премиум класс',
				},
				{
					value: 'Авто средний класс',
					label: 'Авто средний класс',
				},
				{
					value: 'Авто эконом класс',
					label: 'Авто эконом класс',
				},
				{
					value: 'Автобарахолка',
					label: 'Автобарахолка',
				},
				{
					value: 'Автовладельцы',
					label: 'Автовладельцы',
				},
				{
					value: 'Автозапчасти и сервис',
					label: 'Автозапчасти и сервис',
				},
				{
					value: 'Грузовой и коммерческий автотранспорт',
					label: 'Грузовой и коммерческий автотранспорт',
				},
				{
					value: 'Мото',
					label: 'Мото',
				},
				{
					value: 'Пользователи сервисов такси',
					label: 'Пользователи сервисов такси',
				},
				{
					value: 'Скутеры, мопеды',
					label: 'Скутеры, мопеды',
				},
				{
					value: 'Спецтехника',
					label: 'Спецтехника',
				},
				{
					value: 'Шины и диски',
					label: 'Шины и диски',
				},
			],
		},
		{
			value: 'Бизнес',
			label: 'Бизнес',
			subOptions: [
				{
					value: 'B2B / IT для бизнеса',
					label: 'B2B / IT для бизнеса',
				},
				{
					value: 'B2B / Для офиса',
					label: 'B2B / Для офиса',
				},
				{
					value: 'B2B / Документальная и финансово-правовая поддержка',
					label: 'B2B / Документальная и финансово-правовая поддержка',
				},
				{
					value: 'B2B / Медицинское оборудование',
					label: 'B2B / Медицинское оборудование',
				},
				{
					value: 'B2B / Оборудование, станки, энергообеспечение',
					label: 'B2B / Оборудование, станки, энергообеспечение',
				},
				{
					value: 'B2B / Реклама и маркетинг',
					label: 'B2B / Реклама и маркетинг',
				},
				{
					value: 'B2B / Сельское хозяйство',
					label: 'B2B / Сельское хозяйство',
				},
				{
					value: 'B2B / Сырье и материалы',
					label: 'B2B / Сырье и материалы',
				},
				{
					value: 'B2B / Торговое оборудование и товары оптом',
					label: 'B2B / Торговое оборудование и товары оптом',
				},
				{
					value: 'Малый бизнес',
					label: 'Малый бизнес',
				},
				{
					value: 'Средний и Крупный бизнес',
					label: 'Средний и Крупный бизнес',
				},
				{
					value: 'Управление персоналом',
					label: 'Управление персоналом',
				},
				{
					value: 'Финансы и бухгалтерский учет',
					label: 'Финансы и бухгалтерский учет',
				},
				{
					value: 'Юридическая поддержка',
					label: 'Юридическая поддержка',
				},
			],
		},
		{
			value: 'Бытовая техника',
			label: 'Бытовая техника',
			subOptions: [
				{
					value: 'Бытовая электроника',
					label: 'Бытовая электроника',
				},
				{
					value: 'Духовки, плиты и варочные поверхности',
					label: 'Духовки, плиты и варочные поверхности',
				},
				{
					value: 'Климатическая техника',
					label: 'Климатическая техника',
				},
				{
					value: 'Кофемолки, кофеварки и кофемашины',
					label: 'Кофемолки, кофеварки и кофемашины',
				},
				{
					value: 'Крупная кухонная техника',
					label: 'Крупная кухонная техника',
				},
				{
					value: 'Мелкая кухонная техника',
					label: 'Мелкая кухонная техника',
				},
				{
					value: 'Микроволновки',
					label: 'Микроволновки',
				},
				{
					value: 'Миксеры и блендеры',
					label: 'Миксеры и блендеры',
				},
				{
					value: 'Пароварки и мультиварки',
					label: 'Пароварки и мультиварки',
				},
				{
					value: 'Пылесосы',
					label: 'Пылесосы',
				},
				{
					value: 'Сервис',
					label: 'Сервис',
				},
				{
					value: 'Стиральная машина',
					label: 'Стиральная машина',
				},
				{
					value: 'Техника для дома',
					label: 'Техника для дома',
				},
				{
					value: 'Утюги и отпариватели',
					label: 'Утюги и отпариватели',
				},
				{
					value: 'Холодильники',
					label: 'Холодильники',
				},
			],
		},
		{
			value: 'Для дома и дачи',
			label: 'Для дома и дачи',
			subOptions: [
				{
					value: 'Дачная жизнь',
					label: 'Дачная жизнь',
				},
				{
					value: 'Пчеловодство',
					label: 'Пчеловодство',
				},
				{
					value: 'Садовые принадлежности',
					label: 'Садовые принадлежности',
				},
				{
					value: 'Семена и рассада',
					label: 'Семена и рассада',
				},
				{
					value: 'Товары для дома и дачи',
					label: 'Товары для дома и дачи',
				},
				{
					value: 'Цветоводство',
					label: 'Цветоводство',
				},
			],
		},
		{
			value: 'Домашние животные',
			label: 'Домашние животные',
			subOptions: [
				{
					value: 'Аквариум',
					label: 'Аквариум',
				},
				{
					value: 'Ветеринарные клиники',
					label: 'Ветеринарные клиники',
				},
				{
					value: 'Грызуны',
					label: 'Грызуны',
				},
				{
					value: 'Домашние животные',
					label: 'Домашние животные',
				},
				{
					value: 'Кошки',
					label: 'Кошки',
				},
				{
					value: 'Питание и зоотовары',
					label: 'Питание и зоотовары',
				},
				{
					value: 'Птицы',
					label: 'Птицы',
				},
				{
					value: 'Собаки',
					label: 'Собаки',
				},
			],
		},
		{
			value: 'Досуг и развлечение',
			label: 'Досуг и развлечение',
			subOptions: [
				{
					value: 'Гороскопы, Мистика, Гадания',
					label: 'Гороскопы, Мистика, Гадания',
				},
				{
					value: 'Знакомства',
					label: 'Знакомства',
				},
				{
					value: 'Кинофильмы',
					label: 'Кинофильмы',
				},
				{
					value: 'Книги',
					label: 'Книги',
				},
				{
					value: 'Культурный отдых, афиша',
					label: 'Культурный отдых, афиша',
				},
				{
					value: 'Онлайн видео',
					label: 'Онлайн видео',
				},
				{
					value: 'Развлечения',
					label: 'Развлечения',
				},
				{
					value: 'Рестораны, Кафе, Бары',
					label: 'Рестораны, Кафе, Бары',
				},
				{
					value: 'Сериалы',
					label: 'Сериалы',
				},
				{
					value: 'Юмор',
					label: 'Юмор',
				},
			],
		},
		{
			value: 'Занятость',
			label: 'Занятость',
			subOptions: [
				{
					value: 'Поиск работы',
					label: 'Поиск работы',
				},
				{
					value: 'Работа за рубежом',
					label: 'Работа за рубежом',
				},
				{
					value: 'Фриланс',
					label: 'Фриланс',
				},
			],
		},
		{
			value: 'Здоровье',
			label: 'Здоровье',
			subOptions: [
				{
					value: 'Аллергия, астма',
					label: 'Аллергия, астма',
				},
				{
					value: 'Аптеки и лекарства',
					label: 'Аптеки и лекарства',
				},
				{
					value: 'БАД и гомеопатия',
					label: 'БАД и гомеопатия',
				},
				{
					value: 'Диеты и здоровое питание',
					label: 'Диеты и здоровое питание',
				},
				{
					value: 'Клиники',
					label: 'Клиники',
				},
				{
					value: 'Медицина общая',
					label: 'Медицина общая',
				},
				{
					value: 'Народная медицина',
					label: 'Народная медицина',
				},
				{
					value: 'Оптика',
					label: 'Оптика',
				},
				{
					value: 'Ортопедия, ортопедические изделия',
					label: 'Ортопедия, ортопедические изделия',
				},
				{
					value: 'Санатории и дома отдыха',
					label: 'Санатории и дома отдыха',
				},
				{
					value: 'Стоматология',
					label: 'Стоматология',
				},
			],
		},
		{
			value: 'Игры',
			label: 'Игры',
			subOptions: [
				{
					value: 'Браузерные игры',
					label: 'Браузерные игры',
				},
				{
					value: 'Игровые стримы',
					label: 'Игровые стримы',
				},
				{
					value: 'Игры',
					label: 'Игры',
				},
				{
					value: 'Казуальные игры',
					label: 'Казуальные игры',
				},
				{
					value: 'Клиентские игры',
					label: 'Клиентские игры',
				},
				{
					value: 'Компьютерные игры',
					label: 'Компьютерные игры',
				},
				{
					value: 'Мобильные игры',
					label: 'Мобильные игры',
				},
			],
		},
		{
			value: 'Интерес к покупке авто',
			label: 'Интерес к покупке авто',
			subOptions: [
				{
					value: 'Новое авто',
					label: 'Новое авто',
				},
				{
					value: 'Новое авто премиум класса',
					label: 'Новое авто премиум класса',
				},
				{
					value: 'Новое авто среднего класса',
					label: 'Новое авто среднего класса',
				},
				{
					value: 'Новое авто эконом класса',
					label: 'Новое авто эконом класса',
				},
			],
		},
		{
			value: 'Интерес к покупке детских товаров',
			label: 'Интерес к покупке детских товаров',
			subOptions: [
				{
					value: 'Автокресла',
					label: 'Автокресла',
				},
				{
					value: 'Велосипеды, ролики, самокаты и другой детский транспорт',
					label: 'Велосипеды, ролики, самокаты и другой детский транспорт',
				},
				{
					value: 'Детская мебель',
					label: 'Детская мебель',
				},
				{
					value: 'Детские игрушки',
					label: 'Детские игрушки',
				},
				{
					value: 'Книги для детей',
					label: 'Книги для детей',
				},
				{
					value: 'Коляски',
					label: 'Коляски',
				},
				{
					value: 'Развивающие игрушки',
					label: 'Развивающие игрушки',
				},
				{
					value: 'Санки, лыжи, снегокаты и другие товары для зимней активности',
					label: 'Санки, лыжи, снегокаты и другие товары для зимней активности',
				},
				{
					value: 'Товары для новорожденных',
					label: 'Товары для новорожденных',
				},
				{
					value: 'Товары для школы',
					label: 'Товары для школы',
				},
			],
		},
		{
			value: 'Интерес к покупке одежды, обуви и аксессуаров',
			label: 'Интерес к покупке одежды, обуви и аксессуаров',
			subOptions: [
				{
					value: 'Детская обувь',
					label: 'Детская обувь',
				},
				{
					value: 'Детская одежда',
					label: 'Детская одежда',
				},
				{
					value: 'Женская обувь',
					label: 'Женская обувь',
				},
				{
					value: 'Женская одежда',
					label: 'Женская одежда',
				},
				{
					value: 'Мужская обувь',
					label: 'Мужская обувь',
				},
				{
					value: 'Мужская одежда',
					label: 'Мужская одежда',
				},
				{
					value: 'Спортивная обувь',
					label: 'Спортивная обувь',
				},
				{
					value: 'Спортивная одежда',
					label: 'Спортивная одежда',
				},
				{
					value: 'Сумки и рюкзаки',
					label: 'Сумки и рюкзаки',
				},
				{
					value: 'Украшения',
					label: 'Украшения',
				},
				{
					value: 'Часы',
					label: 'Часы',
				},
			],
		},
		{
			value: 'Кино',
			label: 'Кино',
			subOptions: [
				{
					value: 'Азиатское',
					label: 'Азиатское',
				},
				{
					value: 'Аниме',
					label: 'Аниме',
				},
				{
					value: 'Биография',
					label: 'Биография',
				},
				{
					value: 'Боевик',
					label: 'Боевик',
				},
				{
					value: 'Вестерн',
					label: 'Вестерн',
				},
				{
					value: 'Военный',
					label: 'Военный',
				},
				{
					value: 'Детектив',
					label: 'Детектив',
				},
				{
					value: 'Детское',
					label: 'Детское',
				},
				{
					value: 'Для взрослых',
					label: 'Для взрослых',
				},
				{
					value: 'Документальное',
					label: 'Документальное',
				},
				{
					value: 'Драма',
					label: 'Драма',
				},
				{
					value: 'Индийский',
					label: 'Индийский',
				},
				{
					value: 'Историческое',
					label: 'Историческое',
				},
				{
					value: 'Комедия',
					label: 'Комедия',
				},
				{
					value: 'Криминал',
					label: 'Криминал',
				},
				{
					value: 'Мелодрама',
					label: 'Мелодрама',
				},
				{
					value: 'Мультипликационное',
					label: 'Мультипликационное',
				},
				{
					value: 'Отечественное',
					label: 'Отечественное',
				},
				{
					value: 'Приключенческое',
					label: 'Приключенческое',
				},
				{
					value: 'Семейное',
					label: 'Семейное',
				},
				{
					value: 'Триллер',
					label: 'Триллер',
				},
				{
					value: 'Ужасы',
					label: 'Ужасы',
				},
				{
					value: 'Фантастика',
					label: 'Фантастика',
				},
				{
					value: 'Фэнтези',
					label: 'Фэнтези',
				},
			],
		},
		{
			value: 'Компьютерная техника и программы',
			label: 'Компьютерная техника и программы',
			subOptions: [
				{
					value: 'Игровые приставки',
					label: 'Игровые приставки',
				},
				{
					value: 'Компьютеры и комплектующие',
					label: 'Компьютеры и комплектующие',
				},
				{
					value: 'Периферийные и сетевые устройства',
					label: 'Периферийные и сетевые устройства',
				},
				{
					value: 'Программное обеспечение',
					label: 'Программное обеспечение',
				},
				{
					value: 'Устройства ввода и хранения данных',
					label: 'Устройства ввода и хранения данных',
				},
			],
		},
		{
			value: 'Красота и уход за собой',
			label: 'Красота и уход за собой',
			subOptions: [
				{
					value: 'Интерес к покупке косметики',
					label: 'Интерес к покупке косметики',
				},
				{
					value: 'Интерес к покупке парфюмерии',
					label: 'Интерес к покупке парфюмерии',
				},
				{
					value:
						'Интерес к услугам салонов красоты и косметологическим клиникам',
					label:
						'Интерес к услугам салонов красоты и косметологическим клиникам',
				},
				{
					value: 'Красота и здоровье',
					label: 'Красота и здоровье',
				},
				{
					value: 'Красота и уход за собой',
					label: 'Красота и уход за собой',
				},
				{
					value: 'Мода и стиль',
					label: 'Мода и стиль',
				},
				{
					value: 'Техника для персонального ухода',
					label: 'Техника для персонального ухода',
				},
			],
		},
		{
			value: 'Кулинария',
			label: 'Кулинария',
			subOptions: [
				{
					value: 'Доставка еды',
					label: 'Доставка еды',
				},
				{
					value: 'Кулинария',
					label: 'Кулинария',
				},
				{
					value: 'Продукты питания',
					label: 'Продукты питания',
				},
			],
		},
		{
			value: 'Мебель и интерьер',
			label: 'Мебель и интерьер',
			subOptions: [
				{
					value: 'Мебель для кухни',
					label: 'Мебель для кухни',
				},
				{
					value: 'Мебель и интерьер',
					label: 'Мебель и интерьер',
				},
				{
					value: 'Мебель корпусная',
					label: 'Мебель корпусная',
				},
				{
					value: 'Мебель мягкая и спальная',
					label: 'Мебель мягкая и спальная',
				},
				{
					value: 'Офисная мебель',
					label: 'Офисная мебель',
				},
			],
		},
		{
			value: 'Мобильная связь и доступ в интернет',
			label: 'Мобильная связь и доступ в интернет',
			subOptions: [
				{
					value: 'Активные пользователи мобильного интернета',
					label: 'Активные пользователи мобильного интернета',
				},
				{
					value: 'Доступ в интернет',
					label: 'Доступ в интернет',
				},
				{
					value: 'Мобильная связь и доступ в интернет',
					label: 'Мобильная связь и доступ в интернет',
				},
				{
					value: 'Операторы связи',
					label: 'Операторы связи',
				},
			],
		},
		{
			value: 'Мобильные устройства',
			label: 'Мобильные устройства',
			subOptions: [
				{
					value: 'Владельцы новых устройств',
					label: 'Владельцы новых устройств',
				},
				{
					value: 'Интерес к покупке мобильного телефона',
					label: 'Интерес к покупке мобильного телефона',
				},
				{
					value: 'Мобильные устройства',
					label: 'Мобильные устройства',
				},
				{
					value: 'Ноутбуки и нетбуки',
					label: 'Ноутбуки и нетбуки',
				},
				{
					value: 'Планшеты и электронные книги',
					label: 'Планшеты и электронные книги',
				},
				{
					value: 'Ремонт сотовых телефонов планшетов ноутбуков',
					label: 'Ремонт сотовых телефонов планшетов ноутбуков',
				},
				{
					value: 'Сотовые телефоны и гарнитура',
					label: 'Сотовые телефоны и гарнитура',
				},
				{
					value: 'Умные часы, браслеты, портативная техника',
					label: 'Умные часы, браслеты, портативная техника',
				},
			],
		},
		{
			value: 'Музыкальные предпочтения',
			label: 'Музыкальные предпочтения',
			subOptions: [
				{
					value: 'Джаз и блюз',
					label: 'Джаз и блюз',
				},
				{
					value: 'Классическая музыка',
					label: 'Классическая музыка',
				},
				{
					value: 'Клубная',
					label: 'Клубная',
				},
				{
					value: 'Меломаны',
					label: 'Меломаны',
				},
				{
					value: 'Поп-музыка',
					label: 'Поп-музыка',
				},
				{
					value: 'Рок',
					label: 'Рок',
				},
				{
					value: 'Хип-хоп',
					label: 'Хип-хоп',
				},
				{
					value: 'Шансон',
					label: 'Шансон',
				},
				{
					value: 'Электронная музыка',
					label: 'Электронная музыка',
				},
			],
		},
		{
			value: 'Недвижимость',
			label: 'Недвижимость',
			subOptions: [
				{
					value: 'Аренда жилой недвижимости',
					label: 'Аренда жилой недвижимости',
				},
				{
					value: 'Зарубежная недвижимость',
					label: 'Зарубежная недвижимость',
				},
				{
					value: 'Интерес к аренде загородной недвижимости',
					label: 'Интерес к аренде загородной недвижимости',
				},
				{
					value: 'Интерес к аренде коммерческой недвижимости',
					label: 'Интерес к аренде коммерческой недвижимости',
				},
				{
					value: 'Покупка вторичной недвижимости',
					label: 'Покупка вторичной недвижимости',
				},
				{
					value: 'Покупка загородной недвижимости',
					label: 'Покупка загородной недвижимости',
				},
				{
					value: 'Покупка коммерческой недвижимости',
					label: 'Покупка коммерческой недвижимости',
				},
				{
					value: 'Покупка новостроек',
					label: 'Покупка новостроек',
				},
			],
		},
		{
			value: 'Новостные интересы',
			label: 'Новостные интересы',
			subOptions: [
				{
					value: 'Культура',
					label: 'Культура',
				},
				{
					value: 'Наука и техника',
					label: 'Наука и техника',
				},
				{
					value: 'Новости',
					label: 'Новости',
				},
				{
					value: 'Общество',
					label: 'Общество',
				},
				{
					value: 'Политика',
					label: 'Политика',
				},
				{
					value: 'События',
					label: 'События',
				},
				{
					value: 'Спорт',
					label: 'Спорт',
				},
				{
					value: 'Экономика',
					label: 'Экономика',
				},
			],
		},
		{
			value: 'Образование',
			label: 'Образование',
			subOptions: [
				{
					value: 'Бизнес образование',
					label: 'Бизнес образование',
				},
				{
					value: 'Высшее',
					label: 'Высшее',
				},
				{
					value: 'Дошкольное',
					label: 'Дошкольное',
				},
				{
					value: 'Изучение языков',
					label: 'Изучение языков',
				},
				{
					value: 'Начальное',
					label: 'Начальное',
				},
				{
					value: 'Образование',
					label: 'Образование',
				},
				{
					value: 'Средне-специальное',
					label: 'Средне-специальное',
				},
				{
					value: 'Среднее',
					label: 'Среднее',
				},
			],
		},
		{
			value: 'Обустройство и ремонт',
			label: 'Обустройство и ремонт',
			subOptions: [
				{
					value: 'Обустройство, ремонт и отделка',
					label: 'Обустройство, ремонт и отделка',
				},
				{
					value: 'Окна и двери',
					label: 'Окна и двери',
				},
				{
					value: 'Освещение',
					label: 'Освещение',
				},
				{
					value: 'Сантехника и ремонт ванн',
					label: 'Сантехника и ремонт ванн',
				},
				{
					value: 'Строительство и ремонт',
					label: 'Строительство и ремонт',
				},
			],
		},
		{
			value: 'Подарки, сувениры',
			label: 'Подарки, сувениры',
			subOptions: [
				{
					value: 'Подарки и сувениры',
					label: 'Подарки и сувениры',
				},
				{
					value: 'Часы, украшения и аксессуары',
					label: 'Часы, украшения и аксессуары',
				},
				{
					value: 'Ювелирные украшения',
					label: 'Ювелирные украшения',
				},
			],
		},
		{
			value: 'Покупка одежды, обуви и аксессуаров',
			label: 'Покупка одежды, обуви и аксессуаров',
			subOptions: [
				{
					value: 'Покупка детской одежды и обуви',
					label: 'Покупка детской одежды и обуви',
				},
				{
					value: 'Покупка женской одежды',
					label: 'Покупка женской одежды',
				},
				{
					value: 'Покупка мужской одежды',
					label: 'Покупка мужской одежды',
				},
				{
					value: 'Покупка обуви',
					label: 'Покупка обуви',
				},
				{
					value: 'Покупка одежды, обуви и аксессуаров',
					label: 'Покупка одежды, обуви и аксессуаров',
				},
				{
					value: 'Покупка спортивной одежды и обуви',
					label: 'Покупка спортивной одежды и обуви',
				},
			],
		},
		{
			value: 'Путешествия',
			label: 'Путешествия',
			subOptions: [
				{
					value: 'Авиабилеты и железнодорожные билеты',
					label: 'Авиабилеты и железнодорожные билеты',
				},
				{
					value: 'Бронирование отелей',
					label: 'Бронирование отелей',
				},
				{
					value: 'Находятся в поездке внутри страны',
					label: 'Находятся в поездке внутри страны',
				},
				{
					value: 'Находятся в поездке за рубежом',
					label: 'Находятся в поездке за рубежом',
				},
			],
		},
		{
			value: 'Семья и дети',
			label: 'Семья и дети',
			subOptions: [
				{
					value: 'Беременность и роды',
					label: 'Беременность и роды',
				},
				{
					value: 'Все о детях',
					label: 'Все о детях',
				},
				{
					value: 'Детские товары',
					label: 'Детские товары',
				},
				{
					value: 'Детское здоровье',
					label: 'Детское здоровье',
				},
				{
					value: 'Детское питание',
					label: 'Детское питание',
				},
				{
					value: 'Детское развитие, досуг и услуги присмотра',
					label: 'Детское развитие, досуг и услуги присмотра',
				},
				{
					value: 'Свадьба',
					label: 'Свадьба',
				},
			],
		},
		{
			value: 'Скидки, призы, купоны',
			label: 'Скидки, призы, купоны',
			subOptions: [
				{
					value: 'Любители скидок',
					label: 'Любители скидок',
				},
			],
		},
		{
			value: 'Спорт и активный отдых',
			label: 'Спорт и активный отдых',
			subOptions: [
				{
					value: 'Активный отдых',
					label: 'Активный отдых',
				},
				{
					value: 'Велосипеды',
					label: 'Велосипеды',
				},
				{
					value: 'Детский спорт',
					label: 'Детский спорт',
				},
				{
					value: 'Единоборства',
					label: 'Единоборства',
				},
				{
					value: 'Зимние виды спорта',
					label: 'Зимние виды спорта',
				},
				{
					value: 'Катера, скутеры и мототехника',
					label: 'Катера, скутеры и мототехника',
				},
				{
					value: 'Коньки',
					label: 'Коньки',
				},
				{
					value: 'Лыжи',
					label: 'Лыжи',
				},
				{
					value: 'Охота и рыбалка',
					label: 'Охота и рыбалка',
				},
				{
					value: 'Плавание',
					label: 'Плавание',
				},
				{
					value: 'Ролики и скейтборды',
					label: 'Ролики и скейтборды',
				},
				{
					value: 'Сноуборды',
					label: 'Сноуборды',
				},
				{
					value: 'Спорт интерес',
					label: 'Спорт интерес',
				},
				{
					value: 'Спортивное оборудование и инвентарь',
					label: 'Спортивное оборудование и инвентарь',
				},
				{
					value: 'Теннис',
					label: 'Теннис',
				},
				{
					value: 'Товары для спорта и туризма',
					label: 'Товары для спорта и туризма',
				},
				{
					value: 'Фитнес',
					label: 'Фитнес',
				},
				{
					value: 'Футбол',
					label: 'Футбол',
				},
				{
					value: 'Экстремальный спорт',
					label: 'Экстремальный спорт',
				},
			],
		},
		{
			value: 'Страхование',
			label: 'Страхование',
			subOptions: [
				{
					value: 'Автострахование',
					label: 'Автострахование',
				},
				{
					value: 'Интерес к страхованию',
					label: 'Интерес к страхованию',
				},
			],
		},
		{
			value: 'Туризм',
			label: 'Туризм',
			subOptions: [
				{
					value: 'Туризм Азия',
					label: 'Туризм Азия',
				},
				{
					value: 'Туризм Америка',
					label: 'Туризм Америка',
				},
				{
					value: 'Туризм Восточное средиземноморье',
					label: 'Туризм Восточное средиземноморье',
				},
				{
					value: 'Туризм Европа',
					label: 'Туризм Европа',
				},
				{
					value: 'Туризм Западное средиземноморье',
					label: 'Туризм Западное средиземноморье',
				},
				{
					value: 'Туризм Россия+СНГ',
					label: 'Туризм Россия+СНГ',
				},
				{
					value: 'Туризм Скандинавия',
					label: 'Туризм Скандинавия',
				},
				{
					value: 'Туризм городской',
					label: 'Туризм городской',
				},
				{
					value: 'Туризм море',
					label: 'Туризм море',
				},
				{
					value: 'Туризм наше море',
					label: 'Туризм наше море',
				},
				{
					value: 'Туризм природа',
					label: 'Туризм природа',
				},
				{
					value: 'Туры и турагентства',
					label: 'Туры и турагентства',
				},
				{
					value: 'Экзотический туризм',
					label: 'Экзотический туризм',
				},
			],
		},
		{
			value: 'Финансы',
			label: 'Финансы',
			subOptions: [
				{
					value: 'Автокредиты',
					label: 'Автокредиты',
				},
				{
					value: 'Банки, банковские услуги',
					label: 'Банки, банковские услуги',
				},
				{
					value: 'Вклады и депозиты',
					label: 'Вклады и депозиты',
				},
				{
					value: 'Ипотека',
					label: 'Ипотека',
				},
				{
					value: 'Использование онлайн банка',
					label: 'Использование онлайн банка',
				},
				{
					value: 'Использование электронных денег',
					label: 'Использование электронных денег',
				},
				{
					value: 'Котировки, фондовые рынки',
					label: 'Котировки, фондовые рынки',
				},
				{
					value: 'Кредитные карты',
					label: 'Кредитные карты',
				},
				{
					value: 'Кредиты для бизнеса',
					label: 'Кредиты для бизнеса',
				},
				{
					value: 'Микрозаймы',
					label: 'Микрозаймы',
				},
				{
					value: 'Платящие в приложениях',
					label: 'Платящие в приложениях',
				},
				{
					value: 'Потребительские кредиты',
					label: 'Потребительские кредиты',
				},
				{
					value: 'Рефинансирование Кредита',
					label: 'Рефинансирование Кредита',
				},
			],
		},
		{
			value: 'Услуги для бизнеса',
			label: 'Услуги для бизнеса',
			subOptions: [],
		},
		{
			value: 'Электроника и фото',
			label: 'Электроника и фото',
			subOptions: [
				{
					value: 'Автоэлектроника и GPS',
					label: 'Автоэлектроника и GPS',
				},
				{
					value: 'Аудиотехника',
					label: 'Аудиотехника',
				},
				{
					value: 'Теле- и видеотехника',
					label: 'Теле- и видеотехника',
				},
				{
					value: 'Телевизоры',
					label: 'Телевизоры',
				},
				{
					value: 'Фото- и видеокамеры',
					label: 'Фото- и видеокамеры',
				},
			],
		},
	]

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
	}

	const [images, setImages] = React.useState<File[]>([
		// 'https://placehold.co/166x166',
		// 'https://placehold.co/166x166',
		// 'https://placehold.co/166x166',
	])
	// const textArea = document.getElementById('desc')

	// textArea?.addEventListener('keyup', (e) => {
	// 	if (e.key === 'Enter' && textAreaValue !== '') {
	// 		setBOptionDescText((prev) => [...prev, textAreaValue])
	// 		console.log('VALUE TEXT')
	// 		e.preventDefault()
	// 		setTextAreaValue('')
	// 	}
	// })

	const onClose = (id: string) => {
		setImages(images.filter((image) => image.id !== id))
		if (images.length - 1 === 0){
			setStepBanner((prevStepBanner) =>
				prevStepBanner.map((step) =>
					step.title === 'Варианты изображение'
						? {...step, isDone: false}
						: step,
				),
			)
		}
		
	}

	const handleAddImage = (file: File) => {
		//add path to image
		if (file) setImages([...images, {id: generateUniqueId(), file: file}])
		setStepBanner((prevStepBanner) =>
			prevStepBanner.map((step) =>
				step.title === 'Варианты изображение'
					? {...step, isDone: true}
					: step,
			),
		)
		console.log(file)
	}

	function generateUniqueId() {
		return (
			Math.random().toString(36).substring(2, 10) +
			Math.random().toString(36).substring(2, 10)
		)
	}
	const handleAddVideo = (file: File) => {}

	const [stepCompany, setStepCompany] = React.useState([
		{
			title: 'Название компании*',
			isDone: false,
			isError: false,
		},
		{
			title: 'Ссылка на рекламируемую страницу*',
			isDone: false,
			isError: false,
		},
		{
			title: 'Начало и окончание компании*',
			isDone: false,
			isError: false,
		},
		{
			title: 'Цель*',
			isDone: false,
			isError: false,
		},
		{
			title: 'Дневной бюджет',
			isDone: false,
			isError: false,
		},
		{
			title: 'Тематические слова',
			isDone: false,
			isError: false,
		},
		{
			title: 'Запрет показов',
			isDone: false,
			isError: false,
		},
	])

	const [stepAudi, setStepAudi] = React.useState([
		{
			title: 'Название аудитории*',
			isDone: false,
			isError: false,
		},
		{
			title: 'География показов',
			isDone: false,
			isError: false,
		},
		{
			title: 'Категория',
			isDone: false,
			isError: false,
		},
		{
			title: 'Интересы',
			isDone: false,
			isError: false,
		},
		{
			title: 'Устройства',
			isDone: false,
			isError: false,
		},
		{
			title: 'Пол и возраст',
			isDone: false,
			isError: false,
		},
	])

	const [stepBanner, setStepBanner] = React.useState([
		{
			title: 'Название баннера*',
			isDone: false,
		},
		{
			title: 'Варианты заголовка',
			isDone: false,
		},
		{
			title: 'Варианты описаний',
			isDone: false,
		},
		{
			title: 'Варианты изображение',
			isDone: false,
		},
	])

	function StepSwitch() {
		switch (switchPage) {
			case 1:
				return stepCompany
			case 2:
				return stepAudi
			case 3:
				return stepBanner
		}
	}

	// ERROR MESSAGE
	const [cNameError, setCNameError] = useState<string>('')
	const [cLinkError, setCLinkError] = useState<string>('')
	const [cTargetError, setCTargetError] = useState<string>('')
	const [cWeekBudError, setCWeekBudError] = useState<string>('')

	const [aNameError, setANameError] = useState<string>('')

	const [bNameError, setBNameError] = useState<string>('')

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

	const getNameFromDomain = (url: string): string => {
		try {
			let hostname = url

			// Remove 'www.' if it exists
			hostname = hostname.replace(/^www\./, '')
			hostname = hostname.replace(/^https?:\/\//, '')
			console.log(hostname)

			// Get the portion before the first '.' character
			const name = hostname.split('.')[0]

			return name
		} catch (error) {
			console.error('Error parsing URL:', error)
			return 'Invalid URL'
		}
	}

	const togglerTemplate = (option) => {
		return <img src="custom-icon.png" alt="custom-icon" />
	}
	const CustomCollapseIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none">
			<path
				d="M3 10L8 5L13 10"
				stroke="#808080"
				strokeWidth="1.4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
	const CustomExpandIcon = () => (
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
	)

	useEffect(() => {
		let temp = JSON.parse(localStorage.getItem('create_temp')!)

		if (temp && (temp !== null || temp !== undefined)) {
			// Parse data to variables
			setCName(temp[0].cName)
			setCLink(temp[0].cLink)
			setCSettingsLink(temp[0].cSettingsLink)
			setCDateStart(temp[0].cDateStart)
			setCDateEnd(temp[0].cDateEnd)
			setCTarget(temp[0].cTarget)
			setCWeekBudget(temp[0].cWeekBudget)
			setCKeyWord(temp[0].cKeyWord)
			setCKeyWordDel(temp[0].cKeyWordDel)
			setBanShowArray(temp[0].banShowArray)

			setAName(temp[1].aName)
			setAGeography(temp[1].aGeography)
			setAFavor(temp[1].aFavor)
			setADevice(temp[1].aDevice)
			setGenderNAgeObject(temp[1].GenderNAgeObject)

			setBName(temp[2].bName)
			setBLink(temp[2].bLink)
			setTitleArray(temp[2].titleArray)
			// setBOptionDescription(temp[2].bOptionDescription)
			setDescrArray(temp[2].descrArray)
			setBVideo(temp[2].bVideo)
			setBAudio(temp[2].bAudio)
			setBUnvirfied(temp[2].bUnvirfied)

			// setImages(temp[3].images)
		}

		console.log(temp)
	}, [])

	const navigate = useNavigate()
	const sendData = () => {
		addCompanyAPI(
			token,
			{
				cName: cName,
				cLink: cLink,
				cSettingsLink: cSettingsLink,
				cDateStart: cDateStart,
				cDateEnd: cDateEnd,
				cTarget: cTarget,
				cWeekBudget: cWeekBudget,
				cKeyWord: cKeyWord,
				cKeyWordDel: cKeyWordDel,
				cBanShow: banShowArray.map((item: any) => item.text),
			},

			{
				aName: aName,
				aGeography: aGeography,
				aFavor: Object.keys(categories),
				aDevice: aDevice,
				aGenderNAge: GenderNAgeObject,
				// aCategories: Object.keys(categories),
			},

			{
				bName: bName,
				bLink: bLink,
				// bOptionDescription: bOptionDescription,
				titleArray: titleArray,
				descrArray: descrArray,
				bVideo: bVideo,
				bAudio: bAudio,
				// bImg: images,
				bUnvirfied: bUnvirfied,
			},
			images,
		)
		window.localStorage.removeItem('create_temp')
		navigate('/')
	}

	return (
		<div className={s.wrapper}>
			<div className={s.stepsMenu}>
				<StepsInfo steps={StepSwitch()} />
			</div>
			<div className={` ${s.rightMenu}`}>
				<HeaderCompanyCreate
					exitFunc={() => {
						;() => {
							window.localStorage.setItem(
								'create_temp',
								JSON.stringify([
									{
										cName: cName,
										cLink: cLink,
										cSettingsLink: cSettingsLink,
										cDateStart: cDateStart,
										cDateEnd: cDateEnd,
										cTarget: cTarget,
										cWeekBudget: cWeekBudget,
										cKeyWord: cKeyWord,
										cKeyWordDel: cKeyWordDel,
										banShowArray: banShowArray,
									},
									{
										aName: aName,
										aGeography: aGeography,
										// aFavor: aFavor,
										aDevice: aDevice,
										GenderNAgeObject: GenderNAgeObject,
									},
									{
										bName: bName,
										bLink: bLink,
										// bOptionDescription: bOptionDescription,
										titleArray: titleArray,
										descrArray: descrArray,
										bVideo: bVideo,
										bAudio: bAudio,
										bImg: images,
										bUnvirfied: bUnvirfied,
									},
									{
										images: images,
									},
								]),
							)
							navigate('/')
						}
					}}
				/>

				<div
					id="page-1"
					style={switchPage === 1 ? {display: 'block'} : {display: 'none'}}>
					<Col className={s.contentCol} width="528px">
						<WhiteLabel
							className={s.content}
							text="Название Компании*"
							size="16px"
						/>
						<Input
							onChange={(e) => {
								setCName(e.target.value)
								setCNameError('')
								if (e.target.value.length > 0) {
									setStepCompany((prevStepCompany) =>
										prevStepCompany.map((step) =>
											step.title === 'Название компании*'
												? {...step, isDone: true, isError: false}
												: step,
										),
									)
								} else {
									setStepCompany((prevStepCompany) =>
										prevStepCompany.map((step) =>
											step.title === 'Название компании*'
												? {...step, isDone: false}
												: step,
										),
									)
								}
							}}
							value={cName}
							width="100%"
							placeholder="Введите название..."
							className={`${s.inputText}`}
							errorMsg={cNameError}
						/>

						<Line width="528px" className={s.Line} />

						<WhiteLabel text="Ссылка на рекламируемую страницу" size="16px" />
						<Row
							width="528px"
							className="mt-[17px] w-[528px] flex justify-between ">
							<Input
								onChange={(e) => {
									setCLink(e.target.value)
									setCLinkError('')
									if (e.target.value.length > 0) {
										setStepCompany((prevStepCompany) =>
											prevStepCompany.map((step) =>
												step.title === 'Ссылка на рекламируемую страницу*'
													? {...step, isDone: true, isError: false}
													: step,
											),
										)
									} else {
										setCLinkError('')
										setStepCompany((prevStepCompany) =>
											prevStepCompany.map((step) =>
												step.title === 'Ссылка на рекламируемую страницу*'
													? {...step, isDone: false}
													: step,
											),
										)
									}
								}}
								value={cLink}
								id="urlInput"
								width="528px"
								placeholder="Введите ссылку..."
								className={`${s.inputText} ${s.linkTargetInput}`}
								errorMsg={cLinkError}
							/>
							<div
								onClick={() => {
									;(
										document.querySelector(
											'#input-urlInput',
										) as HTMLInputElement
									).value = ''
									setCLink('')
									setStepCompany((prevStepCompany) =>
										prevStepCompany.map((step) =>
											step.title === 'Ссылка на рекламируемую страницу*'
												? {...step, isDone: false}
												: step,
										),
									)
								}}
								className={`right-[30px] top-[6px] cursor-pointer relative `}>
								<svg
									className="text-[#808080] hover:text-[#f2f2f2] transition-all"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<rect width="24" height="24" rx="7" fill="#262626" />
									<path
										d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
										fill="CurrentColor"
									/>
								</svg>
							</div>
						</Row>

						{cLink.length > 0 && (
							<Col
								iD="link_target"
								width="528px"
								className={`mt-[8px] w-[528px] min-h-[48px] flex flex-col flex-wrap overflow-y-scroll rounded-[10px] border border-[#262626]`}>
								<Row
									className={`ml-[16px] mt-[4px] max-w-[528px] flex flex-wrap items-center`}>
									<img
										src={getFaviconUrl(cLink)}
										alt={cLink}
										className="mr-1 w-[16px] h-[16px]"
									/>
									<WhiteLabel
										text={getNameFromDomain(
											cLink.length <= 40 ? cLink : cLink.slice(0, 70) + '...',
										)}
									/>
								</Row>
								<Label
									className={`ml-[16px] mb-[8px] flex-wrap`}
									text={cLink.length <= 40 ? cLink : cLink.slice(0, 70) + '...'}
									isMini={true}
								/>
							</Col>
						)}
						<Line width="528px" className={s.Line} />

						{/* <Col width="528px" className={`mt-[32px] w-[528px]`}>
							<WhiteLabel
								className="mb-[17px]"
								text="Параметры ссылки"
								size="16px"
							/>
							<Row
								width="528px"
								className="mt-[8px] w-[528px] flex justify-between">
								<Chips
									className={s.chips}
									value={cSettingsLink}
									onChange={(e) => setCSettingsLink(e.target.value)}
								/>
								<div
									className={`right-[30px] top-[6px] cursor-pointer relative z-10`}>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
											fill="#808080"
										/>
									</svg>
								</div>
							</Row>
						</Col> */}
						<Col width="528px" className={` w-[528px]`}>
							<WhiteLabel text="Начало и окончание компании*" size="16px" />
							<Row width="528px" className={`mt-[17px] w-[260px] h-[36px]`}>
								<div
									className={`mr-[8px] border rounded-[10px] flex justify-between border-[#262626] h-[36px] w-[260px]`}>
									<Label className={`my-[5px] ml-[16px]`} text="Начало:" />
									<WhiteLabel
										className={`mr-[18px] my-[5px]`}
										text={
											(cDateStart !== 'Invalid Date'
												? cDateStart
												: new Date(Date.now()).toLocaleDateString()) ||
											new Date(Date.now()).toLocaleDateString()
										}
									/>

									{/* <div className={s.DatePicker}>
										<DatePicker
											weekDays={weekDays}
											months={months}
											numberOfMonths={1}
											fixMainPosition={true}
											arrow={false}
											highlightToday={false}
											// animations={[
											//     opacity({ from: 0.1, to: 1, duration: 400 })

											// ]}
											// render={<InputIcon />}
										/>
									</div> */}
								</div>
								<div
									className={`border rounded-[10px] flex justify-between border-[#262626] h-[36px] w-[260px]`}>
									<Label className={`my-[5px] ml-[16px]`} text="Окончание:" />
									<mui.Select
										multiple={true}
										className="cursor-pointer"
										renderValue={(option: mui.SelectOption<number> | null) => {
											if (option == null || option.value === null) {
												return (
													<>
														<BlueLabel
															className={`mr-[18px] my-[5px] font-[400px]`}
															text={
																(cDateEnd !== 'Invalid Date'
																	? cDateEnd
																	: 'Указать') || 'Указать'
															}
														/>
													</>
												)
											}
											return (
												<>
													<BlueLabel
														className={`mr-[18px] my-[5px] font-[400px]`}
														text={
															(cDateEnd !== 'Invalid Date'
																? cDateEnd
																: 'Указать') || 'Указать'
														}
													/>
												</>
											)
										}}>
										<mui.Option
											value={1}
											className={`cursor-pointer z-10 mt-1`}></mui.Option>
										<Calendar setDateOutside={setDate} />
									</mui.Select>
								</div>
							</Row>
						</Col>
						<Line width="528px" className={s.Line} />

						<Col width="528px" className={``}>
							<Row className={`flex items-center`}>
								<WhiteLabel className={`mr-[4px]`} text="Цель*" size="16px" />
								<svg
									className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12.8934 16.9118C11.989 17.3039 11.0245 17.5 10 17.5C8.97549 17.5 8.01103 17.3039 7.10662 16.9118C6.20221 16.5196 5.40441 15.9779 4.71324 15.2868C4.02206 14.5956 3.48039 13.7978 3.08824 12.8934C2.69608 11.989 2.5 11.0245 2.5 10C2.5 8.97549 2.69608 8.01103 3.08824 7.10662C3.48039 6.20221 4.02083 5.40441 4.70956 4.71324C5.39828 4.02206 6.19485 3.48039 7.09926 3.08824C8.00368 2.69608 8.96814 2.5 9.99265 2.5C11.0172 2.5 11.9828 2.69608 12.8897 3.08824C13.7966 3.48039 14.5956 4.02206 15.2868 4.71324C15.9779 5.40441 16.5196 6.20221 16.9118 7.10662C17.3039 8.01103 17.5 8.97549 17.5 10C17.5 11.0245 17.3039 11.989 16.9118 12.8934C16.5196 13.7978 15.9779 14.5956 15.2868 15.2868C14.5956 15.9779 13.7978 16.5196 12.8934 16.9118ZM7.56618 15.7647C8.32108 16.0882 9.13235 16.25 10 16.25C10.8676 16.25 11.6801 16.0882 12.4375 15.7647C13.1949 15.4412 13.8591 14.9939 14.4301 14.4228C15.0012 13.8517 15.4473 13.1887 15.7684 12.4338C16.0895 11.6789 16.25 10.8676 16.25 10C16.25 9.13235 16.0882 8.32108 15.7647 7.56618C15.4412 6.81127 14.9926 6.14706 14.4191 5.57353C13.8456 5 13.1814 4.5527 12.4265 4.23162C11.6716 3.91054 10.8603 3.75 9.99265 3.75C9.125 3.75 8.31373 3.91054 7.55882 4.23162C6.80392 4.5527 6.14216 5 5.57353 5.57353C5.0049 6.14706 4.56005 6.81127 4.23897 7.56618C3.91789 8.32108 3.75735 9.13235 3.75735 10C3.75735 10.8676 3.91789 11.6789 4.23897 12.4338C4.56005 13.1887 5.00613 13.8517 5.57721 14.4228C6.14828 14.9939 6.81127 15.4412 7.56618 15.7647ZM8.71324 14.0368H11.7059C11.8578 14.0368 11.9853 13.9877 12.0882 13.8897C12.1912 13.7917 12.2426 13.6691 12.2426 13.5221C12.2426 13.375 12.1912 13.2525 12.0882 13.1544C11.9853 13.0564 11.8578 13.0074 11.7059 13.0074H10.7941V9.26471C10.7941 9.06373 10.7451 8.90319 10.6471 8.78309C10.549 8.66299 10.4069 8.60294 10.2206 8.60294H8.83824C8.68627 8.60294 8.55882 8.65196 8.45588 8.75C8.35294 8.84804 8.30147 8.97059 8.30147 9.11765C8.30147 9.26471 8.35294 9.38725 8.45588 9.48529C8.55882 9.58333 8.68627 9.63235 8.83824 9.63235H9.625V13.0074H8.71324C8.56127 13.0074 8.43382 13.0564 8.33088 13.1544C8.22794 13.2525 8.17647 13.375 8.17647 13.5221C8.17647 13.6691 8.22794 13.7917 8.33088 13.8897C8.43382 13.9877 8.56127 14.0368 8.71324 14.0368ZM10.614 7.09559C10.4301 7.28186 10.2034 7.375 9.93382 7.375C9.66912 7.375 9.44363 7.28186 9.25735 7.09559C9.07108 6.90931 8.97794 6.68382 8.97794 6.41912C8.97794 6.14951 9.07108 5.92157 9.25735 5.73529C9.44363 5.54902 9.66912 5.45588 9.93382 5.45588C10.2034 5.45588 10.4301 5.54902 10.614 5.73529C10.7978 5.92157 10.8897 6.14951 10.8897 6.41912C10.8897 6.68382 10.7978 6.90931 10.614 7.09559Z"
										fill="CurrentColor"
									/>
								</svg>
							</Row>

							{/* <Row width="528px" className={``}>
								<Select
									className={`text-[14px] mt-[17px]`}
									width="528px"
									data={['#1 цель', '#2 цель', '#3 цель']}
								/>
								<div className={`absolute z-[1]`}>
									<p className={`relative left-[440px] z-[1] top-[24px]`}>
										2 из 9
									</p>
								</div>
							</Row> */}
							<div
								className={`mt-[8px] border rounded-[10px] border-[#262626]  w-[528px]`}>
								{/* <Col width="528px" className={`${s.list}`}>
									<Row
										width="528px"
										className={`justify-between h-[52px] w-[528px] `}>
										<Col width="528px" className={``}>
											<WhiteLabel
												className={`ml-[18px] mt-[5px]`}
												size="14px"
												text="Клик по ссылке"
											/>
											<Label
												className={`ml-[18px]`}
												isMini={true}
												text="ID 131313 Переход на сайт"
											/>
										</Col>
										<Row
											width="190px"
											className=" items-center justify-normal ">
											<Label className={``} text="До: " />
											<Row className={`w-[114px] ml-[8px]`}>
												<Input
													isShowMaxLength={false}
													autocomplete={true}
													placeholder="23,233"
													maximumLength={5}
													conteinerWidth="114px"
													width="114px"
													className={`flex`}
												/>
												<div className={`absolute h-[36px] w-[16px]`}>
													<p
														className={`relative h-[30px] w-[30px] float-right top-[5px] left-[97.9px]`}>
														₽
													</p>
												</div>
											</Row>
											<div className={`absolute z-2`}>
												<svg
													className={`relative left-[150px] cursor-pointer`}
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
														fill="#808080"
													/>
												</svg>
											</div>
										</Row>
									</Row>
								</Col> */}
								<Col width="528px" className={`${s.list}`}>
									<Row
										width="528px"
										className={`items-center justify-between h-[52px] w-[528px] ${s.list}`}>
										<WhiteLabel
											className={`ml-[18px]`}
											size="14px"
											text="Переход на сайт"
										/>
										{/* <Col width="528px" className={``}>
											<Label
												className={`ml-[18px]`}
												isMini={true}
												text="ID 141178 Переход на сайт"
											/>
										</Col> */}
										<Row
											width="190px"
											className=" items-center justify-normal ">
											<Label className={``} text="До: " />
											<Row className={`w-[114px] ml-[8px]`}>
												<Input
													onChange={(e) => {
														if (/^\d+$/.test(e.target.value)) {
															setCTarget(e.target.value)
														}
														if (
															e.target.value.length > 0 &&
															/^\d+$/.test(e.target.value)
														) {
															setStepCompany((prevStepCompany) =>
																prevStepCompany.map((step) =>
																	step.title === 'Цель*'
																		? {...step, isDone: true, isError: false}
																		: step,
																),
															)
														} else if (e.target.value.length === 0) {
															setCTarget('')
															setStepCompany((prevStepCompany) =>
																prevStepCompany.map((step) =>
																	step.title === 'Цель*'
																		? {...step, isDone: false}
																		: step,
																),
															)
														}
													}}
													value={cTarget}
													id="targetInput"
													isDigits={true}
													isShowMaxLength={false}
													maximumLength={5}
													conteinerWidth="114px"
													width="114px"
													className={`flex`}
												/>
												<div className={`absolute h-[36px] w-[16px]`}>
													<p
														className={`relative h-[30px] w-[30px]  float-right top-[5px] left-[97.9px]`}>
														₽
													</p>
												</div>
											</Row>
											<div
												onClick={() => {
													setCTarget('')
													setStepCompany((prevStepCompany) =>
														prevStepCompany.map((step) =>
															step.title === 'Цель*'
																? {...step, isDone: false}
																: step,
														),
													)
												}}
												className={`absolute z-2 `}>
												<svg
													className={`relative left-[150px] cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all`}
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
														fill="CurrentColor"
													/>
												</svg>
											</div>
										</Row>
									</Row>
								</Col>
							</div>
						</Col>
						<Line width="528px" className={s.Line} />

						<Col className={``} width="528px">
							<Row
								className={`items-center text-[#808080] hover:text-[#f2f2f2] transition-all`}
								width="528px">
								<WhiteLabel size="16px" text="Дневной бюджет" />
								<svg
									className={`mx-[4px] cursor-pointer`}
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12.8934 16.9118C11.989 17.3039 11.0245 17.5 10 17.5C8.97549 17.5 8.01103 17.3039 7.10662 16.9118C6.20221 16.5196 5.40441 15.9779 4.71324 15.2868C4.02206 14.5956 3.48039 13.7978 3.08824 12.8934C2.69608 11.989 2.5 11.0245 2.5 10C2.5 8.97549 2.69608 8.01103 3.08824 7.10662C3.48039 6.20221 4.02083 5.40441 4.70956 4.71324C5.39828 4.02206 6.19485 3.48039 7.09926 3.08824C8.00368 2.69608 8.96814 2.5 9.99265 2.5C11.0172 2.5 11.9828 2.69608 12.8897 3.08824C13.7966 3.48039 14.5956 4.02206 15.2868 4.71324C15.9779 5.40441 16.5196 6.20221 16.9118 7.10662C17.3039 8.01103 17.5 8.97549 17.5 10C17.5 11.0245 17.3039 11.989 16.9118 12.8934C16.5196 13.7978 15.9779 14.5956 15.2868 15.2868C14.5956 15.9779 13.7978 16.5196 12.8934 16.9118ZM7.56618 15.7647C8.32108 16.0882 9.13235 16.25 10 16.25C10.8676 16.25 11.6801 16.0882 12.4375 15.7647C13.1949 15.4412 13.8591 14.9939 14.4301 14.4228C15.0012 13.8517 15.4473 13.1887 15.7684 12.4338C16.0895 11.6789 16.25 10.8676 16.25 10C16.25 9.13235 16.0882 8.32108 15.7647 7.56618C15.4412 6.81127 14.9926 6.14706 14.4191 5.57353C13.8456 5 13.1814 4.5527 12.4265 4.23162C11.6716 3.91054 10.8603 3.75 9.99265 3.75C9.125 3.75 8.31373 3.91054 7.55882 4.23162C6.80392 4.5527 6.14216 5 5.57353 5.57353C5.0049 6.14706 4.56005 6.81127 4.23897 7.56618C3.91789 8.32108 3.75735 9.13235 3.75735 10C3.75735 10.8676 3.91789 11.6789 4.23897 12.4338C4.56005 13.1887 5.00613 13.8517 5.57721 14.4228C6.14828 14.9939 6.81127 15.4412 7.56618 15.7647ZM8.71324 14.0368H11.7059C11.8578 14.0368 11.9853 13.9877 12.0882 13.8897C12.1912 13.7917 12.2426 13.6691 12.2426 13.5221C12.2426 13.375 12.1912 13.2525 12.0882 13.1544C11.9853 13.0564 11.8578 13.0074 11.7059 13.0074H10.7941V9.26471C10.7941 9.06373 10.7451 8.90319 10.6471 8.78309C10.549 8.66299 10.4069 8.60294 10.2206 8.60294H8.83824C8.68627 8.60294 8.55882 8.65196 8.45588 8.75C8.35294 8.84804 8.30147 8.97059 8.30147 9.11765C8.30147 9.26471 8.35294 9.38725 8.45588 9.48529C8.55882 9.58333 8.68627 9.63235 8.83824 9.63235H9.625V13.0074H8.71324C8.56127 13.0074 8.43382 13.0564 8.33088 13.1544C8.22794 13.2525 8.17647 13.375 8.17647 13.5221C8.17647 13.6691 8.22794 13.7917 8.33088 13.8897C8.43382 13.9877 8.56127 14.0368 8.71324 14.0368ZM10.614 7.09559C10.4301 7.28186 10.2034 7.375 9.93382 7.375C9.66912 7.375 9.44363 7.28186 9.25735 7.09559C9.07108 6.90931 8.97794 6.68382 8.97794 6.41912C8.97794 6.14951 9.07108 5.92157 9.25735 5.73529C9.44363 5.54902 9.66912 5.45588 9.93382 5.45588C10.2034 5.45588 10.4301 5.54902 10.614 5.73529C10.7978 5.92157 10.8897 6.14951 10.8897 6.41912C10.8897 6.68382 10.7978 6.90931 10.614 7.09559Z"
										fill="CurrentColor"
									/>
								</svg>
								{/* <svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M10 17.5C11.0245 17.5 11.989 17.3039 12.8934 16.9118C13.7978 16.5196 14.5956 15.9779 15.2868 15.2868C15.9779 14.5956 16.5196 13.7978 16.9118 12.8934C17.3039 11.989 17.5 11.0245 17.5 10C17.5 8.97549 17.3039 8.01103 16.9118 7.10662C16.5196 6.20221 15.9779 5.40441 15.2868 4.71324C14.5956 4.02206 13.7966 3.48039 12.8897 3.08824C11.9828 2.69608 11.0172 2.5 9.99265 2.5C8.96814 2.5 8.00368 2.69608 7.09926 3.08824C6.19485 3.48039 5.39828 4.02206 4.70956 4.71324C4.02083 5.40441 3.48039 6.20221 3.08824 7.10662C2.69608 8.01103 2.5 8.97549 2.5 10C2.5 11.0245 2.69608 11.989 3.08824 12.8934C3.48039 13.7978 4.02206 14.5956 4.71324 15.2868C5.40441 15.9779 6.20221 16.5196 7.10662 16.9118C8.01103 17.3039 8.97549 17.5 10 17.5ZM10 16.25C9.13235 16.25 8.32108 16.0882 7.56618 15.7647C6.81127 15.4412 6.14828 14.9939 5.57721 14.4228C5.00613 13.8517 4.56005 13.1887 4.23897 12.4338C3.91789 11.6789 3.75735 10.8676 3.75735 10C3.75735 9.13235 3.91789 8.32108 4.23897 7.56618C4.56005 6.81127 5.0049 6.14706 5.57353 5.57353C6.14216 5 6.80392 4.5527 7.55882 4.23162C8.31373 3.91054 9.125 3.75 9.99265 3.75C10.8603 3.75 11.6716 3.91054 12.4265 4.23162C13.1814 4.5527 13.8456 5 14.4191 5.57353C14.9926 6.14706 15.4412 6.81127 15.7647 7.56618C16.0882 8.32108 16.25 9.13235 16.25 10C16.25 10.8676 16.0895 11.6789 15.7684 12.4338C15.4473 13.1887 15.0012 13.8517 14.4301 14.4228C13.8591 14.9939 13.1949 15.4412 12.4375 15.7647C11.6801 16.0882 10.8676 16.25 10 16.25ZM12.8162 10.4044L8.625 12.875C8.45343 12.9779 8.28799 12.9963 8.12868 12.9301C7.96936 12.864 7.88971 12.7402 7.88971 12.5588V7.44853C7.88971 7.27206 7.97304 7.15196 8.13971 7.08824C8.30637 7.02451 8.46814 7.03922 8.625 7.13235L12.8162 9.61765C12.9632 9.70588 13.038 9.83578 13.0404 10.0074C13.0429 10.1789 12.9681 10.3113 12.8162 10.4044Z"
										fill="#808080"
									/>
								</svg> */}
							</Row>
							<Label
								isMini={true}
								text="Максимальная сумма которую вы готовы тратить в день на рекламную компанию"
							/>
							<Row
								width="528px"
								className="mt-[17px] w-[528px] flex justify-between">
								<Input
									onChange={(e) => {
										if (/^\d+$/.test(e.target.value)) {
											setCWeekBudget(e.target.value)
											setCWeekBudError('')
										}
										if (
											e.target.value.length > 0 &&
											/^\d+$/.test(e.target.value)
										) {
											setStepCompany((prevStepCompany) =>
												prevStepCompany.map((step) =>
													step.title === 'Дневной бюджет'
														? {...step, isDone: true, isError: false}
														: step,
												),
											)
										} else if (e.target.value.length === 0) {
											setCWeekBudget('')
											setStepCompany((prevStepCompany) =>
												prevStepCompany.map((step) =>
													step.title === 'Дневной бюджет'
														? {...step, isDone: false}
														: step,
												),
											)
										}
									}}
									value={cWeekBudget}
									isDigits={true}
									id="sumInput"
									width="100%"
									placeholder=""
									className={`${s.inputText} `}
									errorMsg={cWeekBudError}
								/>
								<div className={`right-[30px] top-[6px] relative`}>
									<p>₽</p>
								</div>
							</Row>
						</Col>
					</Col>

					<Col className={``}>
						<Line width="528px" className={s.Line} />

						<WhiteLabel size="16px" text="Тематические слова" />
						<Row
							className={`items-center mt-[17px] text-[#808080] hover:text-[#f2f2f2] transition-all`}>
							<Label className={`mr-[4px]`} text="Ключевые фразы" />
							<svg
								className="cursor-pointer"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M10.3147 13.5294C9.59118 13.8431 8.81961 14 8 14C7.18039 14 6.40882 13.8431 5.68529 13.5294C4.96176 13.2157 4.32353 12.7824 3.77059 12.2294C3.21765 11.6765 2.78431 11.0382 2.47059 10.3147C2.15686 9.59118 2 8.81961 2 8C2 7.18039 2.15686 6.40882 2.47059 5.68529C2.78431 4.96176 3.21667 4.32353 3.76765 3.77059C4.31863 3.21765 4.95588 2.78431 5.67941 2.47059C6.40294 2.15686 7.17451 2 7.99412 2C8.81373 2 9.58627 2.15686 10.3118 2.47059C11.0373 2.78431 11.6765 3.21765 12.2294 3.77059C12.7824 4.32353 13.2157 4.96176 13.5294 5.68529C13.8431 6.40882 14 7.18039 14 8C14 8.81961 13.8431 9.59118 13.5294 10.3147C13.2157 11.0382 12.7824 11.6765 12.2294 12.2294C11.6765 12.7824 11.0382 13.2157 10.3147 13.5294ZM6.05294 12.6118C6.65686 12.8706 7.30588 13 8 13C8.69412 13 9.34412 12.8706 9.95 12.6118C10.5559 12.3529 11.0873 11.9951 11.5441 11.5382C12.001 11.0814 12.3578 10.551 12.6147 9.94706C12.8716 9.34314 13 8.69412 13 8C13 7.30588 12.8706 6.65686 12.6118 6.05294C12.3529 5.44902 11.9941 4.91765 11.5353 4.45882C11.0765 4 10.5451 3.64216 9.94118 3.38529C9.33726 3.12843 8.68824 3 7.99412 3C7.3 3 6.65098 3.12843 6.04706 3.38529C5.44314 3.64216 4.91373 4 4.45882 4.45882C4.00392 4.91765 3.64804 5.44902 3.39118 6.05294C3.13431 6.65686 3.00588 7.30588 3.00588 8C3.00588 8.69412 3.13431 9.34314 3.39118 9.94706C3.64804 10.551 4.0049 11.0814 4.46176 11.5382C4.91863 11.9951 5.44902 12.3529 6.05294 12.6118ZM6.97059 11.2294H9.36471C9.48627 11.2294 9.58823 11.1902 9.67059 11.1118C9.75294 11.0333 9.79412 10.9353 9.79412 10.8176C9.79412 10.7 9.75294 10.602 9.67059 10.5235C9.58823 10.4451 9.48627 10.4059 9.36471 10.4059H8.63529V7.41176C8.63529 7.25098 8.59608 7.12255 8.51765 7.02647C8.43922 6.93039 8.32549 6.88235 8.17647 6.88235H7.07059C6.94902 6.88235 6.84706 6.92157 6.76471 7C6.68235 7.07843 6.64118 7.17647 6.64118 7.29412C6.64118 7.41176 6.68235 7.5098 6.76471 7.58824C6.84706 7.66667 6.94902 7.70588 7.07059 7.70588H7.7V10.4059H6.97059C6.84902 10.4059 6.74706 10.4451 6.66471 10.5235C6.58235 10.602 6.54118 10.7 6.54118 10.8176C6.54118 10.9353 6.58235 11.0333 6.66471 11.1118C6.74706 11.1902 6.84902 11.2294 6.97059 11.2294ZM8.49118 5.67647C8.34412 5.82549 8.16274 5.9 7.94706 5.9C7.73529 5.9 7.5549 5.82549 7.40588 5.67647C7.25686 5.52745 7.18235 5.34706 7.18235 5.13529C7.18235 4.91961 7.25686 4.73725 7.40588 4.58824C7.5549 4.43922 7.73529 4.36471 7.94706 4.36471C8.16274 4.36471 8.34412 4.43922 8.49118 4.58824C8.63824 4.73725 8.71176 4.91961 8.71176 5.13529C8.71176 5.34706 8.63824 5.52745 8.49118 5.67647Z"
									fill="CurrentColor"
								/>
							</svg>
						</Row>

						<Row
							width="528px"
							className="mt-[8px] w-[528px] flex justify-between">
							<Chips
								id="CKeyWord"
								className={s.chips}
								value={cKeyWord}
								// 	removeIcon={`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
								// 	<path d="M4.13179 11.8681C4.19232 11.9253 4.26125 11.964 4.33859 11.9842C4.41592 12.0044 4.49326 12.0044 4.5706 11.9842C4.64794 11.964 4.71519 11.9253 4.77235 11.8681L8.00033 8.63863L11.2283 11.8681C11.2855 11.9253 11.3527 11.964 11.4301 11.9842C11.5074 12.0044 11.5856 12.0052 11.6646 11.9867C11.7436 11.9682 11.8117 11.9287 11.8689 11.8681C11.926 11.811 11.9639 11.7437 11.9823 11.6663C12.0008 11.5889 12.0008 11.5116 11.9823 11.4342C11.9639 11.3568 11.926 11.2895 11.8689 11.2323L8.64088 7.99778L11.8689 4.76827C11.926 4.71108 11.9647 4.6438 11.9849 4.56643C12.005 4.48905 12.005 4.41168 11.9849 4.3343C11.9647 4.25693 11.926 4.18965 11.8689 4.13246C11.8083 4.07191 11.7394 4.03238 11.6621 4.01388C11.5847 3.99537 11.5074 3.99537 11.4301 4.01388C11.3527 4.03238 11.2855 4.07191 11.2283 4.13246L8.00033 7.36197L4.77235 4.13246C4.71519 4.07191 4.64709 4.03238 4.56808 4.01388C4.48906 3.99537 4.41088 3.99537 4.33354 4.01388C4.25621 4.03238 4.18896 4.07191 4.13179 4.13246C4.07463 4.18965 4.0368 4.25693 4.01831 4.3343C3.99982 4.41168 3.99982 4.48905 4.01831 4.56643C4.0368 4.6438 4.07463 4.71108 4.13179 4.76827L7.35978 7.99778L4.13179 11.2323C4.07463 11.2895 4.03596 11.3568 4.01579 11.4342C3.99561 11.5116 3.99477 11.5889 4.01327 11.6663C4.03176 11.7437 4.07127 11.811 4.13179 11.8681Z" fill="#808080"/>
								//   </svg>`}
								onChange={(e) => {
									setCKeyWord(e.value)
									if (e.target.value.length > 0) {
										setStepCompany((prevStepCompany) =>
											prevStepCompany.map((step) =>
												step.title === 'Тематические слова'
													? {...step, isDone: true}
													: step,
											),
										)
									} else {
										setStepCompany((prevStepCompany) =>
											prevStepCompany.map((step) =>
												step.title === 'Тематические слова'
													? {...step, isDone: false}
													: step,
											),
										)
									}

									console.log(e.value, 'chipsContent.value')
								}}
							/>

							<mui.Select
								className="right-[30px] top-[6px] cursor-pointer relative w-[24px] h-[24px] text-[#808080] hover:text-[#f2f2f2] rounded-[6px] hover:bg-[#333] active:bg-[#333] active:text-[#f2f2f2] focus:bg-[#333] focus:text-[#f2f2f2] transition-all "
								renderValue={(option: mui.SelectOption<number> | null) => {
									if (option == null || option.value === null) {
										return (
											<>
												<svg
													className="cursor-pointer"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
														fill="CurrentColor"
													/>
												</svg>
											</>
										)
									}
									return (
										<>
											<svg
												className="cursor-pointer"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
													fill="CurrentColor"
												/>
											</svg>
										</>
									)
								}}>
								<mui.Option value={1} className={`cursor-pointer z-10 mt-1`}>
									<div className={s.CopyNClearWrapper}>
										<div className={s.CopyNClear}>
											<div
												onClick={() => {
													let chipsContent =
														document.getElementById('CKeyWord')?.innerText
													navigator.clipboard.writeText(chipsContent)
												}}
												className={s.CopyAll}>
												<p className={s.Copy_text}>Скопировать всё</p>
											</div>
											<Line width="150px" className={s.CopyNClearLine} />
											<div
												onClick={() => {
													if (cKeyWordDel.length === 0) {
														setStepCompany((prevStepCompany) =>
															prevStepCompany.map((step) =>
																step.title === 'Тематические слова'
																	? {...step, isDone: false}
																	: step,
															),
														)
													}
													setCKeyWord([])
												}}
												className={s.Clear}>
												<p className={s.Clear_text}>Очистить</p>
											</div>
										</div>
									</div>
								</mui.Option>
							</mui.Select>
						</Row>
						<Row
							className={`items-center mt-[17px] text-[#808080] hover:text-[#f2f2f2] transition-all`}>
							<Label className={`mr-[4px]`} text="Минус фразы" />
							<svg
								className="cursor-pointer"
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M10.3147 13.5294C9.59118 13.8431 8.81961 14 8 14C7.18039 14 6.40882 13.8431 5.68529 13.5294C4.96176 13.2157 4.32353 12.7824 3.77059 12.2294C3.21765 11.6765 2.78431 11.0382 2.47059 10.3147C2.15686 9.59118 2 8.81961 2 8C2 7.18039 2.15686 6.40882 2.47059 5.68529C2.78431 4.96176 3.21667 4.32353 3.76765 3.77059C4.31863 3.21765 4.95588 2.78431 5.67941 2.47059C6.40294 2.15686 7.17451 2 7.99412 2C8.81373 2 9.58627 2.15686 10.3118 2.47059C11.0373 2.78431 11.6765 3.21765 12.2294 3.77059C12.7824 4.32353 13.2157 4.96176 13.5294 5.68529C13.8431 6.40882 14 7.18039 14 8C14 8.81961 13.8431 9.59118 13.5294 10.3147C13.2157 11.0382 12.7824 11.6765 12.2294 12.2294C11.6765 12.7824 11.0382 13.2157 10.3147 13.5294ZM6.05294 12.6118C6.65686 12.8706 7.30588 13 8 13C8.69412 13 9.34412 12.8706 9.95 12.6118C10.5559 12.3529 11.0873 11.9951 11.5441 11.5382C12.001 11.0814 12.3578 10.551 12.6147 9.94706C12.8716 9.34314 13 8.69412 13 8C13 7.30588 12.8706 6.65686 12.6118 6.05294C12.3529 5.44902 11.9941 4.91765 11.5353 4.45882C11.0765 4 10.5451 3.64216 9.94118 3.38529C9.33726 3.12843 8.68824 3 7.99412 3C7.3 3 6.65098 3.12843 6.04706 3.38529C5.44314 3.64216 4.91373 4 4.45882 4.45882C4.00392 4.91765 3.64804 5.44902 3.39118 6.05294C3.13431 6.65686 3.00588 7.30588 3.00588 8C3.00588 8.69412 3.13431 9.34314 3.39118 9.94706C3.64804 10.551 4.0049 11.0814 4.46176 11.5382C4.91863 11.9951 5.44902 12.3529 6.05294 12.6118ZM6.97059 11.2294H9.36471C9.48627 11.2294 9.58823 11.1902 9.67059 11.1118C9.75294 11.0333 9.79412 10.9353 9.79412 10.8176C9.79412 10.7 9.75294 10.602 9.67059 10.5235C9.58823 10.4451 9.48627 10.4059 9.36471 10.4059H8.63529V7.41176C8.63529 7.25098 8.59608 7.12255 8.51765 7.02647C8.43922 6.93039 8.32549 6.88235 8.17647 6.88235H7.07059C6.94902 6.88235 6.84706 6.92157 6.76471 7C6.68235 7.07843 6.64118 7.17647 6.64118 7.29412C6.64118 7.41176 6.68235 7.5098 6.76471 7.58824C6.84706 7.66667 6.94902 7.70588 7.07059 7.70588H7.7V10.4059H6.97059C6.84902 10.4059 6.74706 10.4451 6.66471 10.5235C6.58235 10.602 6.54118 10.7 6.54118 10.8176C6.54118 10.9353 6.58235 11.0333 6.66471 11.1118C6.74706 11.1902 6.84902 11.2294 6.97059 11.2294ZM8.49118 5.67647C8.34412 5.82549 8.16274 5.9 7.94706 5.9C7.73529 5.9 7.5549 5.82549 7.40588 5.67647C7.25686 5.52745 7.18235 5.34706 7.18235 5.13529C7.18235 4.91961 7.25686 4.73725 7.40588 4.58824C7.5549 4.43922 7.73529 4.36471 7.94706 4.36471C8.16274 4.36471 8.34412 4.43922 8.49118 4.58824C8.63824 4.73725 8.71176 4.91961 8.71176 5.13529C8.71176 5.34706 8.63824 5.52745 8.49118 5.67647Z"
									fill="CurrentColor"
								/>
							</svg>
						</Row>
						<Row
							width="528px"
							className="mt-[8px] w-[528px] flex justify-between">
							<Chips
								id="cKeyWordDel"
								className={s.chips}
								value={cKeyWordDel}
								onChange={(e) => {
									setCKeyWordDel(e.value)
									if (e.target.value.length > 0) {
										setStepCompany((prevStepCompany) =>
											prevStepCompany.map((step) =>
												step.title === 'Тематические слова'
													? {...step, isDone: true}
													: step,
											),
										)
									} else {
										setStepCompany((prevStepCompany) =>
											prevStepCompany.map((step) =>
												step.title === 'Тематические слова'
													? {...step, isDone: false}
													: step,
											),
										)
									}
								}}
							/>
							<mui.Select
								className="right-[30px] top-[6px] cursor-pointer relative w-[24px] h-[24px] text-[#808080] hover:text-[#f2f2f2] rounded-[6px] hover:bg-[#333] active:bg-[#333] active:text-[#f2f2f2] focus:bg-[#333] focus:text-[#f2f2f2] transition-all "
								renderValue={(option: mui.SelectOption<number> | null) => {
									if (option == null || option.value === null) {
										return (
											<>
												<svg
													className="cursor-pointer"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
														fill="CurrentColor"
													/>
												</svg>
											</>
										)
									}
									return (
										<>
											<svg
												className="cursor-pointer"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
													fill="CurrentColor"
												/>
											</svg>
										</>
									)
								}}>
								<mui.Option value={1} className={`cursor-pointer z-10 mt-1`}>
									<div className={s.CopyNClearWrapper}>
										<div className={s.CopyNClear}>
											<div
												onClick={() => {
													let chipsContent =
														document.getElementById('cKeyWordDel')?.innerText
													navigator.clipboard.writeText(chipsContent)
												}}
												className={s.CopyAll}>
												<p className={s.Copy_text}>Скопировать всё</p>
											</div>
											<Line width="150px" className={s.CopyNClearLine} />
											<div
												onClick={() => {
													if (cKeyWord.length === 0) {
														setStepCompany((prevStepCompany) =>
															prevStepCompany.map((step) =>
																step.title === 'Тематические слова'
																	? {...step, isDone: false}
																	: step,
															),
														)
													}

													setCKeyWordDel([])
												}}
												className={s.Clear}>
												<p className={s.Clear_text}>Очистить</p>
											</div>
										</div>
									</div>
								</mui.Option>
							</mui.Select>
						</Row>
					</Col>

					<Col width="528px" className={``}>
						<Line width="528px" className={s.Line} />
						<Row className={`items-center`}>
							<WhiteLabel
								className={`mr-[4px]`}
								size="16px"
								text="Запрет показов"
							/>
							{/* <svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M10 17C10.9562 17 11.8564 16.817 12.7005 16.451C13.5446 16.085 14.2892 15.5794 14.9343 14.9343C15.5794 14.2892 16.085 13.5446 16.451 12.7005C16.817 11.8564 17 10.9562 17 10C17 9.04379 16.817 8.14363 16.451 7.29951C16.085 6.45539 15.5794 5.71078 14.9343 5.06569C14.2892 4.42059 13.5435 3.91503 12.6971 3.54902C11.8507 3.18301 10.9493 3 9.99314 3C9.03693 3 8.13676 3.18301 7.29265 3.54902C6.44853 3.91503 5.70507 4.42059 5.06225 5.06569C4.41944 5.71078 3.91503 6.45539 3.54902 7.29951C3.18301 8.14363 3 9.04379 3 10C3 10.9562 3.18301 11.8564 3.54902 12.7005C3.91503 13.5446 4.42059 14.2892 5.06569 14.9343C5.71078 15.5794 6.45539 16.085 7.29951 16.451C8.14363 16.817 9.04379 17 10 17ZM10 15.8333C9.1902 15.8333 8.43301 15.6824 7.72843 15.3804C7.02386 15.0784 6.40507 14.6609 5.87206 14.1279C5.33905 13.5949 4.92271 12.9761 4.62304 12.2716C4.32337 11.567 4.17353 10.8098 4.17353 10C4.17353 9.1902 4.32337 8.43301 4.62304 7.72843C4.92271 7.02386 5.33791 6.40392 5.86863 5.86863C6.39935 5.33333 7.01699 4.91585 7.72157 4.61618C8.42614 4.3165 9.18333 4.16667 9.99314 4.16667C10.8029 4.16667 11.5601 4.3165 12.2647 4.61618C12.9693 4.91585 13.5892 5.33333 14.1245 5.86863C14.6598 6.40392 15.0784 7.02386 15.3804 7.72843C15.6824 8.43301 15.8333 9.1902 15.8333 10C15.8333 10.8098 15.6835 11.567 15.3838 12.2716C15.0842 12.9761 14.6678 13.5949 14.1348 14.1279C13.6018 14.6609 12.9819 15.0784 12.275 15.3804C11.5681 15.6824 10.8098 15.8333 10 15.8333ZM12.6284 10.3775L8.71667 12.6833C8.55654 12.7794 8.40212 12.7966 8.25343 12.7348C8.10474 12.673 8.03039 12.5575 8.03039 12.3882V7.61863C8.03039 7.45392 8.10817 7.34183 8.26373 7.28235C8.41928 7.22288 8.57026 7.2366 8.71667 7.32353L12.6284 9.64314C12.7657 9.72549 12.8355 9.84673 12.8377 10.0069C12.84 10.167 12.7703 10.2905 12.6284 10.3775Z"
									fill="#808080"
								/>
							</svg> */}
						</Row>
						<Col width="528px">
							<Label className={`mt-[17px]`} text="Сайты (домены)" />
							<Row width="528px" className={`mt-[8px]`}>
								<Input
									onChange={(e) => {
										setCBanShow(e.target.value)
										if (e.target.value.length > 0) {
											setStepCompany((prevStepCompany) =>
												prevStepCompany.map((step) =>
													step.title === 'Запрет показов'
														? {...step, isDone: true}
														: step,
												),
											)
										} else {
											setStepCompany((prevStepCompany) =>
												prevStepCompany.map((step) =>
													step.title === 'Запрет показов'
														? {...step, isDone: false}
														: step,
												),
											)
										}
									}}
									className={s.inputText}
									conteinerWidth="528px"
									width="528px"
									placeholder="https://test.ru/test/testik"
									onKeyDown={(e) => {
										if (
											e.key === 'Enter' &&
											!e.repeat &&
											!e.shiftKey &&
											e.target.value.length > 0
										) {
											e.preventDefault
											console.log('ENTER PRESS')
											// Hooks
											setBanShowArray((prevArray) => [
												...prevArray,
												{
													id: `BanArray-${generateUniqueId()}`,
													text: e.target.value,
												},
											])
											setCBanShow('')
											e.target.value = ''
										}
										console.log(banShowArray, cBanShow)
									}}
									value={cBanShow}
								/>
							</Row>
						</Col>
						{banShowArray.length > 0 && (
							<>
								<Col
									iD="banShow"
									width="528px"
									className={`mt-[8px] border border-[#262626] rounded-[10px]`}>
									{banShowArray.map((file, index) => (
										<Row
											key={index}
											width="528px"
											className={`items-center pl-[16px] pb-[5px] my-[5px] justify-between ${s.list}`}>
											<div className="w-[500px] flex justify-between items-center ">
												<WhiteLabel
													className={`w-[200px]`}
													size="14px"
													text={file.text}
												/>
												<svg
													onClick={() => {
														setBanShowArray(
															banShowArray.filter((obj) => obj.id !== file.id),
														)
													}}
													className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														d="M4.13179 11.8681C4.19232 11.9253 4.26125 11.964 4.33859 11.9842C4.41592 12.0044 4.49326 12.0044 4.5706 11.9842C4.64794 11.964 4.71519 11.9253 4.77235 11.8681L8.00033 8.63863L11.2283 11.8681C11.2855 11.9253 11.3527 11.964 11.4301 11.9842C11.5074 12.0044 11.5856 12.0052 11.6646 11.9867C11.7436 11.9682 11.8117 11.9287 11.8689 11.8681C11.926 11.811 11.9639 11.7437 11.9823 11.6663C12.0008 11.5889 12.0008 11.5116 11.9823 11.4342C11.9639 11.3568 11.926 11.2895 11.8689 11.2323L8.64088 7.99778L11.8689 4.76827C11.926 4.71108 11.9647 4.6438 11.9849 4.56643C12.005 4.48905 12.005 4.41168 11.9849 4.3343C11.9647 4.25693 11.926 4.18965 11.8689 4.13246C11.8083 4.07191 11.7394 4.03238 11.6621 4.01388C11.5847 3.99537 11.5074 3.99537 11.4301 4.01388C11.3527 4.03238 11.2855 4.07191 11.2283 4.13246L8.00033 7.36197L4.77235 4.13246C4.71519 4.07191 4.64709 4.03238 4.56808 4.01388C4.48906 3.99537 4.41088 3.99537 4.33354 4.01388C4.25621 4.03238 4.18896 4.07191 4.13179 4.13246C4.07463 4.18965 4.0368 4.25693 4.01831 4.3343C3.99982 4.41168 3.99982 4.48905 4.01831 4.56643C4.0368 4.6438 4.07463 4.71108 4.13179 4.76827L7.35978 7.99778L4.13179 11.2323C4.07463 11.2895 4.03596 11.3568 4.01579 11.4342C3.99561 11.5116 3.99477 11.5889 4.01327 11.6663C4.03176 11.7437 4.07127 11.811 4.13179 11.8681Z"
														fill="CurrentColor"
													/>
												</svg>
											</div>
										</Row>
									))}
								</Col>
							</>
						)}
						<Line width="528px" className={s.Line} />

						<div className={`mb-[32px] w-[528px] float-right `}>
							<Row width="auto" className={`items-center float-right`}>
								<BlueLabel
									className={`float-right mr-[24px] cursor-pointer`}
									text="Сохранить и выйти"
									onClick={
										() => {
											
											
											if (cName && cLink && cDateStart && cDateEnd && cTarget && cWeekBudget) {
												window.localStorage.setItem(
													'create_temp',
													JSON.stringify([
														{
															cName: cName,
															cLink: cLink,
															cSettingsLink: cSettingsLink,
															cDateStart: cDateStart,
															cDateEnd: cDateEnd,
															cTarget: cTarget,
															cWeekBudget: cWeekBudget,
															cKeyWord: cKeyWord,
															cKeyWordDel: cKeyWordDel,
															banShowArray: banShowArray,
														},
														{
															aName: aName,
															aGeography: aGeography,
															// aFavor: aFavor,
															aDevice: aDevice,
															GenderNAgeObject: GenderNAgeObject,
														},
														{
															bName: bName,
															bLink: bLink,
															// bOptionDescription: bOptionDescription,
															titleArray: titleArray,
															descrArray: descrArray,
															bVideo: bVideo,
															bAudio: bAudio,
															bImg: images,
															bUnvirfied: bUnvirfied,
														},
														{
															images: images,
														},
													]),
												)
												navigate('/')
											}
											switch (true) {
												case !cName:
													setStepCompany((prevStepCompany) =>
														prevStepCompany.map((step) =>
															step.title === 'Название компании*'
																? {...step, isError: true}
																: step,
														),
													)
													setCNameError('Введите название компании')
	
												case !cLink:
													setStepCompany((prevStepCompany) =>
														prevStepCompany.map((step) =>
															step.title === 'Ссылка на рекламируемую страницу*'
																? {...step, isError: true}
																: step,
														),
													)
													setCLinkError(
														'Введите ссылку на рекламируемую страницу',
													)
	
												case !cDateStart:
												case !cDateEnd:
													setStepCompany((prevStepCompany) =>
														prevStepCompany.map((step) =>
															step.title === 'Начало и окончание компании*'
																? {...step, isError: true}
																: step,
														),
													)
												
												case !cWeekBudget:
													setStepCompany((prevStepCompany) =>
														prevStepCompany.map((step) =>
															step.title === 'Дневной бюджет'
																? {...step, isError: true}
																: step,
														),
													)
													setCWeekBudError('Введите дневной бюджет')
												case !cTarget:
													setStepCompany((prevStepCompany) =>
														prevStepCompany.map((step) =>
															step.title === 'Цель*'
																? {...step, isError: true}
																: step,
														),
													)
													break
												default:
												// Handle default case
											}
										}
										// 	setGlobalState({
										// Company: {
										// 	cName: cName,
										// 	cLink: cLink,
										// 	cSettingsLink: cSettingsLink,
										// 	cDateStart: cDateStart,
										// 	cDateEnd: cDateEnd,
										// 	cTarget: cTarget,
										// 	cWeekBudget: cWeekBudget,
										// 	cKeyWord: cKeyWord,
										// 	cKeyWordDel: cKeyWordDel,
										// 	cBabShow: cBanShow,
										// },

										// Auditor: {
										// 	aName: aName,
										// 	aGeography: aGeography,
										// 	aFavor: aFavor,
										// 	aDevice: aDevice,
										// 	aGenderNAge: aGenderNAge,
										// },

										// Banner: {
										// 	bName: bName,
										// 	bLink: bLink,
										// 	bOptionTitle: bOptionTitle,
										// 	bOptionDescription: bOptionDescription,
										// 	bOptionDescText: bOptionDescText,
										// 	bVideo: bVideo,
										// 	bAudio: bAudio,
										// 	bImg: bImg,
										// 	bUnvirfied: bUnvirfied,
										// },
										// 	})
										// }
									}
								/>
								<BlueButton
									onClick={() => {
										if (cName && cLink && cDateStart && cDateEnd && cTarget && cWeekBudget) {
											dispatch({
												type: 'setSwitchCreatePage',
												SwitchCreatePage: 2,
											})
										}
										switch (true) {
											case !cName:
												setStepCompany((prevStepCompany) =>
													prevStepCompany.map((step) =>
														step.title === 'Название компании*'
															? {...step, isError: true}
															: step,
													),
												)
												setCNameError('Введите название компании')

											case !cLink:
												setStepCompany((prevStepCompany) =>
													prevStepCompany.map((step) =>
														step.title === 'Ссылка на рекламируемую страницу*'
															? {...step, isError: true}
															: step,
													),
												)
												setCLinkError(
													'Введите ссылку на рекламируемую страницу',
												)

											case !cDateStart:
											case !cDateEnd:
												setStepCompany((prevStepCompany) =>
													prevStepCompany.map((step) =>
														step.title === 'Начало и окончание компании*'
															? {...step, isError: true}
															: step,
													),
												)
											
											case !cWeekBudget:
												setStepCompany((prevStepCompany) =>
													prevStepCompany.map((step) =>
														step.title === 'Дневной бюджет'
															? {...step, isError: true}
															: step,
													),
												)
												setCWeekBudError('Введите дневной бюджет')
											case !cTarget:
												setStepCompany((prevStepCompany) =>
													prevStepCompany.map((step) =>
														step.title === 'Цель*'
															? {...step, isError: true}
															: step,
													),
												)
												break
											default:
											// Handle default case
										}
									}}
									width="120px"
									className={`float-right h-[36px] w-[120px]`}
									text="Далее"
								/>
							</Row>
						</div>
					</Col>
				</div>
				<div
					id="page-2"
					style={switchPage === 2 ? {display: 'block'} : {display: 'none'}}>
					<Col className={s.contentCol} width="528px">
						<WhiteLabel
							className={s.content}
							text="Название Аудитории*"
							size="16px"
						/>
						<Input
							onChange={(e) => {
								setAName(e.target.value)
								setANameError('')
								if (e.target.value.length > 0) {
									setStepAudi((prevStepAudi) =>
										prevStepAudi.map((step) =>
											step.title === 'Название аудитории*'
												? {...step, isDone: true, isError: false}
												: step,
										),
									)
								} else {
									setStepAudi((prevStepAudi) =>
										prevStepAudi.map((step) =>
											step.title === 'Название аудитории*'
												? {...step, isDone: false}
												: step,
										),
									)
								}
							}}
							value={aName}
							width="100%"
							placeholder="Введите название..."
							className={`${s.inputText}`}
							errorMsg={aNameError}
						/>
						<Line width="528px" className={s.Line} />
						<Col width="528px" className={`w-[528px]`}>
							<Row width="528px" className={`${s.RowTitle}`}>
								<WhiteLabel
									className={'mr-1'}
									text="География показов"
									size="16px"
								/>
								<svg
									className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12.8934 16.9118C11.989 17.3039 11.0245 17.5 10 17.5C8.97549 17.5 8.01103 17.3039 7.10662 16.9118C6.20221 16.5196 5.40441 15.9779 4.71324 15.2868C4.02206 14.5956 3.48039 13.7978 3.08824 12.8934C2.69608 11.989 2.5 11.0245 2.5 10C2.5 8.97549 2.69608 8.01103 3.08824 7.10662C3.48039 6.20221 4.02083 5.40441 4.70956 4.71324C5.39828 4.02206 6.19485 3.48039 7.09926 3.08824C8.00368 2.69608 8.96814 2.5 9.99265 2.5C11.0172 2.5 11.9828 2.69608 12.8897 3.08824C13.7966 3.48039 14.5956 4.02206 15.2868 4.71324C15.9779 5.40441 16.5196 6.20221 16.9118 7.10662C17.3039 8.01103 17.5 8.97549 17.5 10C17.5 11.0245 17.3039 11.989 16.9118 12.8934C16.5196 13.7978 15.9779 14.5956 15.2868 15.2868C14.5956 15.9779 13.7978 16.5196 12.8934 16.9118ZM7.56618 15.7647C8.32108 16.0882 9.13235 16.25 10 16.25C10.8676 16.25 11.6801 16.0882 12.4375 15.7647C13.1949 15.4412 13.8591 14.9939 14.4301 14.4228C15.0012 13.8517 15.4473 13.1887 15.7684 12.4338C16.0895 11.6789 16.25 10.8676 16.25 10C16.25 9.13235 16.0882 8.32108 15.7647 7.56618C15.4412 6.81127 14.9926 6.14706 14.4191 5.57353C13.8456 5 13.1814 4.5527 12.4265 4.23162C11.6716 3.91054 10.8603 3.75 9.99265 3.75C9.125 3.75 8.31373 3.91054 7.55882 4.23162C6.80392 4.5527 6.14216 5 5.57353 5.57353C5.0049 6.14706 4.56005 6.81127 4.23897 7.56618C3.91789 8.32108 3.75735 9.13235 3.75735 10C3.75735 10.8676 3.91789 11.6789 4.23897 12.4338C4.56005 13.1887 5.00613 13.8517 5.57721 14.4228C6.14828 14.9939 6.81127 15.4412 7.56618 15.7647ZM8.71324 14.0368H11.7059C11.8578 14.0368 11.9853 13.9877 12.0882 13.8897C12.1912 13.7917 12.2426 13.6691 12.2426 13.5221C12.2426 13.375 12.1912 13.2525 12.0882 13.1544C11.9853 13.0564 11.8578 13.0074 11.7059 13.0074H10.7941V9.26471C10.7941 9.06373 10.7451 8.90319 10.6471 8.78309C10.549 8.66299 10.4069 8.60294 10.2206 8.60294H8.83824C8.68627 8.60294 8.55882 8.65196 8.45588 8.75C8.35294 8.84804 8.30147 8.97059 8.30147 9.11765C8.30147 9.26471 8.35294 9.38725 8.45588 9.48529C8.55882 9.58333 8.68627 9.63235 8.83824 9.63235H9.625V13.0074H8.71324C8.56127 13.0074 8.43382 13.0564 8.33088 13.1544C8.22794 13.2525 8.17647 13.375 8.17647 13.5221C8.17647 13.6691 8.22794 13.7917 8.33088 13.8897C8.43382 13.9877 8.56127 14.0368 8.71324 14.0368ZM10.614 7.09559C10.4301 7.28186 10.2034 7.375 9.93382 7.375C9.66912 7.375 9.44363 7.28186 9.25735 7.09559C9.07108 6.90931 8.97794 6.68382 8.97794 6.41912C8.97794 6.14951 9.07108 5.92157 9.25735 5.73529C9.44363 5.54902 9.66912 5.45588 9.93382 5.45588C10.2034 5.45588 10.4301 5.54902 10.614 5.73529C10.7978 5.92157 10.8897 6.14951 10.8897 6.41912C10.8897 6.68382 10.7978 6.90931 10.614 7.09559Z"
										fill="CurrentColor"
									/>
								</svg>
							</Row>
							<Row width="528px" className="w-[528px] flex justify-between">
								<Chips
									id="aGeography"
									className={s.chips}
									value={aGeography}
									onChange={(e) => {
										setAGeography(e.value)
										if (e.target.value.length > 0) {
											setStepAudi((prevStepAudi) =>
												prevStepAudi.map((step) =>
													step.title === 'География показов'
														? {...step, isDone: true}
														: step,
												),
											)
										} else {
											setStepAudi((prevStepAudi) =>
												prevStepAudi.map((step) =>
													step.title === 'География показов'
														? {...step, isDone: false}
														: step,
												),
											)
										}
									}}
								/>
								<mui.Select
									className="right-[30px] top-[6px] cursor-pointer relative w-[24px] h-[24px] text-[#808080] hover:text-[#f2f2f2] rounded-[6px] hover:bg-[#333] active:bg-[#333] active:text-[#f2f2f2] focus:bg-[#333] focus:text-[#f2f2f2] transition-all "
									renderValue={(option: mui.SelectOption<number> | null) => {
										if (option == null || option.value === null) {
											return (
												<>
													<svg
														className="cursor-pointer"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
															fill="CurrentColor"
														/>
													</svg>
												</>
											)
										}
										return (
											<>
												<svg
													className="cursor-pointer"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
														fill="CurrentColor"
													/>
												</svg>
											</>
										)
									}}>
									<mui.Option value={1} className={`cursor-pointer z-10 mt-1`}>
										<div className={s.CopyNClearWrapper}>
											<div className={s.CopyNClear}>
												<div
													onClick={() => {
														let chipsContent =
															document.getElementById('aGeography')?.innerText
														navigator.clipboard.writeText(chipsContent)
													}}
													className={s.CopyAll}>
													<p className={s.Copy_text}>Скопировать всё</p>
												</div>
												<Line width="150px" className={s.CopyNClearLine} />
												<div
													onClick={() => {
														setStepAudi((prevStepAudi) =>
															prevStepAudi.map((step) =>
																step.title === 'География показов'
																	? {...step, isDone: false}
																	: step,
															),
														)

														setAGeography([])
													}}
													className={s.Clear}>
													<p className={s.Clear_text}>Очистить</p>
												</div>
											</div>
										</div>
									</mui.Option>
								</mui.Select>
							</Row>
						</Col>

						<Line width="528px" className={s.Line} />

						{/* DO IT */}
						<Row width="528px" className={s.RowTitle}>
							<WhiteLabel className={'mr-1'} text="Интересы" size="16px" />
							<svg
								className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.8934 16.9118C11.989 17.3039 11.0245 17.5 10 17.5C8.97549 17.5 8.01103 17.3039 7.10662 16.9118C6.20221 16.5196 5.40441 15.9779 4.71324 15.2868C4.02206 14.5956 3.48039 13.7978 3.08824 12.8934C2.69608 11.989 2.5 11.0245 2.5 10C2.5 8.97549 2.69608 8.01103 3.08824 7.10662C3.48039 6.20221 4.02083 5.40441 4.70956 4.71324C5.39828 4.02206 6.19485 3.48039 7.09926 3.08824C8.00368 2.69608 8.96814 2.5 9.99265 2.5C11.0172 2.5 11.9828 2.69608 12.8897 3.08824C13.7966 3.48039 14.5956 4.02206 15.2868 4.71324C15.9779 5.40441 16.5196 6.20221 16.9118 7.10662C17.3039 8.01103 17.5 8.97549 17.5 10C17.5 11.0245 17.3039 11.989 16.9118 12.8934C16.5196 13.7978 15.9779 14.5956 15.2868 15.2868C14.5956 15.9779 13.7978 16.5196 12.8934 16.9118ZM7.56618 15.7647C8.32108 16.0882 9.13235 16.25 10 16.25C10.8676 16.25 11.6801 16.0882 12.4375 15.7647C13.1949 15.4412 13.8591 14.9939 14.4301 14.4228C15.0012 13.8517 15.4473 13.1887 15.7684 12.4338C16.0895 11.6789 16.25 10.8676 16.25 10C16.25 9.13235 16.0882 8.32108 15.7647 7.56618C15.4412 6.81127 14.9926 6.14706 14.4191 5.57353C13.8456 5 13.1814 4.5527 12.4265 4.23162C11.6716 3.91054 10.8603 3.75 9.99265 3.75C9.125 3.75 8.31373 3.91054 7.55882 4.23162C6.80392 4.5527 6.14216 5 5.57353 5.57353C5.0049 6.14706 4.56005 6.81127 4.23897 7.56618C3.91789 8.32108 3.75735 9.13235 3.75735 10C3.75735 10.8676 3.91789 11.6789 4.23897 12.4338C4.56005 13.1887 5.00613 13.8517 5.57721 14.4228C6.14828 14.9939 6.81127 15.4412 7.56618 15.7647ZM8.71324 14.0368H11.7059C11.8578 14.0368 11.9853 13.9877 12.0882 13.8897C12.1912 13.7917 12.2426 13.6691 12.2426 13.5221C12.2426 13.375 12.1912 13.2525 12.0882 13.1544C11.9853 13.0564 11.8578 13.0074 11.7059 13.0074H10.7941V9.26471C10.7941 9.06373 10.7451 8.90319 10.6471 8.78309C10.549 8.66299 10.4069 8.60294 10.2206 8.60294H8.83824C8.68627 8.60294 8.55882 8.65196 8.45588 8.75C8.35294 8.84804 8.30147 8.97059 8.30147 9.11765C8.30147 9.26471 8.35294 9.38725 8.45588 9.48529C8.55882 9.58333 8.68627 9.63235 8.83824 9.63235H9.625V13.0074H8.71324C8.56127 13.0074 8.43382 13.0564 8.33088 13.1544C8.22794 13.2525 8.17647 13.375 8.17647 13.5221C8.17647 13.6691 8.22794 13.7917 8.33088 13.8897C8.43382 13.9877 8.56127 14.0368 8.71324 14.0368ZM10.614 7.09559C10.4301 7.28186 10.2034 7.375 9.93382 7.375C9.66912 7.375 9.44363 7.28186 9.25735 7.09559C9.07108 6.90931 8.97794 6.68382 8.97794 6.41912C8.97794 6.14951 9.07108 5.92157 9.25735 5.73529C9.44363 5.54902 9.66912 5.45588 9.93382 5.45588C10.2034 5.45588 10.4301 5.54902 10.614 5.73529C10.7978 5.92157 10.8897 6.14951 10.8897 6.41912C10.8897 6.68382 10.7978 6.90931 10.614 7.09559Z"
									fill="CurrentColor"
								/>
							</svg>
						</Row>
						{/* Ex Categories , Now Interes */}
						<TreeSelectCustom setValueFunction={(newCheckedValues) => {
							setCategories(newCheckedValues)
							setStepAudi((prevStepAudi) =>
								prevStepAudi.map((step) =>
									step.title === 'Интересы'
										? {...step, isDone: true}
										: step,
								),
							)
							if (Object.values(newCheckedValues).every(value => value === false)) {
								setStepAudi((prevStepAudi) =>
								prevStepAudi.map((step) =>
									step.title === 'Интересы'
										? {...step, isDone: false}
										: step,
								),
							)
							}
							
							
						}} options={op} />

						<Line width="528px" className={s.Line} />

						{/* <Row width="528px" className={s.RowTitle}>
							<WhiteLabel className={'mr-1'} text="Интересы" size="16px" />
							<svg
								className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.8934 16.9118C11.989 17.3039 11.0245 17.5 10 17.5C8.97549 17.5 8.01103 17.3039 7.10662 16.9118C6.20221 16.5196 5.40441 15.9779 4.71324 15.2868C4.02206 14.5956 3.48039 13.7978 3.08824 12.8934C2.69608 11.989 2.5 11.0245 2.5 10C2.5 8.97549 2.69608 8.01103 3.08824 7.10662C3.48039 6.20221 4.02083 5.40441 4.70956 4.71324C5.39828 4.02206 6.19485 3.48039 7.09926 3.08824C8.00368 2.69608 8.96814 2.5 9.99265 2.5C11.0172 2.5 11.9828 2.69608 12.8897 3.08824C13.7966 3.48039 14.5956 4.02206 15.2868 4.71324C15.9779 5.40441 16.5196 6.20221 16.9118 7.10662C17.3039 8.01103 17.5 8.97549 17.5 10C17.5 11.0245 17.3039 11.989 16.9118 12.8934C16.5196 13.7978 15.9779 14.5956 15.2868 15.2868C14.5956 15.9779 13.7978 16.5196 12.8934 16.9118ZM7.56618 15.7647C8.32108 16.0882 9.13235 16.25 10 16.25C10.8676 16.25 11.6801 16.0882 12.4375 15.7647C13.1949 15.4412 13.8591 14.9939 14.4301 14.4228C15.0012 13.8517 15.4473 13.1887 15.7684 12.4338C16.0895 11.6789 16.25 10.8676 16.25 10C16.25 9.13235 16.0882 8.32108 15.7647 7.56618C15.4412 6.81127 14.9926 6.14706 14.4191 5.57353C13.8456 5 13.1814 4.5527 12.4265 4.23162C11.6716 3.91054 10.8603 3.75 9.99265 3.75C9.125 3.75 8.31373 3.91054 7.55882 4.23162C6.80392 4.5527 6.14216 5 5.57353 5.57353C5.0049 6.14706 4.56005 6.81127 4.23897 7.56618C3.91789 8.32108 3.75735 9.13235 3.75735 10C3.75735 10.8676 3.91789 11.6789 4.23897 12.4338C4.56005 13.1887 5.00613 13.8517 5.57721 14.4228C6.14828 14.9939 6.81127 15.4412 7.56618 15.7647ZM8.71324 14.0368H11.7059C11.8578 14.0368 11.9853 13.9877 12.0882 13.8897C12.1912 13.7917 12.2426 13.6691 12.2426 13.5221C12.2426 13.375 12.1912 13.2525 12.0882 13.1544C11.9853 13.0564 11.8578 13.0074 11.7059 13.0074H10.7941V9.26471C10.7941 9.06373 10.7451 8.90319 10.6471 8.78309C10.549 8.66299 10.4069 8.60294 10.2206 8.60294H8.83824C8.68627 8.60294 8.55882 8.65196 8.45588 8.75C8.35294 8.84804 8.30147 8.97059 8.30147 9.11765C8.30147 9.26471 8.35294 9.38725 8.45588 9.48529C8.55882 9.58333 8.68627 9.63235 8.83824 9.63235H9.625V13.0074H8.71324C8.56127 13.0074 8.43382 13.0564 8.33088 13.1544C8.22794 13.2525 8.17647 13.375 8.17647 13.5221C8.17647 13.6691 8.22794 13.7917 8.33088 13.8897C8.43382 13.9877 8.56127 14.0368 8.71324 14.0368ZM10.614 7.09559C10.4301 7.28186 10.2034 7.375 9.93382 7.375C9.66912 7.375 9.44363 7.28186 9.25735 7.09559C9.07108 6.90931 8.97794 6.68382 8.97794 6.41912C8.97794 6.14951 9.07108 5.92157 9.25735 5.73529C9.44363 5.54902 9.66912 5.45588 9.93382 5.45588C10.2034 5.45588 10.4301 5.54902 10.614 5.73529C10.7978 5.92157 10.8897 6.14951 10.8897 6.41912C10.8897 6.68382 10.7978 6.90931 10.614 7.09559Z"
									fill="CurrentColor"
								/>
							</svg>
						</Row>
						<Row width="528px" className="w-[528px] flex justify-between">
							<Chips
								id="aFavor"
								className={s.chips}
								value={aFavor}
								onChange={(e) => {
									setAFavor(e.value)
									if (e.target.value.length > 0) {
										setStepAudi((prevStepAudi) =>
											prevStepAudi.map((step) =>
												step.title === 'Интересы'
													? {...step, isDone: true}
													: step,
											),
										)
									} else {
										setStepAudi((prevStepAudi) =>
											prevStepAudi.map((step) =>
												step.title === 'Интересы'
													? {...step, isDone: false}
													: step,
											),
										)
									}
								}}
							/>
							<mui.Select
								className="right-[30px] top-[6px] cursor-pointer relative w-[24px] h-[24px] text-[#808080] hover:text-[#f2f2f2] rounded-[6px] hover:bg-[#333] active:bg-[#333] active:text-[#f2f2f2] focus:bg-[#333] focus:text-[#f2f2f2] transition-all "
								renderValue={(option: mui.SelectOption<number> | null) => {
									if (option == null || option.value === null) {
										return (
											<>
												<svg
													className="cursor-pointer"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
														fill="CurrentColor"
													/>
												</svg>
											</>
										)
									}
									return (
										<>
											<svg
												className="cursor-pointer"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
													fill="CurrentColor"
												/>
											</svg>
										</>
									)
								}}>
								<mui.Option value={1} className={`cursor-pointer z-10 mt-1`}>
									<div className={s.CopyNClearWrapper}>
										<div className={s.CopyNClear}>
											<div
												onClick={() => {
													let chipsContent =
														document.getElementById('aFavor')?.innerText
													navigator.clipboard.writeText(chipsContent)
												}}
												className={s.CopyAll}>
												<p className={s.Copy_text}>Скопировать всё</p>
											</div>
											<Line width="150px" className={s.CopyNClearLine} />
											<div
												onClick={() => {
													setStepAudi((prevStepAudi) =>
														prevStepAudi.map((step) =>
															step.title === 'Интересы'
																? {...step, isDone: false}
																: step,
														),
													)

													setAFavor([])
												}}
												className={s.Clear}>
												<p className={s.Clear_text}>Очистить</p>
											</div>
										</div>
									</div>
								</mui.Option>
							</mui.Select>
						</Row>

						<Line width="528px" className={s.Line} /> */}

						<Row width="528px" className={s.RowTitle}>
							<WhiteLabel className={'mr-1'} text="Устройства" size="16px" />
							<svg
								className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.8934 16.9118C11.989 17.3039 11.0245 17.5 10 17.5C8.97549 17.5 8.01103 17.3039 7.10662 16.9118C6.20221 16.5196 5.40441 15.9779 4.71324 15.2868C4.02206 14.5956 3.48039 13.7978 3.08824 12.8934C2.69608 11.989 2.5 11.0245 2.5 10C2.5 8.97549 2.69608 8.01103 3.08824 7.10662C3.48039 6.20221 4.02083 5.40441 4.70956 4.71324C5.39828 4.02206 6.19485 3.48039 7.09926 3.08824C8.00368 2.69608 8.96814 2.5 9.99265 2.5C11.0172 2.5 11.9828 2.69608 12.8897 3.08824C13.7966 3.48039 14.5956 4.02206 15.2868 4.71324C15.9779 5.40441 16.5196 6.20221 16.9118 7.10662C17.3039 8.01103 17.5 8.97549 17.5 10C17.5 11.0245 17.3039 11.989 16.9118 12.8934C16.5196 13.7978 15.9779 14.5956 15.2868 15.2868C14.5956 15.9779 13.7978 16.5196 12.8934 16.9118ZM7.56618 15.7647C8.32108 16.0882 9.13235 16.25 10 16.25C10.8676 16.25 11.6801 16.0882 12.4375 15.7647C13.1949 15.4412 13.8591 14.9939 14.4301 14.4228C15.0012 13.8517 15.4473 13.1887 15.7684 12.4338C16.0895 11.6789 16.25 10.8676 16.25 10C16.25 9.13235 16.0882 8.32108 15.7647 7.56618C15.4412 6.81127 14.9926 6.14706 14.4191 5.57353C13.8456 5 13.1814 4.5527 12.4265 4.23162C11.6716 3.91054 10.8603 3.75 9.99265 3.75C9.125 3.75 8.31373 3.91054 7.55882 4.23162C6.80392 4.5527 6.14216 5 5.57353 5.57353C5.0049 6.14706 4.56005 6.81127 4.23897 7.56618C3.91789 8.32108 3.75735 9.13235 3.75735 10C3.75735 10.8676 3.91789 11.6789 4.23897 12.4338C4.56005 13.1887 5.00613 13.8517 5.57721 14.4228C6.14828 14.9939 6.81127 15.4412 7.56618 15.7647ZM8.71324 14.0368H11.7059C11.8578 14.0368 11.9853 13.9877 12.0882 13.8897C12.1912 13.7917 12.2426 13.6691 12.2426 13.5221C12.2426 13.375 12.1912 13.2525 12.0882 13.1544C11.9853 13.0564 11.8578 13.0074 11.7059 13.0074H10.7941V9.26471C10.7941 9.06373 10.7451 8.90319 10.6471 8.78309C10.549 8.66299 10.4069 8.60294 10.2206 8.60294H8.83824C8.68627 8.60294 8.55882 8.65196 8.45588 8.75C8.35294 8.84804 8.30147 8.97059 8.30147 9.11765C8.30147 9.26471 8.35294 9.38725 8.45588 9.48529C8.55882 9.58333 8.68627 9.63235 8.83824 9.63235H9.625V13.0074H8.71324C8.56127 13.0074 8.43382 13.0564 8.33088 13.1544C8.22794 13.2525 8.17647 13.375 8.17647 13.5221C8.17647 13.6691 8.22794 13.7917 8.33088 13.8897C8.43382 13.9877 8.56127 14.0368 8.71324 14.0368ZM10.614 7.09559C10.4301 7.28186 10.2034 7.375 9.93382 7.375C9.66912 7.375 9.44363 7.28186 9.25735 7.09559C9.07108 6.90931 8.97794 6.68382 8.97794 6.41912C8.97794 6.14951 9.07108 5.92157 9.25735 5.73529C9.44363 5.54902 9.66912 5.45588 9.93382 5.45588C10.2034 5.45588 10.4301 5.54902 10.614 5.73529C10.7978 5.92157 10.8897 6.14951 10.8897 6.41912C10.8897 6.68382 10.7978 6.90931 10.614 7.09559Z"
									fill="CurrentColor"
								/>
							</svg>
						</Row>
						<Row width="528px" className="w-[528px] flex justify-between">
							<Chips
								id="aDevice"
								className={s.chips}
								value={aDevice}
								onChange={(e) => {
									setADevice(e.value)
									if (e.target.value.length > 0) {
										setStepAudi((prevStepAudi) =>
											prevStepAudi.map((step) =>
												step.title === 'Устройства'
													? {...step, isDone: true}
													: step,
											),
										)
									} else {
										setStepAudi((prevStepAudi) =>
											prevStepAudi.map((step) =>
												step.title === 'Устройства'
													? {...step, isDone: false}
													: step,
											),
										)
									}
								}}
							/>
							<mui.Select
								className="right-[30px] top-[6px] cursor-pointer relative w-[24px] h-[24px] text-[#808080] hover:text-[#f2f2f2] rounded-[6px] hover:bg-[#333] active:bg-[#333] active:text-[#f2f2f2] focus:bg-[#333] focus:text-[#f2f2f2] transition-all "
								renderValue={(option: mui.SelectOption<number> | null) => {
									if (option == null || option.value === null) {
										return (
											<>
												<svg
													className="cursor-pointer"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
														fill="CurrentColor"
													/>
												</svg>
											</>
										)
									}
									return (
										<>
											<svg
												className="cursor-pointer"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M11.9991 7.94531C12.277 7.94531 12.5132 7.85027 12.7079 7.66019C12.9026 7.47011 13 7.23883 13 6.96636C13 6.78989 12.955 6.62823 12.865 6.4814C12.775 6.33457 12.6544 6.21763 12.5031 6.13058C12.3519 6.04353 12.1839 6 11.9991 6C11.813 6 11.6449 6.04353 11.4949 6.13058C11.3449 6.21763 11.2249 6.33457 11.135 6.4814C11.045 6.62823 11 6.78989 11 6.96636C11 7.1488 11.045 7.31316 11.135 7.45944C11.2249 7.60572 11.3449 7.72327 11.4949 7.81209C11.6449 7.9009 11.813 7.94531 11.9991 7.94531ZM11.9991 12.9813C12.277 12.9813 12.5132 12.8861 12.7079 12.6958C12.9026 12.5055 13 12.2761 13 12.0076C13 11.8286 12.955 11.6652 12.865 11.5172C12.775 11.3693 12.6544 11.2521 12.5031 11.1657C12.3519 11.0792 12.1839 11.036 11.9991 11.036C11.813 11.036 11.6449 11.0792 11.4949 11.1657C11.3449 11.2521 11.2249 11.3693 11.135 11.5172C11.045 11.6652 11 11.8286 11 12.0076C11 12.1879 11.045 12.3514 11.135 12.4981C11.2249 12.6448 11.3449 12.762 11.4949 12.8497C11.6449 12.9374 11.813 12.9813 11.9991 12.9813ZM12.7079 17.7159C12.5132 17.9053 12.277 18 11.9991 18C11.813 18 11.6449 17.9564 11.4949 17.8691C11.3449 17.7818 11.2249 17.6645 11.135 17.5173C11.045 17.3701 11 17.208 11 17.031C11 16.8504 11.045 16.6862 11.135 16.5384C11.2249 16.3905 11.3449 16.2729 11.4949 16.1856C11.6449 16.0983 11.813 16.0547 11.9991 16.0547C12.1839 16.0547 12.3519 16.0983 12.5031 16.1856C12.6544 16.2729 12.775 16.3905 12.865 16.5384C12.955 16.6862 13 16.8504 13 17.031C13 17.2982 12.9026 17.5265 12.7079 17.7159Z"
													fill="CurrentColor"
												/>
											</svg>
										</>
									)
								}}>
								<mui.Option value={1} className={`cursor-pointer z-10 mt-1`}>
									<div className={s.CopyNClearWrapper}>
										<div className={s.CopyNClear}>
											<div
												onClick={() => {
													let chipsContent =
														document.getElementById('aDevice')?.innerText
													navigator.clipboard.writeText(chipsContent)
												}}
												className={s.CopyAll}>
												<p className={s.Copy_text}>Скопировать всё</p>
											</div>
											<Line width="150px" className={s.CopyNClearLine} />
											<div
												onClick={() => {
													setStepAudi((prevStepAudi) =>
														prevStepAudi.map((step) =>
															step.title === 'Устройства'
																? {...step, isDone: false}
																: step,
														),
													)

													setADevice([])
												}}
												className={s.Clear}>
												<p className={s.Clear_text}>Очистить</p>
											</div>
										</div>
									</div>
								</mui.Option>
							</mui.Select>
						</Row>

						<Line width="528px" className={s.Line} />

						<Row width="528px" className={s.RowTitle}>
							<WhiteLabel className={'mr-1'} text="Пол и возраст" size="16px" />
							<svg
								className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.8934 16.9118C11.989 17.3039 11.0245 17.5 10 17.5C8.97549 17.5 8.01103 17.3039 7.10662 16.9118C6.20221 16.5196 5.40441 15.9779 4.71324 15.2868C4.02206 14.5956 3.48039 13.7978 3.08824 12.8934C2.69608 11.989 2.5 11.0245 2.5 10C2.5 8.97549 2.69608 8.01103 3.08824 7.10662C3.48039 6.20221 4.02083 5.40441 4.70956 4.71324C5.39828 4.02206 6.19485 3.48039 7.09926 3.08824C8.00368 2.69608 8.96814 2.5 9.99265 2.5C11.0172 2.5 11.9828 2.69608 12.8897 3.08824C13.7966 3.48039 14.5956 4.02206 15.2868 4.71324C15.9779 5.40441 16.5196 6.20221 16.9118 7.10662C17.3039 8.01103 17.5 8.97549 17.5 10C17.5 11.0245 17.3039 11.989 16.9118 12.8934C16.5196 13.7978 15.9779 14.5956 15.2868 15.2868C14.5956 15.9779 13.7978 16.5196 12.8934 16.9118ZM7.56618 15.7647C8.32108 16.0882 9.13235 16.25 10 16.25C10.8676 16.25 11.6801 16.0882 12.4375 15.7647C13.1949 15.4412 13.8591 14.9939 14.4301 14.4228C15.0012 13.8517 15.4473 13.1887 15.7684 12.4338C16.0895 11.6789 16.25 10.8676 16.25 10C16.25 9.13235 16.0882 8.32108 15.7647 7.56618C15.4412 6.81127 14.9926 6.14706 14.4191 5.57353C13.8456 5 13.1814 4.5527 12.4265 4.23162C11.6716 3.91054 10.8603 3.75 9.99265 3.75C9.125 3.75 8.31373 3.91054 7.55882 4.23162C6.80392 4.5527 6.14216 5 5.57353 5.57353C5.0049 6.14706 4.56005 6.81127 4.23897 7.56618C3.91789 8.32108 3.75735 9.13235 3.75735 10C3.75735 10.8676 3.91789 11.6789 4.23897 12.4338C4.56005 13.1887 5.00613 13.8517 5.57721 14.4228C6.14828 14.9939 6.81127 15.4412 7.56618 15.7647ZM8.71324 14.0368H11.7059C11.8578 14.0368 11.9853 13.9877 12.0882 13.8897C12.1912 13.7917 12.2426 13.6691 12.2426 13.5221C12.2426 13.375 12.1912 13.2525 12.0882 13.1544C11.9853 13.0564 11.8578 13.0074 11.7059 13.0074H10.7941V9.26471C10.7941 9.06373 10.7451 8.90319 10.6471 8.78309C10.549 8.66299 10.4069 8.60294 10.2206 8.60294H8.83824C8.68627 8.60294 8.55882 8.65196 8.45588 8.75C8.35294 8.84804 8.30147 8.97059 8.30147 9.11765C8.30147 9.26471 8.35294 9.38725 8.45588 9.48529C8.55882 9.58333 8.68627 9.63235 8.83824 9.63235H9.625V13.0074H8.71324C8.56127 13.0074 8.43382 13.0564 8.33088 13.1544C8.22794 13.2525 8.17647 13.375 8.17647 13.5221C8.17647 13.6691 8.22794 13.7917 8.33088 13.8897C8.43382 13.9877 8.56127 14.0368 8.71324 14.0368ZM10.614 7.09559C10.4301 7.28186 10.2034 7.375 9.93382 7.375C9.66912 7.375 9.44363 7.28186 9.25735 7.09559C9.07108 6.90931 8.97794 6.68382 8.97794 6.41912C8.97794 6.14951 9.07108 5.92157 9.25735 5.73529C9.44363 5.54902 9.66912 5.45588 9.93382 5.45588C10.2034 5.45588 10.4301 5.54902 10.614 5.73529C10.7978 5.92157 10.8897 6.14951 10.8897 6.41912C10.8897 6.68382 10.7978 6.90931 10.614 7.09559Z"
									fill="CurrentColor"
								/>
							</svg>
						</Row>

						<Row width="528px" className={`mt-0 justify-between`}>
							<Col width="260px">
								<Label className={`text-[14px] mb-[8px]`} text="Пол" />
								<Row
									width="260px"
									className={`h-[36px] rounded-[10px] border border-[#262626] justify-between items-center`}>
									<span
										onClick={() => {
											setGender(true)
										}}
										className={`text-[14px] cursor-pointer w-[130px] justify-center flex items-center h-[36px] rounded-[10px] px-[16px] ${
											Gender ? 'bg-[#333]' : ''
										} `}>
										Мужской
									</span>
									<span
										onClick={() => {
											setGender(false)
										}}
										className={`text-[14px] cursor-pointer w-[130px] justify-center flex items-center h-[36px] rounded-[10px] px-[16px] ${
											Gender ? '' : 'bg-[#333]'
										}`}>
										Женский
									</span>
								</Row>
							</Col>

							<Col width="260px" className={`mb-[16px]`}>
								<Label className={`text-[14px] mb-[8px]`} text="Возраст" />
								<Row width="260px" className="items-center">
									<Row
										width="216px"
										className={`h-[36px] rounded-[10px] border border-[#262626] justify-between items-center`}>
										<span className="text-[14px] cursor-pointer w-[130px] border-r border-[#262626] justify-between flex items-center h-[36px] pl-[16px]">
											<Label className={`text-[14px] mr-[4px]`} text="От:" />
											<Input
												onChange={(e) => setAgeFrom(e.target.value)}
												bgColor="#1A1A1A"
												height="20px"
												isShowMaxLength={false}
												maximumLength={2}
												conteinerWidth="60px"
												width="40px"
												className={`text-[14px]`}
												placeholder="18"
												isDigits={true}
											/>
										</span>
										<span className="text-[14px] cursor-pointer w-[130px] justify-between flex items-center h-[36px] pl-[16px]">
											<Label className={`text-[14px] mr-[4px]`} text="До:" />
											<Input
												onChange={(e) => setAgeTo(e.target.value)}
												bgColor="#1A1A1A"
												isShowMaxLength={false}
												maximumLength={2}
												conteinerWidth="60px"
												width="40px"
												height="20px"
												className={`text-[14px]`}
												placeholder="25"
												isDigits={true}
											/>
										</span>
									</Row>
									<div
										className="h-[36px] ml-[8px] bg-[#4169E1] rounded-[10px] w-[36px] flex justify-center items-center cursor-pointer"
										onClick={() =>
											setGenderNAgeObject((prevArray) => [
												...prevArray,
												{
													id: `GenderAge-${generateUniqueId()}`,
													male: Gender ? 'Мужской' : 'Женский',
													from: AgeFrom,
													to: AgeTo,
												},
											])
										}>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M12 6V18"
												stroke="white"
												strokeWidth="1.4"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M6 12H18"
												stroke="white"
												strokeWidth="1.4"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
								</Row>
							</Col>
						</Row>

						{GenderNAgeObject.length > 0 && (
							<Col
								width="528px"
								className={`border border-[#262626] rounded-[10px] overflow-x-hidden`}>
								{' '}
								{/* max-h-[110px] overflow-y-scroll */}
								{GenderNAgeObject.map((file, index) => (
									<Row
										key={index}
										width="528px"
										className={`justify-between items-center px-[16px] py-[10px] border-b border-[#262626]`}>
										<WhiteLabel
											text={`${file.male}, ${file.from} - ${file.to}`}
										/>
										<svg
											className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
											onClick={() => {
												setGenderNAgeObject(
													GenderNAgeObject.filter((obj) => obj.id !== file.id),
												)
											}}
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M4.13179 11.8681C4.19232 11.9253 4.26125 11.964 4.33859 11.9842C4.41592 12.0044 4.49326 12.0044 4.5706 11.9842C4.64794 11.964 4.71519 11.9253 4.77235 11.8681L8.00033 8.63863L11.2283 11.8681C11.2855 11.9253 11.3527 11.964 11.4301 11.9842C11.5074 12.0044 11.5856 12.0052 11.6646 11.9867C11.7436 11.9682 11.8117 11.9287 11.8689 11.8681C11.926 11.811 11.9639 11.7437 11.9823 11.6663C12.0008 11.5889 12.0008 11.5116 11.9823 11.4342C11.9639 11.3568 11.926 11.2895 11.8689 11.2323L8.64088 7.99778L11.8689 4.76827C11.926 4.71108 11.9647 4.6438 11.9849 4.56643C12.005 4.48905 12.005 4.41168 11.9849 4.3343C11.9647 4.25693 11.926 4.18965 11.8689 4.13246C11.8083 4.07191 11.7394 4.03238 11.6621 4.01388C11.5847 3.99537 11.5074 3.99537 11.4301 4.01388C11.3527 4.03238 11.2855 4.07191 11.2283 4.13246L8.00033 7.36197L4.77235 4.13246C4.71519 4.07191 4.64709 4.03238 4.56808 4.01388C4.48906 3.99537 4.41088 3.99537 4.33354 4.01388C4.25621 4.03238 4.18896 4.07191 4.13179 4.13246C4.07463 4.18965 4.0368 4.25693 4.01831 4.3343C3.99982 4.41168 3.99982 4.48905 4.01831 4.56643C4.0368 4.6438 4.07463 4.71108 4.13179 4.76827L7.35978 7.99778L4.13179 11.2323C4.07463 11.2895 4.03596 11.3568 4.01579 11.4342C3.99561 11.5116 3.99477 11.5889 4.01327 11.6663C4.03176 11.7437 4.07127 11.811 4.13179 11.8681Z"
												fill="#808080"
											/>
										</svg>
									</Row>
								))}
							</Col>
						)}

						<Line width="528px" className={s.Line} />
						<div className={`mb-[32px] w-[528px] float-right `}>
							<Row width="auto" className={`items-center float-right`}>
								<BlueLabel
									className={`float-right mr-[24px] cursor-pointer`}
									text="Сохранить и выйти"
									onClick={() => {
										console.log('oADJGSKDFBJKSFBKSFHMskf')

										
										if (aName) {
											window.localStorage.setItem(
												'create_temp',
												JSON.stringify([
													{
														cName: cName,
														cLink: cLink,
														cSettingsLink: cSettingsLink,
														cDateStart: cDateStart,
														cDateEnd: cDateEnd,
														cTarget: cTarget,
														cWeekBudget: cWeekBudget,
														cKeyWord: cKeyWord,
														cKeyWordDel: cKeyWordDel,
														banShowArray: banShowArray,
													},
													{
														aName: aName,
														aGeography: aGeography,
														// aFavor: aFavor,
														aDevice: aDevice,
														GenderNAgeObject: GenderNAgeObject,
													},
													{
														bName: bName,
														bLink: bLink,
														// bOptionDescription: bOptionDescription,
														titleArray: titleArray,
														descrArray: descrArray,
														bVideo: bVideo,
														bAudio: bAudio,
														bImg: images,
														bUnvirfied: bUnvirfied,
													},
													{
														images: images,
													},
												]),
											)
											navigate('/')
										}
										switch (true) {
											case !aName:
												setStepAudi((prevStepAudi) =>
													prevStepAudi.map((step) =>
														step.title === 'Название аудитории*'
															? {...step, isError: true}
															: step,
													),
												)
												setANameError('Введите название аудитории')
												break
										}
									}}
								/>
								<BlueButton
									width="120px"
									className={`float-right h-[36px] w-[120px]`}
									text="Далее"
									onClick={() => {
										if (aName) {
											dispatch({
												type: 'setSwitchCreatePage',
												SwitchCreatePage: 3,
											})
										}
										switch (true) {
											case !aName:
												setStepAudi((prevStepAudi) =>
													prevStepAudi.map((step) =>
														step.title === 'Название аудитории*'
															? {...step, isError: true}
															: step,
													),
												)
												setANameError('Введите название аудитории')
												break
										}
									}}
								/>
							</Row>
						</div>
					</Col>
				</div>

				<div
					id="page-3"
					style={switchPage === 3 ? {display: 'block'} : {display: 'none'}}>
					<Col className={s.contentCol} width="528px">
						<WhiteLabel
							className={s.content}
							text="Название Баннера*"
							size="16px"
						/>
						<Input
							onChange={(e) => {
								setBName(e.target.value)
								setBNameError('')
								if (e.target.value.length > 0) {
									setStepBanner((prevStepBanner) =>
										prevStepBanner.map((step) =>
											step.title === 'Название баннера*'
												? {...step, isDone: true, isError: false}
												: step,
										),
									)
								} else {
									setStepBanner((prevStepBanner) =>
										prevStepBanner.map((step) =>
											step.title === 'Название баннера*'
												? {...step, isDone: false}
												: step,
										),
									)
								}
							}}
							value={bName}
							width="100%"
							placeholder="Введите название..."
							className={`${s.inputText}`}
							errorMsg={bNameError}
						/>
						{/* <Line width={'528px'} className={s.Line} />

						<WhiteLabel text="Ссылка на рекламируемую страницу" size="16px" />
						<Row
							width="528px"
							className="mt-[17px] w-[528px] flex justify-between">
							<Input
								onChange={(e) => setBLink(e.target.value)}
								id="urlInput"
								width="100%"
								placeholder="Введите ссылку..."
								className={`${s.inputText} `}
							/>
							<div
								onClick={() => {
									;(
										document.querySelector(
											'#input-urlInput',
										) as HTMLInputElement
									).value = ''
								}}
								className={`right-[30px] top-[6px] cursor-pointer relative z-[2]`}>
								<svg
									className={` cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all`}
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<rect width="24" height="24" rx="7" fill="#262626" />
									<path
										d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
										fill="CurrentColor"
									/>
								</svg>
							</div>
						</Row>
						<Col
							width="528px"
							className={`mt-[8px] w-[528px] h-[48px] flex flex-col rounded-[10px] border border-[#262626]`}>
							<Row className={`ml-[16px] mt-[4px] flex items-center w-full`}>
								<svg
									className={`mr-[4px]`}
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M8.87537 7.99995L10.175 9.53467L11.9226 10.6885L12.2274 8.0094L11.9226 5.39014L10.1415 6.40384L8.87537 7.99995Z"
										fill="#00832D"
									/>
									<path
										d="M1.33337 10.4398V12.7222C1.33337 13.244 1.74247 13.6666 2.24756 13.6666H4.45683L4.91392 11.9414L4.45683 10.4398L2.94081 9.96753L1.33337 10.4398Z"
										fill="#0066DA"
									/>
									<path
										d="M4.45683 2.33325L1.33337 5.5601L2.94081 6.03233L4.45683 5.5601L4.9063 4.0789L4.45683 2.33325Z"
										fill="#E94235"
									/>
									<path
										d="M4.45683 5.56006H1.33337V10.4397H4.45683V5.56006Z"
										fill="#2684FC"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M11.9226 5.39009L13.9186 3.69953C14.218 3.4469 14.6667 3.66569 14.6667 4.06472V12.0138C14.6667 12.4081 14.2279 12.6293 13.9277 12.3868L11.9226 10.6884V5.39009ZM11.9226 10.6884L8.87533 7.9999V10.4397H4.45679V13.6666H11.0084C11.5135 13.6666 11.9226 13.2439 11.9226 12.7221V10.6884Z"
										fill="#00AC47"
									/>
									<path
										d="M11.0084 2.33325H4.45679V5.5601H8.87533V7.99992L11.9226 5.39168V3.2777C11.9226 2.75589 11.5135 2.33325 11.0084 2.33325Z"
										fill="#FFBA00"
									/>
								</svg>
								<WhiteLabel text="test" className={``} />
							</Row>
							<Label
								className={`w-full ml-[16px] mb-[8px]`}
								text="https://test.com/test/testik"
								isMini={true}
							/>
						</Col> */}

						<Line width="528px" className={s.Line} />

						<Row className={s.headerNotiBlock} width="528px">
							<Row className={s.headerNotiTitle} width="auto">
								<NavLabel className={s.navLabel} text="Варианты заголовка" />
							</Row>
							<Switch
								checked={checkedTitle}
								onChange={() => setCheckedTitle(!checkedTitle)}
								className={s.SwitchButton}
							/>
						</Row>
						<div
							style={checkedTitle ? {display: 'flex'} : {display: 'none'}}
							className={s.DescBlock}>
							<textarea
								onChange={(e) => {
									setTextAreaTitle(e.target.value)
									if (e.target.value.length > 0) {
										setStepBanner((prevStepBanner) =>
											prevStepBanner.map((step) =>
												step.title === 'Варианты заголовка'
													? {...step, isDone: true}
													: step,
											),
										)
									} else {
										setStepBanner((prevStepBanner) =>
											prevStepBanner.map((step) =>
												step.title === 'Варианты заголовка'
													? {...step, isDone: false}
													: step,
											),
										)
									}
								}}
								onKeyDown={(e) => {
									if (
										e.key === 'Enter' &&
										!e.repeat &&
										!e.shiftKey &&
										e.target.value.length > 0
									) {
										e.preventDefault()
										setTitleArray((prevArray) => [
											...prevArray,
											{
												id: `VariantTitle-${generateUniqueId()}`,
												text: e.target.value,
											},
										])
										console.log(e.target.value, 'AFTER')
										e.target.value = ''
										setTextAreaTitle('')
										console.log(e.target.value, 'DO')
									}
								}}
								value={textAreaTitle}
								name="VariantTitle"
								id="VariantTitle"
								className={s.textAreaDesc}
								placeholder="Добавить..."></textarea>
							{titleArray.length > 0 && (
								<Col
									iD="textAreaDesc"
									width="528px"
									className={s.ColAfterTextArea}>
									{titleArray.map((file, index) => (
										<>
											<div key={index} className={s.BlockAfterTextArea}>
												<p className={s.TextBlockAfter}>{file.text}</p>
												<button
													className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
													onClick={() => {
														setTitleArray(
															titleArray.filter((obj) => obj.id !== file.id),
														)
														if (titleArray.length === 1) {
															setStepBanner((prevStepBanner) =>
																prevStepBanner.map((step) =>
																	step.title === 'Варианты заголовка'
																		? {...step, isDone: false}
																		: step,
																),
															)
														}
													}}
													className={s.ButtonAfterExit}>
													<svg
														className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none">
														<path
															d="M4.13179 11.8681C4.19232 11.9253 4.26125 11.964 4.33859 11.9842C4.41592 12.0044 4.49326 12.0044 4.5706 11.9842C4.64794 11.964 4.71519 11.9253 4.77235 11.8681L8.00033 8.63863L11.2283 11.8681C11.2855 11.9253 11.3527 11.964 11.4301 11.9842C11.5074 12.0044 11.5856 12.0052 11.6646 11.9867C11.7436 11.9682 11.8117 11.9287 11.8689 11.8681C11.926 11.811 11.9639 11.7437 11.9823 11.6663C12.0008 11.5889 12.0008 11.5116 11.9823 11.4342C11.9639 11.3568 11.926 11.2895 11.8689 11.2323L8.64088 7.99778L11.8689 4.76827C11.926 4.71108 11.9647 4.6438 11.9849 4.56643C12.005 4.48905 12.005 4.41168 11.9849 4.3343C11.9647 4.25693 11.926 4.18965 11.8689 4.13246C11.8083 4.07191 11.7394 4.03238 11.6621 4.01388C11.5847 3.99537 11.5074 3.99537 11.4301 4.01388C11.3527 4.03238 11.2855 4.07191 11.2283 4.13246L8.00033 7.36197L4.77235 4.13246C4.71519 4.07191 4.64709 4.03238 4.56808 4.01388C4.48906 3.99537 4.41088 3.99537 4.33354 4.01388C4.25621 4.03238 4.18896 4.07191 4.13179 4.13246C4.07463 4.18965 4.0368 4.25693 4.01831 4.3343C3.99982 4.41168 3.99982 4.48905 4.01831 4.56643C4.0368 4.6438 4.07463 4.71108 4.13179 4.76827L7.35978 7.99778L4.13179 11.2323C4.07463 11.2895 4.03596 11.3568 4.01579 11.4342C3.99561 11.5116 3.99477 11.5889 4.01327 11.6663C4.03176 11.7437 4.07127 11.811 4.13179 11.8681Z"
															fill="CurrentColor"
														/>
													</svg>
												</button>
											</div>
											<Line width="528px" className={s.Line} />
										</>
									))}
								</Col>
							)}
						</div>

						<Line width="528px" className={s.Line} />

						<Row className={s.headerNotiBlock} width="528px">
							<Row className={s.headerNotiTitle} width="auto">
								<NavLabel className={s.navLabel} text="Варианты описаний" />
							</Row>
							<Switch
								checked={checked_1}
								onChange={() => setChecked_1(!checked_1)}
								className={s.SwitchButton}
							/>
						</Row>
						<div
							style={checked_1 ? {display: 'flex'} : {display: 'none'}}
							className={s.DescBlock}>
							<textarea
								onChange={(e) => {
									setTextAreaValue(e.target.value)
									if (e.target.value.length > 0) {
										setStepBanner((prevStepBanner) =>
											prevStepBanner.map((step) =>
												step.title === 'Варианты описаний'
													? {...step, isDone: true}
													: step,
											),
										)
									} else {
										setStepBanner((prevStepBanner) =>
											prevStepBanner.map((step) =>
												step.title === 'Варианты описаний'
													? {...step, isDone: false}
													: step,
											),
										)
									}
								}}
								onKeyDown={(e) => {
									if (
										e.key === 'Enter' &&
										!e.repeat &&
										!e.shiftKey &&
										e.target.value.length > 0
									) {
										e.preventDefault()
										setDescrArray((prevArray) => [
											...prevArray,
											{
												id: `Decsr-${generateUniqueId()}`,
												text: e.target.value,
											},
										])
										console.log(e.target.value, 'AFTER')
										e.target.value = ''
										setTextAreaValue('')
										console.log(e.target.value, 'DO')
									}
								}}
								value={textAreaValue}
								name="descr"
								id="desc"
								className={s.textAreaDesc}
								placeholder="Добавить..."></textarea>
							{descrArray.length > 0 && (
								<Col
									iD="textAreaDesc"
									width="528px"
									className={s.ColAfterTextArea}>
									{descrArray.map((file, index) => (
										<>
											<div key={index} className={s.BlockAfterTextArea}>
												<p className={s.TextBlockAfter}>{file.text}</p>
												<button
													className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
													onClick={() => {
														setDescrArray(
															descrArray.filter((obj) => obj.id !== file.id),
														)
														if (descrArray.length === 1) {
															setStepBanner((prevStepBanner) =>
																prevStepBanner.map((step) =>
																	step.title === 'Варианты описаний'
																		? {...step, isDone: false}
																		: step,
																),
															)
														}
													}}
													className={s.ButtonAfterExit}>
													<svg
														className="cursor-pointer text-[#808080] hover:text-[#f2f2f2] transition-all"
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none">
														<path
															d="M4.13179 11.8681C4.19232 11.9253 4.26125 11.964 4.33859 11.9842C4.41592 12.0044 4.49326 12.0044 4.5706 11.9842C4.64794 11.964 4.71519 11.9253 4.77235 11.8681L8.00033 8.63863L11.2283 11.8681C11.2855 11.9253 11.3527 11.964 11.4301 11.9842C11.5074 12.0044 11.5856 12.0052 11.6646 11.9867C11.7436 11.9682 11.8117 11.9287 11.8689 11.8681C11.926 11.811 11.9639 11.7437 11.9823 11.6663C12.0008 11.5889 12.0008 11.5116 11.9823 11.4342C11.9639 11.3568 11.926 11.2895 11.8689 11.2323L8.64088 7.99778L11.8689 4.76827C11.926 4.71108 11.9647 4.6438 11.9849 4.56643C12.005 4.48905 12.005 4.41168 11.9849 4.3343C11.9647 4.25693 11.926 4.18965 11.8689 4.13246C11.8083 4.07191 11.7394 4.03238 11.6621 4.01388C11.5847 3.99537 11.5074 3.99537 11.4301 4.01388C11.3527 4.03238 11.2855 4.07191 11.2283 4.13246L8.00033 7.36197L4.77235 4.13246C4.71519 4.07191 4.64709 4.03238 4.56808 4.01388C4.48906 3.99537 4.41088 3.99537 4.33354 4.01388C4.25621 4.03238 4.18896 4.07191 4.13179 4.13246C4.07463 4.18965 4.0368 4.25693 4.01831 4.3343C3.99982 4.41168 3.99982 4.48905 4.01831 4.56643C4.0368 4.6438 4.07463 4.71108 4.13179 4.76827L7.35978 7.99778L4.13179 11.2323C4.07463 11.2895 4.03596 11.3568 4.01579 11.4342C3.99561 11.5116 3.99477 11.5889 4.01327 11.6663C4.03176 11.7437 4.07127 11.811 4.13179 11.8681Z"
															fill="CurrentColor"
														/>
													</svg>
												</button>
											</div>
											<Line width="528px" className={s.Line} />
										</>
									))}
								</Col>
							)}
						</div>
						<Line width="528px" className={s.Line} />

						{/* <WhiteLabel text="Варианты видео" className={`mb-2`} size="16px" />

						<Row width="600px" className={s.DropVideoRow}>
							<iframe src="https://www.youtube.com/embed/E2J1mMzdA1Y" />
							<iframe src="https://www.youtube.com/embed/E2J1mMzdA1Y" />
							<Upload
								height="144px"
								width="256px"
								fileType={FileType.video}
								propFunction={handleAddVideo}
							/>
						</Row>

						<Line width="528px" className={s.Line} />

						<WhiteLabel text="Варианты аудио" className={`mb-1`} size="16px" />

						<Row width="600px" className={s.DropVideoRow}>
							<Row width="256px" className={s.AudioRow}>
								<svg
									className="mr-3"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none">
									<rect width="24" height="24" rx="12" fill="#4169E1" />
									<path
										d="M9.21429 17C9.33333 17 9.44643 16.9793 9.55357 16.938C9.66071 16.8966 9.77381 16.8405 9.89286 16.7696L16.8333 12.7885C17.0833 12.6428 17.2569 12.5139 17.3542 12.4017C17.4514 12.2894 17.5 12.1546 17.5 11.997C17.5 11.8395 17.4514 11.7047 17.3542 11.5924C17.2569 11.4802 17.0833 11.3532 16.8333 11.2115L9.89286 7.22445C9.77381 7.15751 9.66071 7.10337 9.55357 7.06202C9.44643 7.02067 9.33333 7 9.21429 7C8.99603 7 8.82242 7.07679 8.69345 7.23036C8.56448 7.38393 8.5 7.5887 8.5 7.84465V16.1494C8.5 16.4054 8.56448 16.6111 8.69345 16.7667C8.82242 16.9222 8.99603 17 9.21429 17Z"
										fill="#F2F2F2"
									/>
								</svg>
								<Col width="100%">
									<Row width="auto" className="justify-between">
										<WhiteLabel text="Название аудио текс..." />
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none">
											<rect width="24" height="24" rx="7" fill="#262626" />
											<path
												d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
												fill="#F2F2F2"
											/>
										</svg>
									</Row>
									<Label text="00:39" isMini={true} />
								</Col>
							</Row>
							<Row width="256px" className={s.AudioRow}>
								<svg
									className="mr-3"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none">
									<rect width="24" height="24" rx="12" fill="#4169E1" />
									<path
										d="M9.21429 17C9.33333 17 9.44643 16.9793 9.55357 16.938C9.66071 16.8966 9.77381 16.8405 9.89286 16.7696L16.8333 12.7885C17.0833 12.6428 17.2569 12.5139 17.3542 12.4017C17.4514 12.2894 17.5 12.1546 17.5 11.997C17.5 11.8395 17.4514 11.7047 17.3542 11.5924C17.2569 11.4802 17.0833 11.3532 16.8333 11.2115L9.89286 7.22445C9.77381 7.15751 9.66071 7.10337 9.55357 7.06202C9.44643 7.02067 9.33333 7 9.21429 7C8.99603 7 8.82242 7.07679 8.69345 7.23036C8.56448 7.38393 8.5 7.5887 8.5 7.84465V16.1494C8.5 16.4054 8.56448 16.6111 8.69345 16.7667C8.82242 16.9222 8.99603 17 9.21429 17Z"
										fill="#F2F2F2"
									/>
								</svg>
								<Col width="100%">
									<Row width="auto" className="justify-between">
										<WhiteLabel text="Название аудио текс..." />
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none">
											<rect width="24" height="24" rx="7" fill="#262626" />
											<path
												d="M7.16474 16.8352C7.2404 16.9067 7.32656 16.955 7.42323 16.9803C7.51991 17.0055 7.61658 17.0055 7.71325 16.9803C7.80992 16.955 7.89398 16.9067 7.96543 16.8352L12.0004 12.7983L16.0354 16.8352C16.1068 16.9067 16.1909 16.955 16.2876 16.9803C16.3842 17.0055 16.482 17.0065 16.5807 16.9834C16.6795 16.9603 16.7646 16.9109 16.8361 16.8352C16.9075 16.7637 16.9548 16.6796 16.9779 16.5829C17.0011 16.4862 17.0011 16.3894 16.9779 16.2927C16.9548 16.196 16.9075 16.1119 16.8361 16.0404L12.8011 11.9972L16.8361 7.96034C16.9075 7.88885 16.9559 7.80475 16.9811 7.70803C17.0063 7.61131 17.0063 7.5146 16.9811 7.41788C16.9559 7.32116 16.9075 7.23706 16.8361 7.16558C16.7604 7.08988 16.6743 7.04047 16.5776 7.01735C16.4809 6.99422 16.3842 6.99422 16.2876 7.01735C16.1909 7.04047 16.1068 7.08988 16.0354 7.16558L12.0004 11.2025L7.96543 7.16558C7.89398 7.08988 7.80887 7.04047 7.7101 7.01735C7.61132 6.99422 7.5136 6.99422 7.41693 7.01735C7.32026 7.04047 7.2362 7.08988 7.16474 7.16558C7.09329 7.23706 7.04601 7.32116 7.02289 7.41788C6.99977 7.5146 6.99977 7.61131 7.02289 7.70803C7.04601 7.80475 7.09329 7.88885 7.16474 7.96034L11.1997 11.9972L7.16474 16.0404C7.09329 16.1119 7.04495 16.196 7.01974 16.2927C6.99452 16.3894 6.99347 16.4862 7.01658 16.5829C7.0397 16.6796 7.08909 16.7637 7.16474 16.8352Z"
												fill="#F2F2F2"
											/>
										</svg>
									</Row>
									<Label text="00:39" isMini={true} />
								</Col>
							</Row>
							<Upload
								height="48px"
								width="256px"
								isMini
								fileType={FileType.audio}
								propFunction={handleAddVideo}
							/>
						</Row>

						<Line width="528px" className={s.Line} /> */}

						<WhiteLabel
							text="Варианты изображение"
							className={`mb-2`}
							size="16px"
						/>

						<Row width="600px" className={s.DropImageRow}>
							{images.map((image) => (
								<Image
									onClose={onClose}
									id={image.id}
									src={URL.createObjectURL(image.file)}
								/>
							))}
							<Upload propFunction={handleAddImage} />
						</Row>

						<Line width="528px" className={s.Line} />

						{/* <Col width="528px">
							<ListItemButton
								className={s.ListMoreSettings}
								onClick={handleClick_settings}>
								<Row className={s.RowSettings} width="528px">
									<WhiteLabel size="16px" text="Дополнительный настройки" />
									{open_settings ? <ExpandLess /> : <ExpandMore />}
								</Row>
							</ListItemButton>

							<Collapse in={open_settings} timeout="auto" unmountOnExit>
								<h1>123</h1>
							</Collapse>
						</Col>

						<Line width="528px" className={s.Line} />

						<Row width="528px" className={s.WhiteLabelSwitchBlock}>
							<WhiteLabel
								className={s.WhiteLabelCheckbox}
								text="Разрешить показ на непроверенных аккаунтах лидеров мнений"
								size="16px"
							/>
							<Switch onChange={(e) => setBUnvirfied(e)} />
						</Row>

						<Line width="528px" className={s.Line} /> */}

						<div className={`w-[528px] float-right mb-16 `}>
							<Row width="auto" className={`items-center float-right`}>
								<BlueLabel
									className={`float-right mr-[24px] cursor-pointer`}
									text="Сохранить и выйти"
									// onClick={setGlobalState({
									// 	cName,
									// 	cLink,
									// 	cSettingsLink,
									// 	cDateStart,
									// 	cDateEnd,
									// 	cTarget,
									// 	cWeekBudget,
									// 	cKeyWord,
									// 	cKeyWordDel,
									// 	cBanShow,
									// 	aName,
									// 	aGeography,
									// 	aFavor,
									// 	aDevice,
									// 	aGenderNAge,
									// 	bName,
									// 	bLink,
									// 	bOptionTitle,
									// 	bOptionDescription,
									// 	bOptionDescText,
									// 	bVideo,
									// 	bAudio,
									// 	bImg,
									// 	bUnvirfied,
									// })}
									// onClick={() => sendData()}
									onClick={() => {
										if (
											cName &&
											cLink &&
											cDateStart &&
											cDateEnd &&
											cTarget &&
											aName &&
											bName
										) {
											sendData()
										}
										switch (true) {
											case !cName:
												setStepCompany((prevStepCompany) =>
													prevStepCompany.map((step) =>
														step.title === 'Название компании*'
															? {...step, isError: true}
															: step,
													),
												)
												setCNameError('Введите название компании')

											case !cLink:
												setStepCompany((prevStepCompany) =>
													prevStepCompany.map((step) =>
														step.title === 'Ссылка на рекламируемую страницу*'
															? {...step, isError: true}
															: step,
													),
												)
												setCLinkError(
													'Введите ссылку на рекламируемую страницу',
												)

											case !cDateStart:
											case !cDateEnd:
												setStepCompany((prevStepCompany) =>
													prevStepCompany.map((step) =>
														step.title === 'Начало и окончание компании*'
															? {...step, isError: true}
															: step,
													),
												)

											case !cTarget:
												setStepCompany((prevStepCompany) =>
													prevStepCompany.map((step) =>
														step.title === 'Цель*'
															? {...step, isError: true}
															: step,
													),
												)
											case !aName:
												setStepAudi((prevStepAudi) =>
													prevStepAudi.map((step) =>
														step.title === 'Название аудитории*'
															? {...step, isError: true}
															: step,
													),
												)
												setANameError('Введите название аудитории')

											case !bName:
												setStepBanner((prevStepBanner) =>
													prevStepBanner.map((step) =>
														step.title === 'Название баннера*'
															? {...step, isError: true}
															: step,
													),
												)
												setBNameError('Введите название баннера')
												break
										}
									}}
								/>
								{/* <BlueButton
									width="120px"
									className={`float-right h-[36px] w-[120px]`}
									text="Далее"
								/> */}
							</Row>
						</div>
					</Col>
				</div>
			</div>
			<div className={s.leftMenu}>
				<LeftCompanyMenu />
			</div>
		</div>
	)
}

export default CompanyCreate

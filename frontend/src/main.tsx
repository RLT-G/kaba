import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.scss'
import MainPage from './pages/Main'
import Header from './components/Header'
import ChooseAccount from './pages/ChooseAccount'
import Register from './pages/Register/index'
import Welcome from './pages/Welcome'
import Company from './pages/Company'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import {IUser, IPermission} from './types'
import Settings from './pages/Settings'
import Bloggers from './pages/bloggers'
import Finance from './pages/Finance'
import Sites from './pages/Sites'
import Statistic from './pages/Statistic'
import Test from './pages/Test'
import Media from './pages/Media'
import MyBanners from './pages/MyBanners'
import StatisticBlogger from './pages/StatisticBlogger/index'
import {checkAPI} from './api/utils.api'
import AcceptCode from './pages/AcceptCode'
import CompanyCreate from './pages/CompanyCreate/index'
import ErrorPage from './pages/ErrorPage'
import {Navigate} from 'react-router-dom'
import {depositApply} from './api/payment.api'
import TransitPage from './pages/TransitPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import UserSuccess from './pages/UserSuccess'

let defaultState = {
	// user: {
	// 	// id: 1,
	// 	// name: 'Test User',
	// 	// avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
	// 	// permission: {
	// 	// 	id: 0,
	// 	// 	name: 'Просмотр',
	// 	// } as IPermission,
	// 	// nick: '@testuser',
	// 	// isBlogger: false,
	// } as IUser,
	isBlogger:
		JSON.parse(localStorage.getItem('kaba_data') || '{}').isBlogger || false,
	user:
		JSON.parse(localStorage.getItem('kaba_data') || '{}').user || ({} as IUser),
	users: [
		{
			user_id: 1,
			name: 'Ольга Петрова',
			avatar: 'https://randomuser.me/api/portraits/thumb/women/16.jpg',
			token: '12345',
			permission: {
				id: 0,
				name: 'Просмотр',
			} as IPermission,
			nick: '@testuser',

			isBlogger: false,
		} as IUser,
		{
			user_id: 2,
			name: 'Екатерина Иванова',
			avatar: 'https://randomuser.me/api/portraits/thumb/women/13.jpg',
			token: '4343',
			permission: {
				id: 0,
				name: 'Просмотр',
			} as IPermission,
			nick: '@testuser',

			isBlogger: true,
		} as IUser,
		{
			user_id: 3,
			name: 'Иван Иванов',
			avatar: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
			token: '123424245',
			permission: {
				id: 0,
				name: 'Просмотр',
			} as IPermission,
			nick: '@testuser',

			isBlogger: false,
		} as IUser,
		{
			user_id: 4,
			name: 'Человек человеков',
			avatar: 'https://randomuser.me/api/portraits/thumb/men/23.jpg',
			token: '5645634',
			permission: {
				id: 0,
				name: 'Просмотр',
			} as IPermission,
			nick: '@testuser',

			isBlogger: false,
		} as IUser,
	] as Array<IUser>,

	//Dataset for test
	test: {
		users: Array<IUser>(),
	},
	CurrentURL: '',

	SwitchCreatePage: 1,
	SwitchTableCompany: 1,
}

// let isLocalStorage:boolean = localStorage.length === 1

// let defaultState = {
// 	user: (isLocalStorage && JSON.parse(localStorage.getItem('kaba_data')).user) ? JSON.parse(localStorage.getItem('kaba_data')).user : null,
// 	users: [] as Array<IUser>,

// 	//Dataset for test
// 	test: {
// 		users: Array<IUser>(),
// 	},
// 	verify_user: null,
// }

// console.log(defaultState, 'default');
// console.log(isLocalStorage, 'LocalStorage')

//Save data or get data to defaultState(Redux) from localStorage if it exist

//if field invoice_id exist in localStorage then ...
const checkDeposit = async (iid: string) => {
	console.log(iid, 'iid')
	let res = await depositApply(defaultState.user.token, iid)
	console.log(res, 'res')
	if (res.data.status == 'ok') {
		//delete invoice_id from localStorage
		localStorage.removeItem('invoice_id')
	}
}

if (localStorage.getItem('invoice_id')) {
	let iid = localStorage.getItem('invoice_id')
	checkDeposit(iid)
}

console.log(await checkAPI(), 'CheckAPI')
const reducer = (state = defaultState, action: any) => {
	switch (action.type) {
		case 'getUser':
			return {...state, user: state.user}
		case 'setUser':
			localStorage.setItem(
				'kaba_data',
				JSON.stringify({...state, user: action.user}),
			),
				(defaultState.user = action.user)

			console.log('setUser', action.user, '\n', defaultState.user)

			return {...state, user: action.user}

		case 'setVerifyUser':
			console.log('setVerifyUser', action.verify_user)

			return {...state, verify_user: action.verify_user}
		case 'setVerifyUserPhone':
			console.log('setVerifyUserPhone', action.verify_user_phone)

			return {...state, verify_user_phone: action.verify_user_phone}

		case 'addUser':
			return {...state, users: [...state.users, action.user]}

		case 'setUrl':
			localStorage.setItem(
				'kaba_data',
				JSON.stringify({...state, CurrentURL: action.CurrentURL}),
			)
			console.log('setUrl', action.CurrentURL)
			console.log(defaultState)

			return {...state, CurrentURL: action.CurrentURL}

		case 'setIsBlogger':
			localStorage.setItem(
				'kaba_data',
				JSON.stringify({...state, isBlogger: action.isBlogger}),
			)
			defaultState.isBlogger = action.isBlogger

			console.log(action.isBlogger, 'ACTIONBLOGGER')

			return {...state, isBlogger: action.isBlogger}

		case 'setSwitchCreatePage':
			return {...state, SwitchCreatePage: action.SwitchCreatePage}
		case 'setSwitchTableCompany':
			return {...state, SwitchTableCompany: action.SwitchTableCompany}
		default:
			return state
	}
}

const store = createStore(reducer)

// const getStartPage = () => {
// 	//If users length == 0 and user == null show main page. If user == null and users length > 0 show choose account. If user != null show Company page
// 	if (defaultState.users.length === 0 && defaultState.user === null)
// 		return <MainPage />
// 	else if (defaultState.users.length > 0 && defaultState.user === null)
// 		return <ChooseAccount />
// 	else return <Company />
// }

// const check = async () => {
// 	const response = await checkAPI()
// 	console.log(response)
// }
// check()

function getWHeader(router_element: any, isPrivate: boolean) {
	// console.log(defaultState.user.user_id, 'user')

	return (
		<>
			{isPrivate && defaultState.user.user_id === undefined ? (
				<Navigate to="/login" />
			) : (
				<>
					{!isPrivate && defaultState.user.user_id !== undefined ? (
						<Navigate to="/" />
					) : (
						<>
							<Header />
							{router_element}
						</>
					)}
				</>
			)}
		</>
	)
}

const PageBlogger = [
	{
		path: '/bloggers',
		element: getWHeader(<Bloggers />, true),
	},
	{
		path: '/',
		element: getWHeader(<MyBanners />, true),
	},
	{
		path: '/statisticBlogger',
		element: getWHeader(<StatisticBlogger />, true),
	},
	{
		path: '/media',
		element: getWHeader(<Media />, true),
	},
]

const PageAdvertiser = [
	{
		path: '/',
		element: getWHeader(<Company />, true),
	},
	{
		path: '/create',
		element: getWHeader(<CompanyCreate />, true),
	},
	{
		path: '/sites',
		element: getWHeader(<Sites />, true),
	},
	{
		path: '/statistics',
		element: getWHeader(<Statistic />, true),
	},
	{
		path: '/settings',
		element: getWHeader(<Settings />, true),
	},
]

const PageBase = [
	{
		path: '/login',
		element: getWHeader(<MainPage />, false),
	},
	{
		path: '/go',
		element: getWHeader(<TransitPage />, false),
	},
	// {
	// 	path: 'choose',
	// 	element: getWHeader(<ChooseAccount />),
	// },
	// {
	// 	path: '/register',
	// 	element: getWHeader(<Register />, false),
	// },
	// {
	// 	path: '/test',
	// 	element: getWHeader(<Test />, false),
	// },
	// {
	// 	path: '/welcome',
	// 	element: getWHeader(<Welcome />, true),
	// },

	{
		path: '/finance',
		element: getWHeader(<Finance />, true),
	},
	{
		path: '/UserSuccess',
		element: getWHeader(<UserSuccess/>, false),
	},
	{
		path: '/PrivacyPolicy',
		element: getWHeader(<PrivacyPolicy/>, false),
	},
	// {
	// 	path: '/acceptCode',
	// 	element: getWHeader(<AcceptCode />, false),
	// },
]

function AllPage() {
	let isBloggerPage = defaultState.isBlogger
	let pages = [...PageBase, ...(isBloggerPage ? PageBlogger : PageAdvertiser)]

	return pages
}

const router = createBrowserRouter(AllPage())
ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		{/* <React.StrictMode> */}
		<Provider store={store}>
			{(await checkAPI()).status === 200 ? (
				<>
					{/* <Header /> */}
					<RouterProvider router={router} />
				</>
			) : (
				<ErrorPage />
			)}
		</Provider>
		{/* </React.StrictMode> */}
	</>,
)

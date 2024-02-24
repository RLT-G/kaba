//auth.api.ts
import axios from 'axios'
import {getApiUrl} from './base.api'

//phone regex
const phoneRegex = /^(\+7|8)\d{10}$/
//login regex
const loginRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const loginAPI = async (login: string) => {
	//check is phone(+7...) or login(@...)
	if (phoneRegex.test(login)) {
		return await axios.post(getApiUrl('verify'), {
			phone_number: login,
			type: 'login',
		})
	} else {
		return {status: 'error'}
	}
}

export const registerAPI = async (
	login: string,
	name: string,
	phone: string,
) => {
	const formData = new FormData()
	formData.append('phone_number', phone)
	formData.append('login', login)
	formData.append('firstname', name)
	formData.append('type', 'register')

	if (phoneRegex.test(phone)) {
		return await axios.post(getApiUrl('verify'), formData)
	} else {
		return {status: 'error'}
	}
}

//socials

//vk
export const vkLoginAPI = async (code: string) => {
	const formData = new FormData()
	formData.append('code', code)

	try {
		const response = await axios.post(getApiUrl('vk_login'), formData)
		return response
	} catch (error) {
		console.error('Error during VK login:', error)
		return {status: 'error'}
	}
}

export const yandexLoginAPI = async (code: string) => {
	const formData = new FormData()
	formData.append('code', code)

	try {
		const response = await axios.post(getApiUrl('yandex_login'), formData)
		return response
	} catch (error) {
		console.error('Error during Yandex login:', error)
		return {status: 'error'}
	}
}

export const verifyAPI = async (user_id: number, code: string) => {
	return await axios.post(getApiUrl('verify_code'), {
		code: code,
		user_id: user_id,
	})
}

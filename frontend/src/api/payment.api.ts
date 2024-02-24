import axios from 'axios'
import {getApiUrl} from './base.api'

export const deposit = async (token: string, pay_amount: number) => {
	const formData = new FormData()
	formData.append('token', token)
	formData.append('pay_amount', pay_amount.toString())

	try {
		const response = await axios.post(getApiUrl('deposit'), formData)
		return response
	} catch (error) {
		console.error('Error during deposit:', error)
		return {status: 'error'}
	}
}

export const depositApply = async (token: string, invoice_id: string) => {
	const formData = new FormData()
	formData.append('token', token)
	formData.append('invoice_id', invoice_id.toString())
	console.log(invoice_id, formData)

	try {
		const response = await axios.post(getApiUrl('deposit_apply'), formData)
		return response
	} catch (error) {
		console.error('Error during deposit:', error)
		return {status: 'error'}
	}
}

export const getUserWalletOperationsAPI = async (token: string) => {
	const formData = new FormData()
	formData.append('token', token)

	try {
		const response = await axios.post(getApiUrl('getOperations'), formData)
		return response
	} catch (error) {
		console.error('Error during getUserWalletOperations:', error)
		return {status: 'error', message: error}
	}
}

//payoutToBlogger
export const payoutToBlogger = async (token: string, amount: number, cardnumber: string) => {
	const formData = new FormData()
	formData.append('token', token)
	formData.append('amount', amount.toString())
	formData.append('cardnumber', cardnumber)

	try {
		const response = await axios.post(getApiUrl('payoutToBlogger'), formData)
		return response
	} catch (error) {
		console.error('Error during payoutToBlogger:', error)
		return {status: 'error'}
	}
}

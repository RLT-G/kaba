import axios from 'axios'
import {getApiUrl} from './base.api'

export const checkAPI = async () => {
	try {
		const url = getApiUrl('check')
		console.log(url)

		const response = await axios.get(url)
		return response // Should be 200 and return status: ok
	} catch (error) {
		// Handle error
		console.error(error)
		return 400
	}
}

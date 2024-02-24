import axios from 'axios'
import {baseUrl} from './api/base.api'
import {auth} from './api/auth.api'

// Function to check if the backend is online
const isBackendOnline = async (): Promise<boolean> => {
	try {
		// Send a GET request to the base URL
		await axios.get(baseUrl)
		return true // Server responded successfully, backend is online
	} catch (error) {
		return false // Server did not respond, backend is offline
	}
}

// Usage example
export default async function getUserData() {
	console.log('init')

	// Get token from local storage
	const token = localStorage.getItem('token')
	// Check if token exists
	if (token) {
		// Set token in axios
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	} else {
		// Remove token from axios
		delete axios.defaults.headers.common['Authorization']
	}

	// Check if backend is online
	const isOnline = await isBackendOnline()
	console.log('Backend is online:', isOnline)

	//If backend is offline
	if (!isOnline) {
		//Return test user
		return {
			id: 1,
			name: 'Test User',
			avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
			permission: 'Просмотр',
			token: token,
		}
	}

	// Check if user is exists and get data
	const user = await auth({token: token || ''})
	console.log('User data:', user)

	//Create object with user data
	const userData = {
		id: user.id,
		name: user.name,
		avatar: user.avatar,
		permission: user.permission,
		token: token,
	}

	return userData
}

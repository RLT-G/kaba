export const isDebug = true
export const baseUrl = 'http://localhost:5000/api/'

export const getApiUrl = (url: string) => {
	return baseUrl + url
}

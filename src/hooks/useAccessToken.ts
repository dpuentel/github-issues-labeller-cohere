import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/auth'
import { logout as apiLogout } from '../services/Github'

export function useAccessToken () {
	// const [accessToken, setAccessToken] = useState<string | null>(null)
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('useAccessToken must be used within a AuthProvider')
	}

	const { accessToken, setAccessToken } = context

	useEffect(() => {
		const urlString = window.location.href
		const url = new URL(urlString)
		const urlParams = new URLSearchParams(url.search)
		const urlAccessToken = urlParams.get('access_token')

		if (urlAccessToken) {
			// remove the query string from the url
			window.history.replaceState({}, document.title, '/')
			return setNewAccessToken({ newAccessToken: urlAccessToken })
		}

		if (accessToken) {
			return
		}
		const accessTokenLocalStorage = localStorage.getItem('DPL_access_token')
		if (accessTokenLocalStorage) {
			return setNewAccessToken({ newAccessToken: accessTokenLocalStorage })
		}
	}, [])

	const setNewAccessToken = ({ newAccessToken }: { newAccessToken: string }) => {
		if (!newAccessToken) return

		setAccessToken(newAccessToken)
		localStorage.setItem('DPL_access_token', newAccessToken)
	}

	const clearAccessToken = () => {
		localStorage.removeItem('DPL_access_token')
		return setAccessToken(null)
	}

	const logout = () => {
		if (!accessToken) return

		return apiLogout({ accessToken }).then(() => clearAccessToken())
	}

	return { accessToken, clearAccessToken, logout }
}

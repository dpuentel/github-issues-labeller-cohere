import { useAccessToken } from '../hooks/useAccessToken'
import { LogoutIcon } from './icons/LogoutIcon'

export function Logout () {
	const { accessToken, logout } = useAccessToken()

	const handleLogout = () => {
		logout()
	}

	return (
		<>
			{accessToken && (
				<button
					className='text-gray-300 transition hover:text-white hover:scale-125 inline-block'
					onClick={handleLogout}
				>
					<LogoutIcon />
				</button>
			)}
		</>
	)
}

import { AuthProvider } from '../context/auth'
import { Login } from './Login'
import { Logout } from './Logout'

export function Auth () {
	return (
		<AuthProvider>
			<section className='absolute p-4 text-right float-right w-full'>
				<Login />
				<Logout />
			</section>
		</AuthProvider>
	)
}

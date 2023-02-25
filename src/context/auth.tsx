import { createContext, ReactNode, useState } from 'react'

interface AuthContextProps {
	accessToken: string | null
	setAccessToken: (accessToken: string | null) => void
}

const initialState: AuthContextProps = {
	accessToken: null,
	setAccessToken: () => {
		return null
	}
}
export const AuthContext = createContext(initialState)

export function AuthProvider ({ children }: { children: ReactNode }) {
	const [accessToken, setAccessToken] = useState<string | null>(null)

	return (
		<AuthContext.Provider value={{ accessToken, setAccessToken }}>{children}</AuthContext.Provider>
	)
}

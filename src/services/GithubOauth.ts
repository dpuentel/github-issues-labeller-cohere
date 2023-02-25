import { OAuth2 } from 'oauth'
import type { GitHubAccessTokenResponse } from '../interfaces/GitHub'

const GITHUB_CLIENT_ID: string = import.meta.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET: string = import.meta.env.GITHUB_CLIENT_SECRET
const GITHUB_REDIRECT_URI: string = import.meta.env.GITHUB_REDIRECT_URI
const OAUTH_STATE: string = import.meta.env.OAUTH_STATE

const oauth2 = new OAuth2(
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	'https://github.com/',
	'login/oauth/authorize',
	'login/oauth/access_token'
)

export const getAuthorizeUrl = () =>
	oauth2.getAuthorizeUrl({
		redirect_uri: GITHUB_REDIRECT_URI,
		scope: ['repo,user'],
		state: OAUTH_STATE
	})

export const getOAuthAccessToken = (code: string): Promise<GitHubAccessTokenResponse> =>
	new Promise((resolve, reject) => {
		oauth2.getOAuthAccessToken(
			code,
			{
				redirect_uri: GITHUB_REDIRECT_URI,
				state: OAUTH_STATE
			},
			(error, accessToken, refreshToken, results) => {
				if (error) {
					reject(error)
				} else {
					resolve({ accessToken, results })
				}
			}
		)
	})

export const revokeOAuthGrant = (accessToken: string): Promise<{ logout: boolean }> => {
	const auth = btoa(`${GITHUB_CLIENT_ID}:${GITHUB_CLIENT_SECRET}`)
	return new Promise((resolve, reject) => {
		fetch(`https://api.github.com/applications/${GITHUB_CLIENT_ID}/grant`, {
			method: 'DELETE',
			headers: {
				Authorization: `Basic ${auth}`,
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-GitHub-Api-Version': '2022-11-28'
			},
			body: `{"access_token":"${accessToken}"}`
		})
			.then((response) => {
				console.log({ response })
				const body = response.body
				console.log({ body })

				if (response.status === 204) {
					resolve({ logout: true })
				} else {
					reject(response)
				}
			})
			.catch((error) => reject(error))
	})
}

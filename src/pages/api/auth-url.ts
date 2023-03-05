import type { APIRoute } from 'astro'
import { getAuthorizeUrl } from '../../services/GithubOauth'

export const get: APIRoute = function get () {
	try {
		const githubOauthUrl = getAuthorizeUrl()
		return { body: JSON.stringify({ githubOauthUrl }) }
	} catch (error) {
		throw new Error('Something went wrong generating the github authorization url!')
	}
}

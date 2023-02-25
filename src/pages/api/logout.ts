import type { APIRoute, APIContext } from 'astro'
import { revokeOAuthGrant } from '../../services/GithubOauth'

export const post: APIRoute = async function post ({ request }: APIContext) {
	const body = await request.json()

	try {
		const res = await revokeOAuthGrant(body.accessToken)
		return new Response(JSON.stringify(res), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (error) {
		throw new Error(`Something went wrong in /api/revoke route! Error: ${error}`)
	}
}

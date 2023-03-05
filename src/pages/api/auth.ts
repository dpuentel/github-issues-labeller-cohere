import querystring from 'querystring'
import type { APIRoute, APIContext } from 'astro'
import { getOAuthAccessToken } from '../../services/GithubOauth'

export const get: APIRoute = async function get ({ request }: APIContext) {
	// url like this: http://localhost:3000/api/auth?code=luaposl165468uoiu&state=There+should+never+be+more+than+one+reason+for+a+class+to+change
	const urlString = request.url
	const qsObj = querystring.parse(urlString.split('?')[1])
	console.log({ qsObj })

	if (!qsObj.code) {
		throw new Error('Something went wrong in the github access code response !')
	}

	if (!qsObj.state) {
		throw new Error('Something went wrong in the github access code response !')
	}

	try {
		const url = new URL(urlString)
		const accessTokenResponse = await getOAuthAccessToken(qsObj.code as string)
		console.log({ accessTokenResponse })

		return Response.redirect(
			`${url.protocol}/${url.host}/?access_token=${accessTokenResponse.accessToken}`
		)
	} catch (error) {
		throw new Error(`Something went wrong in the github access code response! Error: ${error} `)
	}
}

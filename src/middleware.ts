import { type NextRequest, NextResponse } from 'next/server'

import { PUBLIC_URL } from './config/url.config'
import { EnumTokens } from './services/auth/auth-token.serice'

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = request.url.includes(PUBLIC_URL.auth())

	if (isAuthPage) {
		if (refreshToken) {
			return NextResponse.redirect(
				new URL(PUBLIC_URL.home(), request.url)
			)
		}

		return NextResponse.next()
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth']
}

import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('refreshToken');
    const path = req.nextUrl.pathname;

    if (path.startsWith('/admin/store*') && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (path.startsWith('/admin*') && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (path.startsWith('/store*') && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/store/:path*'],
};

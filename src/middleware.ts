import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { GATE_COOKIE, gateMisconfigured, isGateEnabled, verifyGateToken } from '@/lib/gate'

const PUBLIC_PATHS = ['/acceso', '/favicon.ico']

function isPublicAsset(pathname: string): boolean {
  if (pathname.startsWith('/_next/')) return true
  if (pathname.startsWith('/brand/')) return true
  return /\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?)$/i.test(pathname)
}

export async function middleware(request: NextRequest) {
  if (!isGateEnabled()) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next()
  }

  if (isPublicAsset(pathname)) {
    return NextResponse.next()
  }

  if (gateMisconfigured()) {
    if (pathname.startsWith('/acceso')) return NextResponse.next()
    const url = request.nextUrl.clone()
    url.pathname = '/acceso'
    url.searchParams.set('error', 'config')
    return NextResponse.redirect(url)
  }

  const token = request.cookies.get(GATE_COOKIE)?.value
  if (await verifyGateToken(token)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = '/acceso'
  url.searchParams.set('next', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}

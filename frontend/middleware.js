import { NextResponse } from 'next/server'

export default function _middleware(req) {
  const { cookies } = req
  const token = cookies.token
  const url = req.url
  const nextUrl = req.nextUrl.clone()

  if (url.includes('pages/student/')) {
    if (token) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(nextUrl.origin)
    }
  }
  if (url.includes('pages/admin/')) {
    if (token) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(nextUrl.origin)
    }
  }
  if (url.includes('pages/coordinator/')) {
    if (token) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(nextUrl.origin)
    }
  }

  if (url.includes('/alumni/')) {
    if (token) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(nextUrl.origin)
    }
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    '/((?!_next|api/auth).*)(.+)'
  ],
}
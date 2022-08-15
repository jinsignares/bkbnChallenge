import { NextResponse, NextRequest } from 'next/server'
export async function middleware(req: NextRequest, ev) {
    const { pathname } = req.nextUrl
    if (pathname == '/') {
        return NextResponse.redirect('/contacts')
    }
    return NextResponse.next()
}
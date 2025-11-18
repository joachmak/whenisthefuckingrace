import {NextRequest, NextResponse} from 'next/server'

const logs: any[] = []

export async function middleware(request: NextRequest) {
    logs.push({
        path: request.nextUrl.pathname,
        timestamp: new Date(),
        headers: Object.fromEntries(request.headers)
    })

    const delay = Math.random() * 1000
    await new Promise(resolve => setTimeout(resolve, delay))

    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'max-age=31536000')

    return response
}

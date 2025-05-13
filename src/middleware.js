import { NextResponse } from 'next/server'
import { authConfig } from './auth.config'
import NextAuth from 'next-auth'
const { auth } = NextAuth(authConfig)
import { LOGIN, PUBLIC_ROUTES, ROOT } from '@/lib/routes'
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    // const { nextUrl } = request
    // const session = await auth();
    // // console.log(session);
    // console.log("middleware")

    // const isAuthenticated = !!session?.user;
    // console.log(isAuthenticated, nextUrl.pathname)
    const { nextUrl } = request;
    const session = await auth();

    console.log("middleware");

    const isAuthenticated = !!session?.user;
    const normalizedPath = nextUrl.pathname.replace(/\/$/, "");

    const isPublicRoute = PUBLIC_ROUTES.includes(normalizedPath);

    console.log(isAuthenticated, normalizedPath);
    // const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route)))
    // console.log(isPublicRoute)
    if (!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, nextUrl))
    }
    if (isAuthenticated && isPublicRoute) {
        return NextResponse.redirect(new URL(ROOT, nextUrl))
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)" ]
// }
// ✅ Exclude API and static files from middleware
export const config = {
    matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"], // pages only
};
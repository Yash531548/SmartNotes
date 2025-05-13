// FOR MIDDLEWARE
// 1. Just watch this video OR go to official documentation https://authjs.dev/guides/edge-compatibility#middleware 
// https://www.youtube.com/watch?v=jHrjnZM26i4&list=PLIJrr73KDmRwWKE5c7XZeNhghKl5vhUbP&index=4 

// but in short , problem we are encountering , middleware is getting hit before even mongodb model is being created and because of this middleware is not working as expected. 
// we wanted to get auth from next-auth by auth.config instead of auth.js file(Only contain object which are not directly responsible for getting auth)  .  
//  This method is called slpiting the auth.js file where one file contain configuration important for auth from next-auth and other containing things unreleated to auth 
export const authConfig = {
    pages: {
        signIn: "/signin",
        error: "/error"
      },
      callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth.user;
          const routePathName = nextUrl.pathname
          if (isLoggedIn) {
            if (routePathName === '/register' || routePathName === '/login') {
              return new Response.redirect(new URL("/", nextUrl))
            }
            return true;
          } else {
            if (routePathName === '/register' || routePathName === '/login') return true;
            return false;
          }
        }
      },
      session: {
        strategy: "jwt"
      },
      providers:[]  
}
// providers right now is empty but inside the auth.js file we are going to destructure the authconfig object which will update the empty providers to the provider present in the auth.js 
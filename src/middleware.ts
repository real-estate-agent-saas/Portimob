import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from "next/server";

import {
  ADMIN_ROUTES,
  GUEST_ROUTES,
} from "@/config/routes";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number; // expiration timestamp in seconds
};

// Free access routes
const publicRoutes = [
  { path: GUEST_ROUTES.signIn.path, whenAuthenticated: "redirect" }, //Redirect to dashboard if authenticated
  { path: GUEST_ROUTES.signUp.path, whenAuthenticated: "redirect" },
  { path: GUEST_ROUTES.home.path, whenAuthenticated: "next" },
] as const; // Says to typeScript that the objects inside publicRoutes wont change their values so it can assume a more specific type to them

// All private routes
const adminRoutesList = Object.values(ADMIN_ROUTES);
const privateRoutes = adminRoutesList.map((route) => route.path);

// Redirect page when not authenticated
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = GUEST_ROUTES.signIn.path;

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; // Get the current request path
  const publicRoute = publicRoutes.find((route) => route.path === path); // Check if the current path is public
  const privateRoute = privateRoutes.some((route) => route.startsWith(path)); // Check if the current path is private
  const authToken = request.cookies.get("access_token"); // Get the access_token from de user cookies

  // For Tenant pages
  if (!publicRoute && !privateRoute) {
    return NextResponse.next();
  }

  // If user doesn't have token but wants to access a public route, he is able to
  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  // If user wants to access a private route and doesn't have a token
  if (!authToken && !publicRoute) {
    // Redirect to signIn page by cloning the current url and changing the path
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated and he's accessing a public route and this route says redirect and goes to an authenticated page
  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = ADMIN_ROUTES.dashboard.path;
    return NextResponse.redirect(redirectUrl);
  }

  // If user is trying to access a private route with an expirede token, redirects him
  if (authToken && !publicRoute) {
    try {
      const decoded = jwtDecode<JwtPayload>(authToken.value);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        // Se está tentando acessar a página de login com token expirado, apenas remove o token
        if (
          request.nextUrl.pathname === REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
        ) {
          const response = NextResponse.next();
          response.cookies.delete("access_token");
          return response;
        }

        // Redireciona para login e remove token expirado
        const response = NextResponse.redirect(
          new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url)
        );
        response.cookies.delete("access_token");
        return response;
      }
    } catch (error) {
      // Se já está na página de login com token inválido, apenas remove o token
      if (request.nextUrl.pathname === REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE) {
        const response = NextResponse.next();
        response.cookies.delete("access_token");
        return response;
      }

      // Redireciona para login e remove token inválido
      const response = NextResponse.redirect(
        new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url)
      );
      response.cookies.delete("access_token");
      return response;
    }

    // Token válido
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt/).*)",
  ],
};

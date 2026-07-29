import { NextRequest, NextResponse } from "next/server";

// Protege /admin con autenticación básica (usuario/contraseña definidos por
// ADMIN_USER / ADMIN_PASSWORD). El navegador muestra su propio diálogo de login.
export function proxy(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const [providedUser, providedPassword] = atob(encoded).split(":");
      if (providedUser === user && providedPassword === password) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Autenticación requerida.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Panel PBH"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};

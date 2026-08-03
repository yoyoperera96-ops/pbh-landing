import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { sql } from "@/lib/db";
import { iniciarSesion } from "./actions";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSession();
  if (session) {
    // Verifica que la cuenta siga existiendo antes de redirigir — evita un
    // ciclo con /quiniela si la sesión quedó "huérfana" (cuenta borrada).
    const rows = (await sql`SELECT id FROM inscripciones WHERE id = ${session.id}`) as { id: number }[];
    if (rows[0]) redirect("/quiniela");
  }

  const { error } = await searchParams;

  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-tinta px-4 pb-16 pt-32">
        <Container className="max-w-md px-0">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
            <span className="font-eyebrow text-xs font-semibold uppercase tracking-widest text-dorado">
              Área de socios
            </span>
            <h1 className="mt-3 font-display text-2xl font-semibold text-hueso">
              Iniciar sesión
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Usa el usuario y la contraseña que creaste al enviar tu solicitud de
              membresía.
            </p>

            <form action={iniciarSesion} className="mt-6 space-y-4">
              <div>
                <label htmlFor="usuario" className="mb-1.5 block text-sm font-medium text-white/80">
                  Usuario
                </label>
                <input
                  id="usuario"
                  name="usuario"
                  required
                  autoComplete="username"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-dorado"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/80">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-dorado"
                />
              </div>

              {error && <p className="text-sm text-dorado">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-full bg-grana px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-grana-light"
              >
                Entrar
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/50">
              ¿Aún no eres socio?{" "}
              <a href="/#inscripcion" className="font-semibold text-dorado hover:underline">
                Solicita tu membresía
              </a>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

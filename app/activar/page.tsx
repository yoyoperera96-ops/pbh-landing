import type { Metadata } from "next";
import { sql } from "@/lib/db";
import { activarCuenta } from "./actions";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Crear acceso",
};

export const dynamic = "force-dynamic";

export default async function ActivarPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;

  const candidatos = token
    ? ((await sql`
        SELECT nombre FROM inscripciones
        WHERE activacion_token = ${token}
          AND activacion_expira > now()
          AND estado = 'aceptada'
          AND usuario IS NULL
      `) as { nombre: string }[])
    : [];

  const socio = candidatos[0];

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
              Crear mi acceso
            </h1>

            {!socio ? (
              <p className="mt-4 text-sm text-white/70">
                Este enlace ya no es válido o caducó. Escríbenos a{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-dorado hover:underline">
                  {siteConfig.email}
                </a>{" "}
                y te enviamos uno nuevo.
              </p>
            ) : (
              <>
                <p className="mt-2 text-sm text-white/60">
                  Hola, {socio.nombre}. Elige el usuario y la contraseña con los que
                  entrarás a la quiniela y las próximas funciones de la web.
                </p>

                <form action={activarCuenta} className="mt-6 space-y-4">
                  <input type="hidden" name="token" value={token} />
                  <div>
                    <label htmlFor="usuario" className="mb-1.5 block text-sm font-medium text-white/80">
                      Usuario
                    </label>
                    <input
                      id="usuario"
                      name="usuario"
                      required
                      minLength={3}
                      maxLength={20}
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
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-dorado"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmarPassword" className="mb-1.5 block text-sm font-medium text-white/80">
                      Confirmar contraseña
                    </label>
                    <input
                      id="confirmarPassword"
                      name="confirmarPassword"
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-dorado"
                    />
                  </div>

                  {error && <p className="text-sm text-dorado">{error}</p>}

                  <button
                    type="submit"
                    className="w-full rounded-full bg-grana px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-grana-light"
                  >
                    Crear acceso
                  </button>
                </form>
              </>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

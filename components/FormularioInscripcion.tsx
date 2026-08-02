"use client";

import { FormEvent, useState } from "react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";

type Status = "idle" | "loading" | "success" | "error";

export function FormularioInscripcion() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (data.password !== data.confirmarPassword) {
      setStatus("error");
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("/api/inscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) throw new Error(body?.error || "No se pudo enviar la inscripción.");

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Ocurrió un problema. Intenta de nuevo.");
    }
  }

  return (
    <section id="inscripcion" className="bg-hueso py-24">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Únete a la Peña"
            title="Solicita tu membresía"
            description="Completa el formulario para crear tu cuenta de socio y enviar tu solicitud. Un miembro de la Junta Directiva se pondrá en contacto contigo para formalizarla."
          />
          <ul className="mt-8 space-y-4 text-sm text-tinta/70">
            {[
              "Respuesta en menos de 72 horas",
              "Sin compromiso hasta confirmar tu membresía",
              "Acceso a la comunidad y agenda de encuentros",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-grana/10 text-grana">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-tinta/10 bg-tinta/[0.02] p-6 shadow-card sm:p-10">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-grana/10 text-2xl text-grana">
                ✓
              </div>
              <h3 className="font-eyebrow text-xl font-bold uppercase text-tinta">
                ¡Solicitud enviada!
              </h3>
              <p className="max-w-sm text-sm text-tinta/70">
                Gracias por querer formar parte de la PBH. Ya puedes{" "}
                <a href="/login" className="font-semibold text-grana hover:underline">
                  iniciar sesión
                </a>{" "}
                con tu usuario — te contactaremos pronto para completar tu
                inscripción.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-tinta">
                  Nombre completo *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  required
                  className="w-full rounded-xl border border-tinta/15 px-4 py-3 text-sm outline-none transition focus:border-grana"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="carnet" className="mb-1.5 block text-sm font-medium text-tinta">
                  Carné de identidad *
                </label>
                <input
                  id="carnet"
                  name="carnet"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{11}"
                  title="11 dígitos, sin espacios ni guiones"
                  maxLength={11}
                  className="w-full rounded-xl border border-tinta/15 px-4 py-3 text-sm outline-none transition focus:border-grana"
                  placeholder="11 dígitos"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="usuario" className="mb-1.5 block text-sm font-medium text-tinta">
                  Nombre de usuario *
                </label>
                <input
                  id="usuario"
                  name="usuario"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z0-9_]+"
                  title="Solo letras, números y guion bajo, sin espacios"
                  className="w-full rounded-xl border border-tinta/15 px-4 py-3 text-sm outline-none transition focus:border-grana"
                  placeholder="Para iniciar sesión y la quiniela"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="correo" className="mb-1.5 block text-sm font-medium text-tinta">
                  Correo electrónico *
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  required
                  className="w-full rounded-xl border border-tinta/15 px-4 py-3 text-sm outline-none transition focus:border-grana"
                  placeholder="tu@correo.com"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium text-tinta">
                  Teléfono / WhatsApp *
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  className="w-full rounded-xl border border-tinta/15 px-4 py-3 text-sm outline-none transition focus:border-grana"
                  placeholder="+53 ..."
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="direccion" className="mb-1.5 block text-sm font-medium text-tinta">
                  Dirección *
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  required
                  className="w-full rounded-xl border border-tinta/15 px-4 py-3 text-sm outline-none transition focus:border-grana"
                  placeholder="Calle, número, entre calles"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="municipio" className="mb-1.5 block text-sm font-medium text-tinta">
                  Municipio / provincia
                </label>
                <input
                  id="municipio"
                  name="municipio"
                  className="w-full rounded-xl border border-tinta/15 px-4 py-3 text-sm outline-none transition focus:border-grana"
                  placeholder="La Habana"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-tinta">
                  Contraseña *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-tinta/15 px-4 py-3 text-sm outline-none transition focus:border-grana"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="confirmarPassword" className="mb-1.5 block text-sm font-medium text-tinta">
                  Confirmar contraseña *
                </label>
                <input
                  id="confirmarPassword"
                  name="confirmarPassword"
                  type="password"
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-tinta/15 px-4 py-3 text-sm outline-none transition focus:border-grana"
                  placeholder="Repite la contraseña"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium text-tinta">
                  Cuéntanos por qué quieres unirte
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="w-full rounded-xl border border-tinta/15 px-4 py-3 text-sm outline-none transition focus:border-grana"
                  placeholder="Tu historia como culé..."
                />
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <input
                  id="terminos"
                  name="terminos"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-tinta/30 text-grana focus:ring-grana"
                />
                <label htmlFor="terminos" className="text-xs text-tinta/60">
                  Acepto que la PBH use mis datos personales, incluido mi carné
                  de identidad, para gestionar mi solicitud de membresía.
                </label>
              </div>

              {status === "error" && (
                <p className="text-sm text-grana sm:col-span-2">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 w-full rounded-full bg-grana px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-card transition hover:bg-grana-light disabled:opacity-60 sm:col-span-2"
              >
                {status === "loading" ? "Enviando..." : "Enviar solicitud"}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

"use server";

import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";

export async function iniciarSesion(formData: FormData) {
  const usuario = String(formData.get("usuario") || "").trim();
  const password = String(formData.get("password") || "");

  if (!usuario || !password) {
    redirect(`/login?error=${encodeURIComponent("Completa usuario y contraseña.")}`);
  }

  const rows = (await sql`
    SELECT id, password_hash FROM inscripciones WHERE usuario = ${usuario}
  `) as { id: number; password_hash: string | null }[];

  const cuenta = rows[0];
  const valido =
    cuenta?.password_hash && (await verifyPassword(password, cuenta.password_hash));

  if (!valido || !cuenta) {
    redirect(`/login?error=${encodeURIComponent("Usuario o contraseña incorrectos.")}`);
  }

  await createSession(cuenta.id);
  redirect("/quiniela");
}

export async function cerrarSesion() {
  await destroySession();
  redirect("/login");
}

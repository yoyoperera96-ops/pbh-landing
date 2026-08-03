"use server";

import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";

const USUARIO_RE = /^[a-zA-Z0-9_]{3,20}$/;

export async function activarCuenta(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const usuario = String(formData.get("usuario") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmarPassword = String(formData.get("confirmarPassword") ?? "");

  const volver = (error: string) =>
    redirect(`/activar?token=${encodeURIComponent(token)}&error=${encodeURIComponent(error)}`);

  if (!token) volver("Enlace inválido.");

  if (!USUARIO_RE.test(usuario)) {
    volver("El usuario debe tener entre 3 y 20 caracteres (letras, números o guion bajo).");
  }
  if (password.length < 8) {
    volver("La contraseña debe tener al menos 8 caracteres.");
  }
  if (password !== confirmarPassword) {
    volver("Las contraseñas no coinciden.");
  }

  const candidatos = (await sql`
    SELECT id FROM inscripciones
    WHERE activacion_token = ${token}
      AND activacion_expira > now()
      AND estado = 'aceptada'
      AND usuario IS NULL
  `) as { id: number }[];

  const candidato = candidatos[0];
  if (!candidato) volver("Este enlace ya no es válido o caducó. Pide uno nuevo a la Junta Directiva.");

  const passwordHash = await hashPassword(password);

  try {
    await sql`
      UPDATE inscripciones
      SET usuario = ${usuario}, password_hash = ${passwordHash},
          activacion_token = NULL, activacion_expira = NULL
      WHERE id = ${candidato.id}
    `;
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("inscripciones_usuario_key")) {
      volver("Ese nombre de usuario ya está en uso.");
    }
    throw err;
  }

  await createSession(candidato.id);
  redirect("/quiniela");
}

"use server";

import { revalidatePath } from "next/cache";
import { sql, type EstadoInscripcion } from "@/lib/db";
import { enviarDecisionInscripcion, enviarActivacionCuenta, SITE_URL } from "@/lib/email";
import { generarTokenActivacion } from "@/lib/auth";

async function procesar(formData: FormData, estado: EstadoInscripcion) {
  const id = Number(formData.get("id"));
  if (!id) return;

  const rows = (await sql`
    UPDATE inscripciones
    SET
      estado = ${estado},
      procesado_en = now(),
      numero_socio = CASE
        WHEN ${estado} = 'aceptada' AND numero_socio IS NULL THEN nextval('socio_numero_seq')
        ELSE numero_socio
      END
    WHERE id = ${id}
    RETURNING nombre, correo, numero_socio
  `) as { nombre: string; correo: string; numero_socio: number | null }[];

  const inscripcion = rows[0];

  if (inscripcion && (estado === "aceptada" || estado === "rechazada")) {
    try {
      await enviarDecisionInscripcion({
        nombre: inscripcion.nombre,
        correo: inscripcion.correo,
        estado,
        numeroSocio: inscripcion.numero_socio,
      });
    } catch (err) {
      // No bloquea el cambio de estado si el email falla (p.ej. falta configurar
      // la App Password de Gmail). Queda registrado en los logs del servidor.
      console.error("No se pudo enviar el email de notificación:", err);
    }
  }

  revalidatePath("/admin");
}

export async function eliminarSolicitud(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  // Si la solicitud duplicada llegó a tener predicciones (cuenta activada
  // por error), se borran primero por la referencia en predicciones.partido_id.
  await sql`DELETE FROM predicciones WHERE inscripcion_id = ${id}`;
  await sql`DELETE FROM inscripciones WHERE id = ${id}`;

  revalidatePath("/admin");
}

export async function aceptarSolicitud(formData: FormData) {
  await procesar(formData, "aceptada");
}

export async function rechazarSolicitud(formData: FormData) {
  await procesar(formData, "rechazada");
}

export async function enviarActivacion(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  const token = generarTokenActivacion();

  const rows = (await sql`
    UPDATE inscripciones
    SET activacion_token = ${token}, activacion_expira = now() + interval '48 hours'
    WHERE id = ${id} AND estado = 'aceptada' AND usuario IS NULL
    RETURNING nombre, correo
  `) as { nombre: string; correo: string }[];

  const inscripcion = rows[0];
  if (!inscripcion) return;

  try {
    await enviarActivacionCuenta({
      nombre: inscripcion.nombre,
      correo: inscripcion.correo,
      link: `${SITE_URL}/activar?token=${token}`,
    });
  } catch (err) {
    console.error("No se pudo enviar el email de activación:", err);
  }

  revalidatePath("/admin");
}

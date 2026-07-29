import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

type InscripcionPayload = {
  nombre?: string;
  correo?: string;
  telefono?: string;
  municipio?: string;
  mensaje?: string;
  terminos?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const data = (await req.json()) as InscripcionPayload;

  if (!data.nombre || !data.correo || !data.telefono || !data.terminos) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos obligatorios." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(data.correo)) {
    return NextResponse.json(
      { ok: false, error: "El correo electrónico no es válido." },
      { status: 400 }
    );
  }

  await sql`
    INSERT INTO inscripciones (nombre, correo, telefono, municipio, mensaje)
    VALUES (${data.nombre}, ${data.correo}, ${data.telefono}, ${data.municipio ?? null}, ${data.mensaje ?? null})
  `;

  // TODO(integración): conectar con un servicio de email transaccional
  // (p.ej. Resend) para notificar a la Junta Directiva de cada nueva solicitud.

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

type InscripcionPayload = {
  nombre?: string;
  carnet?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  municipio?: string;
  mensaje?: string;
  terminos?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CARNET_RE = /^\d{11}$/;

export async function POST(req: NextRequest) {
  const data = (await req.json()) as InscripcionPayload;

  if (
    !data.nombre ||
    !data.carnet ||
    !data.correo ||
    !data.telefono ||
    !data.direccion ||
    !data.terminos
  ) {
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

  if (!CARNET_RE.test(data.carnet)) {
    return NextResponse.json(
      { ok: false, error: "El carné de identidad debe tener 11 dígitos." },
      { status: 400 }
    );
  }

  await sql`
    INSERT INTO inscripciones (nombre, carnet_identidad, correo, telefono, direccion, municipio, mensaje)
    VALUES (${data.nombre}, ${data.carnet}, ${data.correo}, ${data.telefono}, ${data.direccion}, ${data.municipio ?? null}, ${data.mensaje ?? null})
  `;

  return NextResponse.json({ ok: true });
}

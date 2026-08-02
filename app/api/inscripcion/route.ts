import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

type InscripcionPayload = {
  nombre?: string;
  carnet?: string;
  usuario?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  municipio?: string;
  mensaje?: string;
  password?: string;
  confirmarPassword?: string;
  terminos?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CARNET_RE = /^\d{11}$/;
const USUARIO_RE = /^[a-zA-Z0-9_]{3,20}$/;

export async function POST(req: NextRequest) {
  const data = (await req.json()) as InscripcionPayload;

  if (
    !data.nombre ||
    !data.carnet ||
    !data.usuario ||
    !data.correo ||
    !data.telefono ||
    !data.direccion ||
    !data.password ||
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

  if (!USUARIO_RE.test(data.usuario)) {
    return NextResponse.json(
      {
        ok: false,
        error: "El usuario debe tener entre 3 y 20 caracteres (letras, números o guion bajo).",
      },
      { status: 400 }
    );
  }

  if (data.password.length < 8) {
    return NextResponse.json(
      { ok: false, error: "La contraseña debe tener al menos 8 caracteres." },
      { status: 400 }
    );
  }

  if (data.password !== data.confirmarPassword) {
    return NextResponse.json(
      { ok: false, error: "Las contraseñas no coinciden." },
      { status: 400 }
    );
  }

  const passwordHash = await hashPassword(data.password);

  try {
    await sql`
      INSERT INTO inscripciones
        (nombre, carnet_identidad, usuario, password_hash, correo, telefono, direccion, municipio, mensaje)
      VALUES
        (${data.nombre}, ${data.carnet}, ${data.usuario}, ${passwordHash}, ${data.correo}, ${data.telefono}, ${data.direccion}, ${data.municipio ?? null}, ${data.mensaje ?? null})
    `;
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.includes("inscripciones_usuario_key")) {
      return NextResponse.json(
        { ok: false, error: "Ese nombre de usuario ya está en uso." },
        { status: 409 }
      );
    }
    throw err;
  }

  return NextResponse.json({ ok: true });
}

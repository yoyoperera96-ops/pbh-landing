import { NextRequest, NextResponse } from "next/server";

type InscripcionPayload = {
  nombre?: string;
  correo?: string;
  telefono?: string;
  municipio?: string;
  mensaje?: string;
  terminos?: string;
};

export async function POST(req: NextRequest) {
  const data = (await req.json()) as InscripcionPayload;

  if (!data.nombre || !data.correo || !data.telefono || !data.terminos) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos obligatorios." },
      { status: 400 }
    );
  }

  // TODO(integración): conectar con servicio de email (p.ej. Resend/SendGrid)
  // y/o guardar en base de datos cuando exista el portal de socios.
  // Por ahora se registra en el log del servidor para no perder solicitudes.
  console.log("Nueva solicitud de inscripción PBH:", {
    nombre: data.nombre,
    correo: data.correo,
    telefono: data.telefono,
    municipio: data.municipio,
    mensaje: data.mensaje,
  });

  return NextResponse.json({ ok: true });
}

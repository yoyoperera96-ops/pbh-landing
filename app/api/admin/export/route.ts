import { NextRequest, NextResponse } from "next/server";
import { getInscripciones } from "@/lib/db";

const dateFormatter = new Intl.DateTimeFormat("es-CU", {
  dateStyle: "short",
  timeStyle: "short",
});

function csvCell(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const estado = searchParams.get("estado");

  const inscripciones = await getInscripciones({ q, estado });

  const headers = [
    "Número de socio",
    "Nombre",
    "Carné de identidad",
    "Correo",
    "Teléfono",
    "Dirección",
    "Municipio",
    "Estado",
    "Fecha de solicitud",
    "Fecha de proceso",
    "Mensaje",
  ];

  const rows = inscripciones.map((i) => [
    i.numero_socio ?? "",
    i.nombre,
    i.carnet_identidad ?? "",
    i.correo,
    i.telefono,
    i.direccion ?? "",
    i.municipio ?? "",
    i.estado,
    dateFormatter.format(new Date(i.creado_en)),
    i.procesado_en ? dateFormatter.format(new Date(i.procesado_en)) : "",
    i.mensaje ?? "",
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => csvCell(String(cell))).join(","))
    .join("\n");

  // El BOM al inicio hace que Excel detecte UTF-8 y muestre bien tildes/ñ.
  const body = "﻿" + csv;
  const fecha = new Date().toISOString().slice(0, 10);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="socios-pbh-${fecha}.csv"`,
    },
  });
}

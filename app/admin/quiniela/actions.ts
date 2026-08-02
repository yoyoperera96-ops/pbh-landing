"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { getCalendarioTemporadaOficial } from "@/lib/fcbFixtures";

export async function sincronizarCalendario() {
  const partidos = await getCalendarioTemporadaOficial();

  for (const p of partidos) {
    if (!p.fecha || !p.equipoLocal || !p.equipoVisitante) continue;
    await sql`
      INSERT INTO partidos_quiniela (fecha, equipo_local, equipo_visitante, competicion, url)
      VALUES (${p.fecha}, ${p.equipoLocal}, ${p.equipoVisitante}, ${p.competicion}, ${p.url})
      ON CONFLICT (fecha, equipo_local, equipo_visitante)
      DO UPDATE SET competicion = EXCLUDED.competicion, url = EXCLUDED.url
    `;
  }

  revalidatePath("/admin/quiniela");
}

export async function alternarActivo(formData: FormData) {
  const id = Number(formData.get("id"));
  const activo = formData.get("activo") === "true";
  if (!id) return;

  await sql`UPDATE partidos_quiniela SET activo = ${!activo} WHERE id = ${id}`;
  revalidatePath("/admin/quiniela");
}

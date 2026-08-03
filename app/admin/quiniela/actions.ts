"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { getCalendarioTemporadaOficial, getUltimoResultado } from "@/lib/fcbFixtures";

// 3 puntos por marcador exacto, 1 por acertar el signo (1 · X · 2), 0 si no.
function calcularPuntos(
  golesLocal: number,
  golesVisitante: number,
  prediccionLocal: number,
  prediccionVisitante: number
) {
  if (golesLocal === prediccionLocal && golesVisitante === prediccionVisitante) return 3;
  const signoReal = Math.sign(golesLocal - golesVisitante);
  const signoPrediccion = Math.sign(prediccionLocal - prediccionVisitante);
  return signoReal === signoPrediccion ? 1 : 0;
}

async function guardarResultado(partidoId: number, golesLocal: number, golesVisitante: number) {
  await sql`
    UPDATE partidos_quiniela
    SET resultado_local = ${golesLocal}, resultado_visitante = ${golesVisitante}, estado = 'jugado'
    WHERE id = ${partidoId}
  `;

  const predicciones = (await sql`
    SELECT id, prediccion_local, prediccion_visitante
    FROM predicciones
    WHERE partido_id = ${partidoId}
  `) as { id: number; prediccion_local: number; prediccion_visitante: number }[];

  for (const p of predicciones) {
    const puntos = calcularPuntos(golesLocal, golesVisitante, p.prediccion_local, p.prediccion_visitante);
    await sql`UPDATE predicciones SET puntos = ${puntos} WHERE id = ${p.id}`;
  }
}

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

// Lee el último partido jugado desde fcbarcelona.com y, si coincide con un
// partido "programado" de nuestra tabla, guarda el marcador y calcula puntos.
// Cubre el caso normal (~1-2 partidos oficiales por semana); si dos partidos
// se completan entre una revisión y otra, o si fcbarcelona.com cambia de
// formato, usa "Guardar resultado" manual más abajo como respaldo.
export async function actualizarResultadoAutomatico() {
  const resultado = await getUltimoResultado();
  if (!resultado) return;

  const candidatos = (await sql`
    SELECT id FROM partidos_quiniela
    WHERE estado = 'programado'
      AND fecha = ${resultado.fecha}
      AND lower(equipo_local) = lower(${resultado.equipoLocal})
      AND lower(equipo_visitante) = lower(${resultado.equipoVisitante})
    LIMIT 1
  `) as { id: number }[];

  if (!candidatos[0]) {
    revalidatePath("/admin/quiniela");
    return;
  }

  await guardarResultado(candidatos[0].id, resultado.golesLocal, resultado.golesVisitante);
  revalidatePath("/admin/quiniela");
  revalidatePath("/quiniela");
}

// Respaldo manual: también sirve para corregir un resultado ya guardado
// (recalcula los puntos de todas las predicciones de ese partido).
export async function guardarResultadoManual(formData: FormData) {
  const partidoId = Number(formData.get("partidoId"));
  const golesLocal = Number(formData.get("golesLocal"));
  const golesVisitante = Number(formData.get("golesVisitante"));

  if (
    !partidoId ||
    Number.isNaN(golesLocal) ||
    Number.isNaN(golesVisitante) ||
    golesLocal < 0 ||
    golesVisitante < 0
  ) {
    return;
  }

  await guardarResultado(partidoId, golesLocal, golesVisitante);
  revalidatePath("/admin/quiniela");
  revalidatePath("/quiniela");
}

"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function guardarPrediccion(formData: FormData) {
  const session = await getSession();
  if (!session) return;

  const partidoId = Number(formData.get("partidoId"));
  const local = Number(formData.get("local"));
  const visitante = Number(formData.get("visitante"));

  if (!partidoId || Number.isNaN(local) || Number.isNaN(visitante) || local < 0 || visitante < 0) {
    return;
  }

  const socio = (await sql`
    SELECT estado FROM inscripciones WHERE id = ${session.id}
  `) as { estado: string }[];
  if (socio[0]?.estado !== "aceptada") return;

  const partido = (await sql`
    SELECT id FROM partidos_quiniela
    WHERE id = ${partidoId} AND activo = true AND estado = 'programado' AND fecha >= CURRENT_DATE
  `) as { id: number }[];
  if (!partido[0]) return;

  await sql`
    INSERT INTO predicciones (inscripcion_id, partido_id, prediccion_local, prediccion_visitante)
    VALUES (${session.id}, ${partidoId}, ${local}, ${visitante})
    ON CONFLICT (inscripcion_id, partido_id)
    DO UPDATE SET prediccion_local = EXCLUDED.prediccion_local,
                  prediccion_visitante = EXCLUDED.prediccion_visitante
  `;

  revalidatePath("/quiniela");
}

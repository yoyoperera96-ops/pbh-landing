// Tablas de la quiniela: calendario de la temporada y predicciones de socios.
// Ejecutar una sola vez: node --env-file=.env.local scripts/migrate-005-quiniela.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL);

await sql`
  CREATE TABLE IF NOT EXISTS partidos_quiniela (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    equipo_local TEXT NOT NULL,
    equipo_visitante TEXT NOT NULL,
    competicion TEXT,
    url TEXT,
    resultado_local INT,
    resultado_visitante INT,
    estado TEXT NOT NULL DEFAULT 'programado',
    activo BOOLEAN NOT NULL DEFAULT true,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (fecha, equipo_local, equipo_visitante)
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS predicciones (
    id SERIAL PRIMARY KEY,
    inscripcion_id INT NOT NULL REFERENCES inscripciones(id),
    partido_id INT NOT NULL REFERENCES partidos_quiniela(id),
    prediccion_local INT NOT NULL,
    prediccion_visitante INT NOT NULL,
    puntos INT,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (inscripcion_id, partido_id)
  )
`;

console.log("Tablas 'partidos_quiniela' y 'predicciones' listas.");

import { sql, type Inscripcion } from "@/lib/db";
import { aceptarSolicitud, rechazarSolicitud } from "./actions";

export const dynamic = "force-dynamic";

const formatter = new Intl.DateTimeFormat("es-CU", {
  dateStyle: "medium",
  timeStyle: "short",
});

const badgeStyles: Record<Inscripcion["estado"], string> = {
  pendiente: "bg-dorado/15 text-dorado",
  aceptada: "bg-green-100 text-green-700",
  rechazada: "bg-grana/10 text-grana",
};

export default async function AdminPage() {
  const inscripciones = (await sql`
    SELECT id, nombre, carnet_identidad, correo, telefono, direccion, municipio,
           mensaje, estado, procesado_en, creado_en
    FROM inscripciones
    ORDER BY creado_en DESC
  `) as Inscripcion[];

  return (
    <main className="min-h-screen bg-hueso p-6 font-body text-tinta sm:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-2xl font-semibold">
          Solicitudes de inscripción
        </h1>
        <p className="mt-1 text-sm text-tinta/60">
          {inscripciones.length} solicitud{inscripciones.length === 1 ? "" : "es"} registrada
          {inscripciones.length === 1 ? "" : "s"}.
        </p>

        <div className="mt-6 space-y-4">
          {inscripciones.map((i) => (
            <div key={i.id} className="rounded-2xl border border-tinta/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{i.nombre}</p>
                  <p className="text-xs text-tinta/50">
                    {formatter.format(new Date(i.creado_en))}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${badgeStyles[i.estado]}`}
                >
                  {i.estado}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-tinta/50">Carné de identidad</dt>
                  <dd>{i.carnet_identidad || "—"}</dd>
                </div>
                <div>
                  <dt className="text-tinta/50">Correo</dt>
                  <dd>
                    <a href={`mailto:${i.correo}`} className="text-blau hover:underline">
                      {i.correo}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-tinta/50">Teléfono</dt>
                  <dd>{i.telefono}</dd>
                </div>
                <div>
                  <dt className="text-tinta/50">Municipio</dt>
                  <dd>{i.municipio || "—"}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-tinta/50">Dirección</dt>
                  <dd>{i.direccion || "—"}</dd>
                </div>
                {i.mensaje && (
                  <div className="sm:col-span-2">
                    <dt className="text-tinta/50">Mensaje</dt>
                    <dd className="text-tinta/80">{i.mensaje}</dd>
                  </div>
                )}
              </dl>

              {i.estado === "pendiente" ? (
                <div className="mt-4 flex gap-3">
                  <form action={aceptarSolicitud}>
                    <input type="hidden" name="id" value={i.id} />
                    <button
                      type="submit"
                      className="rounded-full bg-blau px-5 py-2 text-sm font-semibold text-white hover:bg-blau-light"
                    >
                      Aceptar
                    </button>
                  </form>
                  <form action={rechazarSolicitud}>
                    <input type="hidden" name="id" value={i.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-grana px-5 py-2 text-sm font-semibold text-grana hover:bg-grana/5"
                    >
                      Rechazar
                    </button>
                  </form>
                </div>
              ) : (
                <p className="mt-4 text-xs text-tinta/50">
                  Procesada el{" "}
                  {i.procesado_en ? formatter.format(new Date(i.procesado_en)) : "—"}
                </p>
              )}
            </div>
          ))}

          {inscripciones.length === 0 && (
            <p className="rounded-2xl border border-tinta/10 bg-white p-8 text-center text-tinta/50">
              Aún no hay solicitudes de inscripción.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

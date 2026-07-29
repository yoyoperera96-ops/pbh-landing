import { sql, type Inscripcion } from "@/lib/db";

export const dynamic = "force-dynamic";

const formatter = new Intl.DateTimeFormat("es-CU", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminPage() {
  const inscripciones = (await sql`
    SELECT id, nombre, correo, telefono, municipio, mensaje, creado_en
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

        <div className="mt-6 overflow-x-auto rounded-2xl border border-tinta/10 bg-white">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-tinta/5 text-xs uppercase tracking-wide text-tinta/60">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3">Municipio</th>
                <th className="px-4 py-3">Mensaje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tinta/10">
              {inscripciones.map((i) => (
                <tr key={i.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-tinta/70">
                    {formatter.format(new Date(i.creado_en))}
                  </td>
                  <td className="px-4 py-3 font-medium">{i.nombre}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${i.correo}`} className="text-blau hover:underline">
                      {i.correo}
                    </a>
                  </td>
                  <td className="px-4 py-3">{i.telefono}</td>
                  <td className="px-4 py-3">{i.municipio || "—"}</td>
                  <td className="max-w-xs px-4 py-3 text-tinta/70">{i.mensaje || "—"}</td>
                </tr>
              ))}
              {inscripciones.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-tinta/50">
                    Aún no hay solicitudes de inscripción.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

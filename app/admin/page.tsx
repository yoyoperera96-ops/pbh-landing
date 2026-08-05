import Link from "next/link";
import { getInscripciones, type Inscripcion } from "@/lib/db";
import { aceptarSolicitud, rechazarSolicitud, enviarActivacion } from "./actions";
import { BotonEliminar } from "./BotonEliminar";

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

const estados = [
  { value: "todas", label: "Todas" },
  { value: "pendiente", label: "Pendientes" },
  { value: "aceptada", label: "Aceptadas" },
  { value: "rechazada", label: "Rechazadas" },
] as const;

function buildQuery(params: Record<string, string | undefined>) {
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) usp.set(key, value);
  }
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

function AccionesSolicitud({ id }: { id: number }) {
  return (
    <div className="mt-4 flex gap-3">
      <form action={aceptarSolicitud}>
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="rounded-full bg-blau px-5 py-2 text-sm font-semibold text-white hover:bg-blau-light"
        >
          Aceptar
        </button>
      </form>
      <form action={rechazarSolicitud}>
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="rounded-full border border-grana px-5 py-2 text-sm font-semibold text-grana hover:bg-grana/5"
        >
          Rechazar
        </button>
      </form>
    </div>
  );
}

function AccesoAccion({ i }: { i: Inscripcion }) {
  if (i.estado !== "aceptada" || i.usuario) return null;

  const activacionVigente =
    i.activacion_expira && new Date(i.activacion_expira) > new Date();

  return (
    <form action={enviarActivacion} className="mt-3 flex items-center gap-2">
      <input type="hidden" name="id" value={i.id} />
      {activacionVigente && (
        <span className="rounded-full bg-blau/10 px-3 py-1 text-xs font-semibold text-blau">
          Acceso enviado
        </span>
      )}
      <button
        type="submit"
        className="rounded-full border border-dorado px-4 py-1.5 text-xs font-semibold text-dorado hover:bg-dorado/10"
      >
        {activacionVigente ? "Reenviar acceso" : "Enviar acceso"}
      </button>
    </form>
  );
}

function EstadoBadges({ i }: { i: Inscripcion }) {
  return (
    <div className="flex items-center gap-2">
      {i.numero_socio && (
        <span className="rounded-full bg-tinta px-3 py-1 font-eyebrow text-xs font-semibold text-dorado">
          Socio #{i.numero_socio}
        </span>
      )}
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${badgeStyles[i.estado]}`}
      >
        {i.estado}
      </span>
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; estado?: string; view?: string }>;
}) {
  const { q, estado, view: viewParam } = await searchParams;
  const view = viewParam === "mosaico" ? "mosaico" : "lista";
  const inscripciones = await getInscripciones({ q, estado });
  const exportHref = `/api/admin/export${buildQuery({ q, estado })}`;

  return (
    <main className="min-h-screen bg-hueso p-6 font-body text-tinta sm:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold">
              Solicitudes de inscripción
            </h1>
            <p className="mt-1 text-sm text-tinta/60">
              {inscripciones.length} resultado{inscripciones.length === 1 ? "" : "s"}
              {q ? ` para "${q}"` : ""}.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/quiniela"
              className="rounded-full border border-tinta/20 px-5 py-2.5 text-sm font-semibold text-tinta hover:bg-tinta/5"
            >
              Quiniela
            </Link>
            <a
              href={exportHref}
              className="rounded-full bg-tinta px-5 py-2.5 text-sm font-semibold text-white hover:bg-tinta-light"
            >
              Exportar CSV
            </a>
          </div>
        </div>

        <form className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-tinta/10 bg-white p-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="q" className="mb-1 block text-xs font-medium text-tinta/60">
              Buscar
            </label>
            <input
              id="q"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Nombre, carné, correo, teléfono, municipio…"
              className="w-full rounded-xl border border-tinta/15 px-4 py-2.5 text-sm outline-none focus:border-grana"
            />
          </div>

          <div>
            <label htmlFor="estado" className="mb-1 block text-xs font-medium text-tinta/60">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              defaultValue={estado ?? "todas"}
              className="rounded-xl border border-tinta/15 px-4 py-2.5 text-sm outline-none focus:border-grana"
            >
              {estados.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
          </div>

          <input type="hidden" name="view" value={view} />

          <button
            type="submit"
            className="rounded-full bg-grana px-6 py-2.5 text-sm font-semibold text-white hover:bg-grana-light"
          >
            Buscar
          </button>

          {(q || (estado && estado !== "todas")) && (
            <Link
              href={`/admin${buildQuery({ view })}`}
              className="text-sm text-tinta/50 hover:text-grana"
            >
              Limpiar
            </Link>
          )}

          <div className="ml-auto flex overflow-hidden rounded-full border border-tinta/15">
            <Link
              href={`/admin${buildQuery({ q, estado, view: "lista" })}`}
              className={`px-4 py-2 text-sm font-semibold ${
                view === "lista" ? "bg-tinta text-white" : "text-tinta/60 hover:bg-tinta/5"
              }`}
            >
              Lista
            </Link>
            <Link
              href={`/admin${buildQuery({ q, estado, view: "mosaico" })}`}
              className={`px-4 py-2 text-sm font-semibold ${
                view === "mosaico" ? "bg-tinta text-white" : "text-tinta/60 hover:bg-tinta/5"
              }`}
            >
              Mosaico
            </Link>
          </div>
        </form>

        {view === "mosaico" ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inscripciones.map((i) => (
              <div key={i.id} className="flex flex-col rounded-2xl border border-tinta/10 bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium leading-tight">{i.nombre}</p>
                </div>
                <div className="mt-2">
                  <EstadoBadges i={i} />
                </div>
                <dl className="mt-3 space-y-1 text-xs text-tinta/70">
                  <div>{i.usuario || "—"}</div>
                  <div>
                    <a href={`mailto:${i.correo}`} className="text-blau hover:underline">
                      {i.correo}
                    </a>
                  </div>
                  <div>{i.telefono}</div>
                  <div>{i.municipio || "—"}</div>
                </dl>
                {i.estado === "pendiente" && <AccionesSolicitud id={i.id} />}
                <AccesoAccion i={i} />
                <div className="mt-3">
                  <BotonEliminar id={i.id} nombre={i.nombre} />
                </div>
              </div>
            ))}

            {inscripciones.length === 0 && (
              <p className="col-span-full rounded-2xl border border-tinta/10 bg-white p-8 text-center text-tinta/50">
                No hay solicitudes que coincidan con la búsqueda.
              </p>
            )}
          </div>
        ) : (
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
                  <EstadoBadges i={i} />
                </div>

                <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-tinta/50">Usuario</dt>
                    <dd>{i.usuario || "—"}</dd>
                  </div>
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
                  <AccionesSolicitud id={i.id} />
                ) : (
                  <p className="mt-4 text-xs text-tinta/50">
                    Procesada el{" "}
                    {i.procesado_en ? formatter.format(new Date(i.procesado_en)) : "—"}
                  </p>
                )}
                <AccesoAccion i={i} />
                <div className="mt-3">
                  <BotonEliminar id={i.id} nombre={i.nombre} />
                </div>
              </div>
            ))}

            {inscripciones.length === 0 && (
              <p className="rounded-2xl border border-tinta/10 bg-white p-8 text-center text-tinta/50">
                No hay solicitudes que coincidan con la búsqueda.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

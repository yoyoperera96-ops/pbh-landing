"use client";

import { eliminarSolicitud } from "./actions";

export function BotonEliminar({ id, nombre }: { id: number; nombre: string }) {
  return (
    <form
      action={eliminarSolicitud}
      onSubmit={(e) => {
        if (!confirm(`¿Eliminar definitivamente la solicitud de "${nombre}"? Esta acción no se puede deshacer.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-full border border-tinta/20 px-4 py-1.5 text-xs font-semibold text-tinta/50 hover:border-grana hover:text-grana"
      >
        Eliminar
      </button>
    </form>
  );
}

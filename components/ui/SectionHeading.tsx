export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span
          className={`mb-3 inline-block rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest ${
            light
              ? "border-dorado/50 text-dorado"
              : "border-grana/30 bg-grana/5 text-grana"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl font-bold uppercase tracking-tight text-balance sm:text-4xl md:text-5xl ${
          light ? "text-white" : "text-tinta"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg ${light ? "text-white/80" : "text-tinta/70"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

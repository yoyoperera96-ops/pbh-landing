// Logotipo conmemorativo oficial del 30 Aniversario (Manual de Identidad Visual
// PBH, sección 05): círculo bicolor azul/grana sobre anillo dorado, cifra "30"
// en Oswald. Símbolo independiente del escudo — no se recolorea ni se distorsiona.
export function AnniversaryBadge({ className = "h-20 w-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="80" fill="#F0B429" />
      <g clipPath="url(#pbhAnniversaryClip)">
        <rect x="0" y="0" width="80" height="160" fill="#1D4D91" />
        <rect x="80" y="0" width="80" height="160" fill="#9C1C3A" />
      </g>
      <text
        x="80"
        y="98"
        textAnchor="middle"
        fontFamily="var(--font-eyebrow), sans-serif"
        fontWeight="700"
        fontSize="72"
        fill="#F0B429"
      >
        30
      </text>
      <circle cx="80" cy="80" r="74" fill="none" stroke="rgba(250,246,238,0.6)" strokeWidth="2" />
      <defs>
        <clipPath id="pbhAnniversaryClip">
          <circle cx="80" cy="80" r="71" />
        </clipPath>
      </defs>
    </svg>
  );
}

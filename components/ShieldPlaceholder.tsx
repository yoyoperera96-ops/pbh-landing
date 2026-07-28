// Escudo provisional de la PBH. Sustituir por el escudo oficial en SVG/PNG
// entregado por la Junta Directiva (ver README > "Reemplazar assets de marca").
export function ShieldPlaceholder({ className = "h-16 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 2 L116 22 V70 C116 104 92 128 60 138 C28 128 4 104 4 70 V22 Z"
        fill="url(#pbhShieldGradient)"
        stroke="#EDBB00"
        strokeWidth="3"
      />
      <path d="M60 2 L116 22 V70 C116 104 92 128 60 138 Z" fill="#000000" fillOpacity="0.12" />
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontWeight="800"
        fontSize="34"
        fill="#EDBB00"
      >
        PBH
      </text>
      <text
        x="60"
        y="96"
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontWeight="600"
        fontSize="12"
        letterSpacing="1"
        fill="#FFFFFF"
      >
        LA HABANA
      </text>
      <defs>
        <linearGradient id="pbhShieldGradient" x1="4" y1="2" x2="116" y2="138" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A50044" />
          <stop offset="0.55" stopColor="#002B57" />
          <stop offset="1" stopColor="#004D98" />
        </linearGradient>
      </defs>
    </svg>
  );
}

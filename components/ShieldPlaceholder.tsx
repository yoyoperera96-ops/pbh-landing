// Escudo provisional de la PBH. Sustituir por el escudo oficial en SVG/PNG
// entregado por la Junta Directiva (ver README > "Reemplazar assets de marca").
export function ShieldPlaceholder({ className = "h-16 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 2 L116 22 V70 C116 104 92 128 60 138 C28 128 4 104 4 70 V22 Z"
        fill="url(#pbhShieldGradient)"
        stroke="#F0B429"
        strokeWidth="3"
      />
      <path d="M60 2 L116 22 V70 C116 104 92 128 60 138 Z" fill="#000000" fillOpacity="0.12" />
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontFamily="var(--font-eyebrow), sans-serif"
        fontWeight="700"
        fontSize="34"
        fill="#F0B429"
      >
        PBH
      </text>
      <text
        x="60"
        y="96"
        textAnchor="middle"
        fontFamily="var(--font-eyebrow), sans-serif"
        fontWeight="500"
        fontSize="12"
        letterSpacing="1"
        fill="#FAF6EE"
      >
        LA HABANA
      </text>
      <defs>
        <linearGradient id="pbhShieldGradient" x1="4" y1="2" x2="116" y2="138" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9C1C3A" />
          <stop offset="0.55" stopColor="#142C54" />
          <stop offset="1" stopColor="#1D4D91" />
        </linearGradient>
      </defs>
    </svg>
  );
}

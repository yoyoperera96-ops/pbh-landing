// Logotipo conmemorativo provisional del 30 Aniversario. Sustituir por el
// archivo oficial del Manual de Marca (ver README > "Reemplazar assets de marca").
export function AnniversaryBadge({ className = "h-20 w-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="76" fill="url(#pbhGoldRing)" />
      <circle cx="80" cy="80" r="62" fill="#0B1220" />
      <text
        x="80"
        y="70"
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontWeight="800"
        fontSize="46"
        fill="#EDBB00"
      >
        30
      </text>
      <text
        x="80"
        y="94"
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontWeight="700"
        fontSize="13"
        letterSpacing="2"
        fill="#FFFFFF"
      >
        ANIVERSARIO
      </text>
      <text
        x="80"
        y="110"
        textAnchor="middle"
        fontFamily="var(--font-display), sans-serif"
        fontWeight="500"
        fontSize="9"
        letterSpacing="1.5"
        fill="#F5D460"
      >
        1997 · 2027
      </text>
      <defs>
        <linearGradient id="pbhGoldRing" x1="4" y1="4" x2="156" y2="156" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F5D460" />
          <stop offset="0.5" stopColor="#EDBB00" />
          <stop offset="1" stopColor="#B38F00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

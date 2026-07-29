import Image from "next/image";

export function AnniversaryLogo({ className = "h-20 w-20" }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src="/images/logo-30-aniversario.png"
        alt="Logotipo conmemorativo del 30 Aniversario PBH, 1996-2026"
        fill
        sizes="120px"
        className="object-contain"
      />
    </span>
  );
}

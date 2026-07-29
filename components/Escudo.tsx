import Image from "next/image";

export function Escudo({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src="/images/escudo-pbh.png"
        alt="Escudo oficial de la Peña Barcelonista de La Habana"
        fill
        sizes="120px"
        className="object-contain"
        priority
      />
    </span>
  );
}

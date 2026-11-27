import { Heart } from "lucide-react";

export function Crown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M6 17 L4 6 L13 12 L20 3 L27 12 L36 6 L34 17 Z" />
      <circle cx="4" cy="5" r="1.3" fill="currentColor" />
      <circle cx="20" cy="2" r="1.3" fill="currentColor" />
      <circle cx="36" cy="5" r="1.3" fill="currentColor" />
    </svg>
  );
}

/** AO monogram with crown. */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-flex flex-col items-center leading-none ${className}`}>
      <Crown className="absolute -top-[0.35em] left-[55%] w-[0.45em] text-gold" />
      <span className="font-serif font-medium tracking-[-0.12em] text-pastel">
        A<span className="text-gold">O</span>
      </span>
    </div>
  );
}

export function Logo({ size = "md", subtitle = true }: { size?: "md" | "lg"; subtitle?: boolean }) {
  const lg = size === "lg";
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`flex items-center ${lg ? "flex-col gap-1" : "gap-3"}`}>
        <Monogram className={lg ? "text-6xl md:text-7xl" : "text-4xl md:text-5xl"} />
        <div className="flex flex-col items-center">
          <span className={`font-serif uppercase text-pastel tracking-[0.12em] ${lg ? "text-2xl md:text-3xl" : "text-xl md:text-3xl"}`}>
            Angela Oliver
          </span>
          <span className="mt-0.5 flex items-center gap-2 text-gold">
            <span className="h-px w-10 bg-gold/70" />
            <Heart className="h-2.5 w-2.5" strokeWidth={1.5} />
            <span className="h-px w-10 bg-gold/70" />
          </span>
        </div>
      </div>
      {subtitle && (
        <span className="mt-1 text-[8px] tracking-[0.35em] text-pastel/90 md:ml-16 md:text-[9px]">
          BELEZA • ACESSÓRIOS • CAPAS DE CELULAR
        </span>
      )}
    </div>
  );
}

import { ReactNode } from "react";

type Variant = "primary" | "ghost";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  /** abre em nova aba quando href é externo */
  external?: boolean;
  ariaLabel?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition-transform duration-200 active:scale-95";

const variants: Record<Variant, string> = {
  primary: "bg-blood text-white glow-red",
  ghost: "border border-ink-500 bg-transparent text-cream hover:border-cream",
};

/**
 * Botão/anchor com microinteração de hover (camada que desliza por baixo)
 * e ícone opcional. Reaproveita o padrão de "overflow + span" do Button
 * do projeto de referência.
 */
export default function Botao({
  href,
  onClick,
  children,
  variant = "primary",
  icon,
  className = "",
  external,
  ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  const inner = (
    <>
      {/* camada de hover */}
      <span
        aria-hidden
        className={`absolute inset-0 -z-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 ${
          variant === "primary" ? "bg-blood-700" : "bg-cream"
        }`}
      />
      <span
        className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-300 ${
          variant === "ghost" ? "group-hover:text-ink-900" : ""
        }`}
      >
        {icon}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cls}>
      {inner}
    </button>
  );
}

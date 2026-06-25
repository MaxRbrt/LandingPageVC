/**
 * Overlay de grão/film sutil sobre toda a página — dá textura "premium"
 * ao tema escuro. Estático (sem custo de animação), não bloqueia cliques.
 */
export default function Granulado() {
  return (
    <div
      className="grain pointer-events-none fixed inset-0 z-[55] opacity-[0.05] mix-blend-overlay"
      aria-hidden
    />
  );
}

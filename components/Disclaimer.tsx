import { DISCLAIMER } from "@/lib/site";

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={
        compact
          ? "text-sm leading-6 text-muted"
          : "border border-line bg-card px-4 py-3 text-sm leading-6 text-ink"
      }
    >
      <span className="font-semibold text-accent">Schätzung. </span>
      {DISCLAIMER} Umsatz, Gage und Lifestyle sind keine Vermögensbilanz.
    </p>
  );
}

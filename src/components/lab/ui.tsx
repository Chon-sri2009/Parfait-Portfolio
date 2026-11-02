import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border border-field bg-white px-4 py-3 text-base font-semibold text-foreground placeholder:font-normal placeholder:text-muted aria-[invalid=true]:border-red-600 dark:bg-white/5 dark:aria-[invalid=true]:border-red-400";

export const primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition hover:bg-violet-600 disabled:pointer-events-none disabled:opacity-50 dark:bg-lime-300 dark:text-ink dark:hover:bg-lime-200";

export const secondaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-field px-5 text-sm font-bold transition hover:border-violet-600 hover:text-violet-700 disabled:pointer-events-none disabled:opacity-50 dark:hover:border-lime-300 dark:hover:text-lime-300";

export const panelClass = "rounded-[1.75rem] border border-line bg-white/65 p-6 sm:p-8 dark:bg-[#17131d]";

export const labelClass = "text-[11px] font-bold uppercase tracking-[0.18em] text-muted";

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string | null;
};

export function Field({ label, value, onChange, hint, error, ...inputProps }: FieldProps) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${inputClass} mt-2`}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

/** Dark results card used by every tool, so outputs read the same everywhere. */
export function ResultPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="on-dark rounded-[1.75rem] bg-[#100e19] p-6 text-white sm:p-8">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">{title}</h2>
      <dl className="mt-6 grid gap-6 sm:grid-cols-2">{children}</dl>
    </div>
  );
}

export function Result({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={highlight ? "sm:col-span-2" : undefined}>
      <dt className="text-sm text-zinc-400">{label}</dt>
      <dd className={`font-display mt-1 font-bold tracking-tight tabular-nums ${highlight ? "text-[clamp(2rem,4vw,3.25rem)] leading-none text-lime-300" : "text-2xl"}`}>{value}</dd>
    </div>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-amber-500/50 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-950 dark:bg-amber-400/10 dark:text-amber-100">{children}</p>;
}

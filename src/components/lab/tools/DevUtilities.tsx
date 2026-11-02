"use client";

import { useId, useMemo, useState } from "react";
import QRCode, { type QRCodeErrorCorrectionLevel } from "qrcode";
import { Check, Copy, Download, RefreshCw } from "lucide-react";
import { useCopy } from "@/components/lab/hooks";
import { Tabs } from "@/components/lab/tabs";
import { inputClass, labelClass, panelClass, primaryButtonClass, secondaryButtonClass } from "@/components/lab/ui";

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const { copied, copy } = useCopy();
  return (
    <>
      <button type="button" onClick={() => copy(text)} disabled={!text} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 px-5 text-sm font-bold text-white transition hover:border-lime-300 hover:text-lime-300 disabled:opacity-50">
        {copied?.ok ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {copied?.ok ? "Copied" : label}
      </button>
      <span role="status" className="sr-only">
        {copied && (copied.ok ? "Copied to clipboard." : "Couldn't copy. Select the text and copy it manually.")}
      </span>
    </>
  );
}

const SAMPLE_JSON = '{"name":"Lab","tools":4,"tags":["business","developer"],"offline":true,"owner":{"role":"developer"}}';
const indents = { "2 spaces": 2, "4 spaces": 4, Tab: "\t" } as const;

function JsonFormatter() {
  const id = useId();
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState<keyof typeof indents>("2 spaces");
  const [output, setOutput] = useState(() => JSON.stringify(JSON.parse(SAMPLE_JSON), null, 2));
  const [error, setError] = useState<string | null>(null);

  const run = (minify: boolean) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, minify ? undefined : indents[indent]));
      setError(null);
    } catch (problem) {
      setOutput("");
      setError(problem instanceof Error ? problem.message : "This isn't valid JSON.");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={panelClass}>
        <label htmlFor={`${id}-input`} className="block text-sm font-bold">
          JSON input
        </label>
        <textarea
          id={`${id}-input`}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          rows={12}
          spellCheck={false}
          className={`${inputClass} mt-3 font-mono text-sm leading-6`}
        />
        {error && (
          <p id={`${id}-error`} role="alert" className="mt-3 text-sm font-semibold text-red-700 dark:text-red-300">
            Invalid JSON: {error}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <button type="button" onClick={() => run(false)} className={primaryButtonClass}>
            Format
          </button>
          <button type="button" onClick={() => run(true)} className={secondaryButtonClass}>
            Minify
          </button>
          <div className="ml-auto">
            <label htmlFor={`${id}-indent`} className="block text-sm font-bold">
              Indent
            </label>
            <select id={`${id}-indent`} value={indent} onChange={(event) => setIndent(event.target.value as keyof typeof indents)} className={`${inputClass} mt-1 !py-2 text-sm`}>
              {Object.keys(indents).map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="on-dark flex flex-col rounded-[1.75rem] bg-[#100e19] p-6 text-white sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor={`${id}-output`} className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
            Result
          </label>
          <CopyButton text={output} />
        </div>
        <textarea id={`${id}-output`} value={output} readOnly rows={12} spellCheck={false} placeholder="Formatted JSON appears here." className="mt-4 w-full flex-1 resize-none rounded-xl border border-white/15 bg-white/5 p-4 font-mono text-sm leading-6 text-lime-200 placeholder:text-zinc-400" />
      </div>
    </div>
  );
}

const QR_LEVELS: { id: QRCodeErrorCorrectionLevel; label: string }[] = [
  { id: "L", label: "Low (7%): smallest code" },
  { id: "M", label: "Medium (15%): good default" },
  { id: "Q", label: "Quartile (25%)" },
  { id: "H", label: "High (30%): survives a logo or damage" },
];
const QR_MARGIN = 2;

function QrGenerator() {
  const id = useId();
  const [text, setText] = useState("https://chon-sri2009.github.io/Parfait-Portfolio/lab");
  const [level, setLevel] = useState<QRCodeErrorCorrectionLevel>("M");

  // QRCode.create is synchronous, so the code is derived during render instead of in an effect.
  const qr = useMemo(() => {
    if (!text.trim()) return { error: "Enter some text or a link." };
    try {
      const { modules } = QRCode.create(text, { errorCorrectionLevel: level });
      const size = modules.size + QR_MARGIN * 2;
      let path = "";
      for (let row = 0; row < modules.size; row++) {
        for (let col = 0; col < modules.size; col++) {
          if (modules.get(row, col)) path += `M${col + QR_MARGIN} ${row + QR_MARGIN}h1v1h-1z`;
        }
      }
      return { size, path };
    } catch {
      return { error: "That's too much text for one QR code. Shorten it or lower the error correction." };
    }
  }, [text, level]);

  const svgMarkup = "path" in qr ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${qr.size} ${qr.size}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${qr.path}" fill="#000"/></svg>` : "";

  const download = async (format: "svg" | "png") => {
    const href = format === "svg" ? URL.createObjectURL(new Blob([svgMarkup], { type: "image/svg+xml" })) : await QRCode.toDataURL(text, { errorCorrectionLevel: level, margin: QR_MARGIN, width: 1024 });
    const link = document.createElement("a");
    link.href = href;
    link.download = `qr-code.${format}`;
    link.click();
    if (format === "svg") URL.revokeObjectURL(href);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,22rem)]">
      <div className={`${panelClass} space-y-6`}>
        <div>
          <label htmlFor={`${id}-text`} className="block text-sm font-bold">
            Text or link
          </label>
          <textarea
            id={`${id}-text`}
            value={text}
            onChange={(event) => setText(event.target.value)}
            aria-invalid={"error" in qr ? true : undefined}
            aria-describedby={"error" in qr ? `${id}-error` : undefined}
            rows={4}
            maxLength={2000}
            className={`${inputClass} mt-2`}
          />
          {"error" in qr && (
            <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-red-700 dark:text-red-300">
              {qr.error}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-level`} className="block text-sm font-bold">
            Error correction
          </label>
          <select id={`${id}-level`} value={level} onChange={(event) => setLevel(event.target.value as QRCodeErrorCorrectionLevel)} className={`${inputClass} mt-2`}>
            {QR_LEVELS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={`${panelClass} flex flex-col items-center gap-5`}>
        <p className={`${labelClass} self-start`}>Preview</p>
        <div className="aspect-square w-full max-w-72 overflow-hidden rounded-2xl border border-line bg-white">
          {"path" in qr && (
            <svg viewBox={`0 0 ${qr.size} ${qr.size}`} shapeRendering="crispEdges" role="img" aria-label={`QR code for ${text.length > 80 ? `${text.slice(0, 80)}…` : text}`} className="size-full">
              <rect width="100%" height="100%" fill="#fff" />
              <path d={qr.path} fill="#000" />
            </svg>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => download("png")} disabled={!svgMarkup} className={primaryButtonClass}>
            <Download className="size-4" aria-hidden="true" /> PNG
          </button>
          <button type="button" onClick={() => download("svg")} disabled={!svgMarkup} className={secondaryButtonClass}>
            <Download className="size-4" aria-hidden="true" /> SVG
          </button>
        </div>
      </div>
    </div>
  );
}

const CHARSETS = {
  upper: { label: "Uppercase (A–Z)", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", similar: "IO" },
  lower: { label: "Lowercase (a–z)", chars: "abcdefghijklmnopqrstuvwxyz", similar: "l" },
  digits: { label: "Numbers (0–9)", chars: "0123456789", similar: "01" },
  symbols: { label: "Symbols (!@#…)", chars: "!@#$%^&*()-_=+[]{};:,.?/", similar: "" },
} as const;
type Charset = keyof typeof CHARSETS;
type PasswordOptions = { length: number; sets: Record<Charset, boolean>; avoidSimilar: boolean };

/** Unbiased random integer in [0, max) from the browser's cryptographic generator. */
function randomIndex(max: number) {
  const limit = Math.floor(0x100000000 / max) * max;
  const buffer = new Uint32Array(1);
  do crypto.getRandomValues(buffer);
  while (buffer[0] >= limit);
  return buffer[0] % max;
}

function poolsFor({ sets, avoidSimilar }: PasswordOptions) {
  return (Object.keys(CHARSETS) as Charset[])
    .filter((set) => sets[set])
    .map((set) => [...CHARSETS[set].chars].filter((char) => !avoidSimilar || !CHARSETS[set].similar.includes(char)).join(""));
}

function generatePassword(options: PasswordOptions) {
  const pools = poolsFor(options);
  if (pools.length === 0) return "";
  const all = pools.join("");
  // One character from every chosen set, then fill and shuffle, so each set is always represented.
  const chars = pools.map((pool) => pool[randomIndex(pool.length)]);
  while (chars.length < options.length) chars.push(all[randomIndex(all.length)]);
  for (let index = chars.length - 1; index > 0; index--) {
    const swap = randomIndex(index + 1);
    [chars[index], chars[swap]] = [chars[swap], chars[index]];
  }
  return chars.join("");
}

function strengthOf(bits: number) {
  if (bits < 50) return { label: "Weak", width: "25%", color: "bg-red-600 dark:bg-red-400" };
  if (bits < 80) return { label: "Fair", width: "50%", color: "bg-amber-500" };
  if (bits < 110) return { label: "Strong", width: "75%", color: "bg-emerald-600 dark:bg-emerald-400" };
  return { label: "Very strong", width: "100%", color: "bg-emerald-600 dark:bg-emerald-400" };
}

function PasswordGenerator() {
  const id = useId();
  const [options, setOptions] = useState<PasswordOptions>({ length: 20, sets: { upper: true, lower: true, digits: true, symbols: true }, avoidSimilar: false });
  const [password, setPassword] = useState("");

  const poolSize = poolsFor(options).join("").length;
  const bits = poolSize > 0 ? Math.round(options.length * Math.log2(poolSize)) : 0;
  const strength = strengthOf(bits);

  // Passwords are generated on demand in event handlers, never during render, so server HTML never contains one.
  const update = (next: PasswordOptions) => {
    setOptions(next);
    setPassword(generatePassword(next));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={`${panelClass} space-y-6`}>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor={`${id}-length`} className="text-sm font-bold">
              Length
            </label>
            <span className="font-display text-lg font-bold tabular-nums" aria-hidden="true">
              {options.length}
            </span>
          </div>
          <input id={`${id}-length`} type="range" min={8} max={64} value={options.length} onChange={(event) => update({ ...options, length: Number(event.target.value) })} className="mt-3 w-full accent-violet-600 dark:accent-lime-300" />
        </div>
        <fieldset>
          <legend className="text-sm font-bold">Include</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
            {(Object.keys(CHARSETS) as Charset[]).map((set) => (
              <label key={set} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-field px-4 has-[:checked]:border-violet-600 dark:has-[:checked]:border-lime-300">
                <input type="checkbox" checked={options.sets[set]} onChange={(event) => update({ ...options, sets: { ...options.sets, [set]: event.target.checked } })} className="size-4 accent-violet-600 dark:accent-lime-300" />
                <span className="text-sm font-semibold">{CHARSETS[set].label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
          <input type="checkbox" checked={options.avoidSimilar} onChange={(event) => update({ ...options, avoidSimilar: event.target.checked })} className="size-4 accent-violet-600 dark:accent-lime-300" />
          Avoid look-alike characters (I, l, O, 0, 1)
        </label>
      </div>

      <div className="on-dark flex flex-col rounded-[1.75rem] bg-[#100e19] p-6 text-white sm:p-8">
        <label htmlFor={`${id}-output`} className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
          Your password
        </label>
        <input id={`${id}-output`} value={password} readOnly placeholder="Press Generate" spellCheck={false} autoComplete="off" className="mt-4 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-4 font-mono text-lg text-lime-200 placeholder:text-zinc-400" />
        {poolSize === 0 ? (
          <p className="mt-4 text-sm font-semibold text-amber-200">Choose at least one character type.</p>
        ) : (
          <div className="mt-5">
            <div className="h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div className={`h-full rounded-full ${strength.color}`} style={{ width: strength.width }} />
            </div>
            <p className="mt-2 text-sm text-zinc-300">
              <span className="font-bold text-white">{strength.label}</span> · about {bits} bits of randomness
            </p>
          </div>
        )}
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <button type="button" onClick={() => setPassword(generatePassword(options))} disabled={poolSize === 0} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lime-300 px-5 text-sm font-bold text-ink transition hover:bg-lime-200 disabled:opacity-50">
            <RefreshCw className="size-4" aria-hidden="true" /> Generate
          </button>
          <CopyButton text={password} />
        </div>
        <p className="mt-4 text-sm text-zinc-400">Made in your browser with its secure random generator. Nothing is sent or stored.</p>
      </div>
    </div>
  );
}

export default function DevUtilities() {
  return (
    <Tabs
      label="Developer utilities"
      items={[
        { id: "json", label: "JSON formatter", content: <JsonFormatter /> },
        { id: "qr", label: "QR code", content: <QrGenerator /> },
        { id: "password", label: "Password", content: <PasswordGenerator /> },
      ]}
    />
  );
}

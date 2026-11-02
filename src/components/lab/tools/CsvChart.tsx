"use client";

import { useId, useMemo, useState, type ChangeEvent } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Upload } from "lucide-react";
import { Notice, inputClass, labelClass, panelClass, secondaryButtonClass } from "@/components/lab/ui";

const SAMPLE = `Month,Revenue (THB),Orders,Region
Jan,182000,412,North
Feb,164500,388,North
Mar,201300,455,Central
Apr,195800,431,Central
May,226400,502,South
Jun,248900,547,South`;

const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_TABLE_ROWS = 200;
const MAX_BARS = 20;

type Sort = { column: number; direction: "ascending" | "descending" };

function detectDelimiter(text: string) {
  const firstLine = text.slice(0, text.search(/\r?\n|$/));
  const counts = [",", ";", "\t"].map((delimiter) => ({ delimiter, count: firstLine.split(delimiter).length }));
  return counts.sort((a, b) => b.count - a.count)[0].delimiter;
}

/** RFC 4180-style parser: quoted fields, escaped quotes ("") and line breaks inside quotes. */
function parseCsv(text: string) {
  const delimiter = detectDelimiter(text);
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        field += '"';
        index++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === delimiter) {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[index + 1] === "\n") index++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field !== "" || row.length > 0) rows.push([...row, field]);

  return rows.filter((cells) => cells.some((cell) => cell.trim() !== "")).map((cells) => cells.map((cell) => cell.trim()));
}

/** Reads numbers written as 1,250 or ฿1,250.50 or 12%; returns null for anything else. */
function toNumber(cell: string) {
  const cleaned = cell.replace(/[\s,฿$€£%]/g, "");
  if (cleaned === "") return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

const formatNumber = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const formatShare = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 });

export default function CsvChart() {
  const id = useId();
  const [text, setText] = useState(SAMPLE);
  const [sort, setSort] = useState<Sort | null>(null);
  const [labelChoice, setLabelChoice] = useState(0);
  const [valueChoice, setValueChoice] = useState<number | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const { headers, rows, numericColumns } = useMemo(() => {
    const [headerRow = [], ...body] = parseCsv(text);
    const width = Math.max(headerRow.length, ...body.map((cells) => cells.length));
    const headers = Array.from({ length: width }, (_, index) => headerRow[index] || `Column ${index + 1}`);
    const rows = body.map((cells) => headers.map((_, index) => cells[index] ?? ""));
    const numericColumns = headers
      .map((_, index) => index)
      .filter((index) => {
        const cells = rows.map((cells) => cells[index]).filter((cell) => cell !== "");
        return cells.length > 0 && cells.every((cell) => toNumber(cell) !== null);
      });
    return { headers, rows, numericColumns };
  }, [text]);

  const sortedRows = useMemo(() => {
    if (!sort || sort.column >= headers.length) return rows;
    const numeric = numericColumns.includes(sort.column);
    const direction = sort.direction === "ascending" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const left = a[sort.column];
      const right = b[sort.column];
      const order = numeric ? (toNumber(left) ?? -Infinity) - (toNumber(right) ?? -Infinity) : left.localeCompare(right, undefined, { numeric: true });
      return order * direction;
    });
  }, [rows, sort, headers.length, numericColumns]);

  // Selections can point past the columns after the CSV is edited, so fall back to sensible defaults.
  const labelColumn = labelChoice < headers.length ? labelChoice : 0;
  const valueColumn = valueChoice !== null && numericColumns.includes(valueChoice) ? valueChoice : numericColumns.find((index) => index !== labelColumn) ?? numericColumns[0];

  const bars = valueColumn === undefined ? [] : sortedRows.slice(0, MAX_BARS).map((cells) => ({ label: cells[labelColumn] || "(blank)", value: toNumber(cells[valueColumn]) ?? 0 }));
  const min = Math.min(0, ...bars.map((bar) => bar.value));
  const max = Math.max(0, ...bars.map((bar) => bar.value));
  const range = max - min || 1;
  const zero = (-min / range) * 100;
  const total = bars.reduce((sum, bar) => sum + Math.abs(bar.value), 0) || 1;

  const toggleSort = (column: number) =>
    setSort((current) => (current?.column === column ? { column, direction: current.direction === "ascending" ? "descending" : "ascending" } : { column, direction: numericColumns.includes(column) ? "descending" : "ascending" }));

  const openFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setFileError(`“${file.name}” is larger than 2 MB. Try a smaller file.`);
      return;
    }
    setFileError(null);
    setSort(null);
    setText(await file.text());
  };

  return (
    <div className="space-y-6">
      <div className={panelClass}>
        <label htmlFor={`${id}-csv`} className="block text-sm font-bold">
          CSV data
        </label>
        <p id={`${id}-csv-hint`} className="mt-1 text-sm text-muted">
          First row is the header. Commas, semicolons and tabs all work. Your data never leaves this page.
        </p>
        <textarea
          id={`${id}-csv`}
          value={text}
          onChange={(event) => setText(event.target.value)}
          aria-describedby={`${id}-csv-hint`}
          rows={8}
          spellCheck={false}
          className={`${inputClass} mt-3 font-mono text-sm leading-6`}
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input id={`${id}-file`} type="file" accept=".csv,.tsv,.txt,text/csv" onChange={openFile} className="peer sr-only" />
          <label htmlFor={`${id}-file`} className={`${secondaryButtonClass} cursor-pointer peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent`}>
            <Upload className="size-4" aria-hidden="true" /> Open a CSV file
          </label>
          <button type="button" onClick={() => { setText(SAMPLE); setSort(null); setFileError(null); }} className={secondaryButtonClass}>
            Load sample
          </button>
          <button type="button" onClick={() => { setText(""); setSort(null); }} className={secondaryButtonClass}>
            Clear
          </button>
          <p role="status" className="text-sm font-semibold text-muted sm:ml-auto">
            {rows.length} {rows.length === 1 ? "row" : "rows"} · {headers.length} {headers.length === 1 ? "column" : "columns"} · {numericColumns.length} numeric
          </p>
        </div>
        {fileError && (
          <p role="alert" className="mt-3 text-sm font-semibold text-red-700 dark:text-red-300">
            {fileError}
          </p>
        )}
      </div>

      {rows.length === 0 ? (
        <Notice>Add a header row and at least one data row to see a table and chart.</Notice>
      ) : (
        <>
          <section aria-labelledby={`${id}-chart-title`} className={panelClass}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className={labelClass}>Chart</p>
                <h2 id={`${id}-chart-title`} className="font-display mt-2 text-2xl font-bold tracking-tight">
                  {valueColumn === undefined ? "No numeric column yet" : `${headers[valueColumn]} by ${headers[labelColumn]}`}
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <div>
                  <label htmlFor={`${id}-label`} className="block text-sm font-bold">
                    Labels
                  </label>
                  <select id={`${id}-label`} value={labelColumn} onChange={(event) => setLabelChoice(Number(event.target.value))} className={`${inputClass} mt-1 !py-2 text-sm`}>
                    {headers.map((header, index) => (
                      <option key={index} value={index}>
                        {header}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`${id}-value`} className="block text-sm font-bold">
                    Values
                  </label>
                  <select id={`${id}-value`} value={valueColumn ?? ""} onChange={(event) => setValueChoice(Number(event.target.value))} disabled={numericColumns.length === 0} className={`${inputClass} mt-1 !py-2 text-sm`}>
                    {numericColumns.map((index) => (
                      <option key={index} value={index}>
                        {headers[index]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {valueColumn === undefined ? (
              <p className="mt-6 text-sm text-muted">Charts need a column where every filled cell is a number.</p>
            ) : (
              <figure className="mt-8">
                {/* The table below holds the same data for screen readers, so the bars are hidden from them. */}
                <div aria-hidden="true" className="space-y-1" onMouseLeave={() => setHovered(null)}>
                  {bars.map((bar, index) => {
                    const width = (Math.abs(bar.value) / range) * 100;
                    const left = bar.value >= 0 ? zero : zero - width;
                    return (
                      <div key={index} onMouseEnter={() => setHovered(index)} className={`relative grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-2 py-1 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] ${hovered === index ? "bg-ink/5 dark:bg-white/5" : ""}`}>
                        <span className="truncate text-sm text-muted">{bar.label}</span>
                        <span className="relative h-6">
                          <span className="absolute inset-y-0 w-px bg-line" style={{ left: `${zero}%` }} />
                          <span
                            className={`absolute inset-y-0 bg-[#7c3aed] dark:bg-[#65a30d] ${bar.value >= 0 ? "rounded-r-[4px]" : "rounded-l-[4px]"}`}
                            style={{ left: `${left}%`, width: `max(${width}%, 2px)` }}
                          />
                          {hovered === index && (
                            <span className="pointer-events-none absolute bottom-full z-10 mb-2 whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white shadow-lg dark:bg-white dark:text-ink" style={{ left: `min(${left + width}%, calc(100% - 9rem))` }}>
                              {bar.label}: {formatNumber.format(bar.value)} · {formatShare.format(Math.abs(bar.value) / total)} of shown
                            </span>
                          )}
                        </span>
                        <span className="text-right text-sm font-semibold tabular-nums">{formatNumber.format(bar.value)}</span>
                      </div>
                    );
                  })}
                </div>
                <figcaption className="mt-4 text-sm text-muted">
                  {bars.length < sortedRows.length ? `Showing the first ${bars.length} of ${sortedRows.length} rows, ` : "Rows shown "}
                  in table order. Sort the table to reorder the bars.
                </figcaption>
              </figure>
            )}
          </section>

          <div className={panelClass}>
            <p className={labelClass}>Table</p>
            <h2 id={`${id}-table-title`} className="font-display mt-2 text-2xl font-bold tracking-tight">
              Your data
            </h2>
            <div role="region" aria-labelledby={`${id}-table-title`} tabIndex={0} className="mt-6 overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead className="bg-ink/[0.04] dark:bg-white/5">
                  <tr>
                    {headers.map((header, index) => {
                      const active = sort?.column === index;
                      const Icon = !active ? ArrowUpDown : sort.direction === "ascending" ? ArrowUp : ArrowDown;
                      return (
                        <th key={index} scope="col" aria-sort={active ? sort.direction : undefined} className={`border-b border-line p-0 font-bold ${numericColumns.includes(index) ? "text-right" : ""}`}>
                          <button type="button" onClick={() => toggleSort(index)} className={`inline-flex min-h-11 w-full items-center gap-2 px-4 hover:text-violet-700 dark:hover:text-lime-300 ${numericColumns.includes(index) ? "justify-end" : ""}`}>
                            {header}
                            <Icon className={`size-3.5 shrink-0 ${active ? "" : "text-muted"}`} aria-hidden="true" />
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.slice(0, MAX_TABLE_ROWS).map((cells, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-line last:border-0">
                      {cells.map((cell, index) => (
                        <td key={index} className={`px-4 py-2.5 ${numericColumns.includes(index) ? "text-right tabular-nums" : ""}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {sortedRows.length > MAX_TABLE_ROWS && <p className="mt-3 text-sm text-muted">Showing the first {MAX_TABLE_ROWS} of {sortedRows.length} rows.</p>}
          </div>
        </>
      )}
    </div>
  );
}

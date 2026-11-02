"use client";

import { useState } from "react";
import { Tabs } from "@/components/lab/tabs";
import { Field, Notice, Result, ResultPanel, panelClass } from "@/components/lab/ui";

const baht = new Intl.NumberFormat("en-US", { style: "currency", currency: "THB", currencyDisplay: "narrowSymbol", maximumFractionDigits: 2 });
const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 });
const EMPTY = "—";

/** Accepts "1,250.50" style input; returns null for blank or non-numeric text. */
function toNumber(value: string) {
  if (value.trim() === "") return null;
  const parsed = Number(value.replace(/[,\s฿]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function numberError(value: string, { min = 0, allowZero = true } = {}) {
  const parsed = toNumber(value);
  if (value.trim() === "") return "Enter a number.";
  if (parsed === null) return "Use digits only, for example 12500.";
  if (parsed < min || (!allowZero && parsed === 0)) return allowZero ? `Enter ${min} or more.` : "Enter a number above 0.";
  return null;
}

const decimalInput = { inputMode: "decimal" as const, autoComplete: "off", spellCheck: false };

function BreakEven() {
  const [fixed, setFixed] = useState("50000");
  const [price, setPrice] = useState("250");
  const [variable, setVariable] = useState("120");

  const errors = { fixed: numberError(fixed), price: numberError(price, { allowZero: false }), variable: numberError(variable) };
  const valid = !errors.fixed && !errors.price && !errors.variable;
  const margin = valid ? toNumber(price)! - toNumber(variable)! : null;
  const units = margin !== null && margin > 0 ? Math.ceil(toNumber(fixed)! / margin) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={`${panelClass} space-y-6`}>
        <Field label="Fixed costs per month (฿)" hint="Rent, salaries, software and other costs that don't change with sales." value={fixed} onChange={setFixed} error={errors.fixed} {...decimalInput} />
        <Field label="Selling price per unit (฿)" value={price} onChange={setPrice} error={errors.price} {...decimalInput} />
        <Field label="Variable cost per unit (฿)" hint="Materials, packaging or fees you pay for every unit sold." value={variable} onChange={setVariable} error={errors.variable} {...decimalInput} />
      </div>
      <div className="space-y-4">
        <ResultPanel title="Break-even point">
          <Result highlight label="Units to sell each month" value={units === null ? EMPTY : `${whole.format(units)} units`} />
          <Result label="Revenue at break-even" value={units === null ? EMPTY : baht.format(units * toNumber(price)!)} />
          <Result label="Contribution per unit" value={margin === null ? EMPTY : baht.format(margin)} />
          <Result label="Contribution margin" value={margin === null ? EMPTY : percent.format(margin / toNumber(price)!)} />
        </ResultPanel>
        {margin !== null && margin <= 0 && <Notice>The selling price must be higher than the variable cost per unit, or no amount of sales will cover your fixed costs.</Notice>}
      </div>
    </div>
  );
}

function Roi() {
  const [invested, setInvested] = useState("100000");
  const [returned, setReturned] = useState("135000");
  const [years, setYears] = useState("2");

  const errors = { invested: numberError(invested, { allowZero: false }), returned: numberError(returned), years: numberError(years, { allowZero: false }) };
  const valid = !errors.invested && !errors.returned && !errors.years;
  const cost = toNumber(invested) ?? 0;
  const value = toNumber(returned) ?? 0;
  const gain = valid ? value - cost : null;
  const annualized = valid ? Math.pow(value / cost, 1 / toNumber(years)!) - 1 : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={`${panelClass} space-y-6`}>
        <Field label="Amount invested (฿)" value={invested} onChange={setInvested} error={errors.invested} {...decimalInput} />
        <Field label="Value returned (฿)" hint="What the investment is worth, or earned in total, at the end." value={returned} onChange={setReturned} error={errors.returned} {...decimalInput} />
        <Field label="Time held (years)" hint="Decimals work too: 0.5 is six months." value={years} onChange={setYears} error={errors.years} {...decimalInput} />
      </div>
      <ResultPanel title="Return on investment">
        <Result highlight label="ROI" value={gain === null ? EMPTY : percent.format(gain / cost)} />
        <Result label="Net gain" value={gain === null ? EMPTY : baht.format(gain)} />
        <Result label="Annualized return" value={annualized === null ? EMPTY : percent.format(annualized)} />
      </ResultPanel>
    </div>
  );
}

function Vat() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("7");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const errors = { amount: numberError(amount), rate: numberError(rate) };
  const valid = !errors.amount && !errors.rate;
  const value = toNumber(amount) ?? 0;
  const factor = (toNumber(rate) ?? 0) / 100;
  const net = mode === "add" ? value : value / (1 + factor);
  const gross = mode === "add" ? value * (1 + factor) : value;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={`${panelClass} space-y-6`}>
        <fieldset>
          <legend className="text-sm font-bold">The amount I have is</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              { id: "add", label: "Before VAT", hint: "Add VAT on top" },
              { id: "remove", label: "Including VAT", hint: "Take VAT out" },
            ].map((option) => (
              <label key={option.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-field px-4 py-3 has-[:checked]:border-violet-600 has-[:checked]:bg-violet-600/10 dark:has-[:checked]:border-lime-300 dark:has-[:checked]:bg-lime-300/10">
                <input type="radio" name="vat-mode" value={option.id} checked={mode === option.id} onChange={() => setMode(option.id as "add" | "remove")} className="mt-1 size-4 accent-violet-600 dark:accent-lime-300" />
                <span>
                  <span className="block text-sm font-bold">{option.label}</span>
                  <span className="block text-sm text-muted">{option.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Amount (฿)" value={amount} onChange={setAmount} error={errors.amount} {...decimalInput} />
        <Field label="VAT rate (%)" hint="Thailand's standard rate is 7%." value={rate} onChange={setRate} error={errors.rate} {...decimalInput} />
      </div>
      <ResultPanel title="VAT breakdown">
        <Result highlight label={mode === "add" ? "Total including VAT" : "Price before VAT"} value={valid ? baht.format(mode === "add" ? gross : net) : EMPTY} />
        <Result label="VAT" value={valid ? baht.format(gross - net) : EMPTY} />
        <Result label={mode === "add" ? "Price before VAT" : "Total including VAT"} value={valid ? baht.format(mode === "add" ? net : gross) : EMPTY} />
      </ResultPanel>
    </div>
  );
}

export default function BusinessCalculators() {
  return (
    <Tabs
      label="Calculators"
      items={[
        { id: "break-even", label: "Break-even", content: <BreakEven /> },
        { id: "roi", label: "ROI", content: <Roi /> },
        { id: "vat", label: "VAT", content: <Vat /> },
      ]}
    />
  );
}

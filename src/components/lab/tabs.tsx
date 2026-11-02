"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = { id: string; label: string; content: ReactNode };

// WAI-ARIA tabs: one tab stop, arrow keys move between tabs, inactive panels stay mounted to keep their state.
export function Tabs({ label, items }: { label: string; items: TabItem[] }) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(items[0].id);
  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = keys[event.key];
    if (next === undefined) return;

    event.preventDefault();
    setActiveId(items[next].id);
    document.getElementById(tabId(items[next].id))?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="inline-flex max-w-full flex-wrap gap-1 rounded-[1.4rem] border border-line bg-white/50 p-1 dark:bg-white/5">
        {items.map((item, index) => {
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              id={tabId(item.id)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(item.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`min-h-10 rounded-full px-4 text-sm font-bold transition-colors ${selected ? "bg-ink text-white dark:bg-lime-300 dark:text-ink" : "text-muted hover:text-foreground"}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div key={item.id} id={panelId(item.id)} role="tabpanel" aria-labelledby={tabId(item.id)} hidden={item.id !== activeId} className="mt-8">
          {item.content}
        </div>
      ))}
    </div>
  );
}

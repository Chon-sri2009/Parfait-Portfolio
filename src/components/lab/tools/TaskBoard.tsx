"use client";

import { useState, type DragEvent, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Plus, Trash } from "lucide-react";
import { useStoredState } from "@/components/lab/hooks";
import { inputClass, primaryButtonClass, secondaryButtonClass } from "@/components/lab/ui";

type ColumnId = "todo" | "doing" | "done";
type Task = { id: string; title: string; column: ColumnId };

const columns: { id: ColumnId; label: string }[] = [
  { id: "todo", label: "To do" },
  { id: "doing", label: "Doing" },
  { id: "done", label: "Done" },
];

const starterTasks: Task[] = [
  { id: "starter-1", title: "Map the purchase approval workflow", column: "todo" },
  { id: "starter-2", title: "Sketch the invoice data model", column: "todo" },
  { id: "starter-3", title: "Build the expense report screen", column: "doing" },
  { id: "starter-4", title: "Interview the finance team", column: "done" },
];

const columnLabel = (id: ColumnId) => columns.find((column) => column.id === id)!.label;
const iconButtonClass = "grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:border-violet-600 hover:text-violet-700 dark:hover:border-lime-300 dark:hover:text-lime-300";

export default function TaskBoard() {
  const [tasks, setTasks] = useStoredState<Task[]>("lab-task-board", starterTasks);
  const [draft, setDraft] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [dropTarget, setDropTarget] = useState<ColumnId | null>(null);

  // Moving or deleting a card unmounts the button that was pressed, so put focus somewhere predictable.
  const focusLater = (id: string) => window.requestAnimationFrame(() => document.getElementById(id)?.focus());

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;
    setTasks((current) => [...current, { id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`, title, column: "todo" }]);
    setDraft("");
    setAnnouncement(`Added “${title}” to To do.`);
  };

  const moveTask = (task: Task, column: ColumnId, keepFocus = true) => {
    if (task.column === column) return;
    setTasks((current) => [...current.filter((item) => item.id !== task.id), { ...task, column }]);
    setAnnouncement(`Moved “${task.title}” to ${columnLabel(column)}.`);
    if (keepFocus) focusLater(`task-${task.id}`);
  };

  const deleteTask = (task: Task) => {
    setTasks((current) => current.filter((item) => item.id !== task.id));
    setAnnouncement(`Deleted “${task.title}”.`);
    focusLater(`column-${task.column}`);
  };

  const clearDone = () => {
    const count = tasks.filter((task) => task.column === "done").length;
    setTasks((current) => current.filter((task) => task.column !== "done"));
    setAnnouncement(`Cleared ${count} completed ${count === 1 ? "task" : "tasks"}.`);
  };

  const onDrop = (event: DragEvent<HTMLElement>, column: ColumnId) => {
    event.preventDefault();
    setDropTarget(null);
    const task = tasks.find((item) => item.id === event.dataTransfer.getData("text/plain"));
    if (task) moveTask(task, column, false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <form onSubmit={addTask} className="flex w-full max-w-xl gap-2">
          <label htmlFor="new-task" className="sr-only">
            New task
          </label>
          <input id="new-task" value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={120} placeholder="Add a task, then press Enter" autoComplete="off" className={inputClass} />
          <button type="submit" className={`${primaryButtonClass} shrink-0`}>
            <Plus className="size-4" aria-hidden="true" /> Add
          </button>
        </form>
        <button type="button" onClick={clearDone} disabled={!tasks.some((task) => task.column === "done")} className={secondaryButtonClass}>
          Clear done
        </button>
      </div>
      <p className="mt-3 text-sm text-muted">Move cards with the arrow buttons or drag them between columns. The board is saved in this browser only.</p>
      <p role="status" className="sr-only">
        {announcement}
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {columns.map((column, columnIndex) => {
          const columnTasks = tasks.filter((task) => task.column === column.id);
          const previous = columns[columnIndex - 1];
          const next = columns[columnIndex + 1];

          return (
            <section
              key={column.id}
              aria-labelledby={`column-${column.id}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDropTarget(column.id);
              }}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDropTarget(null);
              }}
              onDrop={(event) => onDrop(event, column.id)}
              className={`min-h-64 rounded-[1.75rem] border p-4 transition-colors sm:p-5 ${dropTarget === column.id ? "border-violet-600 bg-violet-600/5 dark:border-lime-300 dark:bg-lime-300/5" : "border-line bg-white/50 dark:bg-white/[0.03]"}`}
            >
              <h2 id={`column-${column.id}`} tabIndex={-1} className="flex items-center justify-between px-1 text-sm font-bold">
                {column.label}
                <span className="rounded-full bg-ink/10 px-2.5 py-0.5 text-xs tabular-nums dark:bg-white/10">
                  {columnTasks.length}
                  <span className="sr-only"> {columnTasks.length === 1 ? "task" : "tasks"}</span>
                </span>
              </h2>

              {columnTasks.length === 0 ? (
                <p className="mt-4 rounded-xl border border-dashed border-line px-4 py-8 text-center text-sm text-muted">Nothing here yet.</p>
              ) : (
                <ul role="list" className="mt-4 space-y-3">
                  {columnTasks.map((task) => (
                    <li
                      key={task.id}
                      id={`task-${task.id}`}
                      tabIndex={-1}
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.setData("text/plain", task.id);
                        event.dataTransfer.effectAllowed = "move";
                      }}
                      className="cursor-grab rounded-2xl border border-line bg-white p-4 shadow-sm active:cursor-grabbing dark:bg-[#1d1a26]"
                    >
                      <p className={`text-sm font-semibold leading-6 ${task.column === "done" ? "text-muted line-through" : ""}`}>{task.title}</p>
                      <div className="mt-3 flex items-center gap-2">
                        {previous && (
                          <button type="button" onClick={() => moveTask(task, previous.id)} className={iconButtonClass} aria-label={`Move “${task.title}” back to ${previous.label}`} title={`Move to ${previous.label}`}>
                            <ArrowLeft className="size-4" aria-hidden="true" />
                          </button>
                        )}
                        {next && (
                          <button type="button" onClick={() => moveTask(task, next.id)} className={iconButtonClass} aria-label={`Move “${task.title}” to ${next.label}`} title={`Move to ${next.label}`}>
                            <ArrowRight className="size-4" aria-hidden="true" />
                          </button>
                        )}
                        <button type="button" onClick={() => deleteTask(task)} className={`${iconButtonClass} ml-auto hover:!border-red-600 hover:!text-red-700 dark:hover:!border-red-400 dark:hover:!text-red-300`} aria-label={`Delete “${task.title}”`} title="Delete">
                          <Trash className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

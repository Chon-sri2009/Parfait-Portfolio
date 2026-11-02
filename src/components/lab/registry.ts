import type { ComponentType } from "react";
import { Braces, Calculator, ChartColumn, SquareKanban, type LucideIcon } from "lucide-react";
import BusinessCalculators from "@/components/lab/tools/BusinessCalculators";
import TaskBoard from "@/components/lab/tools/TaskBoard";
import CsvChart from "@/components/lab/tools/CsvChart";
import DevUtilities from "@/components/lab/tools/DevUtilities";

export type LabTool = {
  /** URL segment: the tool lives at /lab/<slug>. */
  slug: string;
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  icon: LucideIcon;
  Component: ComponentType;
};

// To add a tool: build it in src/components/lab/tools/, then add one entry here.
// Its card on /lab, its page, its navigation link and its metadata all come from this list.
export const labTools: LabTool[] = [
  {
    slug: "calculators",
    title: "Business calculators",
    category: "Finance",
    summary: "Break-even, ROI and Thai VAT calculators with results that update as you type.",
    highlights: ["Break-even", "ROI", "VAT 7%"],
    icon: Calculator,
    Component: BusinessCalculators,
  },
  {
    slug: "task-board",
    title: "Task board",
    category: "Productivity",
    summary: "A small Kanban board for planning work. Your tasks stay saved in this browser.",
    highlights: ["Keyboard friendly", "Drag and drop", "Saves locally"],
    icon: SquareKanban,
    Component: TaskBoard,
  },
  {
    slug: "csv-chart",
    title: "CSV to chart",
    category: "Data",
    summary: "Paste or open a CSV file and get a sortable table and a bar chart in an instant.",
    highlights: ["Sortable table", "Bar chart", "Nothing uploaded"],
    icon: ChartColumn,
    Component: CsvChart,
  },
  {
    slug: "dev-utilities",
    title: "Developer utilities",
    category: "Developer",
    summary: "Format and validate JSON, make QR codes and generate strong passwords.",
    highlights: ["JSON", "QR code", "Passwords"],
    icon: Braces,
    Component: DevUtilities,
  },
];

export const getLabTool = (slug: string) => labTools.find((tool) => tool.slug === slug);

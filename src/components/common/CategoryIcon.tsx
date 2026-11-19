import { Droplets, Files, Megaphone, Palette, Paperclip, Printer, Ruler, ScanLine, Wrench, type LucideProps } from "lucide-react";

import type { CategoryIcon as CategoryIconName } from "@/content/types";

const ICONS = {
  files: Files,
  scan: ScanLine,
  printer: Printer,
  wrench: Wrench,
  droplets: Droplets,
  paperclip: Paperclip,
  ruler: Ruler,
  megaphone: Megaphone,
  palette: Palette,
} as const;

export function CategoryIcon({ name, ...props }: { name: CategoryIconName } & LucideProps) {
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" {...props} />;
}

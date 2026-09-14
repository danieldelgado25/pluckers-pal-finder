import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeatLevel({
  level,
  max = 5,
  className,
  label,
}: {
  level: number;
  max?: number;
  className?: string;
  label?: string;
}) {
  if (level <= 0) return null;
  return (
    <span
      className={cn("inline-flex items-center gap-0.5 align-middle", className)}
      aria-label={label ?? `Heat level ${level} of ${max}`}
      title={label ?? `Heat level ${level} of ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Flame
          key={i}
          aria-hidden
          className={cn(
            "size-4",
            i < level ? "fill-primary text-primary" : "text-border",
          )}
        />
      ))}
    </span>
  );
}

import { cn } from "@/lib/utils";
import { spinnerStyle as s } from "./spinnerStyle";

function Spinner({ size = "md", className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(s.base, s.sizes[size], className)}
    />
  );
}

export function LoadingOverlay({ label, size = "md", className }) {
  return (
    <div className={cn(s.overlay, className)}>
      <Spinner size={size} />
      {label ? <span className={s.overlayLabel}>{label}</span> : null}
    </div>
  );
}

export default Spinner;

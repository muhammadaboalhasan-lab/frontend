export const workoutCardStyle = {
  card: "relative flex flex-col gap-3 overflow-hidden rounded-xl border bg-card p-5 text-card-foreground shadow-sm transition-shadow hover:shadow-md",
  header: "flex items-start justify-between gap-3",
  name: "text-lg font-semibold leading-tight break-words",
  delete:
    "inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40",
  badge:
    "inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary",
  description: "text-sm leading-relaxed text-muted-foreground",
};

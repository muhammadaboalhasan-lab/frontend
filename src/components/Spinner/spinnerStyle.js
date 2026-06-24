export const spinnerStyle = {
  base: "inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-primary",
  sizes: {
    sm: "size-4",
    md: "size-6",
    lg: "size-9",
  },
  overlay:
    "absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-[inherit] bg-background/60 backdrop-blur-sm",
  overlayLabel: "text-xs font-medium text-muted-foreground",
};

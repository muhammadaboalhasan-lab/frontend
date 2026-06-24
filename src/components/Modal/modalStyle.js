export const modalStyle = {
  backdrop:
    "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in",
  panel:
    "w-full max-w-md rounded-2xl border bg-card text-card-foreground shadow-xl animate-in zoom-in-95",
  header: "flex items-center justify-between gap-4 border-b px-5 py-4",
  title: "text-base font-semibold",
  close:
    "inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
  body: "px-5 py-4 text-sm text-muted-foreground",
  footer: "flex justify-end gap-2 border-t px-5 py-4",
};

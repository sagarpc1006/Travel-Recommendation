import { useEffect } from "react";
import { Icon } from "./icons";

/* Reusable overlay surface: centered modal on desktop, bottom sheet on mobile.
   Reduced-motion aware (animation kept short and opt-out via CSS below). */
export default function Sheet({
  title,
  onClose,
  children,
  footer,
  size = "md",
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "md" | "lg";
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-near-black/40 backdrop-blur-[2px]" style={{ animation: "sheet-fade 180ms ease-out" }} />
      <div
        className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-card sm:max-h-[86vh] sm:rounded-2xl elev-modal ${size === "lg" ? "sm:max-w-3xl" : "sm:max-w-lg"}`}
        style={{ animation: "sheet-rise 260ms cubic-bezier(.16,1,.3,1)" }}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold text-near-black">{title}</h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-medium-gray hover:bg-soft-gray" aria-label="Close">
            <Icon.Close size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && <div className="border-t border-border bg-card/95 px-5 py-4 backdrop-blur">{footer}</div>}
      </div>
      <style>{`
        @keyframes sheet-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sheet-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          [style*="sheet-rise"], [style*="sheet-fade"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

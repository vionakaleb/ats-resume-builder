import { useState } from "react";

export default function Section({ title, badge, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="panel mb-4 rounded-xl shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
          {title}
          {badge != null && (
            <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              {badge}
            </span>
          )}
        </span>
        <span
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && <div className="space-y-3 px-4 pb-4">{children}</div>}
    </section>
  );
}

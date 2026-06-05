import { TextField, TextAreaField } from "../ui/Field.jsx";
import Button from "../ui/Button.jsx";

function IconButton({ label, onClick, disabled, danger }) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm
        border-slate-300 text-slate-500 hover:enabled:border-brand-400 hover:enabled:text-brand-600
        disabled:opacity-40 dark:border-slate-700 dark:text-slate-400
        ${danger ? "hover:enabled:border-rose-400 hover:enabled:text-rose-500" : ""}`}
    >
      {label}
    </button>
  );
}

export default function EntryEditor({
  entry,
  index,
  total,
  orgLabel,
  onChange,
  onMove,
  onRemove,
}) {
  const setField = (field) => (value) => onChange(index, field, value);

  const setBullet = (bulletIndex, value) => {
    const bullets = [...(entry.bullets || [])];
    bullets[bulletIndex] = value;
    onChange(index, "bullets", bullets);
  };

  const addBullet = () => onChange(index, "bullets", [...(entry.bullets || []), ""]);

  const removeBullet = (bulletIndex) => {
    const bullets = (entry.bullets || []).filter((_, i) => i !== bulletIndex);
    onChange(index, "bullets", bullets);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/40">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex-1 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
          {entry.title || entry.org || "Untitled"}
        </span>
        <IconButton
          label="↑"
          disabled={index === 0}
          onClick={() => onMove(index, -1)}
        />
        <IconButton
          label="↓"
          disabled={index === total - 1}
          onClick={() => onMove(index, 1)}
        />
        <IconButton label="✕" danger onClick={() => onRemove(index)} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField label="Title" value={entry.title} onChange={setField("title")} />
        <TextField label={orgLabel} value={entry.org} onChange={setField("org")} />
        <TextField label="Dates" value={entry.dates} onChange={setField("dates")} />
        <TextField
          label="Location"
          value={entry.location}
          onChange={setField("location")}
        />
      </div>

      <p className="label-base mt-3">Bullets</p>
      <div className="space-y-2">
        {(entry.bullets || []).map((bullet, bulletIndex) => (
          <div key={bulletIndex} className="flex items-start gap-2">
            <TextAreaField
              rows={2}
              value={bullet}
              placeholder="Achievement or responsibility"
              onChange={(value) => setBullet(bulletIndex, value)}
            />
            <IconButton
              label="✕"
              danger
              onClick={() => removeBullet(bulletIndex)}
            />
          </div>
        ))}
      </div>
      <Button variant="subtle" className="mt-2 w-full" onClick={addBullet}>
        + Add bullet
      </Button>
    </div>
  );
}

import Section from "../ui/Section.jsx";
import Button from "../ui/Button.jsx";
import { TextField } from "../ui/Field.jsx";

export default function LanguagesForm({ data, update }) {
  const setLang = (index, key, value) =>
    update((draft) => {
      draft.languages[index][key] = value;
    });

  const removeLang = (index) =>
    update((draft) => {
      draft.languages.splice(index, 1);
    });

  const addLang = () =>
    update((draft) => {
      draft.languages.push({ name: "", level: "" });
    });

  return (
    <Section title="Languages" badge={data.languages.length}>
      <div className="space-y-2">
        {data.languages.map((lang, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="w-40 shrink-0">
              <TextField
                label="Language"
                value={lang.name}
                onChange={(value) => setLang(index, "name", value)}
              />
            </div>
            <div className="flex-1">
              <TextField
                label="Proficiency"
                value={lang.level}
                onChange={(value) => setLang(index, "level", value)}
              />
            </div>
            <button
              type="button"
              title="Remove"
              onClick={() => removeLang(index)}
              className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-300 text-slate-500
                hover:border-rose-400 hover:text-rose-500 dark:border-slate-700 dark:text-slate-400"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full" onClick={addLang}>
        + Add language
      </Button>
    </Section>
  );
}

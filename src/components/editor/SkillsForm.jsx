import Section from "../ui/Section.jsx";
import Button from "../ui/Button.jsx";
import { TextField } from "../ui/Field.jsx";

export default function SkillsForm({ data, update }) {
  const setSkill = (index, key, value) =>
    update((draft) => {
      draft.skills[index][key] = value;
    });

  const removeSkill = (index) =>
    update((draft) => {
      draft.skills.splice(index, 1);
    });

  const addSkill = () =>
    update((draft) => {
      draft.skills.push({ label: "", value: "" });
    });

  return (
    <Section title="Technical Skills" badge={data.skills.length}>
      <div className="space-y-2">
        {data.skills.map((skill, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="w-40 shrink-0">
              <TextField
                label="Category"
                value={skill.label}
                onChange={(value) => setSkill(index, "label", value)}
              />
            </div>
            <div className="flex-1">
              <TextField
                label="Skills"
                value={skill.value}
                onChange={(value) => setSkill(index, "value", value)}
              />
            </div>
            <button
              type="button"
              title="Remove"
              onClick={() => removeSkill(index)}
              className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-300 text-slate-500
                hover:border-rose-400 hover:text-rose-500 dark:border-slate-700 dark:text-slate-400"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full" onClick={addSkill}>
        + Add skill category
      </Button>
    </Section>
  );
}

import Section from "../ui/Section.jsx";
import Button from "../ui/Button.jsx";
import EntryEditor from "./EntryEditor.jsx";
import { blankEntry } from "../../data/initialData.js";

export default function EntryListForm({
  title,
  field,
  orgLabel,
  addLabel,
  data,
  update,
}) {
  const entries = data[field];

  const changeEntry = (index, key, value) =>
    update((draft) => {
      draft[field][index][key] = value;
    });

  const moveEntry = (index, delta) =>
    update((draft) => {
      const target = index + delta;
      const list = draft[field];
      if (target < 0 || target >= list.length) return;
      [list[index], list[target]] = [list[target], list[index]];
    });

  const removeEntry = (index) =>
    update((draft) => {
      draft[field].splice(index, 1);
    });

  const addEntry = () =>
    update((draft) => {
      draft[field].push(blankEntry());
    });

  return (
    <Section title={title} badge={entries.length}>
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <EntryEditor
            key={index}
            entry={entry}
            index={index}
            total={entries.length}
            orgLabel={orgLabel}
            onChange={changeEntry}
            onMove={moveEntry}
            onRemove={removeEntry}
          />
        ))}
      </div>
      <Button variant="outline" className="w-full" onClick={addEntry}>
        {addLabel}
      </Button>
    </Section>
  );
}

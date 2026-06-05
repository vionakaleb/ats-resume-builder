import Section from "../ui/Section.jsx";
import { TextAreaField } from "../ui/Field.jsx";

export default function SummaryForm({ data, update }) {
  return (
    <Section title="Summary">
      <TextAreaField
        rows={6}
        value={data.summary}
        placeholder="A short overview of who you are and your strongest results."
        onChange={(value) =>
          update((draft) => {
            draft.summary = value;
          })
        }
      />
    </Section>
  );
}

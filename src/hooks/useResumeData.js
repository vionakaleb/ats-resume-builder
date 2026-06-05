import { useCallback, useState } from "react";
import { initialData } from "../data/initialData.js";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isFilled(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function mergeParsed(current, parsed) {
  const next = clone(current);
  if (isFilled(parsed.name)) next.name = parsed.name;
  if (isFilled(parsed.headline)) next.headline = parsed.headline;
  if (isFilled(parsed.location)) next.location = parsed.location;
  if (isFilled(parsed.summary)) next.summary = parsed.summary;
  if (parsed.experience?.length) next.experience = parsed.experience;
  if (parsed.education?.length) next.education = parsed.education;
  if (parsed.skills?.length) next.skills = parsed.skills;
  if (parsed.languages?.length) next.languages = parsed.languages;
  return next;
}

export function useResumeData() {
  const [data, setData] = useState(() => clone(initialData));

  const update = useCallback((updater) => {
    setData((current) => {
      const draft = clone(current);
      updater(draft);
      return draft;
    });
  }, []);

  const importParsed = useCallback((parsed) => {
    setData((current) => mergeParsed(current, parsed));
  }, []);

  const loadJson = useCallback((parsed) => {
    setData(() => mergeParsed(clone(initialData), parsed));
  }, []);

  return { data, update, importParsed, loadJson };
}

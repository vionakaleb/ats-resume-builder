import { useState, useEffect, useCallback } from "react";
import { initialData } from "../data/initialData.js";
import { saveResume, loadResume, clearResume } from "../lib/resumeStorage.js";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function useResumeData() {
  const [data, setData] = useState(() => {
    const saved = loadResume();
    return saved || initialData;
  });

  useEffect(() => {
    saveResume(data);
  }, [data]);

  const update = useCallback((updater) => {
    setData((current) => {
      const draft = clone(current);
      updater(draft);
      return draft;
    });
  }, []);

  const importParsed = (parsed) => {
    setData((current) => ({ ...current, ...parsed }));
  };

  const loadJson = (parsed) => {
    setData(parsed);
  };

  const resetData = () => {
    clearResume();
    setData(initialData);
  };

  return { data, update, importParsed, loadJson, resetData };
}

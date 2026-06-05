const STORAGE_KEY = "ats_resume_data";

export function saveResume(data) {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, json);
    return true;
  } catch (error) {
    console.error("Failed to save resume:", error);
    return false;
  }
}

export function loadResume() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (error) {
    console.error("Failed to load resume:", error);
    return null;
  }
}

export function clearResume() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear resume:", error);
  }
}

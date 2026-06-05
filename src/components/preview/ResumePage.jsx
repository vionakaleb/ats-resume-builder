import { SECTION_SEP } from "../../data/initialData.js";

const filled = (value) => typeof value === "string" && value.trim().length > 0;

function normalizeUrl(url) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function displayUrl(url) {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

function ContactLine({ data }) {
  const items = [];
  if (filled(data.location)) items.push(<span key="loc">{data.location}</span>);
  if (filled(data.email)) items.push(<span key="email">{data.email}</span>);
  if (filled(data.phone)) items.push(<span key="phone">{data.phone}</span>);
  if (filled(data.linkedin))
    items.push(
      <a key="li" href={normalizeUrl(data.linkedin)}>
        {displayUrl(data.linkedin)}
      </a>,
    );
  if (filled(data.website))
    items.push(
      <a key="web" href={normalizeUrl(data.website)}>
        {displayUrl(data.website)}
      </a>,
    );
  if (!items.length) return null;
  return (
    <p className="contact">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && SECTION_SEP}
          {item}
        </span>
      ))}
    </p>
  );
}

function Entry({ entry }) {
  const bullets = (entry.bullets || []).filter(filled);
  return (
    <div className="entry">
      <div className="entry-head">
        <span className="entry-title">{entry.title}</span>
        <span className="entry-date">{entry.dates}</span>
      </div>
      {(filled(entry.org) || filled(entry.location)) && (
        <p className="entry-sub">
          <b>{entry.org}</b>
          {filled(entry.location) && (
            <span className="loc">
              {SECTION_SEP}
              {entry.location}
            </span>
          )}
        </p>
      )}
      {bullets.length > 0 && (
        <ul className="bullets">
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function entryHasContent(entry) {
  return (
    filled(entry.title) ||
    filled(entry.org) ||
    filled(entry.dates) ||
    (entry.bullets || []).some(filled)
  );
}

export default function ResumePage({ data }) {
  const skills = data.skills.filter((s) => filled(s.label) || filled(s.value));
  const experience = data.experience.filter(entryHasContent);
  const education = data.education.filter(entryHasContent);
  const languages = data.languages.filter(
    (l) => filled(l.name) || filled(l.level),
  );

  return (
    <main className="resume-page">
      <p className="name">{data.name}</p>
      {filled(data.headline) && <p className="headline">{data.headline}</p>}
      <ContactLine data={data} />

      {filled(data.summary) && (
        <>
          <h2 className="section">Summary</h2>
          <p className="summary">{data.summary}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <h2 className="section">Professional Experience</h2>
          {experience.map((entry, index) => (
            <Entry key={index} entry={entry} />
          ))}
        </>
      )}

      {education.length > 0 && (
        <>
          <h2 className="section">Education</h2>
          {education.map((entry, index) => (
            <Entry key={index} entry={entry} />
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <h2 className="section">Technical Skills</h2>
          {skills.map((skill, index) => (
            <p key={index} className="skill">
              {filled(skill.label) ? <b>{skill.label}: </b> : null}
              {skill.value}
            </p>
          ))}
        </>
      )}

      {languages.length > 0 && (
        <>
          <h2 className="section">Languages</h2>
          <p className="langs">
            {languages.map((lang, index) => (
              <span key={index} className="lang-item">
                <b>{lang.name}</b>
                {filled(lang.level) ? `: ${lang.level}` : ""}
              </span>
            ))}
          </p>
        </>
      )}
    </main>
  );
}

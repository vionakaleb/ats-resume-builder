# ATS Resume Builder

A React + Vite + Tailwind resume builder with a live A4 preview, LinkedIn PDF import,
PDF export, and a job-description match score. Light and dark mode included.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To make a production build: `npm run build`, then `npm run preview`.

## What it does

**Live editor + preview.** Edit on the left, watch the A4 page update on the right.
Sections render in this order: Summary, Experience, Education, Technical Skills, Languages.

**Export to PDF.** The "Export PDF" button opens your browser print dialog. Choose
"Save as PDF", paper A4, margins None. The print stylesheet hides the app and prints
only the resume page, so the PDF matches the on-screen design.

**Import LinkedIn PDF.** On LinkedIn go to your profile, then More, then "Save to PDF".
Upload that file with "Import LinkedIn PDF". The parser reads the two-column export,
pulls out your name, headline, summary, every role, education, and top skills, then
fills the editor. It is tuned for LinkedIn's own PDF layout and is best-effort, so
review the result before exporting. LinkedIn descriptions are prose, so each role
comes in as one or more bullets you can split and tighten.

**Job match score.** Paste a job description and press "Score my resume". You get an
overall percentage, matched and missing hard skills, and missing keywords. This is a
keyword-coverage heuristic to guide your edits. It is not a real applicant tracking
system, and a high score is not a guarantee of anything.

**Save / Load.** "Save" downloads your data as JSON. "Load" reads it back so you can
keep multiple versions.

## Customizing colors

App chrome uses the violet base `#a78bfa` (Tailwind `brand-400` in `tailwind.config.js`).

The resume page keeps the original professional navy design so the exported PDF stays
ATS-friendly. To recolor the resume itself, change `--resume-accent` in
`src/styles/resume.css` (for example set it to `#a78bfa` to match the app).

## Project layout

```
src/
  data/initialData.js        seed resume content
  lib/
    pdfText.js               pdf.js text extraction
    linkedinParser.js        LinkedIn PDF -> resume fields
    atsScore.js              job-description matching
    dates.js, skills.js      helpers and dictionaries
  hooks/                     theme + resume state
  components/
    editor/                  the form panels
    preview/                 the A4 resume page
    jobmatch/                the score panel
    Toolbar.jsx              import / save / load / export / theme
  App.jsx                    layout and wiring
```

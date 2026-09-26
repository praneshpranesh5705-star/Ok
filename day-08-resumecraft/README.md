# Day 8 — ResumeCraft

ResumeCraft is a self-contained resume builder with a live A4-style preview.

## Features

- Live resume preview while you type
- Profile, education, experience, skills and projects sections
- Automatic browser local-storage saving
- Print / Save as PDF using the browser print dialog
- Clear and rebuild your resume anytime
- Responsive desktop and mobile layout
- No framework, build tool, server, or external dependency

## Run

Open `index.html` in a modern browser.

For a local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

- `index.html` — page structure and resume preview
- `styles.css` — responsive UI and print layout
- `script.js` — live preview, storage, and print controls

Your resume data stays in your browser's local storage.
# ATARAXIA Vero secure AI backend

GitHub Pages cannot execute server-side API routes. The `api/` directory is therefore intended for the Vercel deployment of the same repository.

## Required environment variables

- `OPENAI_API_KEY`: server-side AI provider key. Never put this in frontend code or APK assets.
- `OPENAI_MODEL`: model name approved for the project (optional; defaults to `gpt-5-mini`).
- `ATARAXIA_ADMIN_PASSWORD`: strong creator/admin password. Store only in Vercel Environment Variables.
- `ATARAXIA_SESSION_SECRET`: long random secret used to sign HttpOnly admin sessions.
- `GITHUB_CONTENTS_TOKEN`: GitHub token with the minimum repository Contents permission required to update `frontend/public/ai-knowledge.json` and `memory/creator-feedback.ndjson`. Store only server-side.

## Admin

`/admin/` is the creator console. It authenticates against `/api/admin/login`, reads/writes the versioned knowledge base, and records creator feedback. Do not expose repository tokens in the browser.

## AI behavior

The backend injects the versioned knowledge base into the AI system instructions and explicitly requires the model to ask for missing critical information, avoid invented prices/availability, and label estimates as estimates. Human validation remains the final step for a formal quote.

## Deployment

Deploy this repository as a Vercel project. `vercel.json` builds the React frontend from `frontend/` while exposing `api/**/*.js` as serverless functions. The public GitHub Pages deployment remains suitable as a static fallback, but the real-time AI/admin features require the backend URL to be configured as `ATARAXIA_API_BASE` for the frontend if the frontend and API use different origins.

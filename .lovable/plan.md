# Project Nirikshan prototype

## Goal
Build one lightweight, official-only MPLADS monitoring dashboard using local mock data. No login, citizen portal, cloud services, or backend.

## What I’ll build
- A responsive government-style shell with a dark-blue sidebar for Dashboard, Project Map, Risk Analysis, and Project Details.
- Dashboard KPI cards and a highest-risk-first priority table with realistic project information.
- Around 50 local mock MPLADS projects across Indian districts, including the Chandipur demo project at risk score 87.
- A project review dialog showing official details, the AI risk score, explainable risk factors, and the non-fraud disclaimer.
- A Leaflet project map with risk-colored markers and concise project popups.
- A detailed inspection view with project facts, risk reasoning, field evidence, sample imagery, and prominent mismatch detection.
- Navigation that keeps the selected project consistent across the table, map, analysis, and details views.

## Visual direction
- Clean white and light-gray surfaces, restrained dark-blue government identity, professional sans-serif typography, compact cards, and clear data hierarchy.
- Green, yellow, orange, and red used only for risk states.
- Minimal transitions and mobile-friendly sidebar/navigation behavior.

## Technical details
- Keep the existing TanStack Start/Vite project structure while delivering the requested React experience.
- Add Material UI, MUI icons, Leaflet, and React-Leaflet.
- Store all project and evidence data locally in JavaScript/TypeScript modules; no persistence or network calls.
- Use a generated local evidence image rather than a placeholder or hotlinked image.
- Add page metadata and verify the dashboard at desktop and mobile sizes.

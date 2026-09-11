# Nirikshan Dashboard

Build a VERY SIMPLE working prototype called "Project Nirikshan" for a Smart India Hackathon presentation.

IMPORTANT:

- This is an OFFICIAL-ONLY monitoring dashboard.

- There is NO citizen login.

- There is NO citizen-facing website.

- Do not build authentication.

- Do not build a separate citizen portal.

- Do not build a complicated backend.

- Use mock/local JSON data.

- Keep the application lightweight enough for free AI coding-platform credits.

- The goal is to visually demonstrate the concept, not build a production system.

TECHNOLOGY:

- React + Vite

- Material UI

- Leaflet / React-Leaflet

- Local mock JSON data

- JavaScript

========================================

APPLICATION

========================================

Create one official dashboard:

PROJECT NIRIKSHAN

AI-Powered MPLADS Monitoring System

The entire application is for GOVERNMENT OFFICIALS to monitor MPLADS projects.

Add a simple sidebar:

📊 Dashboard

🗺 Project Map

⚠ Risk Analysis

📋 Project Details

========================================

1. DASHBOARD

========================================

Show 3-4 KPI cards:

Total Projects: 50

High Risk Projects: 6

Projects Needing Review: 11

Citizen Mismatch Reports: 3

Below this, show:

"Priority Projects"

A table containing around 10 realistic MPLADS projects.

Columns:

Project Name

District

Category

Sanction Amount

Contractor

Status

Risk Score

Risk Band

Use:

Green = Normal (0–30)

Yellow = Needs Review (31–60)

Orange = Suspicious (61–80)

Red = High Risk (81–100)

Sort projects by highest risk first.

========================================

2. AI RISK ANALYSIS

========================================

When an official clicks a project, open a MUI dialog/modal.

Display:

PROJECT DETAILS

Project Name

District

Category

Contractor

Sanction Amount

Expenditure

Official Status

Then prominently show:

AI RISK SCORE

87 / 100

HIGH RISK

Show:

"WHY WAS THIS PROJECT FLAGGED?"

Use simple explanation cards:

+30 Cost Anomaly

Project cost is significantly higher than similar projects.

+25 Contractor Concentration

Contractor handles an unusually large share of district projects.

+20 Excessive Delay

Project is significantly overdue.

+12 AI Anomaly

Multiple project attributes appear unusual.

Add this important disclaimer:

"Risk score indicates projects requiring closer inspection.

It does not automatically establish fraud."

========================================

3. MAP

========================================

Add a Leaflet map showing project locations.

Use around 10 sample projects.

Color markers according to risk:

Green → Normal

Yellow → Needs Review

Orange → Suspicious

Red → High Risk

Clicking a marker shows:

Project Name

District

Sanction Amount

Contractor

Risk Score

========================================

4. PROJECT DETAILS

========================================

Create a detailed official inspection view.

Show:

Project information

Risk score

Risk band

Risk explanation

Then add:

"INSPECTION EVIDENCE"

Display sample citizen/field reports associated with the project.

Example:

FIELD REPORT

Reported Status:

"No Work on Ground"

Observation:

"Project marked completed in records, but construction was not found during field verification."

Evidence:

[Sample Image]

Flag:

⚠ STATUS MISMATCH

IMPORTANT:

There is NO citizen login.

These reports are simply shown as evidence available to officials.

========================================

5. CITIZEN/FIELD EVIDENCE

========================================

Officials should be able to see verification evidence attached to projects.

Create a small section:

"Verification Evidence"

Show:

Photo

Observation

Observed Status

Date

Mismatch Status

Example:

Official Status:

Completed

Reported Ground Status:

No Work on Ground

Result:

⚠ MISMATCH DETECTED

Do NOT create a citizen account or citizen dashboard.

Do NOT create a public submission portal.

This is an OFFICIAL monitoring interface.

========================================

6. SAMPLE DATA

========================================

Create around 50 mock MPLADS projects.

Use realistic:

- Indian districts

- Infrastructure projects

- Contractor names

- Sanction amounts

- Expenditure amounts

- Completion dates

- Project statuses

- Coordinates

Include several deliberately suspicious projects.

One main demo project should be:

Rural Road Development – Chandipur

Risk Score: 87

Risk Band: High Risk

Reasons:

+30 Cost Anomaly

+25 Contractor Concentration

+20 Excessive Delay

+12 AI Anomaly

Also attach:

Official Status: Completed

Field/Citizen Report:

No Work on Ground

This should produce:

⚠ STATUS MISMATCH

========================================

7. DESIGN

========================================

Make the dashboard look like a professional government monitoring system.

Use:

- Clean white/light background

- Dark blue primary color

- MUI cards

- Professional typography

- Simple icons

- Risk colors only where necessary

- Responsive layout

- Minimal animations

Do not overcrowd the dashboard.

========================================

8. CORE STORY OF THE DEMO

========================================

The entire prototype should communicate this:

MPLADS PROJECT DATA

        ↓

AI ANALYSIS

        ↓

RISK SCORE

        ↓

PRIORITY PROJECT IDENTIFIED

        ↓

OFFICIAL OPENS PROJECT

        ↓

AI EXPLAINS THE RISK

        ↓

MAP SHOWS LOCATION

        ↓

FIELD/CITIZEN EVIDENCE AVAILABLE

        ↓

STATUS MISMATCH DETECTED

        ↓

OFFICIAL INSPECTION PRIORITIZED

========================================

9. IMPORTANT

========================================

Do NOT implement:

- Citizen login

- Citizen registration

- Public portal

- Authentication

- Payment

- Complex database

- Cloud storage

- Advanced ML training

- Complex government integrations

Use mock data and simple frontend logic.

The prototype only needs to convincingly demonstrate how Project Nirikshan helps officials:

1. Find suspicious MPLADS projects

2. Understand WHY they are suspicious

3. See WHERE they are located

4. Review available field/citizen evidence

5. Prioritize projects for physical inspection

Provide only short setup instructions.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nirikshan-insight.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/788c7acd-6641-45c5-8c5b-111b5dabf2bd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Static HTML, CSS and vanilla JS, no framework (confirmed by the owner). All content lives in `js/data.js`; pages are rendered by `js/app.js`. Deployed on Vercel from `main`.

## Users
Primary: recruiters and hiring managers (real estate, finance, quant) deciding whether to interview Ethan Seung, a Stanford data science student. They arrive from a resume, LinkedIn or an email signature and give the site about a minute. Secondary audiences (peers, friends) are not confirmed as a design target.

## Product Purpose
A personal site for Ethan Seung (Stanford, B.S. Data Science, Quantitative Finance concentration) that makes a recruiter believe, within about 60 seconds, that he is both rigorous and fun: credible on work, memorable on personality, with neither dominating.

## Positioning
Chess and poker led to finding edges, first in sports analytics, then AI, then real estate credit underwriting, with Tishman Speyer acquisitions (summer 2027) next. Outside work: century rides, mountains, and trying everything on a menu at least once, tracked on Beli. A neighboring student site cannot truthfully copy this specific path and the Eats and Rides pages as evidence of how he thinks.

## Operating Context
Visitors skim. They look for employers, dates, results and a way to contact him (email, LinkedIn, resume PDF). Sections: About, Work (path story plus cards), Play (rides and bike photos), Eats (Beli ranking, best and worst).

## Capabilities and Constraints
- Static site; no build step. Content edits happen in `js/data.js`.
- Existing sections to preserve in function: About, Work, Play, Eats, Beli link, resume download, email, LinkedIn.
- Not confirmed as fixed: the copy, the "Make it rain" button, or the section list. Ask before treating them as binding or replacing them.
- Open decision: whether the visual identity should change at all, or be refined.

## Brand Commitments
Name: Ethan Seung. Voice is first-person, plain and specific. The owner does not want to read as a "rich kid": sushi-counter framing was removed in favor of "ordering the strangest thing on the menu" and "I have to try everything at least once."

## Evidence on Hand
Resume at `assets/resume.pdf`; headshot and baby photo, ride photos and maps in `photos/`; employer, award and publication facts in `js/data.js`; Beli profile link. Do not invent testimonials, metrics or employers beyond what is in `js/data.js`.

## Product Principles
1. Credibility first: employers, dates and numbers are findable in seconds.
2. Personality is evidence of how he thinks, not decoration.
3. Never signal wealth or polish for its own sake; curiosity and effort read better.
4. Stay fast and static; no framework or heavy dependencies.
5. Facts come from `js/data.js`; do not fabricate.

## Accessibility & Inclusion
No product-specific requirement established; follow standard web accessibility defaults.

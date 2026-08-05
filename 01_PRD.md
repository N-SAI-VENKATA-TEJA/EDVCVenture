# Document 01 — Product Requirements Document (PRD)
### CareerLens — Version 1.0

| Field | Detail |
|---|---|
| **App Name** | CareerLens |
| **Tagline** | "Know the value before you invest the time." |
| **Problem** | Students cannot tell which free certification courses genuinely strengthen a resume for a specific role, cannot see which of their own skill gaps a certification or project would close, and have no live, trustworthy source for hackathons, internships, and opportunity deadlines — so they waste time on low-value activity and miss what matters. |
| **Target User** | A second- or third-year Indian engineering/UG student preparing for placements, who is either choosing their next certification, building a project portfolio, or trying to understand what their resume is missing for a specific target role. |
| **Core Value Proposition** | A role-based, ranked directory of genuinely free certifications (scored by issuer credibility and skill relevance), a resume-gap analyser that recommends the specific certifications and projects that close that gap, and a live daily digest of verified opportunities — all in one platform, with paid content reserved for a clearly separated Exclusive Resources tier. |

## Core Features (Must Have — V1.0)

1. **Daily Digest** — Admin-managed feed of hackathons, deadlines, certifications, and events (name, dates, timing, place, deadline, details, link), rendered live for all logged-in users.
2. **Free Resources** — Static, always-visible resource content available to any logged-in user.
3. **Exclusive Resources** — Subscription-gated resource content, visible only to users with an active paid subscription.
4. **Certifications Directory** — User selects a target role (Frontend Engineer, Backend Engineer, Full Stack Engineer, Data Analyst, ML Engineer); certifications for that role are listed ranked from highest to lowest Value Score, computed from Issuer Credibility and Skill Relevance (the two parameters in scope for V1.0).
5. **SaaS Landing & Auth** — Public landing page (Header, Hero, Features, Testimonials, Pricing, Footer), separate User and Admin login/registration flows.
6. **Standard Resumes** — A benchmark/standard resume reference per supported role, so students can see what a strong resume for that role actually contains.
7. **Resume Analyser (Main Distinguisher)** — User uploads a resume and selects a target role; the system extracts current skills, detects the gap against that role's required skill vector, and recommends (a) the highest-ranked certifications that cover the missing skills and (b) portfolio projects (sourced from the curated Projects database) that demonstrate those same missing skills.

## Nice to Have (V2 — Explicitly Deferred)

- Machine-learning-driven Value Score upgrades: review-sentiment analysis (e.g., from YouTube/Reddit) and a Time-Worth dimension, added on top of the V1.0 Issuer Credibility + Skill Relevance formula.
- Embedding-based semantic matching (skills/projects) and true RAG-based project recommendation with natural-language explanations, replacing the V1.0 structured tag-based retrieval.
- Community-submitted certification reviews and long-term outcome tracking.
- Email/push notifications for new high-value Daily Digest items.
- Production-hardened payment reconciliation, invoicing, and refund handling for subscriptions.

## Out of Scope (V1.0)

- Any ML microservice or model training — V1.0 is a pure MERN application; the Value Score is a deterministic formula, not a learned model.
- Sentiment analysis of reviews and the Time-Worth scoring dimension (see Nice to Have).
- Full RAG (retrieval + LLM-generated explanation) for project/certification recommendations — V1.0 uses structured, tag-based database retrieval only.
- Internship scam-alerts and hackathon-specific rating (Daily Digest lists these as informational items only; it does not rate or verify them in V1.0).
- Native mobile app (web-first, fully responsive instead).
- Production-grade billing operations beyond a working Razorpay test-mode subscription checkout.

## User Stories

- As a student, I want to select my target role and see certifications ranked from most to least valuable, so that I know where to start.
- As a student, I want to upload my resume and target role and see exactly which skills I'm missing, so that I stop guessing what to learn next.
- As a student, I want the system to recommend specific certifications and specific projects for my missing skills, so that I have a concrete next action instead of a generic list.
- As a student, I want to see a standard/benchmark resume for my target role, so that I know what "good" looks like.
- As a student, I want to check one page for today's hackathons, certifications, and deadlines, so that I don't have to scroll LinkedIn.
- As a subscribed user, I want access to exclusive resources not available to free users, so that my subscription is clearly worth it.
- As an admin, I want to add, edit, and delete Daily Digest entries through a dedicated login, so that the information students see is always current.

## Success Metrics

- At least 150 students onboarded during the campus pilot.
- At least 100 resumes analysed through the Resume Analyser.
- At least 56 certifications live across 5 target roles at MVP launch (seeded from the V1.0 research dataset).
- At least 70% of surveyed pilot users rate the recommended certifications/projects as "relevant" or "very relevant" to their target role.
- At least 10 Daily Digest items posted and visibly rendered correctly within the first two weeks of the pilot.

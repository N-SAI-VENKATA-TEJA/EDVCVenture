# Document 02 — Technical Requirements Document (TRD)
### SkillShell — Version 1.0

| Field | Detail |
|---|---|
| **Frontend** | React.js with TypeScript (Vite), Tailwind CSS |
| **Backend** | Node.js + Express.js (TypeScript), REST API |
| **Database** | MongoDB Atlas (free tier for MVP), accessed via Mongoose ODM |
| **ML Microservice** | **None in V1.0.** All scoring is a deterministic formula computed inside the Express backend — see "Value Score Computation" below. A Python ML microservice is explicitly deferred to V2 (see PRD, Nice to Have). |
| **Auth** | JWT-based authentication (access + refresh tokens), bcrypt password hashing. Two separate auth contexts: `user` and `admin`, distinguished by a `role` field and separate login routes/middleware — admins are never created through the public signup form. |
| **Payments** | Razorpay (test/sandbox mode for MVP) for subscription checkout, powering the Exclusive Resources gate. |
| **Hosting / Deployment** | Frontend: Vercel. Backend: Render or Railway. Database: MongoDB Atlas. File storage: Cloudinary. |
| **File Storage** | Cloudinary — resume uploads (PDF/DOCX), standard-resume reference files, any project reference assets. |

## Third-Party Services

| Service | Purpose | Tier |
|---|---|---|
| MongoDB Atlas | Primary database | Free (M0) |
| Cloudinary | File storage (resumes, standard resumes) | Free tier |
| Razorpay | Subscription payments | Test/sandbox mode |
| Vercel | Frontend hosting | Free tier |
| Render/Railway | Backend hosting | Free tier |

## Key Libraries

- **Backend:** `express`, `mongoose`, `jsonwebtoken`, `bcrypt`, `multer` (file upload), `pdf-parse` and `mammoth` (resume text extraction from PDF/DOCX), `razorpay` (Node SDK), `cors`, `dotenv`, `zod` or `joi` (request validation)
- **Frontend:** `react-router-dom`, `axios` or `@tanstack/react-query`, `react-hook-form`, `recharts` (Value Score breakdown visualisation), `lucide-react` (icons)

## Folder Structure

```
/client        — React + TypeScript app
/server        — Express + TypeScript API
  /models      — Mongoose schemas
  /routes      — Express routers (auth, admin, digest, resources, certifications, resumes, subscriptions)
  /controllers — Route handlers
  /services    — Value Score calculation, skill-matching, resume-parsing logic
  /middleware  — auth (user), adminAuth, error handling
  /seed        — Seed scripts importing the Issuer Credibility / Roles / Certifications research dataset
```

## Environment Variables

```
MONGODB_URI
JWT_SECRET
JWT_REFRESH_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
CLIENT_URL
```

## Value Score Computation (V1.0 — No ML)

Since no ML microservice exists in V1.0, the Value Score is a **transparent, deterministic formula** computed and stored server-side whenever a certification is added or updated:

```
Skill Relevance Score = (number of role-required skills the certification covers) / (total skills in that role's skill vector) × 10

Composite Value Score = (0.6 × Issuer Credibility Score) + (0.4 × Skill Relevance Score)
```

Both the Issuer Credibility Score (looked up from the curated Issuer Tier table) and the resulting Composite Value Score are stored on the certification document, not computed at read-time, so the ranked directory is a simple sort query with no runtime computation cost. This keeps the entire feature inside the MERN stack with no external ML call.

## Resume Parsing & Recommendation Architecture (V1.0 — Structured Retrieval, Not RAG)

This directly answers the open question of whether to use RAG or structured retrieval: **V1.0 uses structured, tag-based retrieval only.** Reasoning:

1. **Text extraction:** `pdf-parse`/`mammoth` extracts raw text from the uploaded resume — no ML involved, just format parsing.
2. **Skill extraction (rule-based, not NLP):** the raw resume text is checked against the controlled Skill Vector vocabulary (from the Roles & Skill Vectors dataset) using case-insensitive substring/keyword matching. This is deliberately simple and explainable: if "React" appears in the resume text, the skill "React" is marked present.
3. **Gap detection:** `missingSkills = targetRole.skillVector − extractedSkills` (a simple set difference).
4. **Certification recommendation:** a MongoDB query filters certifications where `roleTags` includes the target role AND `skillsCovered` intersects `missingSkills`, sorted descending by `compositeValueScore`, limited to the top N. This is a structured database query — no vector search, no embeddings.
5. **Project recommendation:** the same pattern against the Projects collection — filter by `roleTags` and `skillsDemonstrated` intersecting `missingSkills`, return top matches (optionally sorted by `difficulty` ascending so easier wins surface first).

**Why not RAG for V1.0:** RAG (embeddings + vector search + LLM-generated explanation) adds a Python ML service, a vector store, and LLM API cost/latency for a problem that structured tag-matching already solves deterministically, since both certifications and projects are already tagged against the same controlled skill vocabulary. **V2 upgrade path:** once a Python ML microservice is introduced, this same architecture can be upgraded to embedding-based similarity search (e.g., FAISS/Chroma) for looser, more semantic matching and LLM-generated explanations — but that is not required for V1.0 to work correctly.

## Constraints

- Must run entirely on free-tier hosting for the MVP/pilot stage.
- Must be fully responsive on mobile browsers (no native app in V1.0).
- Resume parsing limited to PDF and DOCX formats.
- Admin accounts are never self-service — created directly in the database or via a protected seed script, never through the public registration form.
- Razorpay integration runs in test mode for the pilot; no real payment processing is required for the academic submission/demo.

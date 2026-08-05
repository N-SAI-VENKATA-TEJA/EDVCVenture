# Document 05 — Backend Schema: Data Model & Auth Architecture
### CareerLens — Version 1.0 (MongoDB / MERN)

## Collections

### `admins`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `name` | String | |
| `email` | String | unique |
| `passwordHash` | String | bcrypt, never returned by any API response |
| `createdAt` | Date | |

### `users`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `name` | String | |
| `email` | String | unique |
| `passwordHash` | String | bcrypt |
| `targetRole` | String | one of the 5 seeded roles, optional at signup |
| `subscriptionStatus` | String | `free` \| `premium` |
| `subscriptionExpiry` | Date | null if `free` |
| `createdAt` | Date | |

### `roles`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `name` | String | e.g. "Frontend Engineer" |
| `description` | String | |
| `skillVector` | [String] | controlled vocabulary — the single source of truth referenced everywhere else |
| `toolsTech` | [String] | |
| Seeded from the "Roles & Skill Vectors" research sheet. |

### `issuerTiers`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `issuerName` | String | e.g. "Kaggle Learn" |
| `tier` | String | S / A / B / C |
| `credibilityScore` | Number | 0-10 |
| `justification` | String | |
| Seeded from the "Issuer Credibility" research sheet. |

### `certifications`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `title` | String | |
| `issuerName` | String | references `issuerTiers.issuerName` |
| `issuerCredibilityScore` | Number | copied from `issuerTiers` at seed/update time for fast sorting |
| `roleTags` | [String] | references `roles.name`, one certification may tag multiple roles |
| `skillsCovered` | [String] | subset of the relevant role's `skillVector` |
| `skillRelevanceScore` | Number | 0-10, computed per Section 12 of the TRD |
| `compositeValueScore` | Number | `0.6×issuerCredibilityScore + 0.4×skillRelevanceScore`, stored (not computed at read-time) |
| `durationText` | String | e.g. "~5 hours" |
| `url` | String | |
| `sourceNote` | String | where this entry was sourced from, for admin traceability |
| `syllabusSummary` | String | paraphrased, short |
| `createdAt`, `updatedAt` | Date | |
| Seeded from the "Free Certifications DB" research sheet; editable by admin thereafter. |

### `projects`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `title` | String | |
| `description` | String | |
| `roleTags` | [String] | references `roles.name` |
| `skillsDemonstrated` | [String] | subset of the relevant role's `skillVector` |
| `difficulty` | String | beginner \| intermediate \| advanced |
| `sourceReference` | String | which source PDF/page this project came from |
| `createdAt` | Date | |
| Seeded from the team's Projects PDF (parsed once into structured rows — see Implementation Plan, Phase 2). |

### `standardResumes`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `role` | String | references `roles.name`, one per role |
| `fileUrl` | String | Cloudinary URL of the benchmark resume file |
| `recommendedCertifications` | [ObjectId] | references `certifications._id` |
| `recommendedProjects` | [ObjectId] | references `projects._id` |
| `notes` | String | |
| `curatedBy` | String | admin name/id |
| `lastUpdated` | Date | |

### `digestItems`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `title` | String | |
| `type` | String | hackathon \| certification \| internship \| session \| deadline \| other |
| `description` | String | |
| `place` | String | physical or "Online" |
| `eventDateTime` | Date | when it happens |
| `deadline` | Date | last date to act |
| `link` | String | |
| `postedBy` | ObjectId | references `admins._id` |
| `createdAt`, `updatedAt` | Date | |

### `freeResources`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `title` | String | |
| `body` | String | static content, admin-managed |
| `category` | String | |
| `createdAt` | Date | |

### `exclusiveResources`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `title` | String | |
| `body` | String | subscription-gated content |
| `category` | String | |
| `createdAt` | Date | |

### `resumeUploads`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId | references `users._id` |
| `fileUrl` | String | Cloudinary URL |
| `targetRole` | String | |
| `extractedSkills` | [String] | result of rule-based keyword matching, see TRD |
| `uploadedAt` | Date | |

### `recommendations`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId | references `users._id` |
| `resumeUploadId` | ObjectId | references `resumeUploads._id` |
| `missingSkills` | [String] | |
| `recommendedCertificationIds` | [ObjectId] | references `certifications._id` |
| `recommendedProjectIds` | [ObjectId] | references `projects._id` |
| `generatedAt` | Date | |

### `subscriptions`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId | references `users._id` |
| `plan` | String | |
| `amount` | Number | |
| `razorpayOrderId` | String | |
| `razorpayPaymentId` | String | |
| `status` | String | created \| paid \| failed |
| `startDate`, `endDate` | Date | |

## Relationships

- `certifications.roleTags` → `roles.name` (many-to-many by tag)
- `certifications.issuerName` → `issuerTiers.issuerName` (many-to-one)
- `projects.roleTags` → `roles.name` (many-to-many by tag)
- `resumeUploads.userId` → `users._id` (many-to-one)
- `recommendations.userId` / `resumeUploadId` → `users._id` / `resumeUploads._id`
- `standardResumes.recommendedCertifications` / `recommendedProjects` → `certifications._id` / `projects._id`
- `digestItems.postedBy` → `admins._id`
- `subscriptions.userId` → `users._id`

## Indexes

- `certifications.roleTags` (multikey, for filtering by role)
- `certifications.compositeValueScore` (for descending sort/ranking)
- `projects.roleTags` and `projects.skillsDemonstrated` (multikey, for gap-based retrieval)
- `users.email`, `admins.email` (unique)
- `digestItems.eventDateTime` (for chronological listing)

## Auth Model & Access Rules

- **Two separate JWT contexts:** `userToken` (role: `user`) and `adminToken` (role: `admin`). Admin routes (`/api/admin/*`) reject any `userToken`, even a valid one — there is no shared "admin flag on user" model; admins are an entirely separate collection and login path.
- **Public-read, admin-write:** `certifications`, `roles`, `issuerTiers`, `projects`, `standardResumes`, `digestItems`, `freeResources` are readable by any logged-in user, writable only by admins.
- **Subscription-gated read:** `exclusiveResources` requires `user.subscriptionStatus === "premium"` and `subscriptionExpiry > now`, checked server-side on every request — never trust a client-side flag alone.
- **Owner-only:** `resumeUploads` and `recommendations` are readable/writable only by the `userId` that owns them (plus admin, for support purposes).

## File Storage

Cloudinary, organised as:
- `/resumes/{user_id}/{filename}` — user resume uploads, access-controlled by ownership check
- `/standard-resumes/{role}/{filename}` — admin-managed, public-read

## Sensitive Fields

- `passwordHash` (both `users` and `admins`) — bcrypt-hashed, excluded from every API response via schema-level `select: false`.
- `razorpayPaymentId` / `razorpayOrderId` — stored for reconciliation, never exposed to the frontend beyond a success/failure status.
- Uploaded resume files — access strictly limited to the owning user and admin roles, never publicly listable.

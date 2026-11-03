# API Contracts & Route Handlers Specification: GPCET Web Portal (Production Specification)

## 1. Architectural Standards & Design Principles

All GPCET APIs are engineered according to **production REST standards**, **OpenAPI 3.1 specifications**, and **RFC 9457 Problem Details for HTTP APIs**.

### Core Invariants
1. **Deterministic Response Payloads**: All success responses return a typed envelope with a `data` field, a boolean `success: true`, and optional `meta` for pagination.
2. **RFC 9457 Error Standards**: Every error response returns `application/problem+json` with standard fields (`type`, `title`, `status`, `detail`, `instance`) and machine-readable `code` and `errors` array.
3. **End-to-End Type Safety**: Query parameters and request bodies are strictly validated with **Zod**. Parsing failures yield a 422 Unprocessable Entity status with exact field path annotations.
4. **Resilient Rate Limiting**: Abuse-prone endpoints (such as admissions inquiries and document search) are protected using a sliding-window algorithm backed by `@upstash/ratelimit` / Vercel KV with IP hashing.
5. **Edge Cache Headers**: Public GET queries include explicit `Cache-Control` headers and cache tags enabling immediate programmatic revalidation via `revalidateTag()`.

---

## 2. Global Error Catalog & Response Envelopes

### Success Envelope
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 452,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

### RFC 9457 Standard Error Envelope
```json
{
  "type": "https://gpcet.ac.in/problems/validation-error",
  "title": "Unprocessable Entity",
  "status": 422,
  "code": "VALIDATION_FAILED",
  "detail": "Request parameters failed schema validation.",
  "instance": "/api/v1/faculty?department=unknown_dept",
  "errors": [
    {
      "field": "department",
      "message": "Invalid department code. Must be one of: cse, ai, ece, eee, me, civil, hs, mba."
    }
  ],
  "timestamp": "2026-11-02T10:00:00.000Z"
}
```

### Problem Type Catalog
| HTTP Status | Error Code | RFC Type URI | Description |
| :--- | :--- | :--- | :--- |
| **400** | `BAD_REQUEST` | `https://gpcet.ac.in/problems/bad-request` | Malformed JSON or unparseable query syntax. |
| **401** | `UNAUTHORIZED` | `https://gpcet.ac.in/problems/unauthorized` | Missing or invalid authentication token. |
| **403** | `FORBIDDEN` | `https://gpcet.ac.in/problems/forbidden` | Caller lacks the role required to access resource. |
| **404** | `NOT_FOUND` | `https://gpcet.ac.in/problems/not-found` | Requested resource does not exist. |
| **422** | `VALIDATION_FAILED` | `https://gpcet.ac.in/problems/validation-error` | Payload or query parameter failed Zod validation. |
| **429** | `RATE_LIMIT_EXCEEDED` | `https://gpcet.ac.in/problems/rate-limit-exceeded` | Client exceeded allotted requests per time window. |
| **500** | `INTERNAL_SERVER_ERROR` | `https://gpcet.ac.in/problems/internal-server-error` | Unhandled exception with correlation ID for Sentry. |

---

## 3. Public Route Handlers & Contracts

### 1. `GET /api/v1/health`
Liveness and readiness health check for monitoring, uptime tracking, and CI/CD smoke tests.

- **Rate Limit**: 120 req/min
- **Cache**: `no-store, no-cache`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "environment": "production",
    "database": {
      "connected": true,
      "latencyMs": 14
    },
    "offlineCache": {
      "facultyCount": 452,
      "documentCount": 5822
    },
    "timestamp": "2026-11-02T10:00:00.000Z"
  }
}
```

---

### 2. `GET /api/v1/faculty`
Retrieve verified academic faculty records across 8 departments with faceted filtering.

**Query Parameters (Validated via `FacultyQuerySchema`):**
| Parameter | Type | Required | Default | Description | Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `department` | `enum` | No | `all` | Department slug (`cse`, `ai`, `ece`, `eee`, `me`, `civil`, `hs`, `mba`) | `cse` |
| `cadre` | `enum` | No | `all` | `professor_hod`, `professor`, `associate_professor`, `assistant_professor` | `professor` |
| `q` | `string` | No | - | Substring / trigram search on faculty name & qualification (max 100 chars) | `Sreenivasulu` |
| `limit` | `integer`| No | `50` | Pagination size (min 1, max 100) | `20` |
| `offset` | `integer`| No | `0` | Pagination start index | `0` |

**Cache Headers:**
- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`
- `Vary: Accept-Encoding`
- Next.js Tag: `tags: ['faculty']`

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "e4b3c2a1-0001-4000-8000-000000000001",
      "sno": 1,
      "name": "Dr. K. Sreenivasulu",
      "slug": "dr-k-sreenivasulu",
      "department": "CSE",
      "departmentCode": "cse",
      "cadre": "professor_hod",
      "designation": "Professor & Head",
      "highestQualification": "Ph.D, M.Tech",
      "experienceYears": 18.5,
      "email": "hodcse@gpcet.ac.in",
      "photoUrl": "https://www.gpcet.ac.in/wp-content/uploads/2021/08/sreenivasulu.jpg",
      "profileRoute": "/departments/cse/faculty/dr-k-sreenivasulu",
      "isHod": true,
      "specializations": ["Cloud Computing", "Computer Networks", "Cyber Security"]
    }
  ],
  "meta": {
    "total": 72,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

### 3. `GET /api/v1/faculty/[slug]`
Retrieve full scholarly dossier for an individual faculty member.

**Path Parameters:**
- `slug`: kebab-case faculty slug (e.g. `dr-k-sreenivasulu`)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "e4b3c2a1-0001-4000-8000-000000000001",
    "name": "Dr. K. Sreenivasulu",
    "slug": "dr-k-sreenivasulu",
    "department": "CSE",
    "departmentCode": "cse",
    "designation": "Professor & Head",
    "highestQualification": "Ph.D, M.Tech",
    "experienceYears": 18.5,
    "email": "hodcse@gpcet.ac.in",
    "photoUrl": "https://www.gpcet.ac.in/wp-content/uploads/2021/08/sreenivasulu.jpg",
    "bio": "Dr. K. Sreenivasulu has over 18 years of teaching and research experience in Computer Science...",
    "degrees": [
      {
        "degree": "Ph.D",
        "field": "Computer Science & Engineering",
        "institution": "JNTUA, Anantapur",
        "year": 2018
      },
      {
        "degree": "M.Tech",
        "field": "Computer Science & Engineering",
        "institution": "VTU, Belgaum",
        "year": 2007
      }
    ],
    "publications": [
      {
        "title": "Energy-Efficient Resource Allocation in Cloud Data Centers",
        "journal": "IEEE Transactions on Cloud Computing",
        "year": 2023,
        "doi": "10.1109/TCC.2023.1234567"
      }
    ],
    "patents": [
      {
        "title": "IoT-Based Smart Energy Monitoring for Academic Laboratories",
        "patentNumber": "202241056789 A",
        "status": "Published",
        "year": 2022
      }
    ],
    "subjectsTaught": ["Distributed Systems", "Cloud Computing", "Computer Networks"]
  }
}
```

---

### 4. `GET /api/v1/documents`
Search and filter across the **5,822 indexed academic documents and syllabus files**.

**Query Parameters (Validated via `DocumentQuerySchema`):**
| Parameter | Type | Required | Default | Description | Example |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `q` | `string` | No | - | Full-text query on title and metadata (max 100 chars) | `data structures` |
| `category` | `enum` | No | `all` | `syllabus`, `calendar`, `timetable`, `regulation`, `naac`, `general` | `syllabus` |
| `department` | `string` | No | `all` | Department code (`cse`, `ece`, etc.) | `cse` |
| `regulation` | `string` | No | `all` | Academic regulation code (`R20`, `R19`, `R18`, `R15`) | `R20` |
| `limit` | `integer`| No | `25` | Results per page (min 1, max 100) | `25` |
| `offset` | `integer`| No | `0` | Results offset | `0` |

**Cache Headers:**
- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`
- Next.js Tag: `tags: ['documents']`

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "d1a2b3c4-0001-4000-8000-000000000001",
      "title": "B.Tech CSE R20 Regulation Course Structure & Detailed Syllabi",
      "slug": "btech-cse-r20-course-structure",
      "category": "syllabus",
      "departmentCode": "cse",
      "regulation": "R20",
      "academicYear": "2020-2024",
      "fileUrl": "https://www.gpcet.ac.in/wp-content/uploads/2021/09/CSE-R20-Syllabus.pdf",
      "fileSizeBytes": 2457600,
      "mimeType": "application/pdf"
    }
  ],
  "meta": {
    "total": 382,
    "limit": 25,
    "offset": 0,
    "hasMore": true
  }
}
```

---

### 5. `GET /api/v1/notices`
Retrieve active circulars, exam notifications, and marquee ticker alerts.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `tickerOnly` | `boolean` | No | `false` | Fetch only active ticker items for the homepage marquee |
| `category` | `enum` | No | `all` | Filter by `circular`, `examination`, `admissions`, `event` |
| `limit` | `integer` | No | `10` | Max items returned (max 50) |

**Cache Headers:**
- `Cache-Control: public, s-maxage=300, stale-while-revalidate=3600` (5-minute edge cache)
- Next.js Tag: `tags: ['notices']`

---

### 6. `POST /api/v1/inquiries`
Submit an admissions inquiry with anti-spam and cryptographic rate-limiting.

**Security Controls:**
- **Rate Limit**: 5 requests per 10-minute window per IP.
- **Honeypot Field**: Form includes invisible `botCheck` field (`z.string().max(0)`). If non-empty, automatically rejected or silently dropped to neutralize automated bots.
- **Payload Validation**: Zod schema with strict email regex and telephone normalization.

**Request Body (JSON):**
```json
{
  "studentName": "Rahul Sharma",
  "email": "rahul.sharma@gmail.com",
  "phone": "+919876543210",
  "desiredDepartment": "cse",
  "program": "B.Tech",
  "eamcetRank": 14250,
  "message": "Interested in B.Tech CSE Artificial Intelligence stream under convenor quota.",
  "botCheck": ""
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "inquiryId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "status": "received",
    "message": "Thank you for contacting GPCET Admissions. Our admissions counselor will contact you within 24 hours."
  }
}
```

**Failure Response (422 Unprocessable Entity - RFC 9457):**
```json
{
  "type": "https://gpcet.ac.in/problems/validation-error",
  "title": "Validation Failed",
  "status": 422,
  "code": "VALIDATION_FAILED",
  "detail": "Admissions inquiry form data contains invalid fields.",
  "instance": "/api/v1/inquiries",
  "errors": [
    {
      "field": "phone",
      "message": "Phone number must be at least 10 valid digits."
    },
    {
      "field": "eamcetRank",
      "message": "EAMCET rank must be a positive integer."
    }
  ],
  "timestamp": "2026-11-02T10:00:00.000Z"
}
```

---

## 4. Protected Administration Endpoints

### `POST /api/v1/admin/sync/notices`
Trigger a background durable synchronization job via Vercel Workflow to pull the latest circulars from WordPress REST without blocking the client.

- **Authentication**: Bearer token or Supabase Auth session with `admin` role in `app_metadata`.
- **Response (202 Accepted)**:
```json
{
  "success": true,
  "data": {
    "workflowRunId": "wf_run_9876543210",
    "status": "started",
    "message": "Durable synchronization workflow initiated."
  }
}
```

---

## 5. TypeScript Zod Validation Schemas (`src/lib/validations/`)

All API routes validate inputs using production-grade Zod schemas:

### A. Admissions Inquiry Schema (`src/lib/validations/inquiry.schema.js`)
```typescript
import { z } from "zod";
import { DepartmentCodeEnum } from "./faculty.schema.js";

export const InquirySubmissionSchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(150, "Name must not exceed 150 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address")
    .max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9\s-]{10,15}$/, "Please provide a valid 10-digit mobile number"),
  desiredDepartment: DepartmentCodeEnum,
  program: z.enum(["B.Tech", "M.Tech", "MBA"]).default("B.Tech"),
  eamcetRank: z
    .number()
    .int("Rank must be an integer")
    .positive("Rank must be greater than zero")
    .optional()
    .nullable(),
  message: z
    .string()
    .trim()
    .max(2000, "Message must not exceed 2000 characters")
    .optional(),
  botCheck: z.string().max(0, "Invalid submission detected").optional() // Honeypot
});
```

### B. Faculty Schemas (`src/lib/validations/faculty.schema.js`)
```typescript
import { z } from "zod";

export const DepartmentCodeEnum = z.enum([
  "cse", "ai", "ece", "eee", "me", "civil", "hs", "mba"
]);

export const FacultyCadreEnum = z.enum([
  "professor_hod", "professor", "associate_professor", 
  "assistant_professor", "adjunct_faculty", "technical_staff", "administrative"
]);

export const FacultyQuerySchema = z.object({
  department: DepartmentCodeEnum.or(z.literal("all")).default("all"),
  cadre: FacultyCadreEnum.or(z.literal("all")).default("all"),
  q: z.string().trim().max(100).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0)
});
```

### C. Document Schemas (`src/lib/validations/document.schema.js`)
```typescript
import { z } from "zod";
import { DepartmentCodeEnum } from "./faculty.schema.js";

export const DocumentCategoryEnum = z.enum([
  "syllabus", "general_pdf", "academic_calendar", "general_image", 
  "campus_photo", "faculty_photo", "logo_badge", "accreditation_doc", 
  "video", "other", "form_affidavit", "circular", "exam_timetable", 
  "lecture_presentation", "regulation", "governance", "placement"
]);

export const DocumentQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  category: DocumentCategoryEnum.or(z.literal("all")).default("all"),
  department: DepartmentCodeEnum.or(z.literal("all")).default("all"),
  regulation: z.string().trim().max(20).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  offset: z.coerce.number().int().min(0).default(0)
});
```

### D. Notice Schemas (`src/lib/validations/notice.schema.js`)
```typescript
import { z } from "zod";
import { DepartmentCodeEnum } from "./faculty.schema.js";

export const NoticeCategoryEnum = z.enum([
  "circular", "examination", "admissions", "recruitment", 
  "academic_calendar", "event", "tender", "statutory"
]);

export const NoticeQuerySchema = z.object({
  tickerOnly: z.enum(["true", "false"]).transform(v => v === "true").or(z.boolean()).default(false),
  category: NoticeCategoryEnum.or(z.literal("all")).default("all"),
  department: DepartmentCodeEnum.or(z.literal("all")).default("all"),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  offset: z.coerce.number().int().min(0).default(0)
});
```

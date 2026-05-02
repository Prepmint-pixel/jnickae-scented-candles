# Score Sculptor™ Workspace

## Overview

pnpm workspace monorepo using TypeScript. Full-stack SaaS application for AI-powered credit monitoring and education.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui
- **Routing**: Wouter
- **Data fetching**: TanStack Query + Orval generated hooks
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Auth**: JWT (bcryptjs + jsonwebtoken)

## Application: Score Sculptor™

A premium AI-powered credit monitoring and education SaaS platform.

### Key Pages
- `/` — Public landing page with hero, features, AI preview, pricing
- `/login` — Login page
- `/register` — Registration
- `/onboarding` — Welcome wizard
- `/dashboard` — Main dashboard with credit score, disputes, utilization
- `/reports` — Credit report analysis
- `/disputes` — Dispute management
- `/ai` — Sculpt AI assistant
- `/education` — Credit Education Hub
- `/documents` — Document center
- `/notifications` — Notification center
- `/settings` — Profile settings
- `/admin` — Admin dashboard

### Demo Credentials
- User: `demo@scoresculptor.com` / `password123`
- Admin: `admin@scoresculptor.com` / `password123`

### Legal Disclaimer
"Educational Use Only. Score Sculptor does not provide legal advice."
(Displayed throughout AI, dispute, and education sections)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Database Schema

Tables: `users`, `disputes`, `tradelines`, `credit_reports`, `notifications`, `documents`, `ai_conversations`, `ai_messages`, `education_modules`, `user_education_progress`, `score_history`

## API Server Routes

All routes under `/api`:
- Auth: `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/me`
- Dashboard: `/dashboard/summary`, `/dashboard/activity`, `/dashboard/score-history`
- Disputes: `/disputes`, `/disputes/stats`, `/disputes/:id`
- Tradelines: `/tradelines`, `/tradelines/summary`, `/tradelines/:id`
- Credit Reports: `/credit-reports`, `/credit-reports/:id`
- Notifications: `/notifications`, `/notifications/read-all`, `/notifications/:id/read`
- Documents: `/documents`, `/documents/:id`
- AI: `/ai/conversations`, `/ai/conversations/:id/messages`
- Education: `/education/modules`, `/education/modules/:id`, `/education/progress`
- Admin: `/admin/users`, `/admin/stats`

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

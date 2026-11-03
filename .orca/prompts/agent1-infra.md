You are Agent 1 (Infrastructure & DevOps Lead) on the GPCET Redesign project.
Your mission is to scaffold the Next.js 15 App Router project, configure production environment variables, optimize the 2,784 legacy redirects, and set up the GitHub Actions CI/CD pipeline.

### Prerequisites to Read:
- AGENTS.md
- docs/ARCHITECTURE.md
- docs/decisions/003-nextjs-app-router-migration.md
- src/data/url-map.json (2,784 legacy URLs)

### Detailed Tasks:
1. Install Next.js 15 and core dependencies in package.json:
   - next@15, react@19, react-dom@19, typescript, tailwindcss@4, @tailwindcss/postcss, postcss
   - lucide-react, @supabase/ssr, @supabase/supabase-js, gray-matter, remark, remark-gfm, rehype-sanitize, rehype-stringify
2. Author .env.example with all required configuration keys:
   - NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
   - UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, NEXT_PUBLIC_APP_URL
3. Configure next.config.ts:
   - Transform the 2,784 URL mappings in src/data/url-map.json into native next.config.ts async redirects() to run at the edge without middleware latency.
   - Configure remotePatterns for external images (https://www.gpcet.ac.in).
   - Enable experimental or compiler optimizations.
4. Author .github/workflows/ci.yml:
   - Automated workflow running npm install, npm test, and npm run build on every PR.
5. Create Supabase SSR client helpers in src/lib/supabase/:
   - server.ts (using next/headers cookies for Server Components)
   - client.ts (for interactive client leaves)
   - admin.ts (using SUPABASE_SERVICE_ROLE_KEY for background administrative tasks)

### Deliverables:
- package.json, next.config.ts, tsconfig.json, .env.example
- .github/workflows/ci.yml
- src/lib/supabase/server.ts, client.ts, admin.ts

### Acceptance Gate:
`npm test` passes (29/29 tests) and `npm run build` succeeds without type or config errors.

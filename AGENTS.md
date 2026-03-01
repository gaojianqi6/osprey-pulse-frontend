Universal app: solito, Next.js, Expo, NativeWind v4. Code lives in `packages/app`.

---
description: Apollo rules
alwaysApply: true
---

# Apollo
- Use Apollo for all data fetching. No `fetch()`.
- Apollo supports server requests for SEO.

---
description: NativeWind rules
alwaysApply: true
globs: ["**/*.tsx", "**/*.ts"]
---

# NativeWind
- Use `className` with Tailwind utilities only. No inline `style={{}}` except for dynamic values.
- Define colors/variants in tailwind.config.js. Prefer semantic names (bg-dark-bg, border-accent-low).
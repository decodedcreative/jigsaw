---
"@jigsaw-ds/design-system": patch
---

Fix RSC client boundary: mark Text and theme/className hooks with "use client", and emit the directive on the published package entry so useContext is legal under Next.js App Router.

# Testing Overview

This project uses **Jest** for unit/integration tests and **Playwright** for end-to-end (E2E) tests.

- **Unit tests** — check individual functions, services, or components in isolation.
- **Integration tests** — verify how multiple parts of the application work together.
- **E2E tests** — simulate real user interactions in a browser.

---

## Test file naming convention

- Unit: `*.unit.spec.ts`
- Integration: `*.int.spec.ts`
- Combined (unit + integration): `*.unit.spec.ts` and `*.int.spec.ts`
- E2E: defined by Playwright config (usually inside `e2e/`)

---

## Running unit tests

To run all unit tests:

```bash
npm run test:unit
```

To run all integration tests:

```bash
npm run test:int
```

To run all e2e(playwright) tests:

```bash
npm run test:e2e:ui
```

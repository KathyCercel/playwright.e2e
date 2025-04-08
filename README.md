# 🎭 Playwright Test Automation for Hudl UI

This project contains automated UI tests using [Playwright](https://playwright.dev/) to validate core navigation and visibility functionality across Hudl’s dashboard and home pages.

---

## 📁 Project Structure

```
.
├── pages/
│   ├── homePage.ts         # Page object for Hudl Home page
│   └── navbar.ts           # Page object for Hudl global navigation
│
├── tests/
│   ├── auth/
│   │   └── setupAuth.ts    # Handles login and saves storage state
│   ├── home.spec.ts        # Tests for home page UI sections
│   └── navbar.spec.ts      # Tests for navbar navigation and dropdowns
│
├── storageState.json       # Saved login session (auto-generated)
├── playwright.config.ts    # Playwright config file
└── README.md
```

---

## ✅ Prerequisites

- Node.js ≥ 16
- Installed Playwright dependencies

Run this to install everything:

```bash
npm install
npx playwright install
```

---

## 🔐 Setup Authentication

### Create a `.env` file in the root directory with the following:
HUDL_EMAIL=your-email@example.com
HUDL_PASSWORD=your-secure-password


Before running any tests, ensure the authenticated session is saved:

```bash
npm run auth:setup
```

This will generate `storageState.json` which stores the login session for reuse.

---

## 🚀 Running Tests

```bash
npm run test
```

This runs the following:

1. Auth setup: `ts-node tests/auth/setupAuth.ts`
2. Executes all Playwright specs
3. Cleans up `storageState.json` after execution

---

## 🧪 Test Coverage

### `home.spec.ts`
- ✅ Verify visibility of main header
- ✅ Teams section
- ✅ Quick links
- ✅ Recent activity
- ✅ Search input
- ✅ Create Team button

### `navbar.spec.ts`
- ✅ Home button navigation
- ✅ Watch Now redirects to fan.hudl.com
- ✅ Upload button navigation
- ✅ Calendar navigation to `app.hudl.com/calendar`
- ✅ Messages navigation to `app.hudl.com/messaging`
- ✅ Profile dropdown reveals logout option
- ✅ Fallback if Upload page fails offline

---

## 📄 Notes

- **Selectors:** Page object files use role-based or attribute-based locators for maintainability.
- **Session Reuse:** Tests depend on `storageState.json` for logged-in flows.
- **Retries:** Not enabled by default – add `retries` in `playwright.config.ts` if needed.
- **Test Artifacts:** Failed tests generate screenshots, videos, and traces in `test-results/`.

---

## 📸 Debugging Failures

To explore failed test traces:

```bash
npm test:report
```

---

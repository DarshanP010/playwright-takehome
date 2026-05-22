# Playwright Take-Home Assessment

Automated UI tests for the [TodoMVC demo app](https://demo.playwright.dev/todomvc) using Playwright and TypeScript.

---

## Requirements

- **Node.js** v18 LTS or later (tested on v20.x)
- npm (bundled with Node.js)

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Install Playwright browsers
```bash
npx playwright install
```

### 3. Install Allure command-line (for reports)
```bash
npm install --save-dev allure-playwright allure-commandline
```

---

## Running the Tests

### Run the full test suite
```bash
npx playwright test
```

### Run only the todo spec
```bash
npx playwright test tests/todo.spec.ts
```

### Run in headed mode (browser visible)
```bash
npx playwright test tests/todo.spec.ts --headed
```

---

## Viewing Reports

### Playwright HTML report
```bash
npx playwright show-report
```

### Allure report
```bash
npx allure generate allure-results --clean
npx allure open
```

---

## Project Structure

```
playwright-takehome/
├── allure-report/              # Generated Allure HTML report
├── allure-results/             # Raw Allure result files
├── node_modules/               # Installed dependencies
├── playwright-report/          # Playwright HTML report
├── test-results/               # Test artifacts (screenshots, videos, traces)
├── tests/
│   └── todo.spec.ts            # TodoMVC test cases
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts        # Playwright configuration
├── README.md
└── tsconfig.json               # TypeScript configuration
```

---

## Test Coverage

| # | Test | Description |
|---|------|-------------|
| 1 | Adds a single todo | Adds "Learn Playwright" and verifies it appears |
| 2 | Adds two todos | Adds both items and verifies count = 2 |
| 3 | Marks todo completed + filters | Completes "Learn Playwright", checks Completed filter (1 item) and Active filter (1 item) |
| 4 | *(Bonus)* Clears completed | Clears completed items and verifies only active item remains |

Tests run across **Chromium, Firefox, and WebKit** by default.

---

## Design Decisions

- **`getByTestId` / `getByRole` / `getByPlaceholder`** – Playwright's semantic locators are preferred over CSS selectors or XPath for resilience against DOM changes.
- **`filter({ hasText })`** – Used to identify a specific todo row by its label without relying on positional index, making tests order-independent.
- **`beforeEach` navigation** – Each test starts with a clean page load, ensuring full isolation.
- **Helper function `addTodo`** – Extracted to avoid repetition and keep test bodies focused on assertions.
- **Bonus test** – The "Clear completed" scenario is included as a natural extension of the completion flow.

---

## AI Usage

This project was developed with the assistance of **Claude (Anthropic)** as a coding assistant.

**What it was used for:**
- Generating the initial test file structure and boilerplate
- Suggesting idiomatic Playwright locators (`getByTestId`, `getByRole`, `filter`)
- Drafting the `playwright.config.ts` and `package.json`
- Producing the first draft of this README

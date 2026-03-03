# Playwright POM Framework (TypeScript)

A basic example of a Playwright automation project built with **TypeScript** and the **Page Object Model (POM)** design pattern.  
The framework demonstrates how to organize Playwright tests using a maintainable structure that separates **page interactions** from **test logic**.

Tests run against the demo application:

https://cloudberrystore.services/

---

# Why this repo exists

This repository exists to demonstrate a simple but clean **Playwright POM automation structure**.  

The goal is to show how Playwright tests can be organized in a maintainable way where:

- Page objects contain UI locators and reusable actions
- Test files focus on validating behavior and flows
- Test data can be externalized
- Configuration is centralized

This is intended as a **portfolio example of Playwright automation design**, not a production test suite.

---

# Tech Stack

- Playwright Test
- TypeScript
- Node.js
- Page Object Model (POM)

---

# Project Structure

```
playwright-pom-framework-typescript
│
├── pages/
│ ├── HomePage.ts
│ ├── LoginPage.ts
│ ├── CheckoutPage.ts
│ ├── CartPage.ts
│ └── AccountPage.ts
│
├── tests/
│ ├── TC01_LaunchApplication.spec.ts
│ ├── TC02_Login.spec.ts
│ ├── TC03_AddToCart.spec.ts
│ ├── TC04_CompletePurchase.spec.ts
│ ├── TC05_AddToWishList.spec.ts
│ ├── TC06_AddAffiliate.spec.ts
│ │
│ └── test-data/
│ └── loginData.json
│
├── playwright.config.ts
├── package.json
└── README.md
```

### pages/

Contains the **Page Object Model classes**.

Each page object encapsulates:

- Element locators
- Page actions
- Navigation logic
- Reusable UI behavior

This keeps selectors centralized and prevents duplication across tests.

### tests/

Contains the **Playwright test specifications**.

Each test file validates a specific application workflow.

Examples:

- Launching the application
- Logging into the site
- Adding items to cart
- Completing a purchase
- Managing wishlist
- Affiliate features

### tests/test-data/

Optional externalized test data such as credentials or user inputs.

---

# Playwright Configuration

Configuration is defined in:


playwright.config.ts


Key settings include:

- Test directory: `./tests`
- HTML reporter enabled
- Browser support:
  - Chromium
  - Firefox
  - WebKit
- Screenshots captured on failure
- Headless execution controlled via environment variable

---

# Installation

### Prerequisites

- Node.js
- npm

### Install dependencies


npm install


### Install Playwright browsers


npx playwright install


---

# Running Tests

### Run tests (headed)


npm test


or


npm run tst


---

### Run tests headless


npm run test:headless


or


npm run tst:headless


---

# Viewing Test Reports

Playwright generates an HTML report.

To open the report:


npx playwright show-report


---

# Example POM Pattern

Typical usage in a test:


const homePage = new HomePage(page);
await homePage.navigate();
await homePage.login(username, password);


In this structure:

- **Page classes** handle UI interaction
- **Tests** validate application behavior

This separation improves:

- Maintainability
- Readability
- Reusability

---

# Notes

This project intentionally keeps the framework **lightweight and easy to understand**.

The goal is to demonstrate:

- Clean Playwright project organization
- Page Object Model structure
- Example end-to-end test flows

It is meant as a **demonstration of automation structure and Playwright usage**, rather than a full enterprise automation framework.
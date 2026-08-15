# QA Automation Assessment

Mid-Level QA Automation Engineer Candidate Exercise

**Target Applications:**
- UI: [SauceDemo](https://www.saucedemo.com/)
- API: [Restful API](https://api.restful-api.dev/)

## Project Structure

```
qa-automation-assessment/
├── playwright/
│   ├── pages/          # Page Object Models
│   ├── tests/          # Test files
│   ├── utils/          # Utility functions
│   └── fixtures/       # Playwright fixtures
├── postman/            # Postman collections & environments
├── config/             # Configuration files
├── results/            # Test reports and screenshots
├── screenshots/        # Failure screenshots
└── README.md          # This file
```

## Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Postman** (for creating/editing collections, optional)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/qa-automation-assessment.git
cd qa-automation-assessment
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- `@playwright/test` - Playwright testing framework
- `newman` - Postman collection CLI runner
- `newman-reporter-html` - HTML reporting for Newman
- `dotenv` - Environment variable management

### 3. Install Browsers (Playwright)

```bash
npm run install:browsers
```

This downloads Chromium, Firefox, and WebKit browsers for testing.

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your test credentials (if needed). For SauceDemo, credentials are publicly available on the login page.

## Running Tests

### Playwright UI Tests

Run all tests in headless mode:
```bash
npm test
```

Run with UI mode (interactive):
```bash
npm run test:ui
```

Run in headed mode (visible browser):
```bash
npm run test:headed
```

Run in debug mode:
```bash
npm run test:debug
```

Run tests for specific browser:
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Newman API Tests

Run Postman collection:
```bash
npm run newman
```

Run with verbose output:
```bash
npm run newman:debug
```

### Run All Tests

```bash
npm run test:all
```

## Test Reports

### Playwright HTML Report

```bash
npm run report
```

This opens the Playwright HTML report in your browser, showing:
- Test results and status
- Screenshots of failures
- Video recordings (if enabled)
- Execution timeline

Reports are generated in `./results/playwright/`

### Newman Report

Newman generates an HTML report after running API tests. Find it at:
```
./results/newman-report.html
```

## Test Scenarios

### UI Tests (Playwright)

1. **Login** - Successful login with standard user
2. **Failed Login** - Locked-out user error handling
3. **Add to Cart** - Add two products to cart
4. **Remove from Cart** - Remove one product and verify
5. **Checkout** - Complete checkout flow and verify confirmation
6. **Sorting** - Sort products by price and verify results

### API Tests (Postman)

1. **POST** - Create a new object
2. **GET** - Retrieve the created object
3. **PUT** - Update object property
4. **DELETE** - Delete the object
5. **GET (Deleted)** - Verify deleted object returns expected status
6. **Negative Test** - Invalid payload or missing field

## Page Object Model

Tests are organized using the **Page Object Model (POM)** pattern:

- Each page of the application has a corresponding `Page` class
- Page classes contain:
  - **Locators** - CSS selectors and XPath expressions
  - **Actions** - Methods that interact with the page (click, fill, etc.)
  - **Assertions** - Verification methods

Example:
```javascript
// pages/LoginPage.js
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

## Configuration

### Playwright Configuration

Edit `playwright.config.js` to customize:
- Browser settings
- Timeouts
- Reporting options
- Test directory

### Test Data & URLs

Edit `config/config.js` to manage:
- Application URLs
- User credentials
- Product test data
- Timeouts

## CI/CD Integration

### GitHub Actions

Add `.github/workflows/tests.yml` to run tests automatically:
- On push to main branch
- On pull requests
- Scheduled runs

### Local CI/CD Simulation

```bash
npm run test:all  # Runs both UI and API tests
```

## Troubleshooting

### Tests fail to run
- Ensure Node.js 16+ is installed: `node --version`
- Install browsers: `npm run install:browsers`
- Clear node_modules: `rm -rf node_modules && npm install`

### Browser not found error
```bash
npm run install:browsers
```

### Postman collection import fails
- Ensure the JSON file is valid
- Check file path in package.json script
- Verify environment variables are set

### Screenshots/videos not generated
- Enable in `playwright.config.js` under `use` options
- Check that `./screenshots/` and `./results/` folders exist

## Best Practices Used

- ✅ **Page Object Model** - Separates page structure from test logic
- ✅ **No Hardcoded Waits** - Uses Playwright's built-in waiting mechanisms
- ✅ **Configuration Externalization** - URLs and credentials in `config/` and `.env`
- ✅ **DRY Principle** - Reusable fixtures and utility functions
- ✅ **Clear Structure** - Organized folders for scalability
- ✅ **Comprehensive Reporting** - HTML and JSON reports for analysis

## Tools Used

- **Playwright** - Modern browser automation for UI testing
- **Postman** - API testing and collection management
- **Newman** - CLI runner for Postman collections
- **Node.js** - JavaScript runtime

## References

- [Playwright Documentation](https://playwright.dev)
- [Postman Documentation](https://www.postman.com/api-documentation-tool/)
- [Newman CLI Documentation](https://github.com/postmanlabs/newman)
- [SauceDemo Application](https://www.saucedemo.com/)
- [Restful API](https://api.restful-api.dev/)

## Author

[Your Name] - QA Automation Engineer

## License

MIT License - See LICENSE file for details

# Selenium Testing Playground 🧪

This repository is a **testing playground** for brushing up on **Selenium WebDriver** skills using **JavaScript**, **Jest**, and **ChromeDriver**.  
It provides a basic setup to write and execute automated functional tests for web applications.

---

## 🚀 Features

✅ Automated functional (UI) tests with Selenium WebDriver  
✅ Configured with Jest for running & reporting tests  
✅ Uses ChromeDriver to control Google Chrome browser  
✅ Example test script demonstrating Arrange-Act-Assert pattern  
✅ Ready to extend with additional tests & workflows

---

## 📁 Project Setup

### 1️⃣ Install dependencies

Make sure you have **Node.js (>=18)** and **npm** installed. Then:

```bash
npm install
```

This installs:

selenium-webdriver

jest

chromedriver

## 🧪 Run Tests

```bash
npm test
```

OR

```bash
npx jest
```

Jest will discover and run all \*.test.js files under the **tests**/ folder.

## 📝 Example Test

The included test (keyboardAndMouseInput.test.js) demonstrates:

Navigating to a sample web page

Finding input fields by id

Entering text & clicking buttons

Asserting expected outcomes

## 🛠️ Notes

Ensure your installed Chrome version matches the installed chromedriver version. You can check Chrome at chrome://version and adjust chromedriver in package.json if needed.

Chrome binary path should be in your system PATH.

You can enable headless mode in tests if running in CI/CD or without a display.

## 📚 Concepts Practiced

✅ Functional UI testing with automated scripts
✅ Black-box testing principles
✅ Jest test runner & assertions
✅ Arrange-Act-Assert (AAA) pattern

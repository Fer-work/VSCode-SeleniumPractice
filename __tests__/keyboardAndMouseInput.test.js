// __tests__/weatherApp.test.js

// We need a few more things from selenium-webdriver for robust testing
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

describe("Weather Dashboard End-to-End Test", () => {
  let driver;

  // The beforeAll block sets up the WebDriver before any tests run.
  // It's the equivalent of opening your browser window.
  beforeAll(async () => {
    const serviceBuilder = new chrome.ServiceBuilder(chromedriver.path);
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeService(serviceBuilder)
      .build();
    // Set a default timeout for all findElement operations
    await driver.manage().setTimeouts({ implicit: 10000 }); // 10 seconds
  }, 30000); // 30-second timeout for setup

  // The afterAll block cleans up after all tests are finished.
  // It's crucial to quit the driver to close the browser and end the session.
  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  // This is our main test case.
  test("should search for a city and display the current weather", async () => {
    // --- Step 1: Navigate to the Application ---
    // Replace this with the actual URL once you deploy your app.
    // For local testing, you can often use the URL from VS Code's Live Server.
    const appUrl = "http://127.0.0.1:5500/client/index.html"; // Example local URL
    await driver.get(appUrl);

    // --- Step 2: Interact with the Form ---
    // Find the input field for the city search using its ID.
    const cityInput = await driver.findElement(By.id("inputCity"));
    // Type the name of a city into the input field.
    await cityInput.sendKeys("London");

    // Find the search button by its ID.
    const searchButton = await driver.findElement(By.id("searchBtn"));
    // Click the button to initiate the search.
    await searchButton.click();

    // --- Step 3: Wait for Results and Assert ---
    // This is the most critical part of testing a web app with API calls.
    // We can't check for results immediately because the fetch() call takes time.
    // We must explicitly wait for an element to be visible that only appears *after* the data has loaded.
    // The city name in the main weather card is a perfect candidate.

    // We define the element we are waiting for.
    const cityNameElement = await driver.wait(
      until.elementLocated(By.id("cityName")),
      15000 // Max wait time in milliseconds (15 seconds)
    );

    // We also wait for it to be visible on the page.
    await driver.wait(until.elementIsVisible(cityNameElement), 15000);

    // --- Step 4: Verify the Results ---
    // Now that we know the element is present and visible, we can get its text.
    const cityNameText = await cityNameElement.getText();

    // This is our assertion. We expect the text of the element to include "London".
    // We use .toContain() instead of .toBe() because the text might be "London:",
    // so this is more flexible.
    expect(cityNameText).toContain("London");

    // You could add more assertions here to be even more thorough.
    // For example, check that the 5-day forecast cards have been created.
    const forecastCards = await driver.findElements(
      By.css("#cardContainer .card")
    );
    expect(forecastCards.length).toBeGreaterThan(0);
  }, 30000); // 30-second timeout for this specific test
});

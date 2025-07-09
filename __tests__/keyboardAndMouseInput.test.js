// __tests__/keyboardAndMouseInput.test.js
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

describe("Keyboard and Mouse Input Test", () => {
  let driver;

  beforeAll(async () => {
    const serviceBuilder = new chrome.ServiceBuilder(chromedriver.path);

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeService(serviceBuilder)
      .setChromeOptions(new chrome.Options())
      .build();
  }, 30000);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test("should enter name and click button", async () => {
    await driver.get("https://formy-project.herokuapp.com/keypress");

    const nameField = await driver.findElement(By.id("name"));
    await nameField.click();
    await nameField.sendKeys("Fernando Sanchez");

    const button = await driver.findElement(By.id("button"));
    await button.click();

    // Optional: Add an assertion to check that the next page loaded
    const title = await driver.getTitle();
    expect(title).toBeDefined();
  }, 30000);
});

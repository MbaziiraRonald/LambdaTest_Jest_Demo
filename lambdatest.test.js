const { Builder, By, Key, until } = require("selenium-webdriver");

describe("LambdaTest E-Commerce Playground", () => {
 let driver;

 beforeAll(async () => {
   const capabilities = {
     browserName: "Chrome",
     version: "latest",
     platform: "Windows 10",
     build: "Jest Debugging Demo",
     name: "Search functionality and Add to cart presence Test",
     video: true,
     console: true,
     network: true,
   };

   driver = await new Builder()
     .usingServer(
       `https://${process.env.LT_USERNAME}:${process.env.LT_ACCESS_KEY}@hub.lambdatest.com/wd/hub`
     )
     .withCapabilities(capabilities)
     .build();
 }, 120000);

 test("Search and Add to Cart Test", async () => {
   try {
     await driver.get("https://ecommerce-playground.lambdatest.io/");

     const searchBar = await driver.findElement(
       By.xpath("//input[@placeholder='Search For Products']")
     );
     await searchBar.sendKeys("MacBook Air", Key.RETURN);

     
     // Wait for the search results to load
     await driver.wait(
       until.elementLocated(By.id("mz-product-grid-image-61-212469")),
       10000
     );


     // Click on the our preferred product
     const productImage = await driver.findElement(
       By.id("mz-product-grid-image-61-212469")
     );
     await productImage.click();


     await driver.wait(
       until.elementLocated(By.className("button-cart")),
       10000
     );
     const addToCartButton = await driver.findElement(
       By.className("button-cart")
     );

     expect(await addToCartButton.isDisplayed()).toBeTruthy();
   } finally {
     await driver.quit();
   }
 }, 120000);
});

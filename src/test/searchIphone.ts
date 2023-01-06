// import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver'

import { Builder, By, Key, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import chromeDriver from "chromedriver";
// import * as chrome from 'selenium-webdriver/chrome'

const service = new chrome.ServiceBuilder('/usr/bin/chromedriver');

async function SearchIphone() {
  // this.timeout(30000)
  const driver:WebDriver = await new Builder().forBrowser("chrome").setChromeService(service).build();
    // Test name: search iphone
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:5173/")
    // 2 | setWindowSize | 2550x1384 | 
    await driver.manage().window().setRect({ width: 2550, height: 1384 })
    // 3 | click | id=searchWord | 
    await driver.findElement(By.id("searchWord")).click()
    // 4 | type | id=searchWord | iphone
    await driver.findElement(By.id("searchWord")).sendKeys("iphone")
    // 5 | type | id=searchWord | iphone
    await driver.findElement(By.id("searchWord")).sendKeys("iphone")
    // 6 | sendKeys | id=searchWord | ${KEY_ENTER}
    await driver.findElement(By.id("searchWord")).sendKeys(Key.ENTER)
    // 7 | close |  | 
    await driver.close()
  
}
SearchIphone()


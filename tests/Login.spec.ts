import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from '../pages/MyAccountPage';

let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    config = new TestConfig();
    await page.goto(config.appUrl);
});

test('Valid user Login @regression @master', async () => {
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    await expect(loginPage.getpageHeading()).toContainText("Qafox.com");

    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();
    const isLoggedIn = await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIn).toBeTruthy();
});

test.afterEach(async ({ page }) => {
    await page.close(); // Close browser tab (good practice in local/dev run)
});
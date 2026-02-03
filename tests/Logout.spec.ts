import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let logoutPage: LogoutPage;
let myAccountPage: MyAccountPage;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    myAccountPage = new MyAccountPage(page);
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);

});

test('Verify the Logout functionality @master @regression', async () => {
   await homePage.clickMyAccount();
   await homePage.clickLogin();
   await loginPage.setEmail(config.email);
   await loginPage.setPassword(config.password);
   await loginPage.clickLogin();
   expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
   logoutPage = await myAccountPage.clickLogout();
   expect(logoutPage.isContinueButtonVisible()).toBeTruthy();
   homePage = await logoutPage.clickContinue();
   expect(await homePage.isHomePageExists()).toBeTruthy();

});

test.afterEach(async({page})=>{
    await page.close();

});
/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TestConfig } from '../test.config';
import { RandomDataUtil } from '../utils/randomDataGenerator';

let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
});

test('User Registration with valid data @sanity @master', async () => {

    if (await homePage.isHomePageExists()) {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        await expect(registrationPage.getRegistrationPageHeading()).toHaveText("Register Account");
    }
    // await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    // await registrationPage.setLastName(RandomDataUtil.getLastName());
    // await registrationPage.setEmail(RandomDataUtil.getEmail());
    // await registrationPage.setTelephone(RandomDataUtil.getTelephone());
    // const password: string = RandomDataUtil.getPassword();
    // await registrationPage.setPassword(password);
    // await registrationPage.setConfirmPassword(password);
    // await registrationPage.setPrivatePolicy();
    // await registrationPage.clickContinue();
    // const confirmationMessageText = await registrationPage.getConfirmationMsg();
    // expect(confirmationMessageText).toBe("Your Account Has Been Created!");
    const password: string = RandomDataUtil.getPassword();
    const userData = {
        firstName: RandomDataUtil.getFirstName(),
        lastName: RandomDataUtil.getLastName(),
        email: RandomDataUtil.getEmail(),
        telephone: RandomDataUtil.getTelephone(),
        password: password
    };
    await registrationPage.completeRegistration(userData);

});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});
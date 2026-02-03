import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';
import { DataProvider } from '../utils/dataProvider';

let jsonPath = "testdata/logindata.json";
const jsonData = DataProvider.getTestDataFromJson(jsonPath);

for(let data of jsonData){

    test(`Data driven login test using json with: ${data.testName} @datadriven`, async({page})=>{
        const config = new TestConfig();
        await page.goto(config.appUrl);
        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        const loginPage = new LoginPage(page);
        await loginPage.setEmail(data.email);
        await loginPage.setPassword(data.password);
        await loginPage.clickLogin();
        const myAccountPage = new MyAccountPage(page);
        const isLoggedIn = await myAccountPage.isMyAccountPageExists();
        if(data.expected.toLowerCase() === "success"){
            expect(isLoggedIn).toBeTruthy();
        }
        else{
          const message =  loginPage.getErrorMessage();
          expect(message).toHaveText("Warning: No match for E-Mail Address and/or Password.");
        }

    });

}

let csvPath = "testdata/logindata.csv";
const csvData = DataProvider.getTestDataFromCsv(csvPath);

for(let data of csvData){

    test(`Data driven login test using csv with: ${data.testName} @datadriven`, async({page})=>{
        const config = new TestConfig();
        await page.goto(config.appUrl);
        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        const loginPage = new LoginPage(page);
        await loginPage.setEmail(data.email);
        await loginPage.setPassword(data.password);
        await loginPage.clickLogin();
        const myAccountPage = new MyAccountPage(page);
        const isLoggedIn = await myAccountPage.isMyAccountPageExists();
        if(data.expected.toLowerCase() === "success"){
            expect(isLoggedIn).toBeTruthy();
        }
        else{
          const message =  loginPage.getErrorMessage();
          expect(message).toHaveText("Warning: No match for E-Mail Address and/or Password.");
        }

    });

}
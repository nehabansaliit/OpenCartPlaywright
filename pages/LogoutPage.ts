import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage{

    private readonly page: Page;

    //Locators

    private readonly btnContinue: Locator;

    //Constructor

    constructor(page:Page){
        this.page = page;
        this.btnContinue = this.page.getByRole("link", {name: 'Continue'});
    }

    //Action Methods

    async clickContinue(): Promise<HomePage>{
        await this.btnContinue.waitFor({state: "visible"});
        await this.btnContinue.click();
        return new HomePage(this.page);
    }

    async isContinueButtonVisible(): Promise<Boolean>{
            return await this.btnContinue.isVisible();

    }
}
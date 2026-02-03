import {Page, Locator} from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage{
    private readonly page: Page;
    private readonly lnkLogout: Locator;
    private readonly pageHeading: Locator;

   constructor(page:Page){
        this.page = page;
        this.lnkLogout = this.page.getByRole("link",{name: "Logout"});
        this.pageHeading = this.page.locator('#content').getByRole('heading', { name: 'My Account' })
   }

   async isMyAccountPageExists(): Promise<Boolean>{
        return await this.pageHeading.isVisible();

   }

   async clickLogout(): Promise<LogoutPage>{
        await this.lnkLogout.waitFor({state: "visible"});
        await this.lnkLogout.click();
        return new LogoutPage(this.page);
   }

}
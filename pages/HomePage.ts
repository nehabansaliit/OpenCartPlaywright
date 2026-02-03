import { Page, Locator } from "@playwright/test";

export class HomePage{

    private readonly page: Page;

    //Locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;
    private readonly txtSearchbox: Locator;
    private readonly btnSearch: Locator;

    //Constructor
    constructor(page:Page){
        this.page = page;
        this.lnkMyAccount = page.locator('span:has-text("My Account")');
        this.lnkRegister = page.locator('a:has-text("Register")');
        this.lnkLogin = page.locator('a:has-text("Login")');
        this.txtSearchbox = page.getByPlaceholder("Search");
        this.btnSearch = page.locator('#search button[type="button"]');
    }

    //Action methods
    async isHomePageExists(){
        let title:string= await this.page.title();
        if(title){
            return true;
        }
        return false;
    }

    async clickMyAccount(){
        try {
            await this.lnkMyAccount.click();
        } catch (error) {
            console.log(`Exception occured while clicking on My Account: ${error}`);
            throw(error);
        }
    }

    async clickRegister(){
        try {
            await this.lnkRegister.click();
        } catch (error) {
            console.log(`Exception occured while clicking on Register: ${error}`);
            throw(error);
        }
    }

    async clickLogin(){
        try {
            await this.lnkLogin.click();
        } catch (error) {
            console.log(`Exception occured while clicking on Login: ${error}`);
            throw(error);
        }
    }

    async enterProductName(pName:string){
        await this.txtSearchbox.fill(pName);
    }

    async clickSearch(){
        await this.btnSearch.click();
    }


}
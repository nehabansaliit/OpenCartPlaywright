import { Page, Locator } from "@playwright/test";
import { LogoutPage } from "../pages/LogoutPage";

export class LoginPage{

    private readonly page: Page;

    //Locators
    private readonly pageHeading: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly errorMessage: Locator;
    
    //Constructor
    constructor(page:Page){
        this.page = page;
        this.pageHeading = this.page.locator('div[id="logo"] h1 a');
        this.txtEmail = this.page.locator("#input-email");
        this.txtPassword = this.page.locator("#input-password");
        this.btnLogin = this.page.getByRole("button", {name: 'Login'});
        this.errorMessage = this.page.locator(".alert.alert-danger.alert-dismissible");

    }

    //Action Methods
    getpageHeading(){
        return this.pageHeading;
    }

    async setEmail(email: string){
        await this.txtEmail.waitFor({state: "visible"});
        await this.txtEmail.fill(email);
    }

    async setPassword(password: string){
        await this.txtPassword.waitFor({state: "visible"});
        await this.txtPassword.fill(password);
    }

    async clickLogin(){
        await this.btnLogin.waitFor({state: "visible"});
        await this.btnLogin.click();
        
    }

    getErrorMessage(){
        return this.errorMessage;
    }
}
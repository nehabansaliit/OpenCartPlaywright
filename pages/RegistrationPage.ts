import { Page, expect, Locator } from "@playwright/test";

export class RegistrationPage{

   private readonly page: Page;
    //Locators
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkdPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;
    private readonly rbSubscribeYes: Locator;
    private readonly rbSubscribeNo: Locator;
    private readonly pageHeading: Locator;

    //Constructor
    constructor(page:Page){
        this.page =page;
        this.txtFirstName = page.locator('#input-firstname');
        this.txtLastName = page.locator('#input-lastname');
        this.txtEmail = page.locator('#input-email');
        this.txtTelephone = page.locator('#input-telephone');
        this.txtPassword = page.locator('#input-password');
        this.txtConfirmPassword = page.locator('#input-confirm');
        this.chkdPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.locator('input[value="Continue"]');
        this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');
        this.rbSubscribeYes = page.locator("input[value='1'][name='newsletter']");
        this.rbSubscribeNo = page.locator("input[value='0']");
        this.pageHeading = page.locator('div[id="content"] h1');
    }

    //Action Methods

    getRegistrationPageHeading(){
        return this.pageHeading;
    }

    async setFirstName(fname:string): Promise<void>{
        await this.txtFirstName.waitFor({state: "visible"});
        await this.txtFirstName.fill(fname);
    }

    async setLastName(lname:string): Promise<void>{
        await this.txtLastName.waitFor({state: "visible"});
        await this.txtLastName.fill(lname);
    }

    async setEmail(email:string): Promise<void>{
        await this.txtEmail.waitFor({state: "visible"});
        await this.txtEmail.fill(email);
    }

    async setTelephone(telephone:string): Promise<void>{
        await this.txtTelephone.waitFor({state: "visible"});
        await this.txtTelephone.fill(telephone);
    }

    async setPassword(password:string): Promise<void>{
        await this.txtPassword.waitFor({state: "visible"});
        await this.txtPassword.fill(password);
    }

    async setConfirmPassword(password:string): Promise<void>{
        await this.txtConfirmPassword.waitFor({state: "visible"});
        await this.txtConfirmPassword.fill(password);
    }
    async setPrivatePolicy(): Promise<void>{
        await this.chkdPolicy.waitFor({state: "visible"});
        await this.chkdPolicy.check();
    }
    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
    }

    async getConfirmationMsg(): Promise<string> {
        return (await this.msgConfirmation.textContent()) ?? '';
    }

    async completeRegistration(userData: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
    }): Promise<void> {
        await this.setFirstName(userData.firstName);
        await this.setLastName(userData.lastName);
        await this.setEmail(userData.email);
        await this.setTelephone(userData.telephone);
        await this.setPassword(userData.password);
        await this.setConfirmPassword(userData.password);
        await this.setPrivatePolicy();
        await this.clickContinue();
        await expect(this.msgConfirmation).toBeVisible();
    }

}
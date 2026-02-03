import { Page, Locator } from '@playwright/test';
import {ProductPage} from '../pages/ProductPage';

export class SearchResultsPage {

    private readonly page: Page;
    //Locators
    private readonly searchPageHeader: Locator;
    private readonly searchProducts: Locator;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.searchPageHeader = page.locator("#content h1");
        this.searchProducts = page.locator("h4>a");

    }

    //Action Methods

    async isSearchPageExists(): Promise<Boolean> {
        const content = await this.searchPageHeader.textContent();
        if (content?.includes("Search - ")) {
            return true;
        }
        else
            return false;
    }

    async isProductExists(pName:string): Promise<Boolean>{
      const count = await this.searchProducts.count();
      for(let i=0; i<count; i++){
       let product =await this.searchProducts.nth(i);
       if(await product.textContent() === pName){
            return true;
       }
       else
        continue;
      }
      return false;
    }

    async selectProduct(productName: string): Promise<ProductPage | null> {
        try {
            const count = await this.searchProducts.count();
            for (let i = 0; i < count; i++) {
                const product = this.searchProducts.nth(i);
                const title = await product.textContent();
                if (title === productName) {
                    await product.click();
                    return new ProductPage(this.page);
                }
            }
            console.log(`Product not found: ${productName}`);
        } catch (error) {
            console.log(`Error selecting product: ${error}`);
        }
        return null;
    }

    async getProductCount(): Promise<number> {
        return await this.searchProducts.count();
    }

}
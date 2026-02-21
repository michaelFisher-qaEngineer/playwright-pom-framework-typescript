import { expect, Page, Locator} from '@playwright/test';

export class LaptopsAndNotebooksPage {
    readonly page: Page;
    readonly productLinks: Locator;
    readonly productCard: Locator;
    readonly wishlist: Locator;
    readonly successAlert: Locator;
    constructor(page: Page) {
        this.page = page;
        this.productLinks = page.locator('#product-list .product-thumb h4 a');
        this.productCard = page.locator('.product-thumb');
        this.wishlist = page.locator('div.button').locator('button')
        this.successAlert = page.getByText('Success: You have added HP');
    }    

    async selectProduct(name: string) {
        await this.productLinks.filter({ hasText: name }).click();
    }

    async addToWishList(index: number) {
        await this.page.mouse.wheel(0, 500);  
        await this.wishlist.nth(index).isVisible;
        await this.wishlist.nth(index).click();
    }

    async verifyAlertText() {
        await expect(this.successAlert).toContainText('Success');
    }

}


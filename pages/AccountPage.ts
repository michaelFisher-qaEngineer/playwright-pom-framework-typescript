import { expect, Page, Locator} from '@playwright/test';

export class AccountPage {
    readonly page: Page;
    readonly myAccountLabel: Locator;
    readonly affiliateLink: Locator;
    readonly affiliateSuccessMessage: Locator;
    constructor(page: Page) {
        this.page = page;
        this.myAccountLabel = page.locator('h1');
        this.affiliateLink = page.getByRole('link', { name: 'Affiliate', exact: true });
        this.affiliateSuccessMessage = page.getByText('Success: Your affiliate');
    }

    async openAffiliateLink() {
        await this.affiliateLink.click();
    }

    async verifyMyAccountLabel() {
        await expect(this.myAccountLabel).toContainText('My Account');
    }

    async verifyAffiliateSuccessMessage() {
        await expect(this.affiliateSuccessMessage).toContainText('Success');
    }

}

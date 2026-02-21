import { expect, Locator, Page} from '@playwright/test';

export class OrderSuccessPage {
    readonly page: Page;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.getByRole('heading', { name: 'Your order has been placed!' });
    }

    async verifySuccessMessage() {
        await expect(this.successMessage)
            .toContainText('Your order has been placed!');
    }
}


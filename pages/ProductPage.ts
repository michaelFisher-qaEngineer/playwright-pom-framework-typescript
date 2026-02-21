import { expect, Page, Locator} from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly deliveryDate: Locator;
    readonly addToCartButton: Locator;
    readonly alertSuccess: Locator;
    readonly successAlert: Locator;
    readonly cartButton: Locator;
    readonly cartItem: Locator;
    readonly checkoutButton: Locator;
    readonly successAlertClose: Locator;
    constructor(page: Page) {
        this.page = page;
        this.deliveryDate = page.getByRole('textbox', { name: '* Delivery Date' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.alertSuccess = page.getByText('Success: You have added HP');
        // this.successAlert = page.locator('.alert-success');
        this.cartButton = page.getByRole('button', { name: ' 1 item(s) - $' });
        this.cartItem = page.locator('#cart');
        this.checkoutButton = page.getByRole('link', { name: ' Checkout' });
        this.successAlert = page.locator('#alert .alert.alert-success.alert-dismissible');
        this.successAlertClose = this.successAlert.locator('button.btn-close[data-bs-dismiss="alert"]');
    }

    async waitForSuccessAlertToDisappear() {
        // If it's not there, this returns fast.
        if (await this.successAlert.isVisible().catch(() => false)) {
            // Close it (fast and deterministic)
            await this.successAlertClose.click({ timeout: 5000 }).catch(() => {});
            // Wait until it’s removed/hidden
            await this.successAlert.waitFor({ state: 'detached', timeout: 15000 }).catch(async () => {
            await this.successAlert.waitFor({ state: 'hidden', timeout: 15000 });
            });
        }
    }

    async setDeliveryDate() {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        const mm = String(deliveryDate.getMonth() + 1).padStart(2, '0');
        const dd = String(deliveryDate.getDate()).padStart(2, '0');
        const yyyy = String(deliveryDate.getFullYear());
        const formattedDeliveryDate = `${yyyy}-${mm}-${dd}`;
        await this.deliveryDate.fill(formattedDeliveryDate);
    }

    async addToCart() {
        await this.addToCartButton.click();
        await this.waitForSuccessAlertToDisappear();
    }

    async openCart() {
        await this.cartButton.click();
    }

    async verifyProductAdded(productName: string) {
        await expect(this.successAlert)
            .toContainText(`Success: You have added ${productName}`);
    }

    async verifyProductInCart(productName: string) {
        await this.openCart();
        await expect(this.cartItem).toContainText(productName);
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

}

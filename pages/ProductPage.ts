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
    constructor(page: Page) {
        this.page = page;
        this.deliveryDate = page.getByRole('textbox', { name: '* Delivery Date' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.alertSuccess = page.getByText('Success: You have added HP');
        this.successAlert = page.locator('.alert-success');
        this.cartButton = page.getByRole('button', { name: ' 1 item(s) - $' });
        this.cartItem = page.locator('#cart');
        this.checkoutButton = page.getByRole('link', { name: ' Checkout' });
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

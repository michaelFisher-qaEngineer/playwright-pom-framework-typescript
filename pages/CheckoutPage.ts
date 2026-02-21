import { Page, Locator} from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly shippingAddressDropdown: Locator;
    readonly shippingAddressOptions: Locator;
    readonly shippingMethodButton: Locator;
    readonly continueButton: Locator;
    readonly paymentMethodsButton: Locator;
    readonly submitOrderButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'login page' });
        this.shippingAddressDropdown = page.locator('#input-shipping-address');
        this.shippingAddressOptions = page.locator('#input-shipping-address option');
        this.shippingMethodButton = page.locator('#button-shipping-methods');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.paymentMethodsButton = page.locator('#button-payment-methods');
        this.submitOrderButton = page.getByRole('button', { name: 'Confirm Order' });
    }

    async openLogin() {
        await this.loginLink.click();
    }

    async selectShippingAddressByName(name: string) {
        const value = await this.shippingAddressOptions
            .filter({ hasText: name })
            .first()               // ensures first match
            .getAttribute('value');

        await this.shippingAddressDropdown.selectOption(value);
    }

    async selectShippingMethod() {
        await this.shippingMethodButton.click();
        await this.continueButton.click();
    }

    async selectPaymentMethod() {
        await this.paymentMethodsButton.click();
        await this.continueButton.click();
    }

    async submitOrder() {
        await this.submitOrderButton.click();
    }

}

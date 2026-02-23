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
    readonly shippingModal: Locator;
    readonly anyModalBackdrop: Locator;
    readonly successAlert: Locator;
    readonly successAlertClose: Locator;
    readonly shippingMethodModal: Locator;

    readonly shippingMethodSuccessAlert: Locator;
    readonly shippingAddressSuccessAlert: Locator;
    readonly paymentMethodSuccessAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'login page' });
        this.shippingAddressDropdown = page.locator('#input-shipping-address');
        this.shippingAddressOptions = page.locator('#input-shipping-address option');
        this.shippingMethodButton = page.locator('#button-shipping-methods');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.paymentMethodsButton = page.locator('#button-payment-methods');
        this.submitOrderButton = page.getByRole('button', { name: 'Confirm Order' });
        this.shippingModal = page.locator("#modal-shipping");
        this.anyModalBackdrop = page.locator(".modal-backdrop.show");
        this.successAlert = page.locator('div.alert.alert-success.alert-dismissible');
        this.successAlertClose = page.locator('button.btn-close:visible');
        this.shippingMethodModal = page.locator('#modal-shipping');
        this.shippingMethodSuccessAlert = page.getByText('Success: You have changed shipping method!');
        this.shippingAddressSuccessAlert = page.getByText('Success: You have changed shipping address!');
        this.paymentMethodSuccessAlert = page.getByText('Success: You have changed payment method!');
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
        await this.closeShippingAddressSuccessAlertIfPresent();
    }

    async selectShippingMethod() {
        await this.shippingMethodButton.waitFor({ state: 'visible' });
        await this.shippingMethodButton.click();
        await this.shippingMethodModal.waitFor({ state: 'visible' });
        await this.continueButton.waitFor({ state: 'visible' });
        await this.continueButton.click();
        await this.closeShippingMethodSuccessAlertIfPresent();
    }

    async selectPaymentMethod() {
        await this.paymentMethodsButton.waitFor({ state: 'visible' });
        await this.paymentMethodsButton.click();
        await this.continueButton.waitFor({ state: 'visible' });
        await this.continueButton.click();
        await this.closePaymentMethodSuccessAlertIfPresent();
    }

    async submitOrder() {
        await this.submitOrderButton.click();
    }

    private async closeSuccessAlertContaining(text: string) {
        const alert = this.page.locator('.alert.alert-success', { hasText: text });
        await alert.locator('[data-bs-dismiss="alert"]').click();
        await alert.waitFor({ state: 'detached', timeout: 5000 }).catch(async () => {
            await alert.waitFor({ state: 'hidden', timeout: 5000 });
        });
    }

    private async closeShippingMethodSuccessAlertIfPresent() {
        await this.closeSuccessAlertContaining('You have changed shipping method!');
    }

    private async closeShippingAddressSuccessAlertIfPresent() {
        await this.closeSuccessAlertContaining('You have changed shipping address!');
    }

    private async closePaymentMethodSuccessAlertIfPresent() {
        await this.closeSuccessAlertContaining('You have changed payment method!');
    }

}

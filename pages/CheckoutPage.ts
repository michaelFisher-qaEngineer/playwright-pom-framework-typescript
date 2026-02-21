import { Page, Locator, expect} from '@playwright/test';

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
        this.successAlert = page.locator('#alert .alert.alert-success.alert-dismissible');
        this.successAlertClose = this.successAlert.locator('button.btn-close[data-bs-dismiss="alert"]');
        this.shippingMethodModal = page.locator('#modal-shipping');
    }

    private async waitForNoBlockingOverlays() {
        // If they’re not present, these expectations pass immediately.
        await expect(this.shippingModal).toBeHidden({ timeout: 15000 });
        await expect(this.anyModalBackdrop).toBeHidden({ timeout: 15000 });
    }
    async waitForSuccessAlertAutoDismiss() {
        const alert = this.page.locator('#alert .alert.alert-success.alert-dismissible');
        // If it appears, wait for it to go away
        await alert.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await alert.waitFor({ state: 'detached', timeout: 15000 }).catch(async () => {
        await alert.waitFor({ state: 'hidden', timeout: 15000 });
        });
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

    async openLogin() {
        await this.loginLink.click();
    }

    async selectShippingAddressByName(name: string) {
        const value = await this.shippingAddressOptions
            .filter({ hasText: name })
            .first()               // ensures first match
            .getAttribute('value');

        await this.shippingAddressDropdown.selectOption(value);
        await this.waitForSuccessAlertToDisappear();
    }

    async selectShippingMethod() {
        await this.shippingMethodButton.waitFor({ state: 'visible' });
        await this.shippingMethodButton.click();
        await this.shippingMethodModal.waitFor({ state: 'visible' });
        await this.continueButton.waitFor({ state: 'visible' });
        await this.continueButton.click();
        await this.waitForSuccessAlertToDisappear();
        await this.shippingMethodModal.waitFor({ state: 'hidden' });
    }

    async selectPaymentMethod() {
        await this.paymentMethodsButton.waitFor({ state: 'visible' });
        await this.paymentMethodsButton.click();
        await this.continueButton.waitFor({ state: 'visible' });
        await this.continueButton.click();
        await this.waitForSuccessAlertToDisappear();
    }

    async submitOrder() {
        await this.submitOrderButton.click();
    }

}

import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.loginEmail = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.loginPassword = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async enterEmail(em: string) {
        await this.loginEmail.fill(em);
    }

    async enterPassword(pw: string) {
        await this.loginPassword.fill(pw);
    }

    async clicckLoginButton() {
        await this.loginButton.click();
    }

    async login(em: string, pw: string) {
        await this.enterEmail(em);
        await this.enterPassword(pw);
        await this.clicckLoginButton();
    }
}

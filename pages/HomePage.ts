import { Page, Locator} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly myAccount: Locator;
    readonly login: Locator;
    readonly laptopsAndNotebooks: Locator;
    readonly showAll: Locator;
    constructor(page: Page) {
        this.page = page;
        this.myAccount = page.getByRole('link', { name: ' My Account ' });
        this.login = page.getByRole('link', { name: 'Login' });
        this.laptopsAndNotebooks = page.getByRole('link', { name: 'Laptops & Notebooks', exact: true });
        this.showAll = page.getByRole('link', { name: 'Show All Laptops & Notebooks', exact: true});
    }

    async goto() {
        await this.page.goto('https://cloudberrystore.services/');
    }

    async clickMyAccount() {
        await this.myAccount.click();
    }

    async clickLogin() {
        await this.login.click();
    }

    async openLaptopsAndNotebooksMenu() {
        await this.laptopsAndNotebooks.click();
    }

    async selectShowAll() {
        await this.showAll.click();
    }

    async openShowAllLaptopsAndNotebooks() {
        await this.laptopsAndNotebooks.waitFor({state: 'visible'});
        await this.laptopsAndNotebooks.click();
        await this.showAll.waitFor({ state: 'visible' }); 
        await this.showAll.click();

        // await this.laptopsAndNotebooks.waitFor({state: 'visible'});
        // await this.laptopsAndNotebooks.click();
        // await this.showAll.waitFor({ state: 'visible' }); 
        // await this.showAll.click();
    }

}

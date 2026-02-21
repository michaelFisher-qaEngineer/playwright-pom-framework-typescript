import { Page, Locator} from '@playwright/test';

export class AffiliateInfoPage {
    readonly page: Page;
    readonly companyTextbox: Locator;
    readonly websiteTextbox: Locator;
    readonly taxidTextbox: Locator;
    readonly checkPayeeName: Locator;
    readonly paypalEmailAccount: Locator;
    readonly bankName: Locator;
    readonly abeBranchNumber: Locator;
    readonly swiftCode: Locator;
    readonly accountName: Locator;
    readonly accountNumber1: Locator;
    readonly accountNumber: Locator;
    readonly continueButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.companyTextbox = page.getByRole('textbox', { name: 'Company' });
        this.websiteTextbox = page.getByRole('textbox', { name: 'Web Site' });
        this.taxidTextbox = page.getByRole('textbox', { name: 'Tax ID' });
        this.checkPayeeName = page.getByRole('textbox', { name: '* Cheque Payee Name' });
        this.paypalEmailAccount = page.getByRole('textbox', { name: '* PayPal Email Account' });
        this.bankName = page.getByRole('textbox', { name: 'Bank Name' });
        this.abeBranchNumber = page.getByRole('textbox', { name: 'ABA/BSB number (Branch Number)' });
        this.swiftCode = page.getByRole('textbox', { name: 'SWIFT Code' });
        this.accountName = page.getByRole('textbox', { name: '* Account Name' });
        this.accountNumber1 = page.getByRole('textbox', { name: '* Account Number' });
        this.accountNumber = page.getByRole('textbox', { name: '* Account Number' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });

    }

    async enterPaymentByCheck(taxId: string, checkPayeeName: string) {
        await this.selectPaymentMethod('Cheque');
        await this.enterInfo(this.taxidTextbox, taxId);
        await this.enterInfo(this.checkPayeeName, checkPayeeName);
        await this.clickContinueButton();
    }

    async enterPaymentByPaypal(taxId: string, email: string) {
        await this.selectPaymentMethod('PayPal');
        await this.enterInfo(this.taxidTextbox, taxId);
        await this.enterInfo(this.paypalEmailAccount, email);
        await this.clickContinueButton();
    }

    async enterPaymentByBankTransfer(taxId: string, bankName: string, abaNumber: string, swiftCode: string, accountName: string, accntNumb: string) {
        await this.selectPaymentMethod('Bank Transfer');
        await this.enterInfo(this.taxidTextbox, taxId);
        await this.enterInfo(this.bankName, bankName);
        await this.enterInfo(this.abeBranchNumber, abaNumber);
        await this.enterInfo(this.swiftCode, swiftCode);
        await this.enterInfo(this.accountName, accountName);
        await this.enterInfo(this.accountNumber, accntNumb);
        await this.clickContinueButton();
    }

    async enterInfo(element: Locator, info: string) {
        await element.click();
        await element.fill('');
        await element.fill(info);
    }

    async selectPaymentMethod(method: string) {
        await this.page.getByRole('radio', { name: method }).check();
    }

    async enterCompanyInfo(company: string) {
        await this.enterInfo(this.companyTextbox, company);
    }

    async enterWebsiteInfo(website: string) {
        await this.enterInfo(this.websiteTextbox, website);        
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }


}

import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { AffiliateInfoPage } from '../pages/AffiliateInfoPage';
/*
        6th  Test case - TC06_AddAffiliate
        -------
        1. Launch Browser (chrome)
        2. Open URL https://cloudberrystore.services/
        3. Click on 'My Account' 
        4. Login
        5. Click on Affiliate Link at the bottom of the page
        6. Add Affiliate Information
        7. Click on Continue
        8. Confirm Success
*/
test.describe('@regression @TC06 TC06_AddAffiliate', () => {
    let account: AccountPage; 
    let affiliate: AffiliateInfoPage;

    //all common steps in to the beforeEach:
    test.beforeEach(async({page}) => {
        const home = new HomePage(page);
        const login = new LoginPage(page);

        account = new AccountPage(page);
        affiliate = new AffiliateInfoPage(page);
        await home.goto();
        await home.clickMyAccount();
        await home.clickLogin();
        await login.login("michael.fisher.qaengineer@gmail.com", "123321");
        await account.verifyMyAccountLabel();
        await account.openAffiliateLink();
        await affiliate.enterCompanyInfo("Cascadia QA Solutions, LLC");
        await affiliate.enterWebsiteInfo('www.foo.com');
    });

    //same verification for each test == goes into the afterEach:
    test.afterEach(async({page}) => {
        await account.verifyAffiliateSuccessMessage();
    });

    test('TC06_AddAffiliate - PayPal', async () => {
        await affiliate.enterPaymentByPaypal("123321", "test@ex.co.uk");
    });

    test('TC06_AddAffiliate - Check', async () => {
        await affiliate.enterPaymentByCheck('5667544', 'fisherCheckPayeeName');
    })

    test('TC06_AddAffiliate - Bank Transfer', async () => {
        await affiliate.enterPaymentByBankTransfer('9889', 'bOfA', 'abaNum334', 
            'swftCode98890', 'bankTransfer-accntNameFisher', 'accntNumb-03303');
    })

});
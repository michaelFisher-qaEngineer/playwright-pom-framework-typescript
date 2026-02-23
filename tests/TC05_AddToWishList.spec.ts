import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { LaptopsAndNotebooksPage } from '../pages/LaptopsAndNotebooksPage';
import { ProductPage } from '../pages/ProductPage';

		// 1. Launch Browser (chrome)
		// 2) Open URL: https://cloudberrystore.services/
		// 3. Click on 'My Account' Dropmenu
		// 4. Click on 'Login' option - //button[normalize-space()='Login']
		// 5. Enter valid email address into the 'E-Mail Address' field
		// 6. Enter valid password into the 'Password' field
		// 7. Click on 'Login' button - //button[normalize-space()='Login']
		// 3. Click on Laptops and NoteBooks
		// 4. Click on Show all Laptops and NoteBooks -//a[normalize-space()='Show All
		// 5. Find HP LP3065
		// 5. Click on Add on heart - add to wishlist -
		// Confirm Success - //div[@class='alert alert-success alert-dismissible']

test('@regression @TC05 TC05_AddToWishList', async ({page}) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const account = new AccountPage(page);
    const laptopsPage = new LaptopsAndNotebooksPage(page);
    const productPage = new ProductPage(page);
    await home.goto();
    await home.clickMyAccount();
    await home.clickLogin();
    await login.login("michael.fisher.qaengineer@gmail.com", "123321");
    await account.verifyMyAccountLabel();
    await home.openShowAllLaptopsAndNotebooks();
    await laptopsPage.addToWishList(1)
    await laptopsPage.verifyAlertText();
});
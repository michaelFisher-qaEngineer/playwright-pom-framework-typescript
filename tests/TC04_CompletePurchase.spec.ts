import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LaptopsAndNotebooksPage } from '../pages/LaptopsAndNotebooksPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { OrderSuccessPage } from '../pages/OrderSuccessPage';
/*
Test case - Complete Purchase
-------
1. Launch Browser (chrome)
2. Open URL  https://cloudberrystore.services/
3. Click on Laptops and NoteBooks
4. Click on Show all Laptops and NoteBooks
5. Select an item "HP LP3065"
6. Set Delivery Date
7. Click on Add to Cart
9. Go to Checkount
10. Login
11. Complete Checkout forms
12. Submit order
13. Validate Order COnfirmation
9. Close WebDriver
*/
test('@sanity @regression @TC04 TC04_CompletePurchase', async({page}) => {
    const home = new HomePage(page);
    const laptopsPage = new LaptopsAndNotebooksPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const login = new LoginPage(page);
    const orderSuccessPage = new OrderSuccessPage(page);
    await home.goto();
    await home.openShowAllLaptopsAndNotebooks();
    await laptopsPage.selectProduct('HP LP3065');
    await productPage.setDeliveryDate();
    await productPage.addToCart();
    await productPage.goToCheckout();
    await checkoutPage.openLogin();
    await login.login("michael.fisher.qaengineer@gmail.com", "123321");
    await checkoutPage.selectShippingAddressByName('Michael Fisher');
    await checkoutPage.selectShippingMethod();
    await checkoutPage.selectPaymentMethod();
    await checkoutPage.submitOrder();
    await orderSuccessPage.verifySuccessMessage();
});
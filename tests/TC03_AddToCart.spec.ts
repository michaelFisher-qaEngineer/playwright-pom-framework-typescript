import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LaptopsAndNotebooksPage } from '../pages/LaptopsAndNotebooksPage';
import { ProductPage } from '../pages/ProductPage';
/*
Test case - Add to Cart
-------
1. Launch Browser (chrome)
2. Open URL  https://cloudberrystore.services/
3. Click on Laptops and NoteBooks
4. Click on Show all Laptops and NoteBooks
5. Select an item "HP LP3065"
6. Set Delivery Date
7. Click on Add to Cart
8. Validate Item added to the cart successfully
9. Close WebDriver
*/
test('@sanity @regression @TC03 TC03_AddToCart', async({page}) => {
    const home = new HomePage(page);
    const laptopsPage = new LaptopsAndNotebooksPage(page);
    const productPage = new ProductPage(page);
    await home.goto();
    await home.openShowAllLaptopsAndNotebooks();
    await laptopsPage.selectProduct('HP LP3065');
    await productPage.setDeliveryDate();
    await productPage.addToCart();
    await productPage.verifyProductAdded('HP LP3065');
    await productPage.verifyProductInCart('HP LP3065');
});

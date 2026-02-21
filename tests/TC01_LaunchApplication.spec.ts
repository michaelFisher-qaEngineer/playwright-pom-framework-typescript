import {test, expect, chromium} from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('@sanity TC01_LaunchApplication', async ({page}) => {

    //change this to POM-version with methods from home page:

    const home = new HomePage(page);
    await home.goto();
    await expect(page).toHaveTitle("Your store of fun")

});
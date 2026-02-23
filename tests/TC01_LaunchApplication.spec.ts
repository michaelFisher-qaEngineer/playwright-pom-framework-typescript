import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('@sanity @regression @TC01 TC01_LaunchApplication', async ({page}) => {
    const home = new HomePage(page);
    await home.openHomePage();
    await home.verifyHomePageTitle();
});
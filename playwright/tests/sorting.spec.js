import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { config } from '../../config/config.js';

test.describe('Product sorting functionality', () => {
  test('should sort products by price from low to high', async ({ page }) => {

    // Arrange
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Login
    await loginPage.navigate();
    await loginPage.login(
      config.users.standard.username,
      config.users.standard.password
    );

    // Select Price (Low to High)
    await inventoryPage.sortByPriceLowToHigh();

    // Get all product prices
    const prices = await inventoryPage.productPrices.allTextContents();

    // Convert prices from "$9.99" to numbers
    const numericPrices = prices.map(price =>
      parseFloat(price.replace('$', ''))
    );

    // Create expected sorted prices
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    // Verify products are sorted from low to high
    expect(numericPrices).toEqual(sortedPrices);
  });
});
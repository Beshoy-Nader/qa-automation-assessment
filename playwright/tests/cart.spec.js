import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { config } from '../../config/config.js';

test.describe('Cart functionality', () => {
  test('should add products to cart and remove a product', async ({ page }) => {
    
    // Arrange
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    const backpack = config.products.backpack.name;
    const bikeLight = config.products.bikeLight.name;

    // Login
    await loginPage.navigate();
    await loginPage.login(
      config.users.standard.username,
      config.users.standard.password
    );

    // Add products
    await inventoryPage.addProductToCart(backpack);
    await inventoryPage.addProductToCart(bikeLight);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Open cart
    await inventoryPage.openCart();

    // Verify products were added
    await expect(page.getByText(backpack, { exact: true })).toBeVisible();
    await expect(page.getByText(bikeLight, { exact: true })).toBeVisible();

    await expect(cartPage.cartItems).toHaveCount(2);

    // Remove one product
    await cartPage.removeProduct(bikeLight);
    

    // Verify cart after removal
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(page.getByText(backpack, { exact: true })).toBeVisible();
    await expect(page.getByText(bikeLight, { exact: true })).not.toBeVisible();
  });
});
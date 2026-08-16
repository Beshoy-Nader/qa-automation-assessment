import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage.js';
import { config } from '../../config/config.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';

test.describe('Checkout functionality', () => {
  test('should complete checkout successfully', async ({ page }) => {
    
    // Arrange
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

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

    // Verify cart badge
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Open cart
    await inventoryPage.openCart();

    // Verify products in cart
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(page.getByText(backpack, { exact: true })).toBeVisible();
    await expect(page.getByText(bikeLight, { exact: true })).toBeVisible();

    // Proceed to checkout
    await cartPage.checkout();

    // Verify checkout information page
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();

    // Fill checkout information
    await checkoutPage.fillCheckoutInformation(
      'Beshoy',
      'Nader',
      '12345'
    );

    // Continue to checkout overview
    await checkoutPage.continueCheckout();

    // Verify checkout overview
    await expect(checkoutOverviewPage.cartItemNames).toHaveCount(2);

    await expect(
      page.getByText(backpack, { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText(bikeLight, { exact: true })
    ).toBeVisible();

    // Verify price information
    await expect(checkoutOverviewPage.subtotal).toBeVisible();
    await expect(checkoutOverviewPage.tax).toBeVisible();
    await expect(checkoutOverviewPage.total).toBeVisible();

 // Finish checkout
await checkoutOverviewPage.finishCheckout();

// Verify checkout complete page
await expect(checkoutCompletePage.completeHeader).toHaveText(
  'Thank you for your order!'
);

await expect(checkoutCompletePage.completeText).toBeVisible();
  });
});
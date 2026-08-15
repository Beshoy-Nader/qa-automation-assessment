import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { config } from '../../config/config.js';

test.describe('Login functionality', () => {
  test('should successfully login with a standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.login(config.users.standard.username, config.users.standard.password);
    
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('should display the correct error message for a locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.login(config.users.locked.username, config.users.locked.password);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
  });
});

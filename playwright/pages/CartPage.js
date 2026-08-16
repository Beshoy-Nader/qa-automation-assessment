export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
     this.checkoutButton = page.locator('[data-test="checkout"]');

  }

  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  async removeProduct(productName) {
    const cartItem = this.cartItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    await cartItem.locator('button').click();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }
  
  async checkout() {
  await this.checkoutButton.click();
}
}
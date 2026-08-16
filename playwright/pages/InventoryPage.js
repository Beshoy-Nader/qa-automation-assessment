export class InventoryPage {
  constructor(page) {
    this.page = page;

    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');

    // Sorting
    this.productSortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );
    this.productPrices = page.locator(
      '[data-test="inventory-item-price"]'
    );
  }

  async addProductToCart(productName) {
    const productItem = this.inventoryItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    await productItem.locator('button').click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortByPriceLowToHigh() {
    await this.productSortDropdown.selectOption('lohi');
  }
}
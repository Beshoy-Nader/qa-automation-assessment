export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;

    this.cartItemNames = page.locator(
      '[data-test="inventory-item-name"]'
    );

    this.subtotal = page.locator(
      '[data-test="subtotal-label"]'
    );

    this.tax = page.locator(
      '[data-test="tax-label"]'
    );

    this.total = page.locator(
      '[data-test="total-label"]'
    );

    this.finishButton = page.locator(
      '[data-test="finish"]'
    );
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}
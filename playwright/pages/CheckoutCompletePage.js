export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;

    this.completeHeader = page.locator(
      '[data-test="complete-header"]'
    );

    this.completeText = page.locator(
      '[data-test="complete-text"]'
    );
  }
}
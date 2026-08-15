/**
 * Application Configuration
 * Store URLs, credentials, and test data here
 * DO NOT hardcode sensitive data - use .env for credentials
 */

export const config = {
  // UI Application URLs
  sauceDemo: {
    baseUrl: 'https://www.saucedemo.com',
    loginUrl: 'https://www.saucedemo.com/',
  },

  // API Configuration
  api: {
    baseUrl: 'https://api.restful-api.dev',
    endpoints: {
      objects: '/objects',
    },
  },

  // Test Data - Standard User
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    locked: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    },
    performanceGlitch: {
      username: 'performance_glitch_user',
      password: 'secret_sauce',
    },
  },

  // Product Test Data (from saucedemo.com)
  products: {
    backpack: {
      name: 'Sauce Labs Backpack',
      price: '$29.99',
      selector: '[data-test="inventory-item-sauce-labs-backpack-img-container"]',
    },
    bikeLight: {
      name: 'Sauce Labs Bike Light',
      price: '$9.99',
      selector: '[data-test="inventory-item-sauce-labs-bike-light-img-container"]',
    },
    boltTShirt: {
      name: 'Sauce Labs Bolt T-Shirt',
      price: '$15.99',
      selector: '[data-test="inventory-item-sauce-labs-bolt-t-shirt-img-container"]',
    },
    jacket: {
      name: 'Sauce Labs Fleece Jacket',
      price: '$49.99',
      selector: '[data-test="inventory-item-sauce-labs-fleece-jacket-img-container"]',
    },
    onesie: {
      name: 'Sauce Labs Onesie',
      price: '$7.99',
      selector: '[data-test="inventory-item-sauce-labs-onesie-img-container"]',
    },
    tshirt: {
      name: 'Test.allTheThings() T-Shirt (Red)',
      price: '$15.99',
      selector: '[data-test="inventory-item-test-allthethings-t-shirt-red-img-container"]',
    },
  },

  // Timeouts
  timeouts: {
    short: 3000,      // 3 seconds for quick operations
    medium: 5000,     // 5 seconds for normal operations
    long: 10000,      // 10 seconds for page loads
  },

  // Test Environments
  environments: {
    staging: {
      apiBaseUrl: 'https://staging-api.example.com',
    },
    production: {
      apiBaseUrl: 'https://api.restful-api.dev',
    },
  },
};

export default config;

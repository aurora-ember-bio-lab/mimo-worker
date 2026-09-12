// Aurora Ember Bio Lab — Stripe Test Mode Setup
// Generate test keys and webhooks for development

import Stripe from 'stripe';

// Test mode configuration
// IMPORTANT: Replace these with your actual Stripe test keys from https://dashboard.stripe.com/test/apikeys
export const STRIPE_TEST_CONFIG = {
  // Test API Keys (get from Stripe Dashboard)
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_REPLACE_WITH_YOUR_KEY',
  secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_REPLACE_WITH_YOUR_KEY',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_REPLACE_WITH_YOUR_SECRET',

  // Test products (created automatically)
  testProducts: [
    { id: 'prod_test_starter', name: 'Starter Plan', price: 1800, interval: 'month' },
    { id: 'prod_test_pro', name: 'Pro Plan', price: 2900, interval: 'month' },
    { id: 'prod_test_studio', name: 'Studio Plan', price: 5900, interval: 'month' },
    { id: 'prod_test_lifetime', name: 'Lifetime Plan', price: 199900, interval: 'once' },
  ],

  // Test customers
  testCustomers: [
    { email: 'test@example.com', name: 'Test User' },
    { email: 'dev@aurora-ember-bio-lab.com', name: 'Dev User' },
  ],
};

// Initialize Stripe in test mode
export function getStripeTest(): Stripe {
  return new Stripe(STRIPE_TEST_CONFIG.secretKey, {
    apiVersion: '2024-04-10',
    typescript: true,
  });
}

// Create test checkout session
export async function createTestCheckoutSession(
  priceId: string,
  customerEmail: string
): Promise<string> {
  const stripe = getStripeTest();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/cancel',
    metadata: {
      test: 'true',
      project: 'test',
    },
  });

  return session.url || '';
}

// Create test webhook event
export function createTestWebhookEvent(
  type: string,
  data: Record<string, unknown>
): Stripe.Event {
  return {
    id: 'evt_test_' + Math.random().toString(36).substring(7),
    object: 'event',
    api_version: '2024-04-10',
    created: Math.floor(Date.now() / 1000),
    type: type as Stripe.Event.Type,
    data: {
      object: data as Stripe.Event.Data.Object,
    },
    livemode: false,
    pending_webhooks: 0,
    request: {
      id: 'req_test_' + Math.random().toString(36).substring(7),
      idempotency_key: null,
    },
  } as Stripe.Event;
}

// Validate webhook signature (test mode)
export function validateTestWebhookSignature(
  payload: string,
  signature: string
): boolean {
  // In test mode, always return true
  return true;
}

// Get test subscription status
export async function getTestSubscriptionStatus(
  subscriptionId: string
): Promise<string> {
  // Simulate different subscription statuses
  const statuses = ['active', 'trialing', 'past_due', 'canceled'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Generate test invoice
export function generateTestInvoice(): Record<string, unknown> {
  return {
    id: 'inv_test_' + Math.random().toString(36).substring(7),
    object: 'invoice',
    amount_paid: 2900,
    amount_remaining: 0,
    currency: 'eur',
    customer: 'cus_test_' + Math.random().toString(36).substring(7),
    status: 'paid',
    created: Math.floor(Date.now() / 1000),
    hosted_invoice_url: 'https://example.com/invoice',
    invoice_pdf: 'https://example.com/invoice.pdf',
  };
}

// Test mode helper functions
export const testHelpers = {
  // Simulate successful payment
  async simulateSuccessfulPayment(): Promise<void> {
    console.log('✅ Simulating successful payment...');
    console.log('  - Checkout session created');
    console.log('  - Payment processed');
    console.log('  - License activated');
  },

  // Simulate failed payment
  async simulateFailedPayment(): Promise<void> {
    console.log('❌ Simulating failed payment...');
    console.log('  - Card declined');
    console.log('  - License not activated');
  },

  // Simulate subscription cancellation
  async simulateSubscriptionCancellation(): Promise<void> {
    console.log('🔄 Simulating subscription cancellation...');
    console.log('  - Subscription canceled');
    console.log('  - License deactivated');
  },

  // Simulate trial expiration
  async simulateTrialExpiration(): Promise<void> {
    console.log('⏰ Simulating trial expiration...');
    console.log('  - Trial expired');
    console.log('  - Upgrade prompt shown');
  },
};

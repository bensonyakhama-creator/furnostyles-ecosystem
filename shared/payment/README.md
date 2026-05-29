# FURNOSTYLES PAYMENT GATEWAY INTEGRATION GUIDE

## Overview

The FURNOSTYLES payment gateway infrastructure provides a unified interface for processing payments through multiple providers including Stripe, PayPal, and M-Pesa. This guide will help you integrate your preferred payment APIs with the system.

## Architecture

The payment system consists of three main modules:

1. **payment-config.js** - Configuration management for payment providers
2. **payment-service.js** - Core payment processing logic
3. **payment-ui.js** - UI components for payment forms and status display

## Supported Payment Providers

### 1. Stripe
- **Best for:** International card payments
- **Currencies:** All major currencies
- **Features:** Card payments, subscriptions, recurring billing

### 2. PayPal
- **Best for:** International payments, buyer protection
- **Currencies:** All major currencies
- **Features:** Express checkout, card payments

### 3. M-Pesa
- **Best for:** Kenya local payments
- **Currency:** KES only
- **Features:** Mobile money, instant payments

## Quick Start

### Step 1: Set Up Environment Variables

Create or update your `.env` file with the following variables:

```env
# Stripe Configuration
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
PAYPAL_MODE=sandbox  # or 'live' for production

# M-Pesa Configuration
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_PASSKEY=your_mpesa_passkey
MPESA_SHORTCODE=174379  # Your M-Pesa shortcode
MPESA_ENVIRONMENT=sandbox  # or 'production'
```

### Step 2: Load Payment Modules

Add the payment modules to your HTML pages:

```html
<!-- Payment Configuration -->
<script src="shared/payment/payment-config.js"></script>

<!-- Payment Service -->
<script src="shared/payment/payment-service.js"></script>

<!-- Payment UI Components -->
<script src="shared/payment/payment-ui.js"></script>
```

### Step 3: Initialize Payment Form

```javascript
// Get the container element
var paymentContainer = document.getElementById('payment-container');

// Render payment form
window.FurnostylesPaymentUI.renderPaymentForm(paymentContainer, {
  amount: 15000,
  currency: 'KES',
  description: 'Furniture Order #12345',
  orderId: 'order_12345',
  userId: 'user_abc123',
  onConfirm: function(paymentMethod) {
    handlePaymentConfirmation(paymentMethod);
  },
  onCancel: function() {
    console.log('Payment cancelled');
  }
});
```

## Detailed Integration Guides

### Stripe Integration

#### 1. Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers → API keys
3. Copy your publishable key (public) and secret key
4. For webhooks, create a webhook endpoint and copy the signing secret

#### 2. Configure Stripe

```javascript
// Set Stripe configuration programmatically (optional)
window.FurnostylesPaymentConfig.setProviderConfig('stripe', {
  publicKey: 'pk_test_your_key',
  secretKey: 'sk_test_your_key',
  webhookSecret: 'whsec_your_secret',
  enabled: true
});
```

#### 3. Integrate Stripe.js

Add Stripe.js to your HTML:

```html
<script src="https://js.stripe.com/v3/"></script>
```

Initialize Stripe:

```javascript
var stripe = Stripe(window.FurnostylesPaymentConfig.getProvider('stripe').publicKey);
```

#### 4. Create Payment Intent

```javascript
window.FurnostylesPayment.createPayment({
  amount: 15000,
  currency: 'KES',
  provider: 'stripe',
  description: 'Furniture Order',
  orderId: 'order_12345',
  userId: 'user_abc123'
}).then(function(payment) {
  console.log('Payment created:', payment.id);
  
  // Confirm payment with Stripe
  return stripe.confirmCardPayment(payment.clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: 'Customer Name'
      }
    }
  });
}).then(function(result) {
  if (result.error) {
    console.error('Payment failed:', result.error);
  } else {
    console.log('Payment succeeded:', result.paymentIntent);
  }
});
```

#### 5. Handle Webhooks

Create a webhook handler on your server:

```javascript
// Server-side example (Node.js with Express)
const stripe = require('stripe')('sk_test_your_secret_key');

app.post('/webhook/stripe', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = 'whsec_your_webhook_secret';
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      // Update payment status in Firestore
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  res.json({received: true});
});
```

### PayPal Integration

#### 1. Get PayPal API Credentials

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Create an app or use existing app
3. Copy Client ID and Secret
4. Set mode to sandbox for testing

#### 2. Configure PayPal

```javascript
window.FurnostylesPaymentConfig.setProviderConfig('paypal', {
  clientId: 'your_client_id',
  secret: 'your_secret',
  mode: 'sandbox',
  enabled: true
});
```

#### 3. Load PayPal SDK

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=KES"></script>
```

#### 4. Create PayPal Order

```javascript
window.FurnostylesPayment.createPayment({
  amount: 15000,
  currency: 'KES',
  provider: 'paypal',
  description: 'Furniture Order',
  orderId: 'order_12345',
  userId: 'user_abc123'
}).then(function(payment) {
  // Use PayPal SDK to create order
  return paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '150.00'
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        console.log('Payment completed:', details);
        // Confirm payment with Furnostyles
        return window.FurnostylesPayment.confirmPayment(payment.id, {
          provider: 'paypal',
          paypalOrderId: data.orderID
        });
      });
    }
  }).render('#paypal-button-container');
});
```

### M-Pesa Integration

#### 1. Get M-Pesa API Credentials

1. Go to [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. Create an account and generate API credentials
3. Get Consumer Key, Consumer Secret, and Passkey
4. Note your Shortcode (Paybill or Till Number)

#### 2. Configure M-Pesa

```javascript
window.FurnostylesPaymentConfig.setProviderConfig('mpesa', {
  consumerKey: 'your_consumer_key',
  consumerSecret: 'your_consumer_secret',
  passkey: 'your_passkey',
  shortcode: '174379',
  environment: 'sandbox',
  enabled: true
});
```

#### 3. Implement M-Pesa STK Push

You'll need a server-side implementation for M-Pesa since it requires API authentication:

```javascript
// Server-side example (Node.js)
const axios = require('axios');

async function initiateMpesaPayment(phoneNumber, amount, callbackUrl) {
  // Get access token
  const auth = Buffer.from(
    process.env.MPESA_CONSUMER_KEY + ':' + process.env.MPESA_CONSUMER_SECRET
  ).toString('base64');
  
  const tokenResponse = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: 'Basic ' + auth } }
  );
  
  const accessToken = tokenResponse.data.access_token;
  
  // Initiate STK Push
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, -4);
  const password = Buffer.from(
    process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
  ).toString('base64');
  
  const response = await axios.post(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: 'FURNOSTYLES',
      TransactionDesc: 'Payment for order'
    },
    { headers: { Authorization: 'Bearer ' + accessToken } }
  );
  
  return response.data;
}
```

#### 4. Handle M-Pesa Callbacks

```javascript
// Server-side callback handler
app.post('/webhook/mpesa', (req, res) => {
  const { Body } = req.body;
  const { stkCallback } = Body;
  const { ResultCode, ResultDesc, MerchantRequestID, CheckoutRequestID } = stkCallback;
  
  if (ResultCode === 0) {
    // Payment successful
    console.log('M-Pesa payment successful:', CheckoutRequestID);
    // Update payment status in Firestore
  } else {
    // Payment failed
    console.log('M-Pesa payment failed:', ResultDesc);
  }
  
  res.json({ ResultCode: 0, ResultDesc: 'Success' });
});
```

## Payment Service API

### Create Payment

```javascript
window.FurnostylesPayment.createPayment(paymentData)
  .then(function(payment) {
    console.log('Payment created:', payment);
  });
```

**Parameters:**
- `amount` (number) - Payment amount
- `currency` (string) - Currency code (default: 'KES')
- `provider` (string) - Payment provider (default: system default)
- `description` (string) - Payment description
- `orderId` (string) - Associated order ID
- `userId` (string) - User ID
- `metadata` (object) - Additional metadata

**Returns:** Promise resolving to payment object

### Confirm Payment

```javascript
window.FurnostylesPayment.confirmPayment(paymentId, paymentMethod)
  .then(function(result) {
    console.log('Payment confirmed:', result);
  });
```

**Parameters:**
- `paymentId` (string) - Payment ID
- `paymentMethod` (object) - Payment method details

**Returns:** Promise resolving to confirmation result

### Get Payment Status

```javascript
window.FurnostylesPayment.getPaymentStatus(paymentId)
  .then(function(payment) {
    console.log('Payment status:', payment.status);
  });
```

**Parameters:**
- `paymentId` (string) - Payment ID

**Returns:** Promise resolving to payment object

### Listen to Payment Status Changes

```javascript
var unsubscribe = window.FurnostylesPayment.onPaymentStatusChange(paymentId, function(payment) {
  console.log('Payment status changed:', payment.status);
  if (payment.status === 'succeeded') {
    unsubscribe(); // Stop listening
  }
});
```

**Parameters:**
- `paymentId` (string) - Payment ID
- `callback` (function) - Callback function

**Returns:** Unsubscribe function

### Get User Payments

```javascript
window.FurnostylesPayment.getUserPayments(userId, 20)
  .then(function(payments) {
    console.log('User payments:', payments);
  });
```

**Parameters:**
- `userId` (string) - User ID
- `limit` (number) - Maximum number of payments (default: 20)

**Returns:** Promise resolving to array of payments

### Refund Payment

```javascript
window.FurnostylesPayment.refundPayment(paymentId, amount, reason)
  .then(function(refund) {
    console.log('Refund created:', refund.id);
  });
```

**Parameters:**
- `paymentId` (string) - Payment ID
- `amount` (number) - Amount to refund (optional, full refund if not specified)
- `reason` (string) - Refund reason

**Returns:** Promise resolving to refund object

## Payment Configuration API

### Get Provider Configuration

```javascript
var stripeConfig = window.FurnostylesPaymentConfig.getProvider('stripe');
```

### Check if Provider is Enabled

```javascript
if (window.FurnostylesPaymentConfig.isProviderEnabled('mpesa')) {
  // M-Pesa is available
}
```

### Get Enabled Providers

```javascript
var enabledProviders = window.FurnostylesPaymentConfig.getEnabledProviders();
console.log('Available providers:', enabledProviders);
```

### Get Default Provider

```javascript
var defaultProvider = window.FurnostylesPaymentConfig.getDefaultProvider();
```

### Validate Provider Configuration

```javascript
var validation = window.FurnostylesPaymentConfig.validateProvider('stripe');
if (!validation.valid) {
  console.error('Configuration errors:', validation.errors);
}
```

## Payment UI API

### Render Payment Form

```javascript
window.FurnostylesPaymentUI.renderPaymentForm(container, options);
```

**Options:**
- `amount` (number) - Payment amount
- `currency` (string) - Currency code
- `description` (string) - Payment description
- `onConfirm` (function) - Callback when payment is confirmed
- `onCancel` (function) - Callback when payment is cancelled

### Render Payment Status

```javascript
window.FurnostylesPaymentUI.renderPaymentStatus(container, payment);
```

## Firestore Schema

### Payments Collection

```javascript
{
  id: "pay_1234567890_abc123",
  amount: 15000,
  currency: "KES",
  provider: "stripe",
  status: "pending", // pending, succeeded, failed, refunded
  description: "Furniture Order",
  metadata: {},
  orderId: "order_12345",
  userId: "user_abc123",
  transactionId: "stripe_1234567890",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Refunds Collection

```javascript
{
  id: "refund_1234567890_abc123",
  paymentId: "pay_1234567890_abc123",
  amount: 15000,
  reason: "Customer request",
  status: "pending", // pending, succeeded, failed
  createdAt: Timestamp
}
```

## Security Best Practices

1. **Never expose secret keys** in client-side code
2. **Use environment variables** for all sensitive credentials
3. **Validate all payment data** on the server side
4. **Implement webhook signature verification** for all providers
5. **Use HTTPS** for all payment-related requests
6. **Log all payment events** for audit trails
7. **Implement rate limiting** on payment endpoints
8. **Never store full card details** - use tokenization

## Testing

### Test Mode

All providers support sandbox/test mode:

- **Stripe:** Use test keys starting with `pk_test_` and `sk_test_`
- **PayPal:** Set `PAYPAL_MODE=sandbox`
- **M-Pesa:** Set `MPESA_ENVIRONMENT=sandbox`

### Test Cards (Stripe)

Use these test cards for Stripe testing:

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Insufficient Funds:** 4000 0025 0000 3155
- **Expired:** 4000 0000 0000 0069

### Test Phone Numbers (M-Pesa)

For M-Pesa sandbox testing, use:
- Format: 2547XXXXXXXX
- Any valid Kenyan phone number format

## Troubleshooting

### Common Issues

**Issue:** "No payment provider enabled"
- **Solution:** Check environment variables are set correctly

**Issue:** "Firestore not available"
- **Solution:** Ensure Firebase is initialized before payment modules

**Issue:** Payment fails with "Provider not found"
- **Solution:** Verify provider ID matches configuration

**Issue:** M-Pesa callback not received
- **Solution:** Check callback URL is publicly accessible and HTTPS

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure Firebase is properly configured
4. Review provider-specific documentation

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [PayPal Developer Docs](https://developer.paypal.com/docs/)
- [Safaricom M-Pesa API](https://developer.safaricom.co.ke/)
- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)

## License

This payment infrastructure is part of the FURNOSTYLES ecosystem.

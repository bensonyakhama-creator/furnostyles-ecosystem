# Payment System Roadmap

**Document Type:** Payment Architecture | **Date:** 2026-05-22 | **Version:** 1.0 | **Status:** Future Implementation (Phase 6)

---

## How to Use This Document

This document maps the payment system roadmap for Furnostyles. Use it to:

- Understand payment provider integrations
- Plan checkout and order flow
- Implement transaction safety measures
- Ensure compliance with Kenyan regulations
- Guide AI-assisted payment implementation

**This is a planning document. Do not implement payments until Phase 6.**

---

## Payment Providers

### Provider Overview

| Provider | Type | Target Market | Phase |
|----------|------|---------------|-------|
| **M-Pesa** | Mobile Money | Kenya (domestic) | Phase 6 |
| **Paystack** | Card Payments | Africa (regional) | Phase 6 |
| **Stripe** | Card Payments | International | Phase 6 |

### Provider Selection Rationale

| Provider | Why Selected |
|----------|--------------|
| **M-Pesa** | Dominant mobile money in Kenya, high adoption |
| **Paystack** | Strong African presence, competitive fees |
| **Stripe** | International standard, robust features |

---

## M-Pesa Integration

### M-Pesa Overview

| Aspect | Details |
|--------|---------|
| **Provider** | Safaricom |
| **API** | Daraja API |
| **Method** | STK Push (Lipa na M-Pesa) |
| **Currency** | KES |
| **Fees** | Transaction-based (Safaricom) |
| **Settlement** | T+1 to T+3 |

### M-Pesa Integration Flow

```
1. User selects M-Pesa at checkout.
2. User enters M-Pesa phone number.
3. Client initiates STK Push request.
4. Request sent to M-Pesa API via Cloud Functions.
5. M-Pesa sends STK Push to user's phone.
6. User enters M-Pesa PIN on phone.
7. M-Pesa processes payment.
8. M-Pesa sends callback to webhook.
9. Cloud Functions update order status.
10. User notified of payment success/failure.
```

### M-Pesa API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `stkpush` | Initiate STK Push payment |
| `query` | Query payment status |
| `callback` | Receive payment confirmation |

### M-Pesa Security

| Security Measure | Implementation |
|------------------|----------------|
| **API Keys** | Stored in Cloud Functions environment variables |
| **Idempotency** | Unique idempotency key per transaction |
| **Webhook Validation** | Validate M-Pesa callback signatures |
| **Encryption** | HTTPS for all API calls |
| **Rate Limiting** | Implement rate limiting to prevent abuse |

### M-Pesa Error Handling

| Error | Handling |
|-------|----------|
| **Insufficient Funds** | Notify user, retry option |
| **Wrong PIN** | Notify user, retry option |
| **Timeout** | Query payment status, notify user |
| **Duplicate Transaction** | Idempotency key prevents double charge |

---

## Paystack Integration

### Paystack Overview

| Aspect | Details |
|--------|---------|
| **Provider** | Paystack |
| **Method** | Inline Checkout |
| **Currency** | KES, USD, EUR |
| **Fees** | 1.5% + KES 100 per transaction |
| **Settlement** | T+2 |

### Paystack Integration Flow

```
1. User selects Paystack at checkout.
2. Client initiates Paystack checkout.
3. Paystack inline checkout modal opens.
4. User enters card details or selects bank.
5. Paystack processes payment.
6. Paystack sends webhook to Cloud Functions.
7. Cloud Functions update order status.
8. User redirected to success/failure page.
```

### Paystack API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `transaction/initialize` | Initialize transaction |
| `transaction/verify` | Verify transaction status |
| `webhook` | Receive payment confirmation |

### Paystack Security

| Security Measure | Implementation |
|------------------|----------------|
| **API Keys** | Stored in Cloud Functions environment variables |
| **Idempotency** | Unique idempotency key per transaction |
| **Webhook Validation** | Validate Paystack webhook signatures |
| **Encryption** | HTTPS for all API calls |
| **3D Secure** | Enabled for card payments |

### Paystack Error Handling

| Error | Handling |
|-------|----------|
| **Card Declined** | Notify user, retry option |
| **Insufficient Funds** | Notify user, retry option |
| **Timeout** | Query payment status, notify user |
| **Duplicate Transaction** | Idempotency key prevents double charge |

---

## Stripe Integration

### Stripe Overview

| Aspect | Details |
|--------|---------|
| **Provider** | Stripe |
| **Method** | Stripe Checkout |
| **Currency** | USD, EUR, GBP |
| **Fees** | 2.9% + $0.30 per transaction |
| **Settlement** | T+2 |

### Stripe Integration Flow

```
1. User selects Stripe at checkout.
2. Client initiates Stripe Checkout.
3. Stripe Checkout page opens.
4. User enters card details.
5. Stripe processes payment.
6. Stripe sends webhook to Cloud Functions.
7. Cloud Functions update order status.
8. User redirected to success/failure page.
```

### Stripe API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `checkout/sessions` | Create checkout session |
| `events` | Receive webhook events |
| `payment_intents` | Retrieve payment intent |

### Stripe Security

| Security Measure | Implementation |
|------------------|----------------|
| **API Keys** | Stored in Cloud Functions environment variables |
| **Idempotency** | Unique idempotency key per transaction |
| **Webhook Validation** | Validate Stripe webhook signatures |
| **Encryption** | HTTPS for all API calls |
| **PCI Compliance** | Stripe handles PCI compliance |

### Stripe Error Handling

| Error | Handling |
|-------|----------|
| **Card Declined** | Notify user, retry option |
| **Insufficient Funds** | Notify user, retry option |
| **Timeout** | Query payment status, notify user |
| **Duplicate Transaction** | Idempotency key prevents double charge |

---

## Checkout

### Checkout Flow

```
1. User proceeds to checkout from cart.
2. User enters shipping information.
3. User enters billing information (if different).
4. User selects payment method (M-Pesa, Paystack, Stripe).
5. User reviews order summary.
6. User confirms order.
7. Order created in Firestore (status: pending).
8. Payment processed via selected provider.
9. Payment webhook updates order status (status: paid).
10. User redirected to order confirmation page.
11. Order confirmation email sent.
12. Vendor notified of new order.
```

### Checkout Page Structure

```
Checkout Page:
- Order summary (items, total)
- Shipping information form
- Billing information form
- Payment method selection
- Terms and conditions
- Place order button
```

### Checkout Form Validation

| Field | Validation |
|-------|-------------|
| **Name** | Required, min 2 characters |
| **Email** | Required, valid email format |
| **Phone** | Required, valid phone format |
| **Address** | Required, min 5 characters |
| **City** | Required, min 2 characters |
| **Payment Method** | Required |

---

## Order Flow

### Order Status States

| Status | Description | Trigger |
|--------|-------------|---------|
| **pending** | Order created, awaiting payment | Checkout completion |
| **paid** | Payment confirmed | Payment webhook |
| **processing** | Order being prepared | Vendor action |
| **shipped** | Order shipped | Vendor action |
| **delivered** | Order delivered | Delivery confirmation |
| **cancelled** | Order cancelled | User or vendor action |
| **refunded** | Order refunded | Admin action |

### Order Notification Flow

```
1. Order created → User notified (order confirmation)
2. Payment confirmed → User notified (payment success)
3. Order shipped → User notified (shipping confirmation)
4. Order delivered → User notified (delivery confirmation)
5. Order cancelled → User notified (cancellation)
```

---

## Transaction Safety

### Idempotency Keys

| Provider | Idempotency Implementation |
|----------|---------------------------|
| **M-Pesa** | Unique transaction ID per order |
| **Paystack** | Unique reference per order |
| **Stripe** | Unique idempotency key per order |

### Idempotency Workflow

```
1. Generate unique idempotency key before payment.
2. Send idempotency key with payment request.
3. If duplicate request received, provider returns original response.
4. Prevents duplicate charges.
```

### Webhook Security

| Security Measure | Implementation |
|------------------|----------------|
| **Signature Validation** | Validate webhook signatures |
| **HTTPS Only** | Webhook endpoints HTTPS only |
| **Rate Limiting** | Implement rate limiting on webhooks |
| **Idempotency** | Process webhooks idempotently |
| **Logging** | Log all webhook events for audit |

### Transaction Monitoring

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **Success Rate** | > 95% | < 90% |
| **Failure Rate** | < 5% | > 10% |
| **Average Processing Time** | < 30s | > 60s |
| **Duplicate Transactions** | 0 | > 0 |

---

## Compliance

### Kenyan Regulations

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| **Data Protection** | GDPR-like compliance | Privacy policy, data minimization |
| **Financial Reporting** | Transaction records | Store all transactions in Firestore |
| **Tax Compliance** | VAT collection | Include VAT in pricing, report to KRA |
| **Consumer Protection** | Refund policy | Clear refund policy, 7-day refund window |

### Payment Provider Compliance

| Provider | Compliance Requirements |
|----------|------------------------|
| **M-Pesa** | CBK regulations, Safaricom terms |
| **Paystack** | CBN regulations, PCI DSS |
| **Stripe** | PCI DSS, GDPR |

### Legal Documentation

| Document | Purpose |
|----------|---------|
| **Terms of Service** | Platform terms and conditions |
| **Privacy Policy** | Data collection and usage |
| **Refund Policy** | Refund terms and process |
| **Payment Terms** | Payment provider terms |

---

## Payment Testing

### Testing Strategy

| Phase | Testing | Environment |
|-------|---------|-------------|
| **Sandbox** | All payment flows | Sandbox/test environment |
| **Staging** | Integration testing | Staging environment |
| **Production** | Live transactions | Production environment |

### Test Cases

| Test Case | Description |
|-----------|-------------|
| **Successful Payment** | Complete payment flow end-to-end |
| **Failed Payment** | Test error handling for failed payments |
| **Duplicate Payment** | Test idempotency prevents double charge |
| **Webhook Timeout** | Test webhook retry logic |
| **Partial Payment** | Test partial payment handling (if applicable) |

### Testing Checklist

Before production launch:

- [ ] All payment providers tested in sandbox
- [ ] Idempotency keys verified
- [ ] Webhook signatures validated
- [ ] Error handling tested
- [ ] Notification flow tested
- [ ] Refund flow tested
- [ ] Compliance verified
- [ ] Legal documents published

---

## Summary

The payment system roadmap covers:

- **Payment Providers:** M-Pesa, Paystack, Stripe with rationale
- **M-Pesa Integration:** STK Push flow, security, error handling
- **Paystack Integration:** Inline checkout, security, error handling
- **Stripe Integration:** Stripe Checkout, security, error handling
- **Checkout:** Flow, page structure, form validation
- **Order Flow:** Status states, notification flow
- **Transaction Safety:** Idempotency, webhook security, monitoring
- **Compliance:** Kenyan regulations, provider compliance, legal docs
- **Testing:** Strategy, test cases, checklist

**Follow this roadmap when implementing payments in Phase 6. Prioritize security and compliance throughout.**

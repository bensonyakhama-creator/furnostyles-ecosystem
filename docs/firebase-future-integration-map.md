# Firebase Future Integration Map

**Document Type:** Backend Architecture | **Date:** 2026-05-22 | **Version:** 1.0 | **Status:** Future Implementation (Phase 4+)

---

## How to Use This Document

This document maps the future Firebase integration for Furnostyles. Use it to:

- Understand the Firebase architecture before implementation
- Plan data models and security rules
- Prepare for Phase 4 (Service Request System) and beyond
- Ensure scalability and security
- Guide AI-assisted Firebase implementation

**This is a planning document. Do not implement Firebase until Phase 4.**

---

## Firebase Project Setup

### Project Configuration

| Setting | Value | Notes |
|---------|-------|-------|
| **Project Name** | furnostyles-platform | Unique identifier |
| **Region** | europe-west1 | Closest to Kenya |
| **Authentication** | Email/Password | Primary auth method |
| **Firestore** | Native mode | Production mode |
| **Storage** | Firebase Storage | For images/uploads |
| **Hosting** | Not used | Using Cloudflare Pages |

### Firebase Services to Enable

| Service | Phase | Purpose |
|---------|-------|---------|
| **Authentication** | Phase 4 | User accounts |
| **Firestore** | Phase 4 | Database |
| **Storage** | Phase 4 | Image uploads |
| **Cloud Functions** | Phase 6 | Server-side logic |
| **Analytics** | Phase 8 | User analytics |

---

## Auth Structure

### User Account Types

| Role | Description | Permissions |
|------|-------------|-------------|
| **client** | Regular customers | View products, place orders, view orders |
| **vendor** | Marketplace sellers | Manage products, view orders |
| **provider** | Service providers | Manage services, view inquiries |
| **agent** | Real estate agents | Manage properties, view inquiries |
| **admin** | Platform administrators | Full access |

### Authentication Flow

```
1. User registers via form (email, password, role).
2. Firebase Auth creates user account.
3. Email verification sent (required for activation).
4. User document created in Firestore `users` collection.
5. Role assigned based on registration type.
6. User can login with email/password.
7. Session managed by Firebase Auth.
```

### Auth Security Rules

| Rule | Implementation |
|------|----------------|
| **Email Verification Required** | Users cannot access until email verified |
| **Role-Based Access** | Firestore security rules enforce role permissions |
| **Password Reset** | Firebase Auth built-in password reset |
| **Account Deletion** | Firebase Auth account deletion + Firestore document deletion |

---

## Collections

### Users Collection

| Field | Type | Description |
|-------|------|-------------|
| `uid` | string | Firebase Auth UID (document ID) |
| `email` | string | User email |
| `displayName` | string | User display name |
| `role` | string | client, vendor, provider, agent, admin |
| `createdAt` | timestamp | Account creation date |
| `emailVerified` | boolean | Email verification status |
| `phoneNumber` | string | Phone number (optional) |
| `profileImage` | string | Profile image URL (optional) |
| `address` | object | Address object (optional) |

### Leads Collection

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Auto-generated ID |
| `name` | string | Lead name |
| `email` | string | Lead email |
| `phone` | string | Lead phone |
| `service` | string | Service of interest |
| `message` | string | Lead message |
| `status` | string | new, contacted, qualified, closed |
| `createdAt` | timestamp | Lead creation date |
| `updatedAt` | timestamp | Last update date |

### Products Collection (Future Phase 5)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Auto-generated ID |
| `vendorId` | string | Vendor UID |
| `name` | string | Product name |
| `description` | string | Product description |
| `price` | number | Price in KES |
| `category` | string | Product category |
| `images` | array | Array of image URLs |
| `stock` | number | Stock quantity |
| `status` | string | active, inactive, out of stock |
| `createdAt` | timestamp | Product creation date |
| `updatedAt` | timestamp | Last update date |

### Orders Collection (Future Phase 6)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Auto-generated ID |
| `userId` | string | Customer UID |
| `items` | array | Array of order items |
| `total` | number | Total amount in KES |
| `status` | string | pending, paid, shipped, delivered |
| `paymentMethod` | string | M-Pesa, Paystack, Stripe |
| `paymentId` | string | Payment transaction ID |
| `shippingAddress` | object | Shipping address object |
| `createdAt` | timestamp | Order creation date |
| `updatedAt` | timestamp | Last update date |

### Properties Collection (Future Phase 7)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Auto-generated ID |
| `agentId` | string | Agent UID |
| `title` | string | Property title |
| `description` | string | Property description |
| `price` | number | Price in KES |
| `location` | string | Property location |
| `type` | string | Property type (apartment, house, etc.) |
| `bedrooms` | number | Number of bedrooms |
| `bathrooms` | number | Number of bathrooms |
| `images` | array | Array of image URLs |
| `status` | string | active, inactive, sold |
| `createdAt` | timestamp | Property creation date |
| `updatedAt` | timestamp | Last update date |

### Inquiries Collection (Future Phase 7)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Auto-generated ID |
| `propertyId` | string | Property ID |
| `name` | string | Inquirer name |
| `email` | string | Inquirer email |
| `phone` | string | Inquirer phone |
| `message` | string | Inquiry message |
| `status` | string | new, responded, closed |
| `createdAt` | timestamp | Inquiry creation date |
| `updatedAt` | timestamp | Last update date |

### Notifications Collection (Future Phase 6)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Auto-generated ID |
| `userId` | string | Recipient UID |
| `type` | string | order, inquiry, approval, etc. |
| `title` | string | Notification title |
| `message` | string | Notification message |
| `read` | boolean | Read status |
| `createdAt` | timestamp | Notification creation date |

---

## Uploads

### Image Upload Flow

```
1. User selects image via file input.
2. Client validates image (size, type).
3. Image uploaded to Firebase Storage.
4. Image URL returned to client.
5. Image URL saved to Firestore document.
6. Image displayed in UI.
```

### Upload Security Rules

| Rule | Implementation |
|------|----------------|
| **File Size Limit** | Max 5MB per image |
| **File Type Limit** | Only WebP, JPG, PNG |
| **User Authentication** | Only authenticated users can upload |
| **Path Organization** | Organized by type (products, properties, profiles) |
| **Public Access** | Images publicly readable (CDN) |

### Storage Folder Structure

```
storage/
├── products/
│   ├── {productId}/
│   │   ├── image1.webp
│   │   └── image2.webp
├── properties/
│   ├── {propertyId}/
│   │   ├── image1.webp
│   │   └── image2.webp
├── profiles/
│   ├── {userId}/
│   │   └── profile.webp
└── uploads/
    └── {uploadId}/
        └── file.webp
```

---

## Orders

### Order Flow

```
1. User adds items to cart.
2. User proceeds to checkout.
3. User enters shipping/billing information.
4. User selects payment method (M-Pesa, Paystack, Stripe).
5. Order document created in Firestore (status: pending).
6. Payment processed via provider.
7. Payment webhook updates order status (status: paid).
8. User notified of order confirmation.
9. Vendor notified of new order.
10. Order shipped (status: shipped).
11. Order delivered (status: delivered).
```

### Order Status States

| Status | Description | Trigger |
|--------|-------------|---------|
| **pending** | Order created, awaiting payment | Checkout completion |
| **paid** | Payment confirmed | Payment webhook |
| **shipped** | Order shipped | Vendor action |
| **delivered** | Order delivered | Delivery confirmation |
| **cancelled** | Order cancelled | User or vendor action |

### Order Security Rules

| Rule | Implementation |
|------|----------------|
| **User Isolation** | Users can only view their own orders |
| **Vendor Access** | Vendors can only view orders for their products |
| **Admin Access** | Admins can view all orders |
| **Idempotency** | Payment idempotency keys prevent duplicate charges |

---

## Vendor Data

### Vendor Profile

| Field | Type | Description |
|-------|------|-------------|
| `uid` | string | Firebase Auth UID (document ID) |
| `businessName` | string | Business name |
| `description` | string | Business description |
| `category` | string | Vendor category |
| `location` | string | Business location |
| `status` | string | pending, approved, rejected, suspended |
| `rating` | number | Average rating (1-5) |
| `reviewCount` | number | Number of reviews |
| `createdAt` | timestamp | Vendor registration date |
| `updatedAt` | timestamp | Last update date |

### Vendor Approval Workflow

```
1. Vendor registers via sourcing page.
2. Vendor document created in Firestore (status: pending).
3. Admin reviews vendor application.
4. Admin approves or rejects vendor.
5. If approved, vendor status updated (status: approved).
6. Vendor dashboard access granted.
7. Vendor can upload products.
```

### Vendor Security Rules

| Rule | Implementation |
|------|----------------|
| **Approval Required** | Pending vendors cannot upload products |
| **Status Check** | Only approved vendors can access dashboard |
| **Product Ownership** | Vendors can only manage their own products |
| **Rating System** | Ratings aggregated from customer reviews |

---

## Chats

### Chat Structure (Future)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Auto-generated ID |
| `participants` | array | Array of participant UIDs |
| `messages` | array | Array of message objects |
| `createdAt` | timestamp | Chat creation date |
| `updatedAt` | timestamp | Last message date |

### Message Object

| Field | Type | Description |
|-------|------|-------------|
| `senderId` | string | Sender UID |
| `text` | string | Message text |
| `timestamp` | timestamp | Message timestamp |
| `read` | boolean | Read status |

### Chat Security Rules

| Rule | Implementation |
|------|----------------|
| **Participant Access** | Only participants can access chat |
| **Message Ownership** | Senders can only delete their own messages |
| **Real-time Updates** | Firestore real-time listeners for live chat |

---

## Notifications

### Notification Types

| Type | Trigger | Recipient |
|------|---------|-----------|
| **order** | Order status change | Customer |
| **inquiry** | New property inquiry | Agent |
| **approval** | Vendor approval | Vendor |
| **product** | Product approval | Vendor |
| **system** | System announcements | All users |

### Notification Delivery

```
1. Event triggers notification (order paid, inquiry received, etc.).
2. Notification document created in Firestore.
3. Cloud Function sends push notification (if enabled).
4. Notification displayed in user dashboard.
5. User marks notification as read.
```

### Notification Security Rules

| Rule | Implementation |
|------|----------------|
| **User Isolation** | Users can only view their own notifications |
| **Role-Based** | Some notifications only for specific roles |
| **Read Status** | Users can only update their own read status |

---

## Future Scalability

### Firestore Indexes

| Collection | Indexed Fields | Purpose |
|------------|-----------------|---------|
| `products` | category, price, vendorId | Product filtering/search |
| `orders` | userId, status, createdAt | Order history, filtering |
| `properties` | location, type, price | Property search |
| `inquiries` | propertyId, status, createdAt | Inquiry management |

### Scalability Considerations

| Consideration | Implementation |
|---------------|----------------|
| **Pagination** | Limit query results, implement pagination |
| **Caching** | Cache frequently accessed data |
| **Indexing** | Create composite indexes for complex queries |
| **Sharding** | Consider sharding large collections (future) |
| **Read/Write Limits** | Monitor Firestore usage, optimize queries |

### Cost Monitoring

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **Read Operations** | < 50,000/day | > 40,000/day |
| **Write Operations** | < 10,000/day | > 8,000/day |
| **Storage** | < 5GB | > 4GB |
| **Downloaded Bytes** | < 10GB/day | > 8GB/day |

---

## Security Best Practices

### Firebase Security Rules

| Rule | Implementation |
|------|----------------|
| **Authentication Required** | All collections require `request.auth != null` |
| **User Isolation** | Users can only access their own data |
| **Role-Based Access** | Security rules check user role |
| **Validation** | Data validation in security rules |
| **No Admin SDK** | Client SDK only (no admin SDK in frontend) |

### Data Validation

| Validation | Implementation |
|-------------|----------------|
| **Email Format** | Validate email format before creation |
| **Required Fields** | Ensure required fields are present |
| **Data Types** | Ensure correct data types |
| **String Length** | Limit string lengths to prevent abuse |

### Security Checklist

Before activating Firebase:

- [ ] Security rules written and tested
- [ ] Email verification enabled
- [ ] Password reset enabled
- [ ] Indexes created for complex queries
- [ ] Cost monitoring set up
- [ ] Backup strategy documented
- [ ] Rollback plan documented

---

## Summary

The Firebase integration map covers:

- **Auth Structure:** User roles, authentication flow, security rules
- **Collections:** Users, leads, products, orders, properties, inquiries, notifications
- **Uploads:** Image upload flow, security rules, folder structure
- **Orders:** Order flow, status states, security rules
- **Vendor Data:** Vendor profile, approval workflow, security rules
- **Chats:** Chat structure, message objects, security rules
- **Notifications:** Notification types, delivery, security rules
- **Scalability:** Indexes, pagination, cost monitoring
- **Security:** Security rules, validation, best practices

**Follow this map when implementing Firebase in Phase 4+. Maintain security and scalability throughout.**

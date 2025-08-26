# Bookotel Server

Express backend API for the Bookotel hotel booking application.

## Environment Variables
```env
PORT=3001
MONGODB_URI=your_uri
STRIPE_SECRET_KEY=your_key
STRIPE_WEBHOOK_SECRET=your_key
CLERK_WEBHOOK_SECRET=your_key
SENDER_EMAIL=...
SENDER_PASS=...
```

## Quick Start
```bash
npm install
npm start
```

## Webhooks
- Stripe: POST /api/stripe (checkout.session.completed)
- Clerk: POST /api/clerk (user events)

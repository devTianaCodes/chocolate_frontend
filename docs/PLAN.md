# ChocolateCraftHouse Plan

> Each section includes explicit success checks. Mark a task complete only when the check passes.

## 1. Repo Bootstrap & Docs
- [ ] Create monorepo structure: `client/`, `server/`, `db/`, `docs/`.
  - **Check:** `ls` shows all four directories at repo root.
- [ ] Copy project docs into `docs/`.
  - **Check:** `docs/ChocolateCraftHouse.md` and `docs/ChocolateCraftHouse-UI-Guidelines.md` exist and open correctly.
- [ ] Add root `package.json` with concurrent dev scripts.
  - **Check:** `npm run dev` starts both client and server without errors.

## 2. Backend Foundation (Express)
- [ ] Initialize `server/` with Express 5 and Node 20 config.
  - **Check:** `node server/server.js` starts and responds on `GET /`.
- [ ] Add config layer: `server/src/config/db.js` + `env.js`.
  - **Check:** DB connection test logs success with correct env values.
- [ ] Add middleware: auth, adminOnly, validate, errorHandler.
  - **Check:** Invalid requests return standardized `{ success: false, error }`.

## 3. Database Schema & Seeds
- [ ] Create `db/schema.sql` for all required tables.
  - **Check:** `SHOW TABLES;` lists all entities from the doc.
- [ ] Add seeds in `db/seeds/` (categories, shipping methods, sample products, admin user).
  - **Check:** `SELECT COUNT(*)` shows non-zero rows for those tables.

## 4. API Endpoints (MVP)
- [ ] Implement auth routes.
  - **Check:** Register/login/refresh/logout flows work end-to-end.
- [ ] Implement products + categories routes.
  - **Check:** `GET /products` and `GET /categories` return data.
- [ ] Implement cart + cart merge.
  - **Check:** Guest cart merges into user cart after login.
- [ ] Implement orders + inventory updates.
  - **Check:** Creating an order decrements inventory in a transaction.
- [ ] Implement Stripe PaymentIntent + webhook.
  - **Check:** Test mode payment updates order status to `paid`.
- [ ] Implement admin endpoints (products/orders/inventory).
  - **Check:** Admin-only endpoints reject non-admin users.

## 5. Frontend Foundation (Vite + React + Tailwind)
- [ ] Initialize Vite React app in `client/`.
  - **Check:** `npm run dev` serves the app on the expected port.
- [ ] Configure Tailwind with tokens from UI guidelines.
  - **Check:** Global styles render colors and fonts correctly.
- [ ] Add routing and layout shells.
  - **Check:** All MVP routes render without console errors.

## 6. Frontend Pages (MVP)
- [ ] Home, Shop, Product Detail, Cart, Checkout, Order Confirmation.
  - **Check:** Each route matches UI guidelines and loads data correctly.
- [ ] Auth pages: Login + Register.
  - **Check:** Auth flows set/refresh tokens and update UI state.
- [ ] Account (Orders/Addresses/Profile shell).
  - **Check:** User can view past orders.

## 7. Admin UI (MVP)
- [ ] Admin dashboard pages for Products, Orders, Inventory.
  - **Check:** Admin can update inventory and order status.

## 8. QA & Acceptance
- [ ] Manual API tests across all endpoints.
  - **Check:** All endpoints return expected status and envelope.
- [ ] Manual UI tests on mobile + desktop breakpoints.
  - **Check:** Layout adapts correctly per breakpoints in UI doc.
- [ ] Accessibility sweep for key pages.
  - **Check:** Focus rings, aria labels, and contrast pass WCAG AA.

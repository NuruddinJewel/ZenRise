# 📌 FundRise - Crowdfunding Platform

**FundRise** is a modern, full-stack, credit-based crowdfunding platform built to empower creators and connect them with supporters who believe in their vision. The platform uses a unique credit-based economy where supporters purchase platform credits to back campaigns, and creators can seamlessly request withdrawals of their hard-earned credits into real currency.

---

## 💎 Key Highlights & Business Logic

FundRise operates on a custom **Credit System** integrated with a Sandbox payment gateway to keep transactions secure and simulated.

```
       [ Supporter ] ──(Buys: $1 = 10 Credits)──> [ FundRise Platform ]
                                                          │
                                                (Supports Campaigns)
                                                          │
                                                          ▼
       [ Creator ] <──(Withdraws: 20 Credits = $1)──────┘

```

### 💵 Credit Economy & Platform Revenue Model

* **Supporters' Purchase Rate:** $1 USD = **10 Credits** (Processed securely via Stripe Sandbox).
* **Creators' Payout Rate:** **20 Credits** = $1 USD.
* **Platform Profit Margins:** This $2:1$ conversion ratio generates a sustainable revenue flow for the platform to handle administrative, gateway, and server overheads.
* **Minimum Withdrawal Limit:** Creators must raise at least **200 Credits** (equivalent to $10 USD) before submitting their first payout request.

---

## 🏛️ System Architecture

FundRise is decoupled into a high-performance frontend application and a resilient REST API server.

* **Frontend (Next.js):** Client-side pages, optimized image delivery, clean route transitions, and responsive Tailwind layouts styled with DaisyUI.
* **Backend (Express & Node.js):** REST API endpoints handling user authentication state verification, input validations, complex credit arithmetic, and Direct Database operations.
* **Database (MongoDB Atlas):** Document-oriented schemas housing credentials, campaign information, transaction ledgers, and logs.

---

## 🗄️ Database Design

The system relies on MongoDB database structures to keep actions fully dynamic:

```
crowdfunding
├── user               # Stores profiles, credential hashes, and user roles (Supporter, Creator, Admin)
├── account            # Better-auth account linking metadata
├── session            # Active user session records
├── campaigns          # Stores details, goals, raised credits, and status (pending/approved)
├── categories         # Platform-supported campaign categories
├── contributions      # Mapping of which Supporter contributed how many credits to what Campaign
├── creditPurchases    # Transaction ledger of Supporters buying platform credits (Stripe Sandbox)
└── withdrawals        # Creator payout logs with request states (pending/approved/rejected)

```

---

## 👤 Role-Based Dashboards & Navigation

Navigation bars dynamically adjust options based on the authenticated user's role to prevent unauthorized routing.

### 1. Public Landing Page & Supporter Portal

Designed for general visitors to discover campaigns, understand platform mechanics, and purchase platform credits.

* **Navigation Options:** `Home` | `Explore Campaigns` | `My Contributions` | `Purchase Credit` | `Payment History`
* **Features:**
* Interactive Hero section detailing platform metrics and active campaigns.
* Integration with Stripe Sandbox for instant, mock currency-to-credit top-ups.
* Direct contributions to verified, active campaigns.

---

### 🎨 2. Creator Dashboard

Provides creators with the instruments to establish, modify, and track their fundraising progress.

* **Navigation Options:** `Home` | `Add New Campaign` | `My Campaigns` | `Withdrawals` | `Payment History`
* **Features:**
* **Campaign Creation:** Creators can fill out forms to create a campaign. Upon submission, the campaign's default status is saved as `"pending"` and will only display to supporters after Admin approval.
* **Interactive Withdrawal Console:** Displays real-time calculations:

$$\text{Available Balance} = \text{Total Earned} - (\text{Pending Withdrawals} + \text{Approved Withdrawals})$$


* Minimal threshold checks (200 Credits) enforced dynamically before rendering the Stripe withdrawal window.

---

### 🛡️ 3. Admin Dashboard

The central command center for platform operations, allowing admins to oversee platform health and manage platform transactions.

* **Navigation Options:** `Home` | `Manage Users` | `Manage Campaigns` | `Withdrawal Requests` | `Reports`
* **Features:**
* **Campaign Verification Queue:** Inspect details of incoming `"pending"` campaigns to toggle them to `"approved"` or reject them.
* **Withdrawal Requests Manager:** Review withdrawal requests, verify creator credit legitimacy, and process payouts.
* **User Management Console:** Update user roles dynamically, change platform privileges, and review reported issues.

---

## 💻 Tech Stack

| Domain                 | Technologies                                                    |
| ---------------------- | --------------------------------------------------------------- |
| **Frontend Framework** | Next.js (App Router, Client-Side Rendering hooks)               |
| **Styling & UI**       | Tailwind CSS, DaisyUI, Lucide React, React Icons, Framer Motion |
| **Authentication**     | Better-Auth                                                     |
| **API Server**         | Node.js, Express.js                                             |
| **Database & Drivers** | MongoDB (Native Node Driver / Mongoose)                         |
| **Payments**           | Stripe Sandbox (Simulator)                                      |
| **Notifications**      | React Toastify                                                  |

---

## ⚙️ Installation & Setup

### Prerequisites

* [Node.js](https://www.google.com/search?q=https://nodejs.org/) (v18.x or higher)
* [MongoDB Atlas Account](https://www.google.com/search?q=https://www.mongodb.com/cloud/atlas) or a running local MongoDB instance


### Backend Setup (Node.js & Express)

 Navigate to the backend folder:
```bash
cd backend

```

Install dependencies:
```bash
npm install

```

 Start the server:
```bash
nodemon index.js

```

### Frontend Setup (Next.js)

 Open a new terminal window and navigate to the frontend folder:
```bash
cd frontend

```

 Install dependencies:
```bash
npm install

```

 Start the Next.js development server:
```bash
npm run dev

```
---

## 🌐 Live Project Link

Experience the FundRise platform live in action! You can explore the user roles, test the sandbox payment system, and launch campaigns.

* **⚡ Link :** [Visit FundRise Platform](https://zen-rise-two.vercel.app)


> "Big changes start with small support. Empowering ideas, one credit at a time."





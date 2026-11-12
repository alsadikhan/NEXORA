# NEXORA E-commerce Solution

A modern, full-featured e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. This project provides a complete solution for online retail businesses with both customer-facing and administrative features.

![Nahda E-commerce](public/preview.png)

## Features

### Customer Features
- 🛍️ **Product Browsing**
  - Intuitive category navigation
  - Advanced filtering and sorting
  - Detailed product pages with variants
  - Related products suggestions

- 🛒 **Shopping Experience**
  - Real-time cart management
  - Wishlist functionality
  - Coupon code support
  - Multiple payment options
    - Credit/Debit Cards
    - bKash
    - Nagad
    - Cash on Delivery

- 📦 **Checkout Process**
  - Multi-step checkout
  - Address management
  - Multiple shipping options
  - Order tracking
  - Email notifications

### Admin Features
- 📊 **Dashboard**
  - Sales analytics
  - Order management
  - Inventory tracking
  - Customer insights

- 🏪 **Store Management**
  - Product management
  - Category organization
  - Inventory control
  - Price management
  - Discount setup

- ⚙️ **Settings**
  - Payment gateway configuration
  - Shipping options
  - Tax settings
  - Email notification templates

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form, Zod
- **Authentication**: NextAuth.js
- **Payment Processing**: Stripe
- **Image Storage**: Cloudinary
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/nahda-startup.git
cd nahda-startup
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id

# Database
DATABASE_URL=your-database-url

# Payment (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key

# Payment (SSLCommerz)
SSLCOMMERZ_STORE_ID=your-store-id
SSLCOMMERZ_STORE_PASSWORD=your-store-password

# Image Upload (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Google Sign-In Setup

1. In [Google Cloud Console](https://console.cloud.google.com/), create or select a project and configure the OAuth consent screen.
2. Create an OAuth client ID with application type **Web application**.
3. Add authorized JavaScript origins for `http://localhost:3000` and your deployed site origin.
4. Add authorized redirect URIs:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Vercel: `https://nexora-coral-phi.vercel.app/api/auth/callback/google`
5. Add the client ID to `GOOGLE_CLIENT_ID` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, and the client secret to `GOOGLE_CLIENT_SECRET` in `.env.local` and Vercel Environment Variables. Never commit or share the client secret.
6. Set `NEXTAUTH_URL` to `http://localhost:3000` locally and to your deployed site URL in Vercel. Set `NEXTAUTH_SECRET` to a unique random value in both environments.
7. Restart the local server or redeploy on Vercel after setting the variables.

## Project Structure

```
src/
├── app/                # Next.js app router pages
├── components/         # Reusable components
│   ├── admin/         # Admin dashboard components
│   ├── cart/          # Shopping cart components
│   ├── checkout/      # Checkout process components
│   ├── shop/          # Shop components
│   └── ui/            # UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and libraries
├── types/             # TypeScript type definitions
└── data/             # Mock data and constants
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@nahda-startup.com or join our Slack channel.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)

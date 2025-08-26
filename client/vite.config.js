import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      'Content-Security-Policy': [
        // Allow scripts from Stripe and Clerk during development
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://checkout.stripe.com https://js.stripe.com https://*.clerk.com https://*.clerk.accounts.dev",
        // Permit font loading (including Stripe fonts)
        "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://js.stripe.com data:",
        // Allow API calls to local backend and 3rd parties used here
        "connect-src 'self' http://localhost:3001 https://checkout.stripe.com https://api.stripe.com https://*.clerk.com https://*.clerk.accounts.dev",
        // Helpful for dev tools/iframes from providers (Stripe/Clerk)
        "frame-src 'self' https://*.stripe.com https://*.clerk.com https://*.clerk.accounts.dev",
      ].join('; ')
    }
  }
})

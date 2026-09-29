FURBZ SPARKLE — SUPABASE CONNECTED STATIC WEBSITE

Supabase project:
https://lsrjeljhoabwirvblpqp.supabase.co

The publishable key is included in assets/supabase-config.js because publishable browser keys are intended for client applications. Security comes from Supabase Auth + Row Level Security. NEVER put a Supabase secret/service_role key, Paystack Secret Key, or Moniepoint private credentials in this ZIP.

SETUP — REQUIRED
1. Open your Supabase project.
2. Go to SQL Editor.
3. Open supabase/schema.sql from this ZIP and run the complete SQL.
4. Go to Authentication > Users and create the admin email/password account you want to use.
5. Copy that user's UUID.
6. In SQL Editor run:
   insert into public.admin_users (user_id) values ('YOUR-AUTH-USER-UUID');
7. Open the website. Use /admin/login.html to sign in.

WHAT IS NOW CONNECTED
- Storefront products -> public.products
- Delivery fees -> public.delivery_zones
- Social/WhatsApp settings -> public.site_settings
- Contact form -> public.contact_messages
- Checkout -> atomic create_order() RPC
- Stock -> decremented server-side inside the database transaction
- Payment receipt upload -> private payment-receipts storage bucket
- Admin login/password reset -> Supabase Auth
- Admin authorization -> admin_users + is_admin() + RLS
- Product media -> public media storage bucket
- Admin orders/inbox/settings/products -> Supabase

IMPORTANT
The browser only receives the publishable key. Supabase's current guidance is to use publishable keys in browser code and keep secret keys on servers/Edge Functions. RLS must be enabled and policies/grants configured for exposed tables.

PAYMENT SECRETS
The admin "Secrets" page intentionally does not store private keys. Put Paystack Secret Key / Moniepoint private credentials in Supabase Edge Function/project secrets. The included supabase/functions/verify-payment/index.ts is a starter server-side location.

PASSWORD RESET
Add the production domain you will host on to Supabase Auth redirect URLs, then use the Forgot password button on /admin/login.html.

FALLBACK
The storefront can still display the demo products if the database has no products yet, but once you add products in the admin dashboard they are read from Supabase.

DEMO LOGINS FROM THE OLD STATIC VERSION ARE REMOVED.
Create your real Supabase Auth admin user and add its UUID to admin_users.

Original logo.png is retained from the previous package. If you have the real brand logo asset, replace assets/logo.png with it.

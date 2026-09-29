import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return new Response("Unauthorized", {status:401});

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", {status:401});

  const { data: admin } = await supabase.rpc("is_admin");
  if (!admin) return new Response("Forbidden", {status:403});

  // Put provider secret keys in Edge Function secrets, never in browser code.
  // Example: Deno.env.get("PAYSTACK_SECRET_KEY")
  return Response.json({ ok:true, message:"Payment verification endpoint ready for provider integration." });
});

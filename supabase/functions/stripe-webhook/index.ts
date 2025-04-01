
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.7.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

// Initialize Supabase client
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") || "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  try {
    const body = await req.text();
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET") || ""
    );

    // Handle the event based on its type
    switch (stripeEvent.type) {
      case "checkout.session.completed": {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        
        // Extract customer info
        const customerId = session.customer as string;
        const clientReferenceId = session.client_reference_id;
        
        if (!clientReferenceId) {
          console.error("No client_reference_id found in session");
          break;
        }

        // Update user subscription status
        const { error: profileError } = await supabaseAdmin
          .from("profiles")
          .update({ is_pro: true })
          .eq("id", clientReferenceId);

        if (profileError) {
          console.error("Error updating profile:", profileError);
        }

        // Store subscription data
        const subscription = await stripe.subscriptions.list({
          customer: customerId,
          limit: 1,
        });

        if (subscription.data.length > 0) {
          const sub = subscription.data[0];
          const { error: subError } = await supabaseAdmin.from("subscriptions").insert({
            user_id: clientReferenceId,
            stripe_customer_id: customerId,
            stripe_subscription_id: sub.id,
            status: sub.status,
            price_id: sub.items.data[0].price.id,
            current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          });

          if (subError) {
            console.error("Error saving subscription:", subError);
          }
        }
        break;
      }
      
      case "customer.subscription.updated": {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        
        // Get the user ID from the subscription metadata or by looking up existing records
        const { data: subscriptionData, error: lookupError } = await supabaseAdmin
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", subscription.id)
          .single();

        if (lookupError) {
          console.error("Error looking up subscription:", lookupError);
          break;
        }

        const userId = subscriptionData.user_id;

        // Update subscription status in database
        const { error: updateError } = await supabaseAdmin
          .from("subscriptions")
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        if (updateError) {
          console.error("Error updating subscription:", updateError);
        }

        // Update profile is_pro based on subscription status
        const isPro = subscription.status === "active" || subscription.status === "trialing";
        const { error: profileError } = await supabaseAdmin
          .from("profiles")
          .update({ is_pro: isPro })
          .eq("id", userId);

        if (profileError) {
          console.error("Error updating profile:", profileError);
        }
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        
        // Get the user ID from the subscription
        const { data: subscriptionData, error: lookupError } = await supabaseAdmin
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", subscription.id)
          .single();

        if (lookupError) {
          console.error("Error looking up subscription:", lookupError);
          break;
        }

        const userId = subscriptionData.user_id;

        // Update subscription status in database
        const { error: updateError } = await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "canceled",
            ended_at: new Date(subscription.ended_at ? subscription.ended_at * 1000 : Date.now()).toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        if (updateError) {
          console.error("Error updating subscription:", updateError);
        }

        // Update user's pro status
        const { error: profileError } = await supabaseAdmin
          .from("profiles")
          .update({ is_pro: false })
          .eq("id", userId);

        if (profileError) {
          console.error("Error updating profile:", profileError);
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});

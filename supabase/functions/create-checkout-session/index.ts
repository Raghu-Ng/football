import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderId, items, customerInfo } = await req.json()

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
    })

    // Create Stripe checkout session with enhanced customer information
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerInfo?.email,
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image_url],
            description: `Size: ${item.size}`,
            metadata: {
              size: item.size,
              jersey_id: item.id.split('-')[0],
            },
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/store`,
      metadata: {
        orderId,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      custom_fields: [
        {
          key: 'delivery_instructions',
          label: {
            type: 'custom',
            custom: 'Delivery Instructions (Optional)',
          },
          type: 'text',
          optional: true,
        },
      ],
      invoice_creation: {
        enabled: true,
      },
      automatic_tax: {
        enabled: true,
      },
    })

    // Update order with Stripe session ID and customer information
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    await supabase
      .from('orders')
      .update({ 
        stripe_payment_intent_id: session.id,
        delivery_address: customerInfo?.address || '',
        city: customerInfo?.city || '',
        pincode: customerInfo?.zipCode || '',
      })
      .eq('id', orderId)

    // Create or update customer profile if provided
    if (customerInfo) {
      const { data: authUser } = await supabase.auth.getUser()
      if (authUser?.user) {
        await supabase
          .from('profiles')
          .upsert({
            id: authUser.user.id,
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            phone: customerInfo.phone,
            default_address: customerInfo.address,
            city: customerInfo.city,
            pincode: customerInfo.zipCode,
          })
      }
    }

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
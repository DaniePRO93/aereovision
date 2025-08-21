import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterSubscribeRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterSubscribeRequest = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: "Email válido es requerido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Try to insert the email subscription
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email: email.toLowerCase().trim() }])
      .select();

    if (error) {
      // Check if it's a unique constraint violation (email already exists)
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ message: "Ya estás suscrito a nuestro boletín" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Error al procesar la suscripción" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send confirmation email
    try {
      const emailResponse = await resend.emails.send({
        from: "AeroVision <onboarding@resend.dev>",
        to: [email],
        subject: "¡Bienvenido al boletín de AeroVision!",
        html: `
          <h1>¡Gracias por suscribirte!</h1>
          <p>Hola,</p>
          <p>Te has suscrito exitosamente al boletín de AeroVision. Recibirás actualizaciones sobre nuestro trabajo de fotografía aérea y ofertas exclusivas.</p>
          <p>Si no te suscribiste o quieres cancelar tu suscripción, puedes contactarnos respondiendo a este email.</p>
          <p>Saludos,<br>
          El equipo de AeroVision</p>
          <hr>
          <p style="font-size: 12px; color: #666;">
            AeroVision - Servicios profesionales de fotografía aérea<br>
            Guatemala City<br>
            danielrosalesdestaracacton@gmail.com
          </p>
        `,
      });

      console.log("Confirmation email sent:", emailResponse);
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Don't fail the whole request if email fails
    }

    return new Response(
      JSON.stringify({ 
        message: "¡Suscripción exitosa! Revisa tu email para confirmar.",
        data 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in newsletter-subscribe function:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
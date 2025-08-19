import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
  type: 'contact' | 'booking';
  packages?: string;
  total?: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      name, 
      email, 
      phone, 
      projectType, 
      message, 
      type,
      packages,
      total 
    }: ContactEmailRequest = await req.json();

    console.log("Received email request:", { name, email, type, total, timestamp: new Date().toISOString() });

    // Email to the business owner
    const businessEmailResponse = await resend.emails.send({
      from: "AeroVision <onboarding@resend.dev>",
      to: ["danielrosalesdestaracacton@gmail.com"],
      subject: type === 'booking' 
        ? `New Booking Request from ${name} - $${total}` 
        : `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            ${type === 'booking' ? '🎯 New Booking Request' : '📧 New Contact Message'}
          </h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #007bff; margin-top: 0;">Contact Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
          </div>

          ${type === 'booking' && packages ? `
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #28a745; margin-top: 0;">Selected Packages</h2>
              <div style="white-space: pre-line;">${packages}</div>
              <p style="font-size: 18px; font-weight: bold; color: #28a745;">
                Total Value: $${total}
              </p>
            </div>
          ` : ''}

          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #856404; margin-top: 0;">Message</h2>
            <p style="white-space: pre-line;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
            <p>This email was sent from your AeroVision website contact form.</p>
            <p>Please respond directly to the customer at: ${email}</p>
          </div>
        </div>
      `,
    });

    // Confirmation email to the customer
    const customerEmailResponse = await resend.emails.send({
      from: "AeroVision <onboarding@resend.dev>",
      to: [email],
      subject: type === 'booking' 
        ? "Booking Request Received - AeroVision" 
        : "Message Received - AeroVision",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            🚁 AeroVision Drone Photography
          </h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #007bff; margin-top: 0;">Thank you, ${name}!</h2>
            <p>We have received your ${type === 'booking' ? 'booking request' : 'message'} and will get back to you within 24 hours.</p>
            
            ${type === 'booking' && total ? `
              <p style="font-size: 16px; color: #28a745;">
                <strong>Estimated Total: $${total}</strong>
              </p>
            ` : ''}
            
            <p>Our team will review your requirements and contact you shortly to discuss the details and next steps.</p>
          </div>

          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">What happens next?</h3>
            <ul style="color: #333;">
              <li>We'll review your ${type === 'booking' ? 'booking request' : 'inquiry'}</li>
              <li>Our team will contact you within 24 hours</li>
              <li>We'll discuss your project details and timeline</li>
              <li>You'll receive a detailed quote and scheduling options</li>
            </ul>
          </div>

          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>Need immediate assistance?</strong><br>
              WhatsApp: +502 5822-1477<br>
              Email: danielrosalesdestaracacton@gmail.com
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; text-align: center;">
            <p>Best regards,<br><strong>The AeroVision Team</strong></p>
            <p>Professional Drone Photography & Videography</p>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { businessEmailResponse, customerEmailResponse });

    return new Response(JSON.stringify({ 
      success: true,
      businessEmail: businessEmailResponse,
      customerEmail: customerEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
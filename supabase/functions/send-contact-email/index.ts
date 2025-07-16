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
  topic?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, topic, message }: ContactEmailRequest = await req.json();

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "Kartik Vyas <noreply@kartikvyas.dev>",
      to: [email],
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3B82F6; margin-bottom: 20px;">Thank you for your message!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for reaching out through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
          
          <div style="background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">Your Message:</h3>
            ${topic ? `<p style="margin: 0 0 5px 0;"><strong>Topic:</strong> ${topic}</p>` : ''}
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>In the meantime, feel free to check out my other projects or connect with me on social media.</p>
          
          <p>Best regards,<br>Kartik Vyas<br>Full Stack & Blockchain Developer</p>
          
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
          <p style="font-size: 12px; color: #6B7280;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    // Send notification email to Kartik
    const notificationEmailResponse = await resend.emails.send({
      from: "Portfolio Contact <noreply@kartikvyas.dev>",
      to: ["vkartik013@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3B82F6; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #374151;">Contact Details:</h3>
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            ${topic ? `<p style="margin: 0 0 10px 0;"><strong>Topic:</strong> ${topic}</p>` : ''}
            <p style="margin: 0 0 10px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #FFFFFF; border: 1px solid #E5E7EB; padding: 20px; border-radius: 8px;">
            <h3 style="margin: 0 0 15px 0; color: #374151;">Message:</h3>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="margin-top: 20px;">
            <a href="mailto:${email}?subject=Re: Your inquiry&body=Hi ${name},%0D%0A%0D%0AThank you for reaching out..." 
               style="background: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reply to ${name}
            </a>
          </p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { userEmailResponse, notificationEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully",
        userEmailId: userEmailResponse.data?.id,
        notificationEmailId: notificationEmailResponse.data?.id
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
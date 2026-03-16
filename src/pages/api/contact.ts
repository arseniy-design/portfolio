export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Email service not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { name, email, subject, message } = body;
  if (!name || !email) {
    return new Response(JSON.stringify({ error: 'Name and email are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: 'arseniygoldberg@gmail.com',
    replyTo: email,
    subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAFAF8;">
        <h2 style="color: #0D1B2A; font-size: 20px; margin-bottom: 8px;">New message from your portfolio</h2>
        <hr style="border: none; border-top: 1px solid #EDE8DF; margin-bottom: 24px;" />
        <p style="color: #3D5470; font-size: 14px; margin-bottom: 4px;"><strong style="color: #0D1B2A;">From:</strong> ${name}</p>
        <p style="color: #3D5470; font-size: 14px; margin-bottom: 4px;"><strong style="color: #0D1B2A;">Email:</strong> ${email}</p>
        ${subject ? `<p style="color: #3D5470; font-size: 14px; margin-bottom: 16px;"><strong style="color: #0D1B2A;">Working on:</strong> ${subject}</p>` : ''}
        ${message ? `
        <div style="background: white; border-left: 3px solid #F4621F; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-top: 16px;">
          <p style="color: #3D5470; font-size: 14px; line-height: 1.7; margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
        ` : ''}
      </div>
    `,
  });

  if (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

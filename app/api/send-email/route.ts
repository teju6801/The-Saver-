import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

  const { email, dogName } = await req.json();

  await resend.emails.send({
    from: "The Saver <onboarding@resend.dev>",
    to: email,
    subject: "Adoption Request Approved 🐶",
    html: `
      <h2>Great News!</h2>
      <p>Your adoption request for <b>${dogName}</b> has been approved.</p>
      <p>Our team will contact you soon.</p>
    `
  });

  return Response.json({ success: true });
}
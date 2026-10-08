import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  try {
    // Honeypot: botovi često popune skriveno polje "website".
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const required = ["name", "email", "interest", "message"];

    if (
      !required.every(
        (key) => typeof body[key] === "string" && body[key].trim()
      )
    ) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    const name = body.name.trim().slice(0, 120);
    const email = body.email.trim().toLowerCase().slice(0, 254);
    const interest = body.interest.trim().slice(0, 160);
    const message = body.message.trim().slice(0, 5000);

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      return NextResponse.json(
        { error: "Veuillez indiquer une adresse e-mail valide." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "SebWebSwiss <contact@sebwebswiss.ch>",
      to: ["info@sebwebswiss.ch"],
      replyTo: email,
      subject: `Nouveau projet : ${interest}`,
      text: [
        "Nouvelle demande depuis sebwebswiss.ch",
        "",
        `Nom : ${name}`,
        `E-mail : ${email}`,
        `Sujet : ${interest}`,
        "",
        "Message :",
        message,
      ].join("\n"),
      html: `
        <h1>Nouvelle demande depuis sebwebswiss.ch</h1>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
        <p><strong>Sujet :</strong> ${escapeHtml(interest)}</p>
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "L’envoi a échoué. Veuillez réessayer ou nous écrire directement." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

import nodemailer from "nodemailer";
import { siteConfig } from "./data";

const SITE_URL = "https://penabarcelonista-habana-cuba.vercel.app";

function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error(
      "Faltan GMAIL_USER / GMAIL_APP_PASSWORD. Configura la App Password de Gmail (ver README)."
    );
  }
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

function layout(title: string, bodyHtml: string) {
  return `
  <div style="background:#FAF6EE;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid rgba(20,44,84,0.08);">
      <div style="background:#142C54;padding:28px 32px;text-align:center;">
        <img src="${SITE_URL}/images/escudo-pbh.png" alt="Escudo PBH" width="64" height="64" style="display:block;margin:0 auto 12px;" />
        <p style="margin:0;color:#F0B429;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
          ${siteConfig.officialNumber}
        </p>
        <h1 style="margin:6px 0 0;color:#FAF6EE;font-size:20px;">Peña Barcelonista de La Habana</h1>
      </div>
      <div style="padding:32px;color:#1A2233;font-size:15px;line-height:1.6;">
        <h2 style="margin:0 0 16px;color:#142C54;font-size:18px;">${title}</h2>
        ${bodyHtml}
      </div>
      <div style="padding:20px 32px;background:#FAF6EE;text-align:center;color:#142C54;font-size:12px;">
        ${siteConfig.address}<br/>
        ${siteConfig.email} · ${siteConfig.phone}
      </div>
    </div>
  </div>`;
}

function plantillaAceptada(nombre: string) {
  return layout(
    `¡Bienvenido/a, ${nombre}!`,
    `
    <p>Con mucha alegría te confirmamos que tu solicitud de membresía a la
    <strong>Peña Barcelonista de La Habana</strong> ha sido <strong>aceptada</strong>.</p>
    <p>Ya eres parte de esta casa culé que desde 1996 reúne a la afición del FC
    Barcelona en Cuba. En los próximos días la Junta Directiva se pondrá en
    contacto contigo para coordinar la entrega de tu carné oficial de socio y
    los próximos encuentros.</p>
    <p>¡Visca el Barça, visca la Peña!</p>
    `
  );
}

function plantillaRechazada(nombre: string) {
  return layout(
    `Hola, ${nombre}`,
    `
    <p>Gracias por tu interés en unirte a la <strong>Peña Barcelonista de La
    Habana</strong>.</p>
    <p>Después de revisar tu solicitud, en esta ocasión no hemos podido
    aprobar tu membresía. Si quieres más información o crees que se trata de
    un error, escríbenos a <a href="mailto:${siteConfig.email}" style="color:#9C1C3A;">${siteConfig.email}</a> y con gusto lo conversamos.</p>
    <p>Gracias por tu pasión por el barcelonismo.</p>
    `
  );
}

export async function enviarDecisionInscripcion({
  nombre,
  correo,
  estado,
}: {
  nombre: string;
  correo: string;
  estado: "aceptada" | "rechazada";
}) {
  const transporter = getTransporter();

  const subject =
    estado === "aceptada"
      ? "¡Bienvenido/a a la Peña Barcelonista de La Habana!"
      : "Sobre tu solicitud a la Peña Barcelonista de La Habana";

  const html =
    estado === "aceptada" ? plantillaAceptada(nombre) : plantillaRechazada(nombre);

  await transporter.sendMail({
    from: `"Peña Barcelonista de La Habana" <${process.env.GMAIL_USER}>`,
    to: correo,
    subject,
    html,
  });
}

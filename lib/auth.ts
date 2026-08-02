import { cookies } from "next/headers";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "pbh_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 días

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "Falta la variable de entorno SESSION_SECRET. Configúrala en .env.local o en Vercel."
    );
  }
  return secret;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function signaturesMatch(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function encodeSession(inscripcionId: number) {
  const payload = JSON.stringify({ id: inscripcionId, exp: Date.now() + SESSION_DURATION_MS });
  const encoded = Buffer.from(payload, "utf-8").toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

function decodeSession(token: string): { id: number } | null {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature || !signaturesMatch(sign(encoded), signature)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"));
    if (typeof payload.id !== "number" || typeof payload.exp !== "number") return null;
    if (Date.now() > payload.exp) return null;
    return { id: payload.id };
  } catch {
    return null;
  }
}

export async function createSession(inscripcionId: number) {
  const store = await cookies();
  store.set(COOKIE_NAME, encodeSession(inscripcionId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSession(): Promise<{ id: number } | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return token ? decodeSession(token) : null;
}

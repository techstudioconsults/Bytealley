"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

// Get secret key from environment variable or use a default for development
const secretKey =
  process.env.NEXTAUTH_SECRET ||
  (process.env.NODE_ENV === "development"
    ? "3489y34r304u93p98rhfweuirf834ry032e29ry348ry783eg32r784rg834r8y348ry2309e20"
    : undefined);

if (!secretKey) {
  throw new Error("NEXTAUTH_SECRET environment variable is required in production");
}

const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: ISessionData): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
}

export async function decrypt(input: string): Promise<ISessionData> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });

    // Validate the payload has the required properties
    if (!payload.user || !payload.expires) {
      throw new Error("Invalid session data");
    }

    return payload as ISessionData;
  } catch (error) {
    // Handle JWT verification errors (including expiration)
    deleteSession(); // Clear the invalid cookie
    throw error; // Re-throw to be handled by caller
  }
}

export async function getSession(): Promise<ISessionData | null> {
  const bytealley = cookies().get("bytealley")?.value;
  if (!bytealley) return null;
  return await decrypt(bytealley);
}

export async function setCookie(data: string, metaData: ICookieMetadata) {
  cookies().set({
    name: "bytealley",
    value: data,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    ...metaData,
  });
}

export async function deleteSession() {
  cookies().set({
    name: "bytealley",
    value: "",
    expires: new Date(0), // Expire immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

export async function createSession(sessionData: ISessionData) {
  const encrypted = await encrypt(sessionData);
  await setCookie(encrypted, {});
  return sessionData;
}

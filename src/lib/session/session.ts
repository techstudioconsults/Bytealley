"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

import { ICookieMetadata, ISessionData } from "~/types/interfaces";

// import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.NEXTAUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: ISessionData): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function decrypt(input: string): Promise<ISessionData> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as ISessionData;
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

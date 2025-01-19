"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

// import { NextRequest, NextResponse } from "next/server";

import { Session } from "~/types";

const secretKey = process.env.NEXTAUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession(): Promise<Session | null> {
  const skicom = cookies().get("skicom")?.value;
  if (!skicom) return null;
  return await decrypt(skicom);
}

export async function setCookie(data: any, metaData: any) {
  cookies().set({
    name: "skicom",
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
    name: "skicom",
    value: "",
    expires: new Date(0), // Expire immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

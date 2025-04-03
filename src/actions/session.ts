// src/actions/session.ts
"use server";

import {
  createSession as createServerSession,
  deleteSession as deleteServerSession,
  getSession as getServerSession,
} from "~/lib/session/session";

export async function createSession(sessionData: ISessionData) {
  return await createServerSession(sessionData);
}

export async function deleteSession() {
  await deleteServerSession();
}

export async function getSession() {
  return await getServerSession();
}

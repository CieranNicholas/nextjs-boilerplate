"use server";

import { isValidSession } from "@/actions/session.actions";
import { updateUserById } from "@/data-access/user";
import { User } from "@prisma/client";

export async function updateUserLinkInfo(userId: string, data: Partial<User>) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  await updateUserById(userId, data);
}

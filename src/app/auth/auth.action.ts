"use server";

import { z } from "zod";
import { signUpSchema } from "./sign-up-form";
import { prisma } from "@/lib/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { signInSchema } from "./sign-in-form";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateState } from "arctic";
import { googleOAuthClient } from "@/lib/googleOauth";

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingUser) return { error: "User already exists", success: false };

    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        name: values.name,
        password: hashedPassword,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};

export const signIn = async (values: z.infer<typeof signInSchema>) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: values.email.toLowerCase(),
      },
    });

    if (!user || !user.password)
      return { error: "Invalid Credentials", success: false };

    const passwordMatch = await new Argon2id().verify(
      user.password,
      values.password,
    );
    if (!passwordMatch) return { error: "Invalid Credentials", success: false };

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};

export const logout = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return redirect("/auth");
  try {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });
  } catch (error) {
    console.error("error logging out: ", error);
  }

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/auth");
};

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("google_oAuth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set("google_oAuth_code_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authUrl = await googleOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      },
    );

    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};

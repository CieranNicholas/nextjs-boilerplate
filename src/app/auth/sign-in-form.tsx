"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { RiGoogleFill } from "@remixicon/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getGoogleOauthConsentUrl, signIn } from "./auth.action";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const signInForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotPasswordForm = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSignInSubmit = async (values: SignInSchema) => {
    const res = await signIn(values);
    if (res.success) {
      toast.success("Login successful");
      router.push("/dashboard");
    } else {
      toast.error(res.error);
    }
  };

  const onForgotPasswordSubmit = async (values: ForgotPasswordSchema) => {
    // Implement the forgot password functionality here
    console.log("Forgot password for:", values.email);
    toast.success("Password reset email sent. Please check your inbox.");
    setIsForgotPassword(false);
  };

  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>
          {isForgotPassword ? "Reset Password" : "Welcome back!"}
        </CardTitle>
        <CardDescription>
          {isForgotPassword
            ? "Enter your email to reset your password."
            : "Sign in to your account to continue."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isForgotPassword ? (
          <Form {...forgotPasswordForm}>
            <form
              className="flex flex-col gap-4"
              onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)}
            >
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsForgotPassword(false)}
              >
                Back to Sign In
              </Button>
            </form>
          </Form>
        ) : (
          <>
            <Form {...signInForm}>
              <form
                className="flex flex-col gap-4"
                onSubmit={signInForm.handleSubmit(onSignInSubmit)}
              >
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password..."
                          {...field}
                          onChange={(e) => {
                            e.target.value = e.target.value.trim();
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password? Click here to reset
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <Button
                onClick={async () => {
                  const res = await getGoogleOauthConsentUrl();
                  if (res.url) {
                    window.location.href = res.url;
                  } else {
                    toast.error(res.error);
                  }
                }}
                variant="secondary"
              >
                <RiGoogleFill className="w-4 h-4 mr-2" />
                <p>Google</p>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SignInForm;

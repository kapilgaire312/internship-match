"use server";

import { signIn } from "@/lib/auth";

import { loginSchema } from "@/lib/utils/auth.validation";
import CustomError from "@/utils/CustomError";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export default async function handleLoginAction(formData) {
  try {
    const data = Object.fromEntries(formData.entries()); // converting form data into js object, which zod accepts.

    //check from zod
    const parsedData = loginSchema.parse(data);

    const res = await signIn("credentials", {
      redirect: false,
      email: parsedData.email,
      password: parsedData.password,
    });

    if (res?.error === "CredentialsSignin") {
      throw new CustomError("Invalid email or password");
    }

    if (!res?.error === "SERVER_ERROR") {
      throw new CustomError("Something went wrong. Try again.");
    }
  } catch (error) {
    //catch and return zoderror
    if (error instanceof ZodError) {
      return {
        error: true,
        message: error.issues[0].message,
        path: error.issues[0].path[0],
      };
    }

    if (error instanceof CustomError) {
      return { error: true, message: error.message, path: "password" };
    }
    console.log(error);
    return {
      error: true,
      message: "Something went wrong.Try again.",
      path: "",
    };
  }
  redirect("/");
}
